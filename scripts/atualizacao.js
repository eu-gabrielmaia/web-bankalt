const inputNome = document.querySelector('#nome');
const inputCpf = document.querySelector('#cpf');
const inputUsername = document.querySelector('#username');
const inputSenha = document.querySelector('#senha');
const inputCorPrincipal = document.querySelector('#corPrincipal');
const inputCorSegundaria = document.querySelector('#corSegundaria');
const inputCorTerciaria = document.querySelector('#corTerciaria');
const btnAtualizar = document.querySelector('#btn-atualizar');
const mensagemInvalido = document.querySelector('.input-invalido');
const mensagemNomeInvalido = document.querySelector('.nome-invalido');
const mensagemUsernameInvalido = document.querySelector('.username-invalido');
const mensagemSenhaInvalida = document.querySelector('.senha-invalida');
const mensagemCorInvalida = document.querySelector('.cor-invalida');
const seletorCorPrincipal = document.querySelector('#seletor-principal');
const seletorCorSegundaria = document.querySelector('#seletor-segundaria');
const seletorCorTerciaria = document.querySelector('#seletor-terciaria');

const nomeAtual = `${localStorage.getItem('usuario')}`;
const usernameAtual = `${localStorage.getItem('username')}`;
const cpfAtual = `${localStorage.getItem('cpf')}`;
const corPrincipalAtual = `${localStorage.getItem('corPrincipal')}`;
const corSegundariaAtual = `${localStorage.getItem('corSegundaria')}`;
const corTerciariaAtual = `${localStorage.getItem('corTerciaria')}`;

const urlBase = 'http://localhost:8080/apiCliente'

inputNome.value = nomeAtual;
inputUsername.value = usernameAtual;
inputCorPrincipal.value = corPrincipalAtual;
inputCorPrincipal.style.color = corPrincipalAtual;
inputCorSegundaria.value = corSegundariaAtual;
inputCorSegundaria.style.color = corSegundariaAtual;
inputCorTerciaria.value = corTerciariaAtual;
inputCorTerciaria.style.color = corTerciariaAtual;

seletorCorPrincipal.value = corPrincipalAtual;
seletorCorSegundaria.value = corSegundariaAtual;
seletorCorTerciaria.value = corTerciariaAtual;

seletorCorPrincipal.addEventListener('change', () => {
    inputCorPrincipal.style.color = seletorCorPrincipal.value;
    inputCorPrincipal.value = seletorCorPrincipal.value
})

seletorCorSegundaria.addEventListener('change', () => {
    inputCorSegundaria.style.color = seletorCorSegundaria.value;
    inputCorSegundaria.value = seletorCorSegundaria.value
})

seletorCorTerciaria.addEventListener('change', () => {
    inputCorTerciaria.style.color = seletorCorTerciaria.value;
    inputCorTerciaria.value = seletorCorTerciaria.value
})

inputCorPrincipal.addEventListener('keypress', () => {
    inputCorPrincipal.style.color = inputCorPrincipal.value;
    seletorCorPrincipal.value = inputCorPrincipal.value
})

inputCorSegundaria.addEventListener('keypress', () => {
    inputCorSegundaria.style.color = inputCorSegundaria.value;
})

inputCorTerciaria.addEventListener('keypress', () => {
    inputCorTerciaria.style.color = inputCorTerciaria.value;
})

function validaInput(input, mensagemInvalida) {
    if (!input) {
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
    localStorage.setItem('usuario', inputNome.value);
    localStorage.setItem('username', inputUsername.value);
    localStorage.setItem('corPrincipal', inputCorPrincipal.value);
    localStorage.setItem('corSegundaria', inputCorSegundaria.value);
    localStorage.setItem('corTerciaria', inputCorTerciaria.value);

    await fetch(`${urlBase}/atualizar`, {
        method: 'PUT',
        body: JSON.stringify({
            idCliente: await buscaClienteAPI(cpfAtual),
            login: inputUsername.value,
            cpf: cpfAtual,
            senha: inputSenha.value,
            nome: inputNome.value,
            corPrincipal: inputCorPrincipal.value,
            corSegundaria: inputCorSegundaria.value,
            corTerciaria: inputCorTerciaria.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

}

btnAtualizar.addEventListener('click', () => {
    const nome = inputNome.value;
    const username = inputUsername.value;
    const senha = inputSenha.value;
    if (validaInput(nome, mensagemNomeInvalido) && validaInput(username, mensagemUsernameInvalido) && validaInput(senha, mensagemSenhaInvalida) && validaInput(inputCorPrincipal, mensagemCorInvalida) && validaInput(inputCorSegundaria, mensagemCorInvalida) && validaInput(inputCorTerciaria, mensagemCorInvalida)) {
        atualizaClienteAPI();
        alert('Alteração concluída!');
        location.replace("mobile.html", "_blank");
    }
    else {
        validaInput(nome, mensagemNomeInvalido);
        validaInput(username, mensagemUsernameInvalido);
        validaInput(senha, mensagemSenhaInvalida);
        validaInput(inputCorPrincipal, mensagemCorInvalida);
        validaInput(inputCorSegundaria, mensagemCorInvalida);
        validaInput(inputCorTerciaria, mensagemCorInvalida);
        alert('Alteração com erro!');
    }
})
