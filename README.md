# Projeto de um Formulário usando React II

Iniciei o projeto clonando meu repositório form-react

Vamos transformar esse formulario, em um formulario de multiplas partes, ou, multiplatform.
Para isso, primeiro criamos os arquivos DadosPessoais.jsx e DadosUsuario.jsx na pasta FormularioCadastro

Recortamos tudo que está no arquivo FormularioCadastro.jsx e colamos no arquivo DadosPessoais.jsx, não esqueça de arrumar os imports e nome do componente de FormularioCadastro para DadosPessoais.

No arquivo FormularioCadastro.jsx fazemos os imports de React, DadosPessoais e DadosUsuario.

Em DadosUsuario.jsx Criamos os imports do React e Button, TextField  do "@mui/material";

Agora criamos o arquivo DadosEntrega.jsx, fazemos os imports, a função, adicionamos um formulario no return da função
Adicionamos os campos TextField e o botão.


## Renderização Condicional
Agora vamos separar essas partes do formulário usando Renderização Condicional usando switch case.

Mas não é possível chamar um switch case dentro do componente que estamos usando, porque o JSX não possui todas as funcionalidades do JavaScript, assim sendo, é necessário fazê-lo dentro de uma função.

Vamos criar uma função chamada formularioAtual(etapaAtual) dentro da função FormularioCadastro, antes do return dessa função, e dentro da função criamos o switch case. 

Depois, dentro do return de FormularioCadastro chamamos a função dentro de chaves:
    return ( <> { formularioAtual(etapaAtual) } </> )

### Outras formas de fazer essa condição seria, usando operadores ternários ou Ifs/Elses
Aqui seguem alguns exemplos interessantes:

Dessa forma, utilizamos uma função dentro do JSX para podermos executar essa função, para que isso aconteça, você deve se atentar a alguns pré-requisitos para que isso funcione:

A função deve ser executada de imediato (formularioAtual()), pois se você não executar a função, o React entende que você tá querendo renderizar uma variável e não o retorno dessa função, por isso, não funcionará.
A função deve retornar alguma coisa, normalmente se retorna uma string ou um outro JSX.
Caso esteja usando alguma variável que está no escopo do componente, a função deve estar dentro do próprio componente ou ser passada para a função via parâmetro.
Essa normalmente é usada quando precisa-se ter inúmeras condicionais para renderizar algo.

Outra forma bem conhecida de renderização condicional dentro do JSX é utilizando ternário! podemos fazer dessa forma:

function FormularioCadastro() {
  return (
    <>
      {condicao1 ? "caiu na condição 1" : "não caiu na condição"}
    </>
  )
}

Essa é a forma conhecida de se utilizar apenas uma condição, pois, imagine se precisássemos utilizar ternário para 3 condições por exemplo? Ficaria algo assim:

function FormularioCadastro() {
  return (
    <>
      {condicao1 ? "caiu na condição 1" : condicao2 ? "caiu na condição 2" : condicao3 ? "caiu na condição 3" : "não caiu em nenhuma condição"}
    </>
  )
}

Dessa forma será quase impossível de ler a condição, certo?

Outra forma de utilizar renderização condicional é antes do próprio return do componente! sabia dessa?

function FormularioCadastro() {
  if(condicao1) {
    return "caiu na condição 1"
  } else if(condicao2) {
    return "caiu na condição 2"
  } else if(condicao3) {
    return "caiu na condição 3"
  }

  return (
    <>
      "não caiu em nenhuma condição"
    </>
  )
}

Dessa forma, o retorno desses ifs é considerada o retorno do próprio componente! Logo, o código abaixo do retorno acionado será ignorado. Essa não é a forma mais bonita de se ter uma condicional, mas ela pode ser usada para loading ou erro por exemplo:

function Componente(erro, carregando) {
  if(erro) {
    return "Componente deu erro!"
  } else if(carregando) {
    return "Componente carregando..."
  }

  return "Componente funcionando!"
}

Dessa forma, o return de "Componente funcionando" só terá o código do componente quando ele não está carregando ou funcionando, então fica mais fácil de ler, porém não é muito utilizado/recomendado.

E se quisermos renderizar só se a minha condição for verdadeira? Com ternário fica assim:

function FormularioCadastro() {
  return (
    <>
      {condicao1 ? "Renderizou o que eu quero" : null}
    </>
  )
}

Dá para fazer dessa forma, mas tem uma forma muito mais limpa de escrever isso, que é com o operador AND (&&)

function FormularioCadastro() {
  return (
    <>
      {condicao1 && "Renderizou o que eu quero"}
    </>
  )
}

Dessa forma ele só mostrará caso a condição for verdadeira!

Beleza! Eu já sei executar dessas formas, mas eu quero ver algo novo, eu quero executar a função dentro do JSX! tem como?

E lá vai . . . . . . Tem sim!!! Utilizando um palavrão chamado Immediately Invoked Function Expression (ou IIFE), é raríssimo ver isso sendo usado, mas é possível!! Dessa forma você cria uma função que se executa imediatamente!!

A sintaxe dessa função é: (função a ser executada)(parâmetro que essa função receberá). Como a função estará dentro do componente, todo o escopo dele estará dentro dessa função, então, ficaria assim:

function FormularioCadastro() {
  return (
    <>
      {(() => {
          if(condicao1) {
            return "caiu na condição 1"
          }
          return "não caiu na condição"
      })()}
    </>
  )
}

Dessa forma dá pra usar qualquer tipo de JS dentro do JSX!! Mas como não é bonito, por que não utilizar funções, ternários ou operadores não é mesmo?

## Mudança das partes do formulário

Com uma variável podemos fazer essa troca partes do formulário se tornar mais dinâmica.
ex.:  const [etapaAtual, setEtapaAtual] = useState(0)
Criamos a função proximo, com setEtapaAtual(etapaAtual + 1)
E então na função formularioAtual, dentro do componente do return teremos:
    <DadosUsuario onSubmit={proximo}/>
    e em: <DadosPessoais onSubmit={proximo} validarCPF={validarCPF}/> ao invés de: onSubmit={onSubmit}
    em: <DadosPessoais onSubmit={onSubmit} />


##  Injeção de Dependências

Passamos ({onSubmit}) como parametro da função DadosUsuario e na tag form 
        <form onSubmit={(event)=>{
            event.preventDefault();
            onSubmit();
        }}>

Colocamos required nos campos obrigatórios/requeridos.

## Refatorando de um switch case para um array

Com o intuito de deixar o codigo mais legível apagamos essa parte do código:

    function formularioAtual(etapa) {
        switch (etapa) {
            case 0: 
                return <DadosUsuario  onSubmit={proximo} />;
            case 1:
                return <DadosPessoais onSubmit={proximo} validarCPF={validarCPF} />;
            case 2:
                return <DadosEntrega onSubmit={onSubmit} />;
            default:
                return <Typography>Erro ao selecionar formulário</Typography>
        }
    }

E substituimos por essa:

    const formulario = [
        <DadosUsuario  onSubmit={proximo} />,
        <DadosPessoais onSubmit={proximo} validarCPF={validarCPF} />,
        <DadosEntrega onSubmit={onSubmit} />
    ]

Geralmente, quando temos um caso que é necessário usar o switch case, podemos substituir por uma estrutura de array ou de objeto literal
    estrutura de array -  
        const algumaCoisa = [ coisas aqui dentro]
    estrurura de objeto literal - 
        {
            chave: valor,
        }

Dessa maneira, a gente pode vir aqui, fizemos essa refatoração, vamos aproveitar e excluir esses dois comentários no final, e outra coisa que ajuda a gente é que não tenho mais aquela função grande declarada no meio do meu componente. A única função que tenho no meio do meu componente é uma função que vai mudar o estado daquele componente e que quero passar como propriedade para outros objetos filhos dele.

Aquele problema de acesso ao escopo que a gente tinha ele não tem mais, porque estou usando a própria variável que declarei dentro do componente, então ele está no mesmo escopo que minha variável de etapa atual e não tenho mais o problema de acesso, nosso código fica mais limpo, mais fácil de ler, e fácil de dar manutenção.

Agora criamos o useState do formulario DadosUsuario e para DadosEntrega, adicionamos também um value e o onChange para os campos email e senha. E para o form o onSubmit, event,arrow function, preventDefault e a função onSubmit com o objeto desconstruido chamado cada um dos useStates. Bem parecido com o anterior.

## Para receber os dados dos três formularios

Criamos: 
    const [dadosColetados, setDadosColetados] = useState({})//Objeto vazio
Além da função:
    function coletarDados(dados) {
        setDadosColetados({...dadosColetados, ...dados}) 
    }

    Três pontinhos chama spreadOperator: 
    A sintaxe spread ( ...) permite que um iterável, como uma matriz ou string, seja expandido em locais onde zero ou mais argumentos (para chamadas de função) ou elementos (para literais de matriz) são esperados. Em um literal de objeto, a sintaxe de propagação enumera as propriedades de um objeto e adiciona os pares chave-valor ao objeto que está sendo criado.

    A sintaxe de propagação se parece exatamente com a sintaxe de descanso. De certa forma, a sintaxe spread é o oposto da sintaxe rest. A sintaxe spread "expande" uma matriz em seus elementos, enquanto a sintaxe rest coleta vários elementos e os "condensa" em um único elemento.
    Fonte: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

    Agora vamos substituir onSubmit dos componentes de FormularioCadastro:

        const formularios = [
        <DadosUsuario  onSubmit={coletarDados} />,
        <DadosPessoais onSubmit={coletarDados} validarCPF={validarCPF} />,
        <DadosEntrega onSubmit={coletarDados} />
        ]

        function coletarDados(dados) {
        setDadosColetados({...dadosColetados, ...dados})
        console.log(dadosColetados)
        proximo()
    }

    Para terminar essa coleta de dados, e vê-la no console usamos também o useEffect(()=> { console.log(dadosColetados) })

Como a gente viu então, posso usar o use effect como ciclo de vida do nosso componente, do nosso formulário de cadastro. E o ciclo de vida é o componente did mount, ou seja, assim que ele montou, que ele foi pronto para renderizar ele vai ser disparado, componente did update, ou seja, quando estiver sendo atualizado, o estado desse object estiver sendo atualizado, ele também vai ser disparado, e o componente will unmount, ou seja, logo antes de ser destruído. Alguns ciclos de vida que a gente já tinha usado, nesse caso, com function componentes, eles agregaram tudo nesse único hook, que é o use effect.

    E para de fato enviar os dados vamos deixar o useEffect assim:
    useEffect(() => {
        if(etapaAtual === formularios.length-1) {
            onSubmit(dadosColetados)
        }
    })

    Adicionamos um componente Typography na const formularios. Assim criamos a página de finalização do formulario.
    Para adicionar a navegação entre as partes desse formulario na parte visual para essa pagina final, usamos componentes do MUI, o Stepper com activeStep={etapaAtual}, Step e StepLabel dentro do return da função proximo. 

## Regras de validação

Agora, tiramos as validações de App.js e criamos uma nova pasta chamada models, que vem de modelos de negócios ou regras.
 Dentro dela vamos criar o arquivo chamado cadastro.js, neste arquivo colamos a função validarCPF que estava em App.js
  Duplicamos a função validarCPF e trocamos o nome para validarSenha, além das outras informações que precisam ser trocadas de cpf para senha.
    Em App.js transformamos validarCPF em validacoes={{cpf:validarCPF, senha:validarSenha}}, assim é mais facil fazer outras validações se necessário.

    Em DadosPessoais.jsx vamos criar uma nova função no mesmo arquivo antes do return para ser usada no evento onBlur da validação 
    do CPF:
     function validarCampos(event) {
            const {name, value} = event.target //desestruturação de um objeto com nome e valor

            const ehValido = validacoes[name](value) 
            //aqui estamos pegando o objeto de validações, pegando o atributo que tem o nome que é o nosso target e passando o valor desse campo para a parte de validações.

            const novoEstado = {...erros, name:ehValido} //criamos um novo estado e colocamos um spreadoperator, porque pode ter vários erros.
            setErros(novoEstado)
    }

    No console, vimos que essa parte do codigo não estava reconhecendo o objeto nome então para corrigir isso,
    Trocamos: const novoEstado = {...erros, name:ehValido}
    Por:  const novoEstado = {...erros}
          novoEstado[name] = ehValido
    E então substituimos por:
          novoEstado[name] = validacoes[name](value)

    Sendo assim eliminamos completamente a variável ehValido
    *Não esqueça de colocar o atribudo name para cada um dos campos.

Vamos criar a função possoEnviar para utilizar nos formularios, DadosPessoais e DadosUsuario além de atribuí-la ao form dentro de um if.

Refatoramos em App.js: const [erros, setErros] = useState({cpf:{valido:true, texto:""}, nome:{valido:true, texto:""}})
Em DadosUsuario.jsx passamos para o campo senha essas validações:
                onBlur={validarCampos}
                error={!erros.nome.valido}
                helperText={erros.nome.texto}

É possível refatorar essas funções para reutiliza-las e diminuir essa duplicação de códigos.

    PERGUNTA: Da maneira que temos nosso componente FormularioCadastro até esse momento ele recebe algumas propriedades que ele não faz nada com elas, o único que ele faz é repassar essas propriedades para os componentes filhos dele.

    Essa maneira de trabalhar com propriedades é chamada de prop drilling e é considerada uma má prática. Reflita sobre o problema e assinale a alternativa que mostra o problema com essa abordagem.

    RESPOSTA: Essa é uma má prática porque vai contra o principio de DRY do SOLID, já que estamos repetindo esse padrão em diversos componentes. Esse acoplamento muito forte entre os componentes dificulta a reutilização deles.

## useContext

neste ponto, notamos que o objeto de validações caiu no mesmo problema anterior, ele apenas recebe propriedades para repassar para seus filhos e isso gera um complexidade a mais para o projeto, por isso precisamos apaga-lo da função FormularioCadastro({}), esse componente conhecer uma propriedade que ele mesmo não usa é uma má pratica para o projeto. E com isso aprendemos que não podemos passar a validações como ppropriedades para os formulários. 

Mas como vamos fazer essas validações?

Criando um contexto, quem estiver dentro dele vai usar, quem não estiver não vai usar. Vamos começar do mais simples. O que é um contexto dentro do que a gente fala do react? Contexto é uma forma da gente criar um grupo de dados, compor um grupo de dados, ou grupo de funções, funcionalidades, que quero transmitir para vários elementos da minha árvore de renderização. Vários componentes dentro do react. Esses componentes podem estar cinco ou seis níveis abaixo do meu elemento pai ou podem estar dentro do elemento pai, mas não importa, não quero que os elementos intermediários entre o pai e até onde a informação vai ser usada de fato tem que conhecer essa informação.

Mas como assim criar um contexto, quem estiver dentro dele vai usar, quem não estiver não vai usar? Vamos começar do mais simples. O que é um contexto dentro do que a gente fala do react? Contexto é uma forma da gente criar um grupo de dados, compor um grupo de dados, ou grupo de funções, funcionalidades, que quero transmitir para vários elementos da minha árvore de renderização. Vários componentes dentro do react. Esses componentes podem estar cinco ou seis níveis abaixo do meu elemento pai ou podem estar dentro do elemento pai, mas não importa, não quero que os elementos intermediários entre o pai e até onde a informação vai ser usada de fato tem que conhecer essa informação.

Criamos dentro da pasta src, uma pasta chamada contexts e dentro de contexts o arquivo validacoesCadastro.js
Então importamos o useContext no arquivo DadosPessoais.jsx e validacoesCadastro, além de importa-las.
São essas partes do código no arquivo DadosPessoais.jsx:
  import React, {useState, useContext} from "react";
  import validacoesCadastro from "../../contexts/validacoesCadastro";
  const validacoes = useContext(validacoesCadastro)

Depois fazemos o mesmo processo no DadosUsuario.jsx

Depois disso, no console temos o erro de que a validacoesCadastro não está definida. Isso está acontecendo porque precisamos criar um provedor com as definições dessas validações. Em App.js vamos adicionar <validacoesCadastro.provider>
Vai ficar assim no código:
          <ValidacoesCadastro.Provider value={{ cpf:validarCPF, senha:validarSenha, nome:validarSenha }}>       
              <FormularioCadastro onSubmit={onSubmitForm} />
          </ValidacoesCadastro.Provider> 

Agora vamos ver a mesma funcionalidade escrita de outra forma, sem o provider: 
   Depois de copiar essa parte { cpf:validarCPF, senha:validarSenha, nome:validarSenha } e colamos em ValidacoesCadastro.js
   Agora definimos o contexto direto no ValidacoesCadastro.js
    const ValidacoesCadastro = React.createContext(
    { cpf:semValidacao, senha:semValidacao, nome:semValidacao }
      );

    function semValidacao(dados) {
        console.log(dados);
        return {valido:true, texto:""};
    }

    *Nesse caso o contexto padrão é sem validações.
Resumido, com ou sem provider o contexto precisa estar definido.

## Hooks customizados

É possível criar um hook personalizado de acordo com a funcionalidade necessária.
Primeiro, criamos uma pasta hooks dentro da pasta src do projeto.
E dentro dessa pasta, criamos um arquivo que obrigatóriamente começa com o sufixo use
 Neste caso, useErros, porque queremos fazer a validação de erros.
 










        
    























 


















    








