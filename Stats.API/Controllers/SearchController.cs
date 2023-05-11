using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stats.Database.Services;
using Stats.ExtApi.Services;
using static Stats.ExtApi.Services.GameChangerService;

namespace Stats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : BaseController<SearchController>
    {
        private readonly GameChangerService _gameChangerService;
        public SearchController(ILogger<SearchController> logger, DatabaseService db, GameChangerService gameChangerService, IMapper mapper) 
            : base(logger, db, mapper)
        {
            _gameChangerService = gameChangerService;   
        }

        [HttpGet(Name = "Teams")]
        public async Task<ActionResult<SearchResults>> Search(string query, string city = "", string state = "", string season = "", string year = "", string sport = "baseball")
        {
            var teams = await _gameChangerService.SearchTeamsAsync(query: query, city: city, state: state, season: season, year: year, sport: sport);
            return Ok(teams.hits);
        }

    }
}
