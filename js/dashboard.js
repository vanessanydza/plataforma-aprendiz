/**
 * js/dashboard.js
 * Gerenciamento de Dashboards, KPIs e Segurança do Painel Escolar
 */

// 1. Variáveis Globais e Carregamento de Dados
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
let meuGraficoAlternavel = null; // Instância para o gráfico superior (Barra)

document.addEventListener("DOMContentLoaded", () => {
    verificarSeguranca(); // Protege a página
    atualizarKPIs();      // Preenche os números no topo
    renderizarSelectEscola(); // Preenche a lista de alunos para avaliação
    
    // Inicializa os dois gráficos
    setTimeout(() => {
        renderizarGraficoAlternavel('areas'); // Gráfico superior (Inicia com áreas)
        renderizarGraficoPedagogico();        // Gráfico inferior (Fixo Radar)
    }, 100);
});

// 2. Sistema de Segurança
function verificarSeguranca() {
    const perfilLogado = localStorage.getItem("usuarioLogado");
    if (!perfilLogado || perfilLogado !== "escola") {
        alert("Acesso restrito ao perfil escolar.");
        window.location.href = "login.html";
    }
}

// 3. Atualização de Indicadores (KPIs)
function atualizarKPIs() {
    const totalAlunosElem = document.getElementById("totalAlunos");
    const mediaTurmaElem = document.getElementById("comHabilidades");

    if (totalAlunosElem) totalAlunosElem.innerText = `Total: ${alunos.length} Alunos`;
    
    const avaliados = alunos.filter(a => a.avaliacoes);
    const mediaGlobal = avaliados.length > 0 
        ? (avaliados.reduce((acc, a) => acc + (a.avaliacoes.comunicacao + a.avaliacoes.proatividade + a.avaliacoes.trabalhoEquipe)/3, 0) / avaliados.length).toFixed(1)
        : 0;

    if (mediaTurmaElem) mediaTurmaElem.innerText = `Média Soft Skills: ${mediaGlobal} / 5.0`;
}

// 4. GRÁFICO SUPERIOR: Alterna entre Áreas e Habilidades dos Alunos
function renderizarGraficoAlternavel(tipo) {
    const ctx = document.getElementById("graficoEscola").getContext('2d');
    
    if (meuGraficoAlternavel) {
        meuGraficoAlternavel.destroy();
    }

    let config;

    if (tipo === 'areas') {
        // Dados de Áreas
        const areas = {};
        alunos.forEach(a => areas[a.area] = (areas[a.area] || 0) + 1);

        config = {
            type: "bar",
            data: {
                labels: Object.keys(areas),
                datasets: [{ 
                    label: "Quantidade de Alunos", 
                    data: Object.values(areas), 
                    backgroundColor: "#6366f1",
                    borderRadius: 8
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        };
    } else {
        // Dados de Habilidades Técnicas (Cadastradas pelos alunos)
        const contagemHabs = {};
        alunos.forEach(aluno => {
            if (aluno.habilidades && Array.isArray(aluno.habilidades)) {
                aluno.habilidades.forEach(hab => {
                    const h = hab.trim().toUpperCase();
                    if (h) contagemHabs[h] = (contagemHabs[h] || 0) + 1;
                });
            }
        });

        // Pega as top 6 habilidades
        const labels = Object.keys(contagemHabs).sort((a,b) => contagemHabs[b] - contagemHabs[a]).slice(0, 6);
        const valores = labels.map(l => contagemHabs[l]);

        config = {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Frequência nas Hard Skills",
                    data: valores,
                    backgroundColor: "#ffcc00",
                    borderRadius: 8
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                indexAxis: 'y', // Barra horizontal para melhor leitura
                plugins: { legend: { display: false } }
            }
        };
    }

    meuGraficoAlternavel = new Chart(ctx, config);
}

// 5. GRÁFICO INFERIOR: Radar de Médias Pedagógicas (Notas da Escola)
function renderizarGraficoPedagogico() {
    const canvas = document.getElementById("graficoPedagogico");
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const avaliados = alunos.filter(a => a.avaliacoes);
    const count = avaliados.length;
    const soma = { c: 0, p: 0, e: 0 };

    avaliados.forEach(a => {
        soma.c += a.avaliacoes.comunicacao;
        soma.p += a.avaliacoes.proatividade;
        soma.e += a.avaliacoes.trabalhoEquipe;
    });

    const dadosMedios = count > 0 
        ? [soma.c/count, soma.p/count, soma.e/count] 
        : [0, 0, 0];

    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Comunicação", "Proatividade", "Trabalho em Equipe"],
            datasets: [{
                label: "Média Comportamental da Turma",
                data: dadosMedios,
                backgroundColor: "rgba(0, 255, 136, 0.2)",
                borderColor: "#00ff88",
                borderWidth: 3,
                pointBackgroundColor: "#fff"
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            scales: { r: { min: 0, max: 5, ticks: { stepSize: 1 } } }
        }
    });
}

// 6. Funções de Interface
function alternarGrafico(tipo) {
    renderizarGraficoAlternavel(tipo);
    
    const btnAreas = document.getElementById('btnAreas');
    const btnHabs = document.getElementById('btnHabs');

    if(tipo === 'areas') {
        btnAreas.style.opacity = "1";
        btnHabs.style.opacity = "0.5";
    } else {
        btnAreas.style.opacity = "0.5";
        btnHabs.style.opacity = "1";
    }
}

function renderizarSelectEscola() {
    const select = document.getElementById("selectAlunoEscola");
    if (!select) return;

    select.innerHTML = '<option value="">Escolha um aluno...</option>';
    const alunosOrdenados = [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));

    alunosOrdenados.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.cpf;
        const status = aluno.avaliacoes ? "✅" : "⏳";
        option.textContent = `${status} ${aluno.nome}`;
        select.appendChild(option);
    });
}

function irParaAvaliacao() {
    const select = document.getElementById("selectAlunoEscola");
    const cpf = select.value;

    if (!cpf) {
        alert("Por favor, selecione um aluno para avaliar.");
        return;
    }

    const aluno = alunos.find(a => a.cpf === cpf);
    localStorage.setItem("alunoSelecionado", JSON.stringify(aluno));
    window.location.href = "aluno-detalhe.html";
}