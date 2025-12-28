// js/dashboard.js
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

document.addEventListener("DOMContentLoaded", () => {
    atualizarKPIs();
    renderizarGraficos();
    renderizarSelectEscola();
});

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

function atualizarKPIs() {
    document.getElementById("totalAlunos").innerText = `Total: ${alunos.length} Alunos`;
    
    const avaliados = alunos.filter(a => a.avaliacoes);
    const media = avaliados.length > 0 
        ? (avaliados.reduce((acc, a) => acc + (a.avaliacoes.comunicacao + a.avaliacoes.proatividade + a.avaliacoes.trabalhoEquipe)/3, 0) / avaliados.length).toFixed(1)
        : 0;

    document.getElementById("comHabilidades").innerText = `Média da Turma: ${media} / 5.0`;
}

function renderizarGraficos() {
    // Gráfico de Áreas
    const areas = {};
    alunos.forEach(a => areas[a.area] = (areas[a.area] || 0) + 1);

    new Chart(document.getElementById("graficoAreas"), {
        type: "bar",
        data: {
            labels: Object.keys(areas),
            datasets: [{ label: "Alunos por área", data: Object.values(areas), backgroundColor: "#6366f1" }]
        }
    });

    // Gráfico de Radar da Turma
    const soma = { c:0, p:0, e:0 };
    const count = alunos.filter(a => a.avaliacoes).length;
    
    alunos.forEach(a => {
        if(a.avaliacoes) {
            soma.c += a.avaliacoes.comunicacao;
            soma.p += a.avaliacoes.proatividade;
            soma.e += a.avaliacoes.trabalhoEquipe;
        }
    });

    new Chart(document.getElementById("graficoHabilidades"), {
        type: "radar",
        data: {
            labels: ["Comunicação", "Proatividade", "Equipe"],
            datasets: [{
                label: "Média Comportamental",
                data: count > 0 ? [soma.c/count, soma.p/count, soma.e/count] : [0,0,0],
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                borderColor: "#6366f1"
            }]
        },
        options: { scales: { r: { min: 0, max: 5 } } }
    });
}

function renderizarSelectEscola() {
    const select = document.getElementById("selectAlunoEscola");
    if (!select) return;

    // Limpa as opções atuais (mantendo apenas a primeira)
    select.innerHTML = '<option value="">Escolha um aluno...</option>';

    // Ordena os alunos por nome para facilitar a busca
    const alunosOrdenados = [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));

    alunosOrdenados.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.cpf; // Usamos o CPF como identificador único
        
        // Se já foi avaliado, colocamos um check pra facilitar a visão
        const status = aluno.avaliacoes && aluno.avaliacoes.comunicacao > 0 ? "✅" : "⏳";
        option.textContent = `${status} ${aluno.nome}`;
        
        select.appendChild(option);
    });
}

function irParaAvaliacao() {
    const select = document.getElementById("selectAlunoEscola");
    const cpfSelecionado = select.value;

    if (!cpfSelecionado) {
        alert("Por favor, selecione um aluno primeiro.");
        return;
    }

    // Encontra o aluno completo pelo CPF
    const aluno = alunos.find(a => a.cpf === cpfSelecionado);
    
    // Salva no alunoSelecionado para a próxima página ler
    localStorage.setItem("alunoSelecionado", JSON.stringify(aluno));
    window.location.href = "aluno-detalhe.html";
}

// Chame a função de preencher o select no DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // ... seus códigos de gráficos ...
    renderizarSelectEscola();
});