const inputCpf = document.querySelector('#cpf');
const inputSenha = document.querySelector('#senha');
const btnLogin = document.querySelector('#btn-login');
const mensagemInvalido = document.querySelector('.input-invalido');
const mensagemCpfInvalido = document.querySelector('.cpf-invalido');
const mensagemSenhaInvalida = document.querySelector('.senha-invalida');

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (casos inválidos como "111.111.111-11")
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Função para calcular o dígito verificador
    function calcularDigito(cpf, pesoInicial) {
        let soma = 0;
        for (let i = 0; i < cpf.length; i++) {
            soma += parseInt(cpf[i]) * (pesoInicial - i);
        }
        let resto = (soma * 10) % 11;
        return resto === 10 || resto === 11 ? 0 : resto;
    }

    // Calcula os dois dígitos verificadores
    const digito1 = calcularDigito(cpf.substring(0, 9), 10);
    const digito2 = calcularDigito(cpf.substring(0, 10), 11);

    // Verifica se os dois dígitos verificadores são corretos
    return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);

}

inputCpf.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9.-]/g, '');
})


inputCpf.addEventListener('keypress', () => {
    let tamanho = inputCpf.value.length;

    if (tamanho === 3 || tamanho === 7) {
        inputCpf.value += '.';
    }

    if (tamanho === 11) {
        inputCpf.value += '-';
    }
})


btnLogin.addEventListener('click', async () => {
    const cpf = inputCpf.value;
    const senha = inputSenha.value;
    const resposta = await getCodigoAPI(cpf);
    if (validaCPF(cpf) && senha) {
        try{
            if (resposta.cpf === cpf && resposta.senha === senha) {
                mensagemSenhaInvalida.classList.add('input-hidden');
                let resultado = confirm("Tudo certo por aqui! Quer ser direciado ao QR CODE?");
                if (resultado == true) {
                    location.replace("mobile.html", "_blank");
                }
                else {
                    alert("OK, processo cancelado!");
                }
            }
            if (resposta.senha != senha) {
                mensagemSenhaInvalida.classList.remove('input-hidden');
                mensagemSenhaInvalida.textContent = "Tente outra senha";
            }
        }
        catch(err){
            console.log(err);
        }
    }
    if (!validaCPF(cpf)) {
        mensagemCpfInvalido.classList.remove('input-hidden');
    }
    if (!senha) {
        mensagemSenhaInvalida.classList.remove('input-hidden');
    }
})

const url = 'http://localhost:8080/apiCliente';

async function getCodigoAPI(idCliente) {
    const resposta = await fetch(`${url}/buscar/cpf/${idCliente}`, { method: 'GET' })
        .then((response) =>
            response.json()
        ).then((dados) => {
            return dados;
        })
        .catch(error => {
            console.log('Fetch Error:', error);
        });
    return resposta;
}
