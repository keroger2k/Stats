using AutoMapper;
using Serilog;
using Serilog.Events;
using Stats.API.Helper;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

var configBuilder = new ConfigurationBuilder();

Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configBuilder.Build())
                .WriteTo.Console()
                .WriteTo.File("log.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();

builder.Host.UseSerilog(Log.Logger);

Log.Logger.Information("Application Starting");


var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new ApplicationMapper());
});

IMapper mapper = mappingConfig.CreateMapper();

builder.Services.AddScoped<DatabaseService>();
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));
builder.Services.AddScoped<DataProcessingService>();
builder.Services.AddScoped<GameChangerService>();
builder.Services.AddScoped<CloudFrontService>();
builder.Services.AddScoped<AuthorizationService>();
builder.Services.AddScoped<ExternalAPIService>();
builder.Services.AddSingleton(mapper);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped(sp =>
{
    var http = new HttpClient();
    http.BaseAddress = new Uri("https://api.Team-manager.gc.com");
    return http;
});


var app = builder.Build();
app.UseCors("AllowAll");

app.UseSerilogRequestLogging(options =>
{
    // Customize the message template
    options.MessageTemplate = "{RemoteIpAddress} {RequestScheme} {RequestHost} {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";

    // Emit debug-level events instead of the defaults
    options.GetLevel = (httpContext, elapsed, ex) => LogEventLevel.Debug;

    //Attach additional properties to the request completion event
    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
    {
        diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
        diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
        diagnosticContext.Set("RemoteIpAddress", httpContext.Connection.RemoteIpAddress);
    };
});



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseRouting();

app.MapFallbackToFile("index.html"); ;
app.MapControllers();
app.Run();
