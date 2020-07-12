using DesafioSquadra.Models;
using Microsoft.EntityFrameworkCore;

namespace DesafioSquadra.Data
{
    public class DesafioSquadraContext : DbContext
    {
        public DesafioSquadraContext (DbContextOptions<DesafioSquadraContext> options)
            : base(options)
        {
        }

        public DbSet<Sistema> Sistema { get; set; }
    }
}
