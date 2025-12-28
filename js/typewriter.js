const texto = "Plataforma Aprendiz";
const elemento = document.getElementById("typewriter");

let index = 0;

let timer;

function escrever() {
  if (index < texto.length) {
    elemento.textContent += texto.charAt(index++);
    const delay = index < texto.length * 0.7 ? 50 : 120;
    setTimeout(escrever, delay);
  }
}

escrever();


