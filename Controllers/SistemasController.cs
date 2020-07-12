using DesafioSquadra.Data;
using DesafioSquadra.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioSquadra.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SistemasController : ControllerBase
    {
        private readonly DesafioSquadraContext _context;

        public SistemasController(DesafioSquadraContext context)
        {
            _context = context;
        }

        // GET: api/Sistemas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sistema>>> GetSistema()
        {
            return await _context.Sistema.ToListAsync();
        }

        // GET: api/Sistemas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sistema>> GetSistema(int id)
        {
            var sistema = await _context.Sistema.FindAsync(id);

            if (sistema == null)
            {
                return NotFound();
            }

            return sistema;
        }

        [HttpGet("pesquisar")]

        public async Task<ActionResult<List<Sistema>>> GetSistema(string descricao, string sigla, string email)
        {
            var sistema = await _context.Sistema.Where(x => x.Descricao == descricao || x.Sigla == sigla || x.Email == email).ToListAsync();

            if (sistema == null)
            {
                return NotFound();
            }

            return sistema;
        }

        // PUT: api/Sistemas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSistema(int id, Sistema sistema)
        {
            if (id != sistema.Id)
            {
                return BadRequest();
            }

            _context.Entry(sistema).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SistemaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sistemas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostSistema([FromForm] Sistema sistema)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sistema.Add(sistema);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSistema", new { id = sistema.Id }, sistema);
        }

        // DELETE: api/Sistemas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sistema>> DeleteSistema(int id)
        {
            var sistema = await _context.Sistema.FindAsync(id);
            if (sistema == null)
            {
                return NotFound();
            }

            _context.Sistema.Remove(sistema);
            await _context.SaveChangesAsync();

            return sistema;
        }

        private bool SistemaExists(int id)
        {
            return _context.Sistema.Any(e => e.Id == id);
        }
    }
}
