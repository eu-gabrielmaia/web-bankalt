const inputNome = document.querySelector('#nome');
const inputCpf = document.querySelector('#cpf');
const inputUsername = document.querySelector('#username');
const inputSenha = document.querySelector('#senha');
const btnAtualizar = document.querySelector('#btn-atualizar')

const nomeAtual = `${localStorage.getItem('usuario')}`;
const usernameAtual = `${localStorage.getItem('username')}`;
const cpfAtual = `${localStorage.getItem('cpf')}`;

const urlBase = 'http://localhost:8080/apiCliente'

inputNome.value = nomeAtual;
inputUsername.value = usernameAtual;

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
    atualizaClienteAPI()
    alert('Alteração concluída!')
})
