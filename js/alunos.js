// js/alunos.js

document.getElementById("formAluno").addEventListener("submit", function (e) {
  e.preventDefault();

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

  // 1. Captura dos valores dos campos
  const habilidadesInput = document.getElementById("habilidades").value;
  const idiomasInput = document.getElementById("idiomas").value;
  const areaInput = document.getElementById("area").value.trim();

  // 2. Padronização da Área (Garante que "marketing" vire "Marketing")
  // Isso evita que o gráfico crie duas barras para a mesma área
  const areaFormatada = areaInput.charAt(0).toUpperCase() + areaInput.slice(1);

  // 3. Criação do Objeto Aluno completo
  const aluno = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    cpf: document.getElementById("cpf").value.replace(/\D/g, ""), // Remove pontos e traços
    endereco: document.getElementById("endereco").value,
    email: document.getElementById("email").value,
    curso_periodo: document.getElementById("curso_periodo").value,
    area: areaFormatada,
    
    // Tratamento de campos opcionais
    idiomas: idiomasInput.trim() || "Não informado",
    
    habilidades: habilidadesInput.trim()
      ? habilidadesInput.split(",").map(h => h.trim())
      : [],

    // NOVO: Estrutura inicial para a avaliação pedagógica da escola
    // Começa com 0 para indicar que ainda não foi avaliado
    avaliacoes: {
      comunicacao: 0,
      proatividade: 0,
      trabalhoEquipe: 0,
      organizacao: 0
    }
  };

  // 4. Persistência no LocalStorage
  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  alunos.push(aluno);
  localStorage.setItem("alunos", JSON.stringify(alunos));

  // 5. Feedback e Limpeza
  alert("Aluno cadastrado com sucesso! A escola já pode realizar a avaliação pedagógica.");
  this.reset();
});

// Máscara de CPF (Mantida conforme seu código original)
const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", () => {
  let value = cpfInput.value.replace(/\D/g, "");
  value = value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = value;
});

const inputCelular = document.getElementById('celular');

inputCelular.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});