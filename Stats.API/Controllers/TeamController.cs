using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stats.Database.Services;
using Stats.API.Models;

namespace Stats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : BaseController<TeamsController>
    {
        public TeamsController(ILogger<TeamsController> logger, DatabaseService db, IMapper mapper) 
            : base(logger, db, mapper)
        {
            
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Team>> Get(string id)
        {
            var team = await _db.GetTeamAsync(id);
            var mapped = _mapper.Map<Team>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/players")]
        public async Task<ActionResult<TeamPlayers>> GetTeamPlayers(string id)
        {
            var team = await _db.GetTeamAsync(id);
            var mapped = _mapper.Map<TeamPlayers>(team);
            return Ok(mapped);
        }

        [HttpGet]
        [Route("{id}/season-stats")]
        public async Task<ActionResult<TeamPlayers>> GetTeamSeasonStats(string id)
        {
            var team = await _db.GetTeamAsync(id);
            var mapped = _mapper.Map<TeamStats>(team);
            return Ok(mapped);
        }

    }
}
