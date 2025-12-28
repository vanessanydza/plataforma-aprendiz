# 🚀 Plataforma Menor Aprendiz: Conexão & Soft Skills

Uma plataforma web completa desenvolvida para facilitar a inserção de jovens no mercado de trabalho, focando na integração entre o desempenho escolar e o recrutamento empresarial.



## 📋 Visão Geral
O diferencial deste projeto é a **avaliação pedagógica de Soft Skills**. As instituições de ensino validam o perfil comportamental do aluno (Comunicação, Proatividade e Trabalho em Equipe), gerando um **Gráfico de Radar** que auxilia as empresas na tomada de decisão.

## ✨ Funcionalidades e Perfis

### 🎓 Aluno
- **Cadastro de Perfil:** Registro de dados pessoais, contatos (celular/e-mail) e áreas de interesse.
- **Capacitação:** Acesso a links de cursos gratuitos para fortalecer o currículo inicial.

### 🏫 Escola (Gestão Pedagógica)
- **Dashboard de Controle:** Monitoramento de KPIs (Total de alunos e habilidades).
- **Avaliação de Talentos:** Painel exclusivo para atribuição de notas comportamentais e geração do gráfico de radar.

### 🏢 Empresa (Recrutamento)
- **Banco de Talentos:** Filtros dinâmicos por área de atuação.
- **Análise Comportamental:** Visualização do gráfico de radar e acesso direto aos contatos (WhatsApp/E-mail) para agendamento de entrevistas.

---

## 🔐 Segurança e Acesso
O projeto utiliza um sistema de autenticação simulado via **LocalStorage**:
- **Guardião de Rotas (`auth.js`):** Valida se o perfil logado tem permissão para acessar a página solicitada, impedindo acessos via URL direta.
- **Privacidade (LGPD):** Os dados são armazenados localmente no navegador, respeitando a minimização de dados e finalidade específica.



---

## 🧪 Dados para Demonstração (Seed)
Para facilitar a avaliação técnica, o sistema conta com um script de **Auto-População (`seed.js`)**. Ao abrir o projeto pela primeira vez, os seguintes perfis de teste são carregados:

- **Logins Padrão:**
  - **Escola:** Usuário `professor` | Senha `123`
  - **Empresa:** Usuário `empresa` | Senha `123`
  - **Aluno:** Usuário `aluno` | Senha `123`

- **Alunos Cadastrados:** Perfis prontos em TI, Marketing, Design e RH com avaliações pedagógicas já realizadas.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 & CSS3:** Estrutura semântica e layout responsivo.
- **Bootstrap 5:** Navbar e componentes de interface.
- **JavaScript (Vanilla):** Lógica de autenticação e manipulação do DOM.
- **Chart.js:** Gráficos de Radar e Dashboards.
- **LocalStorage API:** Persistência de dados local.

---

## 🚀 Como Executar
1. Clone o repositório ou baixe os arquivos.
2. Certifique-se de manter a estrutura de pastas:
   - `/css`
   - `/js`
   - `index.html`, `login.html`, etc.
3. Abra o arquivo `index.html` em qualquer navegador moderno.

---
*Projeto desenvolvido para fins acadêmicos - 2025*