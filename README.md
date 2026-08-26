# Portfólio — Matheus Junior Marques

Site pessoal apresentando minha trajetória como desenvolvedor **Back-End em formação**, com foco em **Java + Spring Boot**, além de projetos, experiência profissional e formação acadêmica.

**Acesse:** [portfolio-nine-eta-16.vercel.app](https://portfolio-nine-eta-16.vercel.app/)

## Sobre

Página única (one-page) construída para servir como cartão de visitas profissional, reunindo:

- **Hero** — apresentação e proposta profissional
- **Sobre** — trajetória pessoal e acadêmica
- **Tech Stack** — tecnologias que domino, com destaque para Java e Spring Boot
- **Projetos** — peças reais do meu GitHub, com prints/telas dos projetos
- **Experiência** — histórico profissional em formato de timeline
- **Formação** — Etec e Fatec
- **Aprendendo agora** — o que estou estudando no momento
- **GitHub** — estatísticas públicas em tempo real (via API do GitHub)
- **Contato** — e-mail, LinkedIn e GitHub

## Tecnologias

Site estático construído apenas com **HTML, CSS e JavaScript puro** — sem frameworks, sem build step:

- HTML5 semântico
- CSS3 (custom properties, Grid, Flexbox, animações)
- JavaScript (Intersection Observer, fetch da API do GitHub, sem dependências externas)

## Estrutura do projeto

```
├── index.html          # marcação e conteúdo do site
├── css/
│   └── style.css       # estilos e responsividade
├── js/
│   └── script.js       # interações, scroll reveal e integração com a API do GitHub
├── assets/
│   └── projects/       # imagens dos projetos exibidos na seção Projetos
└── robots.txt
```

## Rodando localmente

Não há dependências nem build. Basta servir os arquivos estáticos:

```bash
# clone o repositório
git clone https://github.com/matheus-marques-dev/Portfolio.git
cd Portfolio

# sirva com qualquer servidor estático, por exemplo:
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Contato

- **GitHub:** [@matheus-marques-dev](https://github.com/matheus-marques-dev)
- **LinkedIn:** [matheus-marques](https://www.linkedin.com/in/matheus-marques-34227532a/)
- **E-mail:** matheusjr432@gmail.com
