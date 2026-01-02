/**
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
        // --- GRÁFICO DE HABILIDADES DOS ALUNOS (TOP 10) ---
        const contagemHabs = {};
        
        alunos.forEach(aluno => {
            // Tenta buscar o campo em várias nomenclaturas possíveis por segurança
            let campoBruto = aluno.habilidades || aluno.habilidade || aluno.skills || "";
            let listaHabs = [];
            // Normaliza o campo para uma lista
            if (Array.isArray(campoBruto)) {
                listaHabs = campoBruto;
            } else if (typeof campoBruto === 'string') {
                // Divide por vírgula, ponto e vírgula ou espaço e remove vazios
                listaHabs = campoBruto.split(/[,;]+/).map(h => h.trim()).filter(h => h !== "");
            }
            // Conta cada habilidade
            listaHabs.forEach(hab => {
                const h = hab.toUpperCase(); 
                if (h) {
                    contagemHabs[h] = (contagemHabs[h] || 0) + 1;
                }
            });
        });

        // ORDENAÇÃO: Transforma o objeto em array, ordena do maior para o menor
        const habilidadesOrdenadas = Object.keys(contagemHabs)
            .sort((a, b) => contagemHabs[b] - contagemHabs[a]);

        // SELEÇÃO: Pega as 10 melhores habilidades
        const top10Labels = habilidadesOrdenadas.slice(0, 10);
        const top10Valores = top10Labels.map(h => contagemHabs[h]);

        config = {
            type: "bar",
            data: {
                labels: top10Labels,
                datasets: [{
                    label: "Quantidade de Alunos",
                    data: top10Valores,
                    backgroundColor: "#5981FF",
                    borderRadius: 5
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                indexAxis: 'y', // Mantém horizontal para leitura fácil
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Top 10 Habilidades Técnicas'
                    }
                },
                scales: {
                    x: { 
                        beginAtZero: true, 
                        ticks: { 
                            stepSize: 1,
                            precision: 0 // Garante que não apareça "0.5" alunos
                        }
                    },
                    y: {
                        ticks: {
                            autoSkip: false // Garante que nenhum nome seja "pulado"
                        }
                    }
                }
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
                borderColor: "#5981FF",
                borderWidth: 2,
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

    // Ordena para facilitar a vida do professor
    const alunosOrdenados = [...alunos].sort((a, b) => a.nome.localeCompare(b.nome));

    alunosOrdenados.forEach(aluno => {
        const option = document.createElement("option");
        option.value = aluno.cpf;

        const notas = aluno.avaliacoes;
        const jaAvaliado = notas && (notas.comunicacao > 0 || notas.proatividade > 0 || notas.trabalhoEquipe > 0);
        
        const status = jaAvaliado ? "✅" : "⏳";
        
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