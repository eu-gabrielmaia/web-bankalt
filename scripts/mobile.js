const nomeUsuario = document.querySelector('.code-descricao-usuario');
const username = document.querySelector('.box-code-usuario');
const btnDeletar = document.querySelector('#deletar')
const btnAtualizar = document.querySelector('#atualizar')


const urlBase = 'http://localhost:8080/apiCliente'

const nomeAtual = `${localStorage.getItem('usuario')}`;
const usernameAtual = `${localStorage.getItem('username')}`;
const cpfAtual = `${localStorage.getItem('cpf')}`;

nomeUsuario.textContent = nomeAtual;
username.textContent = usernameAtual;

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

async function excluiClienteAPI(cpfCliente) {
    const idCliente = await buscaClienteAPI(cpfCliente)

        await fetch(`${urlBase}/excluir/id/${idCliente}`, { method: 'DELETE' })
          .then(response => console.log(response.status))
          .catch(error => console.error('Fetch Error:',error));
}

btnDeletar.addEventListener('click', ()=> {
    excluiClienteAPI(cpfAtual);
    localStorage.clear();
    alert('Usuario deletado com sucesso!');
    location.replace("login.html", "_blank");
})

btnAtualizar.addEventListener('click', ()=>{
    location.replace("atualizacao.html", "_blank");
})
