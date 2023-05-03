using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stats.Database.Services;

namespace Stats.API.Controllers
{

    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BaseController<T> : ControllerBase where T : BaseController<T>
    {
        internal readonly ILogger<T> _logger;
        internal readonly DatabaseService _db;
        internal readonly IMapper _mapper;
        public BaseController(ILogger<T> logger, DatabaseService db, IMapper mapper)
        {
            _logger = logger;
            _db = db;
            _mapper = mapper;
        }
    }
}
