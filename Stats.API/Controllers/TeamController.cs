using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Stats.API.Helper;
using Stats.API.Models;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Models;

namespace Stats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : BaseController<TeamsController>
    {
        private readonly ExternalAPIService _externalApi;
        public TeamsController(ILogger<TeamsController> logger, DatabaseService db, IMapper mapper, ExternalAPIService externalApi) 
            : base(logger, db, mapper)
        {
            _externalApi = externalApi;
        }

        [HttpGet]
        public async Task<ActionResult<Stats.API.Models.Team>> Get()
        {
            var team = await _db.GetTeamsAsync();
            var mapped = _mapper.Map<IEnumerable<Stats.API.Models.Team>>(team);
            return Ok(mapped);
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<ActionResult<Stats.API.Models.Team>> ImportTeamAsync(string id)
        {
            await _externalApi.ImportTeamInfoAsync(id);
            return Ok();
        }

        [HttpGet]
        [Route("{id}/players")]
        public async Task<ActionResult<TeamPlayers>> GetTeamPlayers(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var mapped = _mapper.Map<TeamPlayers>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/season-stats")]
        public async Task<ActionResult<TeamPlayers>> GetTeamSeasonStats(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var mapped = _mapper.Map<TeamStats>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/schedule")]
        public async Task<ActionResult<Stats.API.Models.TeamSchedule>> GetTeamGameSchedule(string id)
        {
            var team = await _externalApi.CheckTeamStatus(id);
            var mapped = _mapper.Map<Stats.API.Models.TeamSchedule>(team);
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
        [Route("{id}/schedule/{eid}")]
        public async Task<ActionResult<TeamTransform.TeamEvent>> GetTeamEvent(string id, string eid)
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
            var results = _db.GetTeamPitchSmart(team);
            return Ok(results);
        }

    }
}
