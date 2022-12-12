using System;
using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Context
{
	public class AppDbContext : DbContext
	{
        public DbSet<Aluno> Alunos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=localhost;Database=AlunosApi;Integrated Security=false;User ID=SA;Password=Db22Sa_%;TrustServerCertificate=true");
        }

        //Incluir dados na tabela alunos se tabela estiver vazia:

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = 1,
                    Nome = "Maria da Penha",
                    Email = "mariadapenha@mail.pt",
                    Idade = 23
                },
                new Aluno
                {
                    Id = 2,
                    Nome = "Manuel Bueno",
                    Email = "manuelbueno@mail.pt",
                    Idade = 22
                }

                );
        }
    }
}

