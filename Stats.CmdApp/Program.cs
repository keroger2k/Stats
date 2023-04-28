using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Stats.CmdApp.Helper;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Models;
using Stats.ExtApi.Services;

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

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new ApplicationMapper());
            });


            IMapper mapper = mappingConfig.CreateMapper();
            

            var host = Host.CreateDefaultBuilder()
                .ConfigureServices((context, services) => 
                {
                    services.AddTransient<GCApp>();
                    services.AddTransient<StatsOut>();
                    services.AddTransient<GameChangerService>();
                    services.AddTransient<DatabaseService>();
                    services.AddSingleton(mapper);
                    services.AddAutoMapper(typeof(Team).Assembly, typeof(TeamDTO).Assembly);


                    services.Configure<DatabaseSettings>(context.Configuration.GetSection("DatabaseSettings"));
                    services.AddSingleton<DatabaseService>();

                    services.AddScoped(sp =>
                    {
                        var http = new HttpClient();
                        http.BaseAddress = new Uri("https://api.Team-manager.gc.com");
                        http.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6ImQyZmU5MDA4LTRjMTQtNDJmYy1iOGJjLWExMTg1ZGFhZTJjYSIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6IjQ0Nzc4MDE2LWZiYmYtNDVlYy1iMjZhLTM0ODMyZGQ1NTJjYzo1NjZkYmI4Yy1iNTI0LTRhZmUtOWZmNy02MzI2ZjY5ZThmNTgiLCJpYXQiOjE2ODI2NDc4MTYsImV4cCI6MTY4MjY1MTQxNn0.dT44V62khaVevAvQt1UmdicK2HX6N07TNLQ6yKbcxFc");
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