import { Button, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import ValidacoesCadastro from "../../contexts/ValidacoesCadastro";
import useErros from "../../hooks/useErros";

function DadosUsuario({onSubmit}) {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const validacoes = useContext(ValidacoesCadastro)
    const [erros, validarCampos] = useErros(validacoes);

    function possoEnviar() {
        for(let campo in erros) {
            if(!erros[campo].valido){
                return false
            }
        }
        return true
    }

    return (
        <form 
            onSubmit={(event)=>{
                event.preventDefault();
                if(possoEnviar()){
                    onSubmit({email, senha});
                }
            }}
        >
            <TextField
                value={email} 
                onChange={(event)=> {setEmail(event.target.value)}}
                    id="email" 
                    name="senha"
                    label="email" 
                    type="email"
                    required 
                    margin="normal" 
                    fullWidth
            />
            <TextField
                value={senha} 
                onChange={(event)=> {setSenha(event.target.value)}}
                onBlur={validarCampos}
                error={erros.senha.valido} 
                helperText={erros.senha.texto}
                    id="senha"
                    name="senha" 
                    label="senha" 
                    type="password"
                    required 
                    margin="normal" 
                    fullWidth
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
            >
                    Próximo
            </Button>
        </form>
    )
}

export default DadosUsuario;