const btnPlayDescricao = document.querySelector('.tocar-mensagem');
const btnPauseDescricao = document.querySelector('.pausar-mensagem');
const textoDescricao = document.querySelectorAll('.texto-descricao');
const synth = window.speechSynthesis;

btnPlayDescricao.addEventListener('click', () => {
    const utterance1 = new SpeechSynthesisUtterance(textoDescricao.item(0).textContent);
    const utterance2 = new SpeechSynthesisUtterance(textoDescricao.item(1).textContent);
    //utterance1.voice = window.speechSynthesis.getVoices()[1];
    synth.speak(utterance1);
    synth.speak(utterance2);
})

btnPauseDescricao.addEventListener('click', () => {
    synth.cancel();
})
