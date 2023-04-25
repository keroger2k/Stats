using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Stats.ExtApi;

namespace Stats.CmdApp
{
    public class Program
    {
        static void BuildConfig(IConfigurationBuilder builder)
        {
            builder.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
                .AddEnvironmentVariables();
        }

        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder();
            BuildConfig(builder);

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Build())
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            Log.Logger.Information("Application Starting");

            var host = Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) => 
                {
                    services.AddTransient<GCApp>();
                    services.AddTransient<GameChangerService>();

                    services.AddScoped(sp =>
                    {
                        var http = new HttpClient();
                        http.BaseAddress = new Uri("https://api.team-manager.gc.com");
                        http.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6IjY1NGM1ZWQ3LTU5MDgtNGZlZC1iOWRhLWYwMjRhMmExNWJjNiIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6IjQ0Nzc4MDE2LWZiYmYtNDVlYy1iMjZhLTM0ODMyZGQ1NTJjYzpiYTUxZDU3Ni0zZDNkLTQ1Y2QtOWE1Zi1kNzI4YWIzNGE4ZjEiLCJpYXQiOjE2ODI0MzUzMjQsImV4cCI6MTY4MjQzODkyNH0.4i_0WAKKeaezRglvoGTGS2IlbDnthjlMsj2P14E9SS0");
                        return http;
                    });
                })
                .UseSerilog()
                .Build();

            var app = ActivatorUtilities.CreateInstance<GCApp>(host.Services);
            app.Run();
        }
    }
}       