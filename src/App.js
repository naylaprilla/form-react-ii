import React from 'react';
import './App.css';
import FormularioCadastro from './components/FormularioCadastro/FormularioCadastro';
import 'fontsource-roboto';

import { Container, Typography } from '@mui/material';
import { validarCPF, validarSenha } from './models/cadastro';

function App() {
  return (
    <Container component="article" maxWidth="sm" >
      <Typography variant='h3' component="h1" align='center'>
        Formulário de Cadastro
      </Typography>
      <FormularioCadastro onSubmit={onSubmitForm} validacoes={{cpf:validarCPF, senha:validarSenha}}/>
    </Container>
  );
}

function onSubmitForm(dados){
  console.log(dados)
}

export default App;
