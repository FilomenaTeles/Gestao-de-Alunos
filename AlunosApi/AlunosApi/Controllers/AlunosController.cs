using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlunosApi.Models;
using AlunosApi.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AlunosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private IAlunoService _alunoService;

        public AlunosController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunos()
        {
            try
            {
                var alunos = await _alunoService.GetAlunos();
                return Ok(alunos);
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter alunos");
              
           
            }
        }

        [HttpGet("AlunosPorNome")]
        public async Task<ActionResult<IAsyncEnumerable<Aluno>>> GetAlunosByName([FromQuery] string nome)
        {
            try
            {
                var alunos = await _alunoService.GetAlunosByNome(nome);
                if (alunos == null)
                    return NotFound($"Não existem alunos com o critério {nome}");
                return Ok(alunos);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        // GET api/values/5
        [HttpGet("{id:int}", Name ="GetAluno")]
        public async Task<ActionResult<Aluno>> GetAluno(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAluno(id);
                if (aluno == null)
                    return NotFound($"Não existe aluno com o id= {id}");
                return Ok(aluno);
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult> Create(Aluno aluno)
        {
            try
            {
                 await _alunoService.CreateAluno(aluno);
                return CreatedAtRoute(nameof(GetAluno), new { id = aluno.Id}, aluno);    //este nameof é o nome do endpoint criado na linha 56
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        // PUT api/values/5
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id,[FromBody] Aluno aluno)
        {
            try
            {
                if(aluno.Id == id)
                {
                    await _alunoService.UpdateAluno(aluno);
                    return Ok($"Aluno com id={id} foi atualizado com sucesso");
                }
                else
                    return BadRequest("Dados inconsistentes");
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var aluno = await _alunoService.GetAluno(id);
                if(aluno != null)
                {
                    await _alunoService.DeleteAluno(aluno);
                    return Ok($"Aluno de id={id} eliminado com sucesso");
                }
                else
                {
                    return NotFound($"Aluno de id={id} não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }
    }
}

