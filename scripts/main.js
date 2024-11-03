const btnMobileLista = document.querySelector('.btnMenu');
const iconMobileLista = document.querySelector('.btnMenu img');
const navMobileLista = document.querySelector('.drop-down-mobile');
const menuNavMobile = document.querySelector('.nav-lista-mobile');
const checkboxBurger = document.querySelector("#burger");

btnMobileLista.addEventListener('click', ()=> {
    if(navMobileLista.classList.contains('btnMenu-hidden')){
        iconMobileLista.style.transform = "rotate(0deg)";
    }
    else{
        iconMobileLista.style.transform = "rotate(180deg)";
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
