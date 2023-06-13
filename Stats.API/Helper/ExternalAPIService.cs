using AutoMapper;
using M3U8Parser;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Stats.API.Models;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Services;
using Stats.Models;
using System.Text;

namespace Stats.API.Helper
{
    public class ExternalAPIService
    {
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly DataProcessingService _dps;
        private readonly IMapper _mapper;
        private readonly CloudFrontService _cfs;
        private readonly HttpClient _httpClient;

        public readonly static string[] ACCEPTABLE_RESOLUTIONS = { "480p30", "720p30", "1080p", "480p60", "720p60" };


        public ExternalAPIService(GameChangerService gameChangerService, DatabaseService db,
            DataProcessingService dps, IMapper mapper, CloudFrontService cfs, HttpClient httpClient)
        {
            _gameChangerService = gameChangerService;
            _dps = dps;
            _mapper = mapper;
            _db = db;
            _cfs = cfs;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<VideoPlayback>> GetTeamEventVideos(string teamId, string eventId)
        {
            var results = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(teamId, eventId);
            return results;
        }

        public async Task<FileContentResult> GetTeamEventVideoPlayList(string id, string eid, string vid)
        {
            var results = await GetTeamEventVideosPlayback(id, eid);
            var result = results.FirstOrDefault(c => c.id == vid);
            if (result != null)
            {
                var noLastSegment = new System.Uri(new System.Uri(result.url), ".");

                var p = await _cfs.GetPlayListUrl(result);
                var masterPlaylist = MasterPlaylist.LoadFromText(p);
                var bestPlayListPath = masterPlaylist.Streams.FirstOrDefault(c => ACCEPTABLE_RESOLUTIONS.Contains(c.Video));

                if (bestPlayListPath != null)
                {
                    var content = await _cfs.GetPlayListFile(result, string.Format($"{noLastSegment.AbsoluteUri}{bestPlayListPath.Uri}"));
                    var playList = M3U8Parser.MediaPlaylist.LoadFromText(content);
                    var search1 = playList.MediaSegments[0].Segments[0].Uri.Split('/');
                    var search2 = search1.Take(search1.Length - 1);

                    //var searchString = string.Join('/', search2);

                    //string[] lines = content.Split('\n');
                    //for (int i = 0; i < lines.Length; i++)
                    //{
                    //    if (lines[i].Contains(searchString))
                    //    {
                    //        lines[i] = lines[i].Replace(searchString, string.Empty);
                    //    }
                    //}

                    //string output = string.Join('\n', lines);

                    var bytes = Encoding.UTF8.GetBytes(content);
                    var result1 = new FileContentResult(bytes, "text/xml");
                    result1.FileDownloadName = "playlist.m3u8";
                    return result1;
                }
                else
                {
                    return new FileContentResult(Encoding.UTF8.GetBytes(""), "");
                }
            }
            else
            {
                return new FileContentResult(Encoding.UTF8.GetBytes(""), "");
            }
        }

        public async Task<FileContentResult> GetTeamEventVideoClip(string id, string eid, string vid, string clipId)
        {
            var results = await GetTeamEventVideosPlayback(id, eid);
            var result = results.FirstOrDefault(c => c.id == vid);

            if (result != null)
            {
                var noLastSegment = new Uri(new System.Uri(result.url), ".");
                var p = await _cfs.GetPlayListUrl(result);
                var masterPlaylist = MasterPlaylist.LoadFromText(p);
                var bestPlayListPath = masterPlaylist.Streams.FirstOrDefault(c => ACCEPTABLE_RESOLUTIONS.Contains(c.Video));

                if (bestPlayListPath != null)
                {
                    var content = await _cfs.GetPlayListFile(result, string.Format($"{noLastSegment.AbsoluteUri}{bestPlayListPath.Uri}"));
                    var playList = M3U8Parser.MediaPlaylist.LoadFromText(content);
                    var playListUri = new Uri(noLastSegment, playList.MediaSegments[0].Segments[0].Uri);
                    var playListUriNoLastSegment = new Uri(playListUri, ".");
                    var test = string.Format($"{playListUriNoLastSegment.AbsoluteUri}{bestPlayListPath.Video}/{clipId}?Key-Pair-Id={result.cookies.CloudFrontKeyPairId}&Signature={result.cookies.CloudFrontSignature}&Policy={result.cookies.CloudFrontPolicy}");
                    var response = await _httpClient.GetAsync(test);
                    return new FileContentResult(await response.Content.ReadAsByteArrayAsync(), "application/octet-stream");
                }
                else
                {
                    return new FileContentResult(Encoding.UTF8.GetBytes(""), "application/octet-stream");
                }
            }
            else
            {
                return new FileContentResult(Encoding.UTF8.GetBytes(""), "application/octet-stream");
            }
        }

        public async Task<IEnumerable<VideoPlayback>> GetTeamEventVideosPlayback(string teamId, string eventId)
        {
            var results = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(teamId, eventId);
            return results;
        }

        public async Task<TeamTransform> CheckTeamStatus(string id)
        {
            var team = await _db.GetTeamAsync(id);
            if (team == null || _dps.TeamNeedsUpdated(team))
            {
                await ImportTeamInfoAsync(id);
                team = await _db.GetTeamAsync(id);
            }
            return team;
        }

        public async Task ImportTeamInfoAsync(string id)
        {
            var teamTransform = new TeamTransform();
            var team = await _gameChangerService.GetTeamAsync(id);
            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(id);
            var season_stats = await _gameChangerService.GetTeamSeasonStatsAsync(id);
            var opponents = await _gameChangerService.GetTeamOpponentsAsync(id);
            var videos = await _gameChangerService.GetTeamVideoAssetsAsync(id);

            if (season_stats != null)
            {
                teamTransform.season_stats = season_stats;
                var players = await _gameChangerService.GetPlayers(season_stats.stats_data.players.Keys.ToArray());
                teamTransform.players = players.ToList();
            }
            teamTransform.id = team.id;
            teamTransform.name = team.name;
            teamTransform.created_at = team.created_at;
            teamTransform.updated_at = team.updated_at;
            teamTransform.sport = team.sport;
            teamTransform.city = team.city;
            teamTransform.state = team.state;
            teamTransform.country = team.country;
            teamTransform.age_group = team.age_group;
            teamTransform.season_name = team.season_name;
            teamTransform.season_year = team.season_year;
            teamTransform.team_avatar_image = "";
            teamTransform.schedule = teamSchedule.ToList();
            teamTransform.completed_game_scores = scores.ToList();
            teamTransform.opponents = opponents.ToList();
            teamTransform.video_assets = videos.ToList();

            foreach (var evt in teamTransform.schedule.Where(c => c.@event.event_type.Equals("game"))
                .Where(c => !c.@event.status.Equals("canceled"))
                .Where(c => c.@event.start.datetime < DateTime.Now)
                .Where(c => !c.@event.sub_type.Contains("scrimmages")))
            {
                try
                {
                    TeamEvent game = await _gameChangerService.GetTeamEventStatsAsync(team.id, evt.@event.id);
                    teamTransform.completed_games.Add(game);
                }
                catch (Exception)
                {
                    Log.Logger.Information($"ExternalAPIService::EventNotFound({evt.@event.id})");
                }
            }
            await _db.CreateTeamAsync(teamTransform);
            var image = await _gameChangerService.GetTeamAvatarAsync(team.id);
            await _dps.StoreImageFromUrlAsync(team.id, image.full_media_url);
        }

        public async Task<OpenOpponentVideos> FindOpenOpponentVideo(string oid, string id)
        {
            var opp = await _db.GetTeamAsync(oid);
            var team = await _db.GetTeamAsync(id);
            var result = new OpenOpponentVideos();
            //find interesting team as their opponent
            var opponentEventWithTeam = opp.opponents.Where(c => c.progenitor_team_id == team.id);
            foreach (var opponentEvent in opponentEventWithTeam)
            {
                //find interesting team on opponents schedule
                var oppScheduledItem = opp.schedule.Where(c => c.pregame_data != null && c.pregame_data.opponent_id == opponentEvent.root_team_id);
                if (oppScheduledItem.Any())
                {
                    foreach (var evt in oppScheduledItem)
                    {
                        //find interest team event in opponents completed games
                        var theEventFinally = opp.completed_games.FirstOrDefault(c => c.event_id == evt.@event.id);
                        if (theEventFinally != null)
                        {
                            //Console.WriteLine($"Found {opp.name} event with {team.name}: {theEventFinally.event_id}");
                            //get all the video assets for the opponent
                            try
                            {
                                var playbackInfo = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(opp.id, theEventFinally.event_id);
                                var videoAssets = await _gameChangerService.GetTeamVideoAssetsAsync(opp.id);

                                foreach (var vid in playbackInfo.DistinctBy(c => c.url))
                                {
                                    var asset = videoAssets.First(c => c.schedule_event_id == vid.schedule_event_id);
                                    Console.WriteLine($"Downloading: {opp.name} has public video of {team.name}:{vid.schedule_event_id}");
                                    result.videos.Add(new OpenOpponentVideo
                                    {
                                        Asset = asset,
                                        Url = vid.url,
                                        CloudFrontCookie = vid.cookies
                                    });
                                }
                            }
                            catch (Exception)
                            {
                            }
                        }
                    }
                }
            }
            return result;
        }

    }
}
