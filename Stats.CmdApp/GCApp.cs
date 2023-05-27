using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Serilog;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Services;
using Stats.Models;
using System.Text;
using static Stats.ExtApi.Services.GameChangerService;
using static Stats.Models.StatsData;

namespace Stats.CmdApp
{
    public class GCApp
    {
        private readonly IConfiguration _configuration;
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly IMapper _mapper;
        private readonly StatsOut _statsOut;
        private readonly AuthorizationService _auth;
        private readonly DataProcessingService _dps;
        public GCApp(ILogger<GCApp> logger,
            IConfiguration configuration,
            GameChangerService gameChangerService,
            AuthorizationService auth,
            DatabaseService databaseService,
            StatsOut statsOut,
            DataProcessingService dps,
            IMapper mapper)
        {
            _configuration = configuration;
            _gameChangerService = gameChangerService;
            _db = databaseService;
            _mapper = mapper;
            _dps = dps;
            _statsOut = statsOut;
            _auth = auth;
        }

        public void Run()
        {
            Task.Run(async () =>
            {
                await SeedDatabase();
                //var interestingId = "df59a93c-d75e-45f6-aa08-83e2150f39c9";
                //var imageUrl = await _gameChangerService.GetTeamAvatarAsync(interestingId);
                //await _dps.StoreImageFromUrlAsync(interestingId, imageUrl.full_media_url);
                //Console.WriteLine("here");
                //var team = await _db.GetTeamAsync(interestingId);
                ////look at team of interests opponents
                //foreach (var item in team.opponents)
                //{
                //    var opp = await _db.GetTeamAsync(item.progenitor_team_id);
                //    //for now check if opponent exists in local database only
                //    if (opp != null)
                //    {
                //        await FindOpenOpponentVideo(opp.id, team.id);
                //    }
                //    else
                //    {
                //        if (!string.IsNullOrEmpty(item.progenitor_team_id))
                //        {
                //            await ImportTeamInfoAsync(item.progenitor_team_id);
                //            var opp1 = await _db.GetTeamAsync(item.progenitor_team_id);
                //            await DoShit(opp1, team);

                //        }
                //    }

                //}



                //while (true)
                //{
                //    // Get the user's search text.
                //    Console.Clear();
                //    Console.WriteLine("Enter a Team name to search for: ");
                //    string query = Console.ReadLine() ?? string.Empty;
                //    int selection = 0;
                //    // Find all Teams that match the search text.
                //    var results = await _gameChangerService.SearchTeamsAsync(query, sport: "baseball");

                //    // Display the search results.
                //    if (results.hits.Count() == 0)
                //    {
                //        Console.WriteLine("No Teams found.");
                //    }
                //    else
                //    {
                //        var i = 1;
                //        Console.Clear();
                //        foreach (var item in results.hits.Take(5))
                //        {
                //            var location = item.location == null ? "Unknown" : string.Format($"{item.location.city}, {item.location.state}");
                //            Console.WriteLine($"{i++}. {item.name}; Sport/Season: {item.sport.ToUpper()}/{item.team_season.season.ToUpper()}, {item.team_season.year}");
                //            Console.WriteLine($"Number of Players: {item.number_of_players}; Age Group: {item.age_group}; Staff: [ {string.Join(", ", item.staff)} ]\n");
                //        }
                //    }
                //    Console.WriteLine("Which Team do you want to select?:");

                //    if (int.TryParse(Console.ReadLine(), out selection))
                //        SelectTeam(results.hits.ElementAt(selection - 1));

                //}

            }).GetAwaiter().GetResult();
        }
        private async Task FindOpenOpponentVideo(string oid, string id)
        {
            var opp = await _db.GetTeamAsync(oid);
            var team = await _db.GetTeamAsync(id);
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
                                    await DownloadVideo(vid.url, vid.cookies, asset);
                                }
                            }
                            catch (Exception)
                            {
                            }
                        }
                    }
                }
            }
        }
        private async Task DownloadVideo(string url, CloudFrontCookie cookie, VideoAsset asset)
        {
            //get master.m3u8 file
            var client = new HttpClient();
            var m3u8url = string.Format($"{url}?Key-Pair-Id={cookie.CloudFrontKeyPairId}&Signature={cookie.CloudFrontSignature}&Policy={cookie.CloudFrontPolicy}");
            var response = await client.GetAsync(m3u8url);
            response.EnsureSuccessStatusCode();
            var masterResponseStream = await response.Content.ReadAsStringAsync();

            string[] masterm3u8file = masterResponseStream.Split('\n');
            var playListFileName = masterm3u8file.Where(c => c.EndsWith("playlist.m3u8")).First();
            var playListUrl = url.Replace("master.m3u8", playListFileName);

            var playlistm3u8Url = string.Format($"{playListUrl}?Key-Pair-Id={cookie.CloudFrontKeyPairId}&Signature={cookie.CloudFrontSignature}&Policy={cookie.CloudFrontPolicy}");
            var playListResponse = await client.GetAsync(playlistm3u8Url);
            playListResponse.EnsureSuccessStatusCode();
            var responseStream = await playListResponse.Content.ReadAsStringAsync();


            string[] lines = responseStream.Split('\n');
            var path = lines.Where(c => c.EndsWith(".ts")).First();

            var videoClipPath = new Uri(playlistm3u8Url);

            StringBuilder sb1 = new StringBuilder();
            sb1.Append($"{videoClipPath.Scheme}://{videoClipPath.Host}");

            for (int i = 0; i < videoClipPath.Segments.Length - 3; i++)
            {
                sb1.Append(videoClipPath.Segments[i]);
            }
            var relpath = sb1.ToString();
            var finalPath = path.Replace("../../", relpath.Substring(0, relpath.Length));

            var downloadPath = new Uri(finalPath);
            StringBuilder sb2 = new StringBuilder();
            sb2.Append($"{videoClipPath.Scheme}://{videoClipPath.Host}");

            for (int i = 0; i < downloadPath.Segments.Length - 1; i++)
            {
                sb2.Append(downloadPath.Segments[i]);
            }

            finalPath = sb2.ToString();

            var numberOfTSFiles = asset.duration / 10;

            Console.WriteLine($"Path: {finalPath}");
            Console.WriteLine($"Duration: {asset.duration}");
            Console.WriteLine($"# of Files: {numberOfTSFiles}");

            try
            {
                // Create a temp directory to store the downloaded files.
                string tempDirectory = Path.GetFullPath("c:\\gc-downloads\\");
                for (int i = 0; i < numberOfTSFiles; i++)
                {
                    Console.WriteLine($"Downloading: {finalPath}{i}.ts?Key-Pair-Id={cookie.CloudFrontKeyPairId}&Signature={cookie.CloudFrontSignature}&Policy={cookie.CloudFrontPolicy}");
                    byte[] bytes = await client.GetByteArrayAsync($"{finalPath}{i}.ts?Key-Pair-Id={cookie.CloudFrontKeyPairId}&Signature={cookie.CloudFrontSignature}&Policy={cookie.CloudFrontPolicy}");
                    string fileName = Path.GetFileName($"{finalPath}{i}.ts");
                    File.WriteAllBytes(Path.Combine(tempDirectory, fileName), bytes);
                }
            }
            catch (Exception)
            {

            }

            // Get the directory to combine the files from.
            string inputDirectoryPath = @"C:\gc-downloads";

            // Get the name of the output file.
            string outputFileName = Guid.NewGuid().ToString();

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

            string[] tsFiles = Directory.GetFiles(inputDirectoryPath, "*.ts");
            foreach (string file in tsFiles)
            {
                File.Delete(file);
                Console.WriteLine($"Deleted file: {file}");
            }
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
                        ImportTeamInfoAsync(item.id).Wait();
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
            int ii = 1;
            Console.WriteLine("\n");
            foreach (var evt in games)
            {
                Console.WriteLine($"{ii++}: Id:{evt.@event.id}, Title:{evt.@event.title}");
            }
            if (int.TryParse(Console.ReadLine(), out choice))
            {
                try
                {
                    var playbackInfo = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(item.id, games.ElementAt(choice - 1).@event.id);
                    var videoAssets = await _gameChangerService.GetTeamVideoAssetsAsync(item.id);

                    foreach (var vid in playbackInfo.DistinctBy(c => c.url))
                    {
                        var asset = videoAssets.First(c => c.schedule_event_id == vid.schedule_event_id);
                        Console.WriteLine($"Downloading: {item.name} has public video of {item.name}:{vid.schedule_event_id}");
                        await DownloadVideo(vid.url, vid.cookies, asset);
                    }
                }
                catch (Exception)
                {
                }
            }
            Console.ReadLine();

        }
        public async Task ImportTeamInfoAsync(string id)
        {
            var team = await _gameChangerService.GetTeamAsync(id);
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
                team_avatar_image = "",
            };

            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(id);
            var opponents = await _gameChangerService.GetTeamOpponentsAsync(id);
            var season_stats = await _gameChangerService.GetTeamSeasonStatsAsync(id);
            if (season_stats != null)
            {
                var players = await _gameChangerService.GetPlayers(season_stats.stats_data.players.Keys.ToArray());
                teamTransform.schedule = teamSchedule.ToList();
                teamTransform.completed_game_scores = scores.ToList();
                teamTransform.season_stats = season_stats;
                teamTransform.opponents = opponents.ToList();
                teamTransform.players = players.ToList();

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
            }
            await _db.CreateTeamAsync(teamTransform);

            var image = await _gameChangerService.GetTeamAvatarAsync(team.id);
            await _dps.StoreImageFromUrlAsync(team.id, image.full_media_url);
        }

        public async Task SeedDatabase()
        {
            var teams = new string[]
            {
                "c2fcadeb-cfc9-47f9-b8ac-3e0c17e37742",
                "7466ebcf-8420-4630-961e-f06746a226a1",
                "a4653dd8-80b2-4ebc-876f-ecebbc97a001",
                "e6afe779-ae87-40bf-826d-d248258a0d68",
                "c86ff12e-a839-4f05-883b-31e91b14ef93",
                "7649bc8c-b66a-430a-a16b-58b7aef9c872",
                "7306524d-5b98-410b-af8c-0c06630f0204",
                "5b7a2f19-ea29-40cf-8467-41e19a0310da",
                "cdb4d468-87d7-4d19-aa78-37727c72cbd5",
                "d9f812c5-6e73-4408-8d4b-69fd6e301e58",
                "984dd390-5694-490f-97d8-2d93cbb05301",
                "cd9016a6-dabf-4e75-810c-354aa48b9ee4",
                "daf887b4-f5b8-4c00-8c24-1f956ec55ad3",
                "f9dff9fe-e29e-4f64-b02a-be8d7e984bb3",
                "63dc1232-9b1e-4772-8c27-7b7925a7b25e",
                "d2bfcb4e-18fb-4ed6-ab29-90403a48809b",
                "75ff2252-6771-429f-972d-596c40d98fda",
                "2173adeb-7f6d-4a45-b498-888d3bfa7f16",
                "12977b0d-1fae-4e8b-9aba-ba00f1c3a3a1",
                "3df635a5-8d09-44a0-9137-60321c67124f",
                "6a97f1bc-fa4d-4b66-acf1-3ca3d4171fe5",
                "73ff0215-965a-45c3-98f2-1e90d15ee8a4",
                "e925fe96-f341-45a2-ae4c-e5db8bd53389",
                "b45b5903-a763-4ce3-9681-a7febeb0731d",
                "8459bb07-c454-45d3-b7aa-78832c5f145a",
                "a842261f-b6c1-45ab-befc-e236a2668e22",
                "26db0c42-1883-46a9-8b39-2351c23d5529",
                "bce8231e-386a-4f97-b753-730e10c88f42",
                "b05dfbc9-129a-44c9-862c-03cac66144f1",
                "d5f56912-b397-45ce-9890-f5c97ca1206d",
                "c5fd43d3-2e10-414d-b42e-deaa1d82781f",
                "f664936a-2032-4a9c-80c3-6575a29d3a65",
                "8838a528-44f4-469f-b77f-3b0cfa6b4029",
                "1308e833-8a5f-4236-8b60-73db3d66e966",
                "9bea5d79-1ba3-4bf1-a750-adc99706bd37",
                "ef497a84-60ef-4cbb-9765-9eac63109da5",
                "dbcd919a-192d-472b-bd77-d68619fd4f25",
                "d359183b-15b1-4554-aa7c-8ebe0ff9a5da",
                "c8dd2dd6-58b0-414e-b539-10baa73e6227",
                "8457468c-533c-48ad-b0d8-db59efb9ee7f",
                "e0257dc3-7f8f-430b-8cef-8e9394e4fe88",
                "23b492d7-26d3-4829-bdf0-33f5a321cdba",
                "a4c5f921-8e62-4ee8-8e29-805de9ec1922",
                "0a89d7f9-501c-44b1-ad12-925b8f0cfaf6",
                "f82232f0-1f1d-4cc0-887d-7baf7bcb33e0",
                "8f48e05f-9094-48cd-90e1-2700b1aeee73",
                "68f03196-5b1d-4a09-b0ea-e4140664b29d",
                "cd99e119-2548-417f-9945-6f2c655a552f",
                "ee974a66-0cfc-4e72-a817-bdca24e5cd33",
                "df59a93c-d75e-45f6-aa08-83e2150f39c9",
                "266a6104-f25f-409e-81d6-a186d35255a9",
                "09a512d9-0ada-48ef-ae7d-9f7ccc781aae",
                "1f10b345-994c-424f-acc9-9434fd580deb",
                "7c5ba8f2-2bdb-462c-8360-8a5e0efabba6",
                "cafa78dc-a9d4-45bc-ae25-fad4e5233b3b"
            };

            foreach (var team in teams)
            {
                await ImportTeamInfoAsync(team);
            }
        }
    }
}
