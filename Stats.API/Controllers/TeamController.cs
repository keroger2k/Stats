using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stats.API.Models;
using Stats.Database.Services;

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
        public async Task<ActionResult<Team>> Get()
        {
            var team = await _db.GetTeamsAsync();
            var mapped = _mapper.Map<IEnumerable<Team>>(team);
            return Ok(mapped);
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

        [HttpGet]
        [Route("{id}/schedule")]
        public async Task<ActionResult<TeamSchedule>> GetTeamGameSchedule(string id)
        {
            var team = await _db.GetTeamAsync(id);
            var mapped = _mapper.Map<TeamSchedule>(team);
            //mapped.schedule = mapped.schedule
            //    .Where(c => c.@event.event_type.Equals("game", StringComparison.OrdinalIgnoreCase))
            //    .Where(c => !c.@event.status.Equals("canceled", StringComparison.OrdinalIgnoreCase))
            //    .Where(c => !c.@event.sub_type.Contains("scrimmages"));
            return Ok(mapped);
        }

    }
}
