const inputCpf = document.querySelector('#cpf');
const btnLogin = document.querySelector('#btn-login');
const mensagemInvalido = document.querySelector('.input-invalido');

function validaCPF (cpf){
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

inputCpf.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9.-]/g, '');
})
    

inputCpf.addEventListener('keypress', ()=>{
    let tamanho = inputCpf.value.length;

    if(tamanho === 3  || tamanho === 7){
        inputCpf.value += '.';
    }

    if(tamanho === 11){
        inputCpf.value += '-';
    }
})


btnLogin.addEventListener('click', ()=>{
    const cpf = inputCpf.value
    if (validaCPF(cpf)) {
        mensagemInvalido.classList.add('input-hidden');
        console.log("CPF válido");
    } else {
        mensagemInvalido.classList.remove('input-hidden');
    }
})
