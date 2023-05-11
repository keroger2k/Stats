using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stats.API.Models;
using Stats.Database.Services;

namespace Stats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : BaseController<TeamsController>
    {
        public TokenController(ILogger<TeamsController> logger, DatabaseService db, IMapper mapper) 
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

        

    }
}
