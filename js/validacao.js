// js/auth.js

/**
 * Função que verifica as permissões de acesso baseadas no perfil logado
 */
function verificarAcesso() {
    const perfil = localStorage.getItem("usuarioLogado");
    const caminhoDesejado = window.location.pathname;

    // Se o usuário já estiver logado, não fazemos nada, permitimos o acesso.
    if (perfil) return;

    // LISTA DE EXCEÇÕES: Páginas que QUALQUER UM pode ver sem estar logado
    const paginasPublicas = [
        "index.html", 
        "login.html", 
        "cadastro.html",
        "dicas.html", // se você tiver uma página de dicas
        "/"              // Representa a raiz (home) do site no GitHub Pages
    ];

    // Verifica se a página atual está na lista de exceções
    const ehPaginaPublica = paginasPublicas.some(pagina => caminhoDesejado.endsWith(pagina));

    // Se NÃO for uma página pública e o usuário NÃO estiver logado, manda para o login
    if (!ehPaginaPublica) {
        window.location.href = "login.html";
    }
}

// Executa a verificação assim que o script carrega
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