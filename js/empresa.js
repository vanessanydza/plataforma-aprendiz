const lista = document.getElementById("listaAlunos");
const filtroArea = document.getElementById("filtroArea");

(function verificarSeguranca() {
    const perfilLogado = localStorage.getItem("usuarioLogado");
    const paginaAtual = window.location.pathname;

    // Se não houver ninguém logado, volta para o login
    if (!perfilLogado) {
        window.location.href = "login.html";
        return;
    }

    // Bloqueia a edição de notas se não for escola
    if (paginaAtual.includes("aluno-detalhe.html") && perfilLogado !== "escola") {
        // Oculta a área de avaliação via CSS caso o usuário tente "forçar"
        document.addEventListener("DOMContentLoaded", () => {
            const areaEscola = document.getElementById("areaExclusivaEscola");
            if (areaEscola) areaEscola.remove(); // Remove o elemento do DOM por segurança
        });
    }
})();

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderizarAlunos(alunos) {
  lista.innerHTML = "";

  if (alunos.length === 0) {
    lista.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  alunos.forEach(aluno => {
    const item = document.createElement("div");
    item.classList.add("item-aluno"); // ESSENCIAL PARA HOVER

    item.innerHTML = `
      <strong>${aluno.nome}</strong>
      <span>Área: ${aluno.area}</span>
    `;

    item.addEventListener("click", () => {
      localStorage.setItem("alunoSelecionado", JSON.stringify(aluno));
      window.location.href = "aluno-detalhe.html";
    });

    lista.appendChild(item);
  });
}

function filtrar() {
  const areaDigitada = normalizarTexto(filtroArea.value);
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  const filtrados = alunos.filter(aluno =>
    normalizarTexto(aluno.area).includes(areaDigitada)
  );

  renderizarAlunos(filtrados);
}

filtroArea.addEventListener("input", filtrar);

document.addEventListener("DOMContentLoaded", () => {
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  renderizarAlunos(alunos);
});
