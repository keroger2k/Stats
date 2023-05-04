using AutoMapper;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Models;
using Stats.ExtApi.Services;
using System.Text;

namespace Stats.CmdApp
{
    public class GCApp
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly IMemoryCache _memoryCache;
        private readonly IMapper _mapper;
        private readonly StatsOut _statsOut;

        public GCApp(ILogger<GCApp> logger, 
            IConfiguration configuration,
            GameChangerService gameChangerService,
            DatabaseService databaseService,
            StatsOut statsOut,
            IMapper mapper,
            IMemoryCache memoryCache)
        {
            _configuration = configuration;
            _logger = logger;
            _gameChangerService = gameChangerService;
            _db = databaseService;
            _mapper = mapper;
            _statsOut = statsOut;
            _memoryCache = memoryCache;
        }

        public void Run()
        {
            Task.Run(async () =>
            {
                while (true)
                {
                    // Get the user's search text.
                    Console.Clear();
                    Console.WriteLine("Enter a Team name to search for: ");
                    string query = Console.ReadLine() ?? string.Empty;
                    int selection = 0;
                    try
                    {
                        // Find all Teams that match the search text.
                        var results = await _gameChangerService.SearchTeamsAsync(query, "baseball");
                        // Display the search results.
                        if (results.hits.Count() == 0)
                        {
                            Console.WriteLine("No Teams found.");
                        }
                        else
                        {
                            var i = 1;
                            Console.Clear();
                            foreach (var item in results.hits.Take(5))
                            {
                                var location = item.location == null ? "Unknown" : string.Format($"{item.location.city}, {item.location.state}");
                                Console.WriteLine($"{i++}. {item.name}; Sport/Season: {item.sport.ToUpper()}/{item.team_season.season.ToUpper()}, {item.team_season.year}");
                                Console.WriteLine($"Number of Players: {item.number_of_players}; Age Group: {item.age_group}; Staff: [ {string.Join(", ", item.staff)} ]\n");
                            }
                        }
                        Console.WriteLine("Which Team do you want to select?:");

                        if (int.TryParse(Console.ReadLine(), out selection))
                            SelectTeam(results.hits.ElementAt(selection - 1));

                    }
                    catch (HttpRequestException)
                    {
                        //Check for refresh token
                        var token = _memoryCache.Get<AuthorizationToken>(key: "gc-token");
                        if(token != null && token.refresh.data != null)
                        {
                            var newToken = await _gameChangerService.GetRefreshTokenAync(token.refresh.data);
                            _memoryCache.Set<AuthorizationToken>(key: "gc-token", value: newToken);
                        }else
                        {
                            //if doesn't exist as for a new one
                            Console.WriteLine("Enter your new refresh token: ");
                            //var data = Console.ReadLine();
                            var data = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYzg2NmZkLWMyNzMtNGZjZi04NTU0LTc3ZThmYjYzZTc2MiJ9.eyJpZCI6IjBjNjZhYzcxLTY2YTEtNGFiMy04MTIzLTVjNDFmMDY4YTdmNDplNDViZTdmZC04NTdmLTQ4ZTgtYTIzZS0yYmU1ZGM5MWQ4ZjAiLCJjaWQiOiJmN2UyZGNlNy04Mzk1LTRkMWYtYmFjZS04ODEwYjI2YzBlOGUiLCJ1aWQiOiIzNmJlODBhYy1jZTBkLTQ5MTgtODMwNi1jYzYyMzM5NmUyYzIiLCJlbWFpbCI6Imt5bGUucm9nZXJzQGdtYWlsLmNvbSIsImlhdCI6MTY4MzIxODgxMiwiZXhwIjoxNjg0NDI4NDEyfQ.aLZXQibm_v36ut5juFLqBgfyKTfY4ZZXBd_M7HnyZck";
                            var t = await _gameChangerService.GetRefreshTokenAync(data);
                            _memoryCache.Set<AuthorizationToken>(key: "gc-token", value: t );

                        }
                    }
                }
            }).GetAwaiter().GetResult();
        }

        private void SelectTeam(SearchResults.SearchItem item)
        {
            int choice = 0;
            Console.Clear();
            Console.WriteLine("---------------------------------------------------------------------------\n");
            Console.WriteLine($"Id: {item.id};\nName: {item.name}; Sport/Season: {item.sport.ToUpper()}/{item.team_season.season.ToUpper()}, {item.team_season.year} ");
            Console.WriteLine($"Number of Players: {item.number_of_players}\nAge Group: {item.age_group}\nStaff: [ {string.Join(", ", item.staff)} ]\n");
            Console.WriteLine("---------------------------------------------------------------------------\n");
            Console.WriteLine("What would you like to do?\n");
            Console.WriteLine("1. Import Team Info?");
            Console.WriteLine("2. Get event video?");
            Console.WriteLine("3. Back");

            if (int.TryParse(Console.ReadLine(), out choice))
            {
                switch (choice)
                {
                    case 1:
                        ImportTeamInfoAsync(item).Wait();
                        return;
                    case 2:
                        ListEventsAsync(item).Wait();
                        return;
                    default:
                        // Invalid choice.
                        Console.WriteLine("Invalid choice.");
                        break;
                }
            }
        }
        private async Task ListEventsAsync(SearchResults.SearchItem item)
        {
            var schedule = await _gameChangerService.GetTeamScheduledEventsAsync(item.id);
            var games = schedule.Where(c => c.@event.event_type.Equals("game"))
                .Where(c => !c.@event.status.Equals("canceled"))
                .Where(c => c.@event.start.datetime < DateTime.Now.AddDays(1))
                .Where(c => !c.@event.sub_type.Contains("scrimmages"));
            int choice = 0;
            foreach (var evt in games)
            {
                Console.WriteLine($"Id:{evt.@event.id}, Title:{evt.@event.title}");
            }
            if (int.TryParse(Console.ReadLine(), out choice))
            {
                var assets = await _gameChangerService.GetTeamEventVideoAssetsAsync(item.id, games.ElementAt(choice).@event.id);
                if (assets.Any(c => !c.audience_type.Equals("players_family_fans")))
                {
                    Console.WriteLine("Unable to find any videos available to fans.");
                    Console.ReadLine();
                    return;
                }
                var asset = assets.OrderByDescending(c => c.duration).First();
                var game = await _gameChangerService.GetTeamEventStatsAsync(item.id, asset.schedule_event_id);
                var clipmeta = await _gameChangerService.GetPlayerClipMeta(item.id, game.player_stats.players.First().Key);
                var interestClipForEvent = clipmeta.First(c => c.event_id == asset.schedule_event_id);
                var playableClip = await _gameChangerService.GetPlayerClipCookie(item.id, interestClipForEvent.clip_metadata_id);
                var clip = clipmeta.First(c => c.event_id == asset.schedule_event_id);
                Console.Write($"\nThumbnail: {clip.thumbnail_url}");
                Console.Write($"\nClip m3u8: {playableClip.url}");
                Console.Write($"\nKey-Pair-Id: {playableClip.cookies.CloudFrontKeyPairId}");
                Console.Write($"\nSignature: {playableClip.cookies.CloudFrontSignature}");
                Console.Write($"\nPolicy: {playableClip.cookies.CloudFrontPolicy}");

                //get m3u8 file
                var client = new HttpClient();
                var url = string.Format($"{playableClip.url}?Key-Pair-Id={playableClip.cookies.CloudFrontKeyPairId}&Signature={playableClip.cookies.CloudFrontSignature}&Policy={playableClip.cookies.CloudFrontPolicy}");
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var responseStream = await response.Content.ReadAsStringAsync();

                string[] lines = responseStream.Split('\n');
                var path = lines.Where(c => c.EndsWith(".ts")).First();

                var videoClipPath = new Uri(playableClip.url);

                StringBuilder sb1 = new StringBuilder();
                sb1.Append($"{videoClipPath.Scheme}://{videoClipPath.Host}");

                for (int i = 0; i < videoClipPath.Segments.Length - 2; i++)
                {
                    sb1.Append(videoClipPath.Segments[i]);
                }
                var relpath = sb1.ToString();
                var finalPath = path.Replace("../", relpath.Substring(0, relpath.Length));

                var downloadPath = new Uri(finalPath);
                StringBuilder sb2 = new StringBuilder();
                sb2.Append($"{videoClipPath.Scheme}://{videoClipPath.Host}");

                for (int i = 0; i < downloadPath.Segments.Length - 1; i++)
                {
                    sb2.Append(downloadPath.Segments[i]);
                }
                var basePath = sb2.ToString();
                var numberOfTSFiles = asset.duration / 10;

                Console.WriteLine($"Path: {basePath}");
                Console.WriteLine($"Duration: {asset.duration}");
                Console.WriteLine($"# of Files: {numberOfTSFiles}");

                try
                {
                    // Create a temp directory to store the downloaded files.
                    string tempDirectory = Path.GetFullPath("c:\\gc-downloads\\");
                    for (int i = 0; i < numberOfTSFiles; i++)
                    {
                        Console.WriteLine($"Downloading: {basePath}{i}.ts?Key-Pair-Id={playableClip.cookies.CloudFrontKeyPairId}&Signature={playableClip.cookies.CloudFrontSignature}&Policy={playableClip.cookies.CloudFrontPolicy}");
                        // Create a new WebClient object.

                        // Download the file from the URL.
                        byte[] bytes = await client.GetByteArrayAsync($"{basePath}{i}.ts?Key-Pair-Id={playableClip.cookies.CloudFrontKeyPairId}&Signature={playableClip.cookies.CloudFrontSignature}&Policy={playableClip.cookies.CloudFrontPolicy}");

                        // Save the file to the temp directory.
                        string fileName = Path.GetFileName($"{basePath}{i}.ts");
                        File.WriteAllBytes(Path.Combine(tempDirectory, fileName), bytes);
                    }
                }
                catch (Exception)
                {

                }

                // Get the directory to combine the files from.
                string inputDirectoryPath = @"C:\gc-downloads";

                // Get the name of the output file.
                string outputFileName = @"combined_file.ts";

                string[] inputFilePaths = Directory.GetFiles(inputDirectoryPath);
                Console.WriteLine("Number of files: {0}.", inputFilePaths.Length);


                using (var outputStream = File.Create($"{inputDirectoryPath}\\finished\\{outputFileName}"))
                {
                    foreach (var inputFilePath in inputFilePaths.OrderBy(c => Int32.Parse(c.Split('\\')[2].Split('.')[0])))
                    {
                        using (var inputStream = File.OpenRead(inputFilePath))
                        {
                            inputStream.CopyTo(outputStream);
                        }
                        Console.WriteLine("The file {0} has been processed.", inputFilePath);
                    }
                }

                Console.ReadLine();
            }
            Console.ReadLine();

        }
        private async Task ImportTeamInfoAsync(SearchResults.SearchItem item)
        {
            var team = await _gameChangerService.GetTeamAsync(item.id);
            var teamPlayers = await _gameChangerService.GetTeamSeasonStatsAsync(team.id);
            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(team.id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(team.id);
            var season_stats = await _gameChangerService.GetTeamSeasonStatsAsync(team.id);
            var video_assets1 = await _gameChangerService.GetTeamVideoAssetsAsync(team.id);

            var teamTransform = new TeamTransform()
            {
                id = team.id,
                name = team.name,
                created_at = team.created_at,
                updated_at = team.updated_at,
                sport = team.sport,
                city = team.city,
                state = team.state,
                country = team.country,
                age_group = team.age_group,
                season_name = team.season_name,
                season_year = team.season_year,
                team_avatar_image = team.team_avatar_image,
                schedule = _mapper.Map<List<TeamTransform.TeamSchedule>>(teamSchedule.ToList()),
                completed_game_scores = _mapper.Map<List<TeamTransform.Game>>(scores),
                season_stats = _mapper.Map<TeamTransform.SeasonStats>(season_stats),
                video_assets = _mapper.Map<List<TeamTransform.VideoAsset>>(video_assets1)
       
            };

            foreach (var playerId in teamPlayers.stats_data.players.Keys)
            {
                var player = await _gameChangerService.GetPlayer(playerId);
                teamTransform.players.Add(new TeamTransform.Player()
                {
                    id = player.id,
                    first_name = player.first_name,
                    last_name = player.last_name,
                    number = player.number,
                    status = player.status,
                    team_id = player.team_id,
                    person_id = player.person_id,
                    batting_side = player.bats.batting_side,
                    throwing_hand = player.bats.throwing_hand
                });
            }

            foreach (var evt in teamTransform.schedule.Where(c => c.@event.event_type.Equals("game"))
                .Where(c => !c.@event.status.Equals("canceled"))
                .Where(c => c.@event.start.datetime < DateTime.Now)
                .Where(c => !c.@event.sub_type.Contains("scrimmages")))
            {
                var game = await _gameChangerService.GetTeamEventStatsAsync(team.id, evt.@event.id);
                var eventPlayers = new TeamTransform.EventStats()
                {
                    id = game.event_id,
                    boxscore = _mapper.Map<TeamTransform.PlayerStats>(game.player_stats.stats)
                };
                eventPlayers.players = new Dictionary<string, TeamTransform.PlayerStats>();

                foreach (var player in game.player_stats.players)
                {
                    eventPlayers.players.Add(player.Key, _mapper.Map<TeamTransform.PlayerStats>(player.Value.stats));
                }

                teamTransform.completed_games.Add(eventPlayers);
            }

            await _db.CreateTeamAsync(teamTransform);
        }
    }
}
