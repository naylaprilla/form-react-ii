import React from 'react';
import './App.css';
import FormularioCadastro from './components/FormularioCadastro/FormularioCadastro';
import 'fontsource-roboto';

import { Container, Typography } from '@mui/material';
import { validarCPF, validarSenha } from "./models/cadastro"
import ValidacoesCadastro from './contexts/ValidacoesCadastro';

function App() {
  return (
    <Container component="article" maxWidth="sm" >

      <Typography variant='h3' component="h1" align='center'>Formulário de Cadastro</Typography>
      
      <ValidacoesCadastro.Provider value={{ cpf: validarCPF, senha: validarSenha, nome: validarSenha }}>
        <FormularioCadastro onSubmit={onSubmitForm} />
      </ValidacoesCadastro.Provider>
  
    </Container>
  );
}

function onSubmitForm(dados){
  console.log(dados)
}

export default App;
