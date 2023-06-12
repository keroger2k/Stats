using AutoMapper;
using M3U8Parser;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Stats.API.Helper;
using Stats.API.Models;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Services;
using Stats.Models;
using System.IO;

namespace Stats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : BaseController<TeamsController>
    {
        private readonly ExternalAPIService _externalApi;
        private readonly DataProcessingService _dps;
        private readonly CloudFrontService _cfs;
        public TeamsController(ILogger<TeamsController> logger, DatabaseService db, IMapper mapper, ExternalAPIService externalApi, DataProcessingService dps, CloudFrontService cfs)
            : base(logger, db, mapper)
        {
            _externalApi = externalApi;
            _dps = dps;
            _cfs = cfs;
        }

        [HttpGet]
        public async Task<ActionResult<TeamTransform>> Get()
        {
            var team = await _db.GetTeamsAsync();
            var mapped = _mapper.Map<IEnumerable<TeamTransform>>(team);
            return Ok(mapped);
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<ActionResult<TeamTransform>> ImportTeamAsync(string id)
        {
            await _externalApi.ImportTeamInfoAsync(id);
            return Ok();
        }

        [HttpGet]
        [Route("{id}/players")]
        public async Task<ActionResult<TeamTransform>> GetTeamPlayers(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var mapped = _mapper.Map<TeamTransform>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/season-stats")]
        public async Task<ActionResult<TeamTransform>> GetTeamSeasonStats(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var mapped = _mapper.Map<TeamTransform>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/schedule")]
        public async Task<ActionResult<TeamTransform>> GetTeamGameSchedule(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var mapped = _mapper.Map<TeamTransform>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/schedule/{eid}/videos")]
        public async Task<ActionResult<IEnumerable<VideoPlayback>>> GetTeamEventVideosStream(string id, string eid)
        {
            var results = await _externalApi.GetTeamEventVideosPlayback(id, eid);
            return Ok(results);
        }

        [HttpGet]
        [Route("{id}/schedule/{eid}/videos1")]
        public async Task<ActionResult<IEnumerable<MediaPlaylist>>> GetTeamEventVideos(string id, string eid)
        {
            var results = await _externalApi.GetTeamEventVideosPlayback(id, eid);
            var urls = new List<MediaPlaylist>();
            foreach (var result in results)
            {
                var uri = new Uri(result.url);
                var noLastSegment = string.Format("{0}://{1}", uri.Scheme, uri.Authority);
                for (int i = 0; i < uri.Segments.Length - 1; i++)
                {
                    noLastSegment += uri.Segments[i];
                }

                var p = await _cfs.GetPlayListUrl(result);
                var masterPlaylist = MasterPlaylist.LoadFromText(p);
                foreach (var stream in masterPlaylist.Streams.Where(c => c.Uri.Contains('/') && (c.Video.Contains("720p") || c.Video
                .Contains("1080p"))))
                {
                    var p1 = await _cfs.GetPlayListFile(result, string.Format($"{noLastSegment}{stream.Uri}"));
                    var playList = MediaPlaylist.LoadFromText(p1);
                    urls.Add(playList);
                }

            }
            return Ok(urls);
        }


        [HttpGet]
        [Route("{id}/schedule/{eid}")]
        public async Task<ActionResult<TeamEvent>> GetTeamEvent(string id, string eid)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var teamEvent = team.completed_games.FirstOrDefault(game => game.event_id == eid);
            return Ok(teamEvent);
        }

        [HttpGet]
        [Route("{id}/pitch-smart/")]
        public async Task<ActionResult<TeamTransform>> GetTeamPitchSmart(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var results = _dps.GetTeamPitchSmart(team);
            return Ok(results);
        }

        [HttpGet]
        [Route("{id}/avatar/")]
        public async Task<FileContentResult> GetAvatar(string id)
        {
            var avatarBytes = await _db.GetTeamAvatarImageAsync(id);
            if (avatarBytes != null)
            {
                return File(avatarBytes.ImageBytes, "image/png");
            }
            else
            {
                var notfound = await _db.GetTeamAvatarImageAsync("11111111-1111-1111-1111-111111111111");
                return File(notfound.ImageBytes, "image/png");

            }

        }


        [HttpGet]
        [Route("{id}/open-video/")]
        public async Task<ActionResult<OpenOpponentVideos>> GetOpenVideo(string id, string oid)
        {
            var videos = await _externalApi.FindOpenOpponentVideo(oid, id);
            return Ok(videos);
        }

    }
}
