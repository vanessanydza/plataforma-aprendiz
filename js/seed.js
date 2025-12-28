/**
 * SEED FILE - Dados iniciais para demonstração
 * Este script popula o LocalStorage caso ele esteja vazio.
 */

function inicializarSistema() {
    // 1. Verificar se já existem dados
    const alunosExistentes = localStorage.getItem("alunos");
    const usuariosExistentes = localStorage.getItem("usuarios");

    // 2. Só cria os dados se o sistema estiver "vazio" (primeira vez do professor)
    if (!alunosExistentes || JSON.parse(alunosExistentes).length === 0) {
        
        const alunosDeTeste = [
            {
                nome: "Ana Carolina Souza",
                idade: 19,
                cpf: "111.222.333-44",
                endereco: "Rua Dezenove de Novembro, 120 - Centro, Pinhais - PR",
                email: "ana.carol@email.com",
                area: "Desenvolvimento Front-end",
                curso_periodo: "Análise de Sistemas - 2º Período",
                idiomas: "Inglês Intermediário",
                habilidades: ["HTML", "CSS", "JavaScript", "React"],
                avaliacoes: { comunicacao: 5, proatividade: 4, trabalhoEquipe: 5 }
            },
            {
                nome: "Lucas Gabriel Santos",
                idade: 21,
                cpf: "555.666.777-88",
                endereco: "Av. Iraí, 1540 - Weissópolis, Pinhais - PR",
                email: "lucas.gabriel@email.com",
                area: "Suporte Técnico / Infra",
                curso_periodo: "Redes de Computadores - 4º Período",
                idiomas: "Inglês Básico",
                habilidades: ["Hardware", "Linux", "Windows Server", "Redes"],
                avaliacoes: { comunicacao: 3, proatividade: 5, trabalhoEquipe: 4 }
            },
            {
                nome: "Mariana Oliveira",
                idade: 18,
                cpf: "999.888.777-66",
                endereco: "Rua XV de Novembro, 450 - Centro, Curitiba - PR",
                email: "mari.oliveira@email.com",
                area: "Design UI/UX",
                curso_periodo: "Design Digital - 1º Período",
                idiomas: "Inglês Avançado",
                habilidades: ["Figma", "Adobe XD", "Photoshop", "CSS"],
                avaliacoes: { comunicacao: 5, proatividade: 4, trabalhoEquipe: 3 }
            },
            {
                nome: "Matheus Henrique",
                idade: 20,
                cpf: "444.333.222-11",
                endereco: "Rua Jacob Macanhan, 800 - Atuba, Pinhais - PR",
                email: "matheus.h@email.com",
                area: "Desenvolvimento Back-end",
                curso_periodo: "Engenharia de Software - 3º Período",
                idiomas: "Espanhol Básico",
                habilidades: ["Python", "Node.js", "SQL", "Git"],
                avaliacoes: { comunicacao: 4, proatividade: 4, trabalhoEquipe: 5 }
            },
            {
                nome: "Beatriz Ferreira",
                idade: 19,
                cpf: "222.444.666-88",
                endereco: "Rua Sete de Setembro, 2100 - Batel, Curitiba - PR",
                email: "bia.ferreira@email.com",
                area: "Análise de Dados",
                curso_periodo: "Sistemas de Informação - 2º Período",
                idiomas: "Inglês Fluente",
                habilidades: ["Excel Avançado", "Power BI", "Python", "Estatística"],
                avaliacoes: { comunicacao: 5, proatividade: 3, trabalhoEquipe: 4 }
            }
        ];

        localStorage.setItem("alunos", JSON.stringify(alunosDeTeste));
    }

    if (!usuariosExistentes) {
        const usuariosDeTeste = [
            { user: "professor", pass: "123", perfil: "escola" },
            { user: "empresa", pass: "123", perfil: "empresa" },
            { user: "aluno", pass: "123", perfil: "aluno" }
        ];

        localStorage.setItem("usuarios", JSON.stringify(usuariosDeTeste));
    }

    console.log("Sistema pronto com dados de teste para o professor.");
}

// Executar a função imediatamente
inicializarSistema();