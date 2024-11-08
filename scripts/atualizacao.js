const inputNome = document.querySelector('#nome');
const inputCpf = document.querySelector('#cpf');
const inputUsername = document.querySelector('#username');
const inputSenha = document.querySelector('#senha');
const btnAtualizar = document.querySelector('#btn-atualizar')
const mensagemInvalido = document.querySelector('.input-invalido');
const mensagemNomeInvalido = document.querySelector('.nome-invalido');
const mensagemUsernameInvalido = document.querySelector('.username-invalido');
const mensagemSenhaInvalida = document.querySelector('.senha-invalida');

const nomeAtual = `${localStorage.getItem('usuario')}`;
const usernameAtual = `${localStorage.getItem('username')}`;
const cpfAtual = `${localStorage.getItem('cpf')}`;

const urlBase = 'http://localhost:8080/apiCliente'

inputNome.value = nomeAtual;
inputUsername.value = usernameAtual;

function validaInput(input, mensagemInvalida) {
    if(!input){
        mensagemInvalida.classList.remove('input-hidden');
        
        return false;
    }
    mensagemInvalida.classList.add('input-hidden');
    return true;
}

async function buscaClienteAPI(cpfCliente) {
    const idCliente = await fetch(`${urlBase}/buscar/cpf/${cpfCliente}`, { method: 'GET' })
        .then((response) =>
            response.json()
        ).then((dados) => {
            return dados.idCliente;
        })
        .catch(error => {
            console.log('Fetch Error:', error);
        });
        return idCliente;
}

async function atualizaClienteAPI() {
    localStorage.setItem('usuario', inputNome.value)
    localStorage.setItem('username', inputUsername.value)

    await fetch(`${urlBase}/atualizar`, {
        method: 'PUT',
        body: JSON.stringify({
            idCliente: await buscaClienteAPI(cpfAtual),
            login: inputUsername.value,
            cpf: cpfAtual,
            senha: inputSenha.value,
            nome: inputNome.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    
}

btnAtualizar.addEventListener('click', ()=>{
    const nome = inputNome.value;
    const username = inputUsername.value;
    const senha = inputSenha.value;
    if(validaInput(nome, mensagemNomeInvalido) && validaInput(username, mensagemUsernameInvalido)&&validaInput(senha, mensagemSenhaInvalida)){
        atualizaClienteAPI()
        alert('Alteração concluída!')
        location.replace("mobile.html", "_blank");
    }
    else{
        validaInput(nome, mensagemNomeInvalido)
        validaInput(username, mensagemUsernameInvalido)
        validaInput(senha, mensagemSenhaInvalida)
        alert('Alteração com erro!')
    }
})
