const btnMobileLista = document.querySelector('.btnMenu');
const iconMobileLista = document.querySelector('.btnMenu img');
const navMobileLista = document.querySelector('.drop-down-mobile');
const menuNavMobile = document.querySelector('.nav-lista-mobile');
const checkboxBurger = document.querySelector("#burger");

const root = document.documentElement;

const corPrincipalAtual1 = localStorage.getItem('corPrincipal');
const corSegundariaAtual1 = localStorage.getItem('corSegundaria');
const corTerciariaAtual1 = localStorage.getItem('corTerciaria');

if (corPrincipalAtual1 !== 'null') {
    root.style.setProperty('--roxo', corPrincipalAtual1);
    root.style.setProperty('--azul', corSegundariaAtual1);
    root.style.setProperty('--verde', corTerciariaAtual1);
}

btnMobileLista.addEventListener('click', () => {
    if (navMobileLista.classList.contains('btnMenu-hidden')) {
        iconMobileLista.style.transform = "rotate(180deg)";
        navMobileLista.style.display = "none";
    }
    else {
        iconMobileLista.style.transform = "rotate(0deg)";
        navMobileLista.style.display = "block";
    }
    navMobileLista.classList.toggle('btnMenu-hidden');
})

checkboxBurger.addEventListener('change', () => {
    if (checkboxBurger.checked) {
        menuNavMobile.style.display = "block";
    } else {
        menuNavMobile.style.display = "none";
    }
})
