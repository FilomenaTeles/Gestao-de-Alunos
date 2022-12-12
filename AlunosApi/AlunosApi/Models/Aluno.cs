using System;
using System.ComponentModel.DataAnnotations;

namespace AlunosApi.Models
{
	public class Aluno
	{
		public int Id { get; set; }

		[Required]
		[StringLength(80, ErrorMessage = "Mensagem de erro")]
		public string Nome { get; set; } = null!;

        [Required]
		[EmailAddress]		//VERIFICA O FORMATO DO EMAIL
        [StringLength(100)]
        public string Email { get; set; } = null!;

        [Required]
		public int Idade { get; set; } 
    }
}

