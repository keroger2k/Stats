using System.Runtime.CompilerServices;
using Stats.ExtApi;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;
using System.Net.Http;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;

namespace Stats.CmdApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://api.team-manager.gc.com");
            client.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6ImRkYWZlZTU3LTVlMGEtNDNmMC05Zjk3LWM5NjU5ZWExMTBhYyIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6IjQ0Nzc4MDE2LWZiYmYtNDVlYy1iMjZhLTM0ODMyZGQ1NTJjYzpiMmU1YWZmYS00ODU5LTRlZmUtODhlZC02NmQ2YTE0MGM2YmYiLCJpYXQiOjE2ODIzNTQzMDUsImV4cCI6MTY4MjM1NzkwNX0.fdSndBEAa_B9i1AdF8BrcHsjzudg6ZTT89W3fG_LayY");


            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.SearchTeamsAsync("Pony Express 13u"); }).Result;
            foreach (var team in result.hits)
            {
                Console.WriteLine($"Id: {team.id}, Name: {team.name}, Place: {team.location.city},{team.location.state}");    
                foreach(var staff in team.staff)
                {
                    Console.WriteLine($"Staff: {staff}");
                }
            }
        }
    }
}