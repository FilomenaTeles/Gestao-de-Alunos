using System;
using AlunosApi.Models;

namespace AlunosApi.Services
{
	public interface IAlunoService
	{
		//Get alunos -> retorna tods os alunos:
		Task<IEnumerable<Aluno>> GetAlunos();

		//Get alunos id -> retorna 1 aluno:
		Task<Aluno> GetAluno(int id);

		Task<IEnumerable<Aluno>> GetAlunosByNome(string nome);

		//Criar novo aluno, não há nenhum retorno:
		Task CreateAluno(Aluno aluno);

        Task UpdateAluno(Aluno aluno);

        Task DeleteAluno(Aluno aluno);
    }
}

