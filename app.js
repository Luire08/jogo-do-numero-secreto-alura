let listaDeNumeros = [];
let limiteNumeros = 10;
let numeroSecreto = gerarNumeroSecreto();
let tentativa = 1;
let chute;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

exibirTextoInicial();
let input = document.querySelector('input');
input.focus();

function exibirTextoInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número de 1 a 10');
}

function verificarChute() {
    chute = document.querySelector('input').value;
    let palavraTentiva = tentativa > 1 ? 'tentativas' : 'tentativa';
    if(chute == numeroSecreto) {
        exibirTexto('h1', 'Você acertou');
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavraTentiva}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.querySelector('input').setAttribute('disabled', true);
    } else {
        if(chute > numeroSecreto) {
            exibirTexto('p', 'O numero secreto é menor');
        } else {
            exibirTexto('p', 'O número secreto é maior');
        }
        tentativa++;
        input.focus();
        limparCampo();
    }
}

function gerarNumeroSecreto() {
    let numeroGerado = parseInt(Math.random() * limiteNumeros) + 1;
    let quantidadeDeElementosNaLista = listaDeNumeros.length;
    if(quantidadeDeElementosNaLista == limiteNumeros) {
        listaDeNumeros = [];
    }
    if(listaDeNumeros.includes(numeroGerado)) {
        return gerarNumeroSecreto();
    } else {   
        listaDeNumeros.push(numeroGerado);
        console.log(listaDeNumeros);
        return numeroGerado;
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.querySelector('input').removeAttribute('disabled');
    input = document.querySelector('input');
    input.focus();
    tentativa = 1;
    limparCampo();
    exibirTextoInicial();
}