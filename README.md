🚀 Plataforma Menor Aprendiz: Conexão & Soft Skills
Uma plataforma web completa desenvolvida para facilitar a inserção de jovens no mercado de trabalho, focando na integração entre o desempenho escolar e o recrutamento empresarial.

📋 Visão Geral
O diferencial deste projeto é a avaliação pedagógica de Soft Skills. As instituições de ensino validam o perfil comportamental do aluno (Comunicação, Proatividade e Trabalho em Equipe), gerando um Gráfico de Radar que auxilia as empresas na tomada de decisão. Além disso, a plataforma oferece suporte ao aluno com curadoria de cursos e guias de carreira.

✨ Funcionalidades e Perfis
🎓 Aluno
Cadastro de Perfil: Registro de dados pessoais, endereço (para cálculo de logística/VT), contatos e áreas de interesse.

Capacitação: Acesso a links de cursos gratuitos para fortalecer o currículo inicial.

Preparação para o Mercado: Página exclusiva de Dicas de Entrevista, com orientações sobre linguagem corporal, "pitch" pessoal e perguntas frequentes.

🏫 Escola (Gestão Pedagógica)
Dashboard de Controle: Monitoramento de KPIs (Total de alunos e Top 10 habilidades técnicas).

Avaliação de Talentos: Painel exclusivo para atribuição de notas comportamentais e geração automática do gráfico de radar.

🏢 Empresa (Recrutamento)
Banco de Talentos: Filtros dinâmicos e visualização de perfis.

Análise de Logística: Visualização do endereço do aluno para cálculo de custos de deslocamento.

Análise Comportamental: Visualização do gráfico de radar e acesso direto aos contatos para agendamento de entrevistas.

💡 Conteúdo Educacional (Novo)
A plataforma conta com uma página dedicada de Dicas de Entrevista (dicas.html), acessível a todos os usuários, que aborda:

Apresentação Pessoal: Como estruturar a fala inicial.

Pesquisa Prévia: A importância de conhecer a empresa contratante.

Linguagem Corporal: Postura e confiança durante processos seletivos presenciais ou online.

🔐 Segurança e Acesso
O projeto utiliza um sistema de autenticação simulado via LocalStorage:

Guardião de Rotas (auth.js): Valida se o perfil logado tem permissão para acessar páginas restritas, permitindo acesso livre apenas para as páginas públicas (index, cadastro, login e dicas).

Gestão de Sessão: Botão de logout estratégico para garantir a privacidade dos dados ao alternar entre perfis.

🧪 Dados para Demonstração (Seed)
Para facilitar a avaliação técnica, o sistema conta com um script de Auto-População (seed.js). Os perfis de teste incluem endereços reais e avaliações completas:

Logins Padrão:

Escola: Usuário professor | Senha 123

Empresa: Usuário empresa | Senha 123

Aluno: Usuário aluno | Senha 123

🛠️ Tecnologias Utilizadas
HTML5 & CSS3: Estrutura semântica com layout responsivo e alinhamento via Flexbox.

JavaScript (Vanilla): Lógica de autenticação, filtros e manipulação dinâmica do DOM.

Chart.js: Gráficos de Radar (Soft Skills) e Gráficos de Barra (Top Habilidades).

LocalStorage API: Persistência de dados local para simulação de banco de dados.

Projeto desenvolvido para fins acadêmicos - 2026