// js/auth.js

/**
 * Função que verifica as permissões de acesso baseadas no perfil logado
 */
function verificarAcesso() {
    const perfil = localStorage.getItem("usuarioLogado");
    const urlAtual = window.location.pathname;

    // 1. Se não houver ninguém logado, manda para o login 
    // (exceto se já estiver na index ou no próprio login)
    if (!perfil && !urlAtual.includes("login.html") && !urlAtual.includes("index.html")) {
        window.location.href = "login.html";
        return;
    }

    // 2. Regras para o ALUNO
    if (perfil === "aluno") {
        const paginasProibidas = ["empresa.html", "escola.html", "aluno-detalhe.html"];
        if (paginasProibidas.some(p => urlAtual.includes(p))) {
            alert("Acesso restrito para Empresas ou Escolas.");
            window.location.href = "index.html";
        }
    }

    // 3. Regras para a EMPRESA
    if (perfil === "empresa") {
        const paginasProibidas = ["aluno.html", "escola.html"];
        if (paginasProibidas.some(p => urlAtual.includes(p))) {
            alert("Acesso restrito à área de recrutamento.");
            window.location.href = "empresa.html";
        }
    }
}

/*** Função de Logout acessível em todo o sistema***/
function logout() {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("alunoSelecionado"); // Limpa seleção por segurança
    window.location.href = "login.html";
}

// Executa a verificação assim que o script é carregado
verificarAcesso();

// Ocultar cards não permitidos na index
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html")) {
        const perfil = localStorage.getItem("usuarioLogado");
        if (perfil === "aluno") {
            document.querySelectorAll(".card").forEach(c => {
                if(!c.href.includes("aluno.html")) c.style.display = "none";
            });
        } else if (perfil === "empresa") {
            document.querySelectorAll(".card").forEach(c => {
                if(!c.href.includes("empresa.html")) c.style.display = "none";
            });
        }
    }
});