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
                nome: "Ana Beatriz Silva",
                idade: 17,
                cpf: "111.222.333-44",
                email: "ana.beatriz@email.com",
                celular: "(11) 98765-4321",
                area: "TI (Tecnologia da Informação)",
                curso_periodo: "Técnico em Informática - 3º Ano",
                idiomas: "Inglês Intermediário",
                habilidades: ["HTML5", "CSS3", "JavaScript", "Lógica de Programação"],
                avaliacoes: { comunicacao: 5, proatividade: 4, trabalhoEquipe: 5 }
            },
            {
                nome: "Marcos Oliveira",
                idade: 16,
                cpf: "222.333.444-55",
                email: "marcos.m@email.com",
                celular: "(41) 97766-5544",
                area: "Marketing",
                curso_periodo: "Ensino Médio - 2º Ano",
                idiomas: "Espanhol Básico",
                habilidades: ["Redes Sociais", "Canva", "Escrita Criativa"],
                avaliacoes: { comunicacao: 4, proatividade: 5, trabalhoEquipe: 3 }
            },
            {
                nome: "Larissa Souza",
                idade: 16,
                cpf: "333.444.555-66",
                email: "lari.design@email.com",
                celular: "(41) 96655-4433",
                area: "Design",
                curso_periodo: "Técnico em Admnistração - 2º Ano",
                idiomas: "Inglês Básico",
                habilidades: ["Desenho à mão", "Photoshop", "Criatividade"],
                avaliacoes: { comunicacao: 3, proatividade: 4, trabalhoEquipe: 4 }
            },
            {
                nome: "João Pedro Costa",
                idade: 15,
                cpf: "444.555.666-77",
                email: "jp.financas@email.com",
                celular: "(41) 96432-1516",
                area: "Finanças",
                curso_periodo: "Técnico em Adm - 1º Ano",
                idiomas: "Inglês Avançado",
                habilidades: ["Excel Avançado", "Matemática Financeira"],
                avaliacoes: { comunicacao: 4, proatividade: 3, trabalhoEquipe: 5 }
            },
            {
                nome: "Camila Rocha",
                idade: 17,
                cpf: "555.666.777-88",
                email: "camila.rh@email.com",
                celular: "(41) 91236-4433",
                area: "Recursos Humanos",
                curso_periodo: "Ensino Médio - 3º Ano",
                idiomas: "Nenhum",
                habilidades: ["Organização", "Empatia", "Boa Comunicação"],
                avaliacoes: { comunicacao: 5, proatividade: 4, trabalhoEquipe: 4 }
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