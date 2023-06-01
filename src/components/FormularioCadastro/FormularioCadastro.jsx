import React from "react";
import DadosPessoais from "./DadosPessoais";
import DadosUsuario from "./DadosUsuario";

function FormularioCadastro({onSubmit, validarCPF}) {
    return (
        <>
            <DadosPessoais onSubmit={onSubmit} validarCPF={validarCPF}/>
            <DadosUsuario/>
        </>
    )
}

export default FormularioCadastro;