using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DesafioSquadra.Models
{
    public class Sistema
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        [Display(Name = "Descrição")]
        public string Descricao { get; set; }
        [Required]
        [StringLength(10)]
        public string Sigla { get; set; }
        [StringLength(100, ErrorMessage = "E-mail inválido.")]
        [Display(Name = "E-mail de atendimento do sistema")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [StringLength(50, ErrorMessage = "URL inválida.")]
        [Display(Name = "URL")]
        [DataType(DataType.Url)]
        public string Url { get; set; }
        [Required]
        [StringLength(50)]
        [DefaultValue("ATIVO")]
        public string Status { get; set; } = "ATIVO";
        public DateTime DataUltimaAlteracao { get; set; }
        [StringLength(500)]
        public string JustificativaUltimaAlteracao { get; set; }
    }
}
