// js/aluno-detalhe.js

/**
 * 1. GUARDIÃO DE SEGURANÇA (Executa IMEDIATAMENTE)
 * Verifica se há um usuário logado antes de mostrar qualquer dado.
 */
(function verificarSeguranca() {
    const perfilLogado = localStorage.getItem("usuarioLogado");
    if (!perfilLogado) {
        window.location.href = "login.html";
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    // Captura de elementos e dados
    const aluno = JSON.parse(localStorage.getItem("alunoSelecionado"));
    const perfilLogado = localStorage.getItem("usuarioLogado");
    const deOndeVim = document.referrer; 
    
    const btnVoltar = document.getElementById("btnVoltarDinamico");
    const containerInfo = document.getElementById("detalheAluno");
    const areaAvaliacaoEscola = document.getElementById("areaExclusivaEscola");
    const canvasRadar = document.getElementById("graficoRadarIndividual");
    const msgAviso = document.getElementById("msgAvisoAvaliacao");

    if (!aluno) {
        if (containerInfo) containerInfo.innerHTML = "<p>Aluno não encontrado.</p>";
        return;
    }

    /**
     * 2. LÓGICA DO BOTÃO VOLTAR
     */
    if (perfilLogado === "escola") {
        btnVoltar.href = "escola.html";
        btnVoltar.innerText = "← Voltar para Gestão Escolar";
    } else {
        btnVoltar.href = "empresa.html";
        btnVoltar.innerText = "← Voltar para Lista de Talentos";
    }

    /**
     * 3. RENDERIZAÇÃO DOS DADOS DO PERFIL
     */
    containerInfo.innerHTML = `
        <div class="perfil-info">
            <p><strong>Nome:</strong> ${aluno.nome}</p>
            <p><strong>Idade:</strong> ${aluno.idade} anos</p>
            <p><strong>CPF:</strong> ${aluno.cpf}</p>
            <p><strong>E-mail:</strong> ${aluno.email}</p>
            <p><strong>Área de Interesse:</strong> ${aluno.area}</p>
            <p><strong>Curso/Período:</strong> ${aluno.curso_periodo}</p>
            <p><strong>Idiomas:</strong> ${aluno.idiomas}</p>
            <p><strong>Habilidades:</strong> ${aluno.habilidades ? aluno.habilidades.join(", ") : 'Não informadas'}</p>
        </div>
    `;

    /**
     * 4. LÓGICA DE EXIBIÇÃO: GRÁFICO VS MENSAGEM
     */
    const temAvaliacao = aluno.avaliacoes && 
                         (aluno.avaliacoes.comunicacao > 0 || 
                          aluno.avaliacoes.proatividade > 0 || 
                          aluno.avaliacoes.trabalhoEquipe > 0);

    if (temAvaliacao) {
        canvasRadar.style.display = "block";
        msgAviso.style.display = "none";
        renderizarRadar(aluno.avaliacoes);
    } else {
        canvasRadar.style.display = "none";
        msgAviso.style.display = "block";
    }

    /**
     * 5. PERMISSÕES DE EDIÇÃO (PAINEL DA ESCOLA)
     * Remove o elemento do código se o usuário não for 'escola'
     */
    if (perfilLogado === "escola") {
        areaAvaliacaoEscola.style.display = "block";
        // Preenche os sliders com as notas salvas ou padrão 3
        document.getElementById("n1").value = (aluno.avaliacoes && aluno.avaliacoes.comunicacao) || 3;
        document.getElementById("n2").value = (aluno.avaliacoes && aluno.avaliacoes.proatividade) || 3;
        document.getElementById("n3").value = (aluno.avaliacoes && aluno.avaliacoes.trabalhoEquipe) || 3;
    } else {
        if (areaAvaliacaoEscola) areaAvaliacaoEscola.remove(); // Segurança extra: deleta o painel da tela
    }
});

/**
 * FUNÇÃO DE RENDERIZAÇÃO DO GRÁFICO
 */
function renderizarRadar(notas) {
    const ctx = document.getElementById('graficoRadarIndividual').getContext('2d');
    if (window.meuRadar) { window.meuRadar.destroy(); }

    window.meuRadar = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Comunicação', 'Proatividade', 'Trabalho em Equipe'],
            datasets: [{
                label: 'Perfil Comportamental',
                data: [notas.comunicacao, notas.proatividade, notas.trabalhoEquipe],
                backgroundColor: 'rgba(108, 99, 255, 0.2)',
                borderColor: '#6c63ff',
                pointBackgroundColor: '#6c63ff',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

/**
 * FUNÇÃO PARA SALVAR AVALIAÇÃO (APENAS ESCOLA)
 */
function salvarAvaliacao() {
    const alunoAtual = JSON.parse(localStorage.getItem("alunoSelecionado"));
    const todosAlunos = JSON.parse(localStorage.getItem("alunos")) || [];

    const novasNotas = {
        comunicacao: parseInt(document.getElementById("n1").value),
        proatividade: parseInt(document.getElementById("n2").value),
        trabalhoEquipe: parseInt(document.getElementById("n3").value)
    };

    const index = todosAlunos.findIndex(a => a.cpf === alunoAtual.cpf);

    if (index !== -1) {
        todosAlunos[index].avaliacoes = novasNotas;
        localStorage.setItem("alunos", JSON.stringify(todosAlunos));
        localStorage.setItem("alunoSelecionado", JSON.stringify(todosAlunos[index]));

        alert("Avaliação salva com sucesso!");
        window.location.href = "escola.html";
    } else {
        alert("Erro ao localizar aluno.");
    }
}