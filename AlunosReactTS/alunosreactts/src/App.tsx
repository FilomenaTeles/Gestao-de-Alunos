import React, { useEffect, useState, ChangeEvent } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';

import logoCadastro from './assets/cadastro.png'

function App() {
  const baseUrl='https://localhost:7253/api/Alunos';

  const [data, setData]= useState([]);

  const [alunoSelecionado,setAlunoSelecionado]= useState({
    id:'',
    nome:'',
    email:'',
    idade:0
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,[name]:value
    });
    console.log(alunoSelecionado);
  }
  const selecionarAluno =(aluno: any, opcao:string)=>{
    setAlunoSelecionado(aluno);
    (opcao=='Editar')? abrirFecharModalEditar() : abrirFecharModalExcluir();
  
  }
  //estado para controlar o modal
  const [modalIncluir, setModalIncluir]=useState(false);

  //metodo para alternar estados do modal
  const abrirFecharModalIncluir=() =>{
    setModalIncluir(!modalIncluir);
  }

   //estado para controlar o modal
   const [modalEditar, setModalEditar]=useState(false);

  //metodo para alternar estados do modal
  const abrirFecharModalEditar=() =>{
    setModalEditar(!modalEditar);
  }

   //estado para controlar o modal
   const [modalExcluir, setModalExcluir]=useState(false);

   //metodo para alternar estados do modal
   const abrirFecharModalExcluir=() =>{
     setModalExcluir(!modalExcluir);
   }

   const [updateData, setUpdatedata]= useState(true);

  useEffect(()=>{
    if(updateData)
    {
      requestGet();
      setUpdatedata(false);
    } 
  }, [updateData])

  const requestGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error =>{
      console.log(error);
    })
  }

  const requestPost = async()=>{
    delete alunoSelecionado.id;
   

    await axios.post(baseUrl, alunoSelecionado)
    .then(response => {
      setData(data.concat(response.data));
      setUpdatedata(true);
      abrirFecharModalIncluir();
     
    }).catch(error =>{
      console.log(error);
    })
  }

  const requestPut = async()=>{
   
    await axios.put(baseUrl + "/"+alunoSelecionado.id, alunoSelecionado)
    .then(response => {
      var resposta = response.data;
      var dadosAuxiliar = data;

      dadosAuxiliar.map((aluno: {id:string; nome:string;email:string;idade:number}) => {
        if(aluno.id === alunoSelecionado.id){
          aluno.nome = resposta.nome;
          aluno.email= resposta.email;
          aluno.idade= resposta.idade;
        }
      });
      setUpdatedata(true);
      abrirFecharModalEditar();

    }).catch(error =>{
      console.log(error);
    })
  }

  const requestDelete = async()=>{

    await axios.delete(baseUrl + "/"+alunoSelecionado.id)
    .then(response => {
      setData(data.filter((aluno:any) => aluno.id !== response.data));
      setUpdatedata(true);
      abrirFecharModalExcluir();

    }).catch(error =>{
      console.log(error);
    })
  }



  return (
    <div className="App container">
      <br/>
    <h3>Inscrição de Alunos</h3>
      <header className='text-start pb-3'>
       <img id='cadastro' src={logoCadastro} alt='Inscrição'/>
       <button id='btn-insert' className='btn btn-success ms-3' onClick={()=>abrirFecharModalIncluir()}>Novo Aluno</button>
      </header>
    
      <table className='table table-bordered'>
  <thead>
    <tr>
      <th>Id</th>
      <th scope="col">Nome</th>
      <th scope="col">Email</th>
      <th scope="col">Idade</th>
      <th scope="col">Ação</th>
    </tr>
  </thead>
  <tbody>
    {data.map((aluno: {id:number; nome:string; email:string; idade:number}) =>(
      <tr key={aluno.id}>
        <td>{aluno.id}</td>
        <td>{aluno.nome}</td>
        <td>{aluno.email}</td>
        <td>{aluno.idade}</td>
        <td>
          <button id='btn-edit' className='btn btn-primary' onClick={()=>selecionarAluno(aluno,'Editar')}>Editar</button> {"  "}
          <button id='btn-delete' className='btn btn-danger' onClick={()=>selecionarAluno(aluno,'Excluir')}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


<Modal isOpen={modalIncluir}>
  <ModalHeader>Novo Aluno</ModalHeader>
  <ModalBody>
    <div className='form-group'>
    <label>Nome:</label>
    <br/>
    <input type="text" className='form-control' name='nome' onChange={handleChange}/>
    <label>Email:</label>
    <br/>
    <input type="email" className='form-control'  name='email' onChange={handleChange}/>
    <label>Idade:</label>
    <br/>
    <input type="number" className='form-control'  name='idade' onChange={handleChange}/>

    </div>
  </ModalBody>
  <ModalFooter>
    <button id='btn-add' className='btn btn-primary ' onClick={()=>requestPost()}>Adicionar</button> {"  "}
    <button id='btn-cancel' className='btn btn-danger' onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>    
  </ModalFooter>
</Modal>

<Modal isOpen={modalEditar}>
  <ModalHeader>Editar Aluno</ModalHeader>
  <ModalBody>
    <div className='form-group'>
    <label>ID:</label>
    <input readOnly className='form-control' value={alunoSelecionado && alunoSelecionado.id} />
    <br/>
    <label>Nome:</label>
    <br/>
    <input type="text" className='form-control' name='nome' onChange={handleChange} value={alunoSelecionado && alunoSelecionado.nome}  />
    <label>Email:</label>
    <br/>
    <input type="email" className='form-control'  name='email' onChange={handleChange} value={alunoSelecionado && alunoSelecionado.email} />
    <label>Idade:</label>
    <br/>
    <input type="number" className='form-control'  name='idade' onChange={handleChange} value={alunoSelecionado && alunoSelecionado.idade} />

    </div>
  </ModalBody>
  <ModalFooter>
    <button id='btn-edit' className='btn btn-primary ' onClick={()=>requestPut()}>Editar</button> {"  "}
    <button id='btn-cancel' className='btn btn-danger' onClick={()=>abrirFecharModalEditar()}>Cancelar</button>    
  </ModalFooter>
</Modal>

<Modal isOpen={modalExcluir}>
  <ModalBody>
    Esta ação vai eliminar o aluno(a): {alunoSelecionado && alunoSelecionado.nome}. Deseja continuar?
  </ModalBody>
  <ModalFooter>
    <button className='btn btn-danger' onClick={()=>requestDelete()}>Eliminar</button>
    <button className='btn btn-secondary' onClick={()=>abrirFecharModalExcluir()}>Cancelar</button>
  </ModalFooter>
</Modal>

    </div>
  );
}

export default App;
