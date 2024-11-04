const nomeUsuario = document.querySelector('.code-descricao-usuario');

nomeUsuario.textContent = `${localStorage.getItem('usuario')}`
