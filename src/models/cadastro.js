function validarCPF(cpf) {
    if(cpf.lenghth !== 11){
      return {valido:false, texto:"O CPF deve ter 11 dígitos."};
    } else {
      return {valido:true, texto:""}
    }
  }

function validarSenha(senha) {
    if(senha.lenghth < 4 || senha.lenghth > 72 ){
      return {valido:false, texto:"A senha deve ter entre 4 e 72 dígitos."};
    } else {
      return {valido:true, texto:""}
    }
  }

export {validarCPF, validarSenha}