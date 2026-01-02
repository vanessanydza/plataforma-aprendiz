# 🚀 Plataforma Menor Aprendiz: Conexão & Soft Skills

Uma plataforma web completa desenvolvida para facilitar a inserção de jovens no mercado de trabalho, focando na integração entre o **desempenho escolar** e o **recrutamento empresarial**.

---

## 📋 Visão Geral
O diferencial deste projeto é a **avaliação pedagógica de Soft Skills**. As instituições de ensino validam o perfil comportamental do aluno (Comunicação, Proatividade e Trabalho em Equipe), gerando um **Gráfico de Radar** que auxilia as empresas na tomada de decisão. 

Além disso, a plataforma oferece suporte ao aluno com **curadoria de cursos** e **guias de carreira**.

---

## ✨ Funcionalidades e Perfis

### 🎓 Aluno
* **Cadastro de Perfil:** Registro de dados pessoais, endereço (para logística e VT), contatos e áreas de interesse.
* **Capacitação:** Acesso a links de cursos gratuitos para fortalecer o currículo.
* **Preparação para o Mercado:** Página exclusiva de **Dicas de Entrevista**, com orientações sobre linguagem corporal e "pitch" pessoal.

### 🏫 Escola (Gestão Pedagógica)
* **Dashboard de Controle:** Monitoramento de KPIs (Total de alunos e **Top 10 Habilidades**).
* **Avaliação de Talentos:** Painel para atribuição de notas comportamentais e geração automática do gráfico.

### 🏢 Empresa (Recrutamento)
* **Banco de Talentos:** Filtros dinâmicos e visualização de perfis detalhados.
* **Análise de Logística:** Visualização do endereço do aluno para cálculo de custos de deslocamento.
* **Análise Comportamental:** Acesso ao gráfico de radar e contatos diretos (WhatsApp/E-mail).

---

## 💡 Conteúdo Educacional (Novo)
A plataforma conta com uma página dedicada de **Dicas de Entrevista** (`dicas.html`), acessível a todos, abordando:
1.  **Apresentação Pessoal:** Como estruturar sua fala inicial.
2.  **Pesquisa Prévia:** Conhecendo a cultura da empresa.
3.  **Linguagem Corporal:** Postura e confiança em processos seletivos.

---

## 🔐 Segurança e Acesso
O projeto utiliza um sistema de autenticação simulado via **LocalStorage**:
* **Guardião de Rotas (`auth.js`):** Valida se o perfil logado tem permissão para acessar páginas restritas.
* **Páginas Públicas:** `index.html`, `cadastro.html`, `login.html` e `dicas.html`.
* **Gestão de Sessão:** Botão de **Sair (Logout)** alinhado para garantir a limpeza dos dados ao trocar de perfil.

---

## 🧪 Dados para Demonstração (Seed)
Para facilitar a avaliação técnica, o sistema conta com um script de **Auto-População (`seed.js`)**:

* **Logins Padrão (Usuário | Senha):**
    * **Escola:** `professor` | `123`
    * **Empresa:** `empresa` | `123`
    * **Aluno:** `aluno` | `123`

---

## 🛠️ Tecnologias Utilizadas
* **HTML5 & CSS3:** Estrutura semântica e layout responsivo com **Flexbox**.
* **JavaScript (Vanilla):** Lógica de autenticação e manipulação dinâmica do DOM.
* **Chart.js:** Gráficos de Radar e Gráficos de Barra.
* **LocalStorage API:** Persistência de dados local.

---
*Projeto desenvolvido para fins acadêmicos - 2026*
