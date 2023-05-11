using AutoMapper;
using Serilog;
using Stats.API.Helper;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();



var configBuilder = new ConfigurationBuilder();

Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configBuilder.Build())
                .Enrich.FromLogContext()
                .CreateLogger();

Log.Logger.Information("Application Starting");


var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new ApplicationMapper());
});

IMapper mapper = mappingConfig.CreateMapper();


builder.Services.AddScoped<DatabaseService>();
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));
builder.Services.AddScoped<GameChangerService>(); 
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


app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

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
