const nomeUsuario = document.querySelector('.code-descricao-usuario');
const usaername = document.querySelector('.box-code-usuario');

nomeUsuario.textContent = `${localStorage.getItem('usuario')}`
usaername.textContent = `${localStorage.getItem('username')}`
