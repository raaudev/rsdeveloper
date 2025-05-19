# RS DEVELOPER - Portfolio

Este é um site portfolio profissional desenvolvido com HTML, CSS e JavaScript.

## Estrutura do Projeto

```
portfolio/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── profile.png
│   ├── about.jpg
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   ├── project5.jpg
│   └── project6.jpg
└── index.html
```

## Características

- Design responsivo para todos os dispositivos
- Modo claro/escuro
- Animações suaves
- Filtro de projetos
- Formulário de contato
- Navegação intuitiva

## Como Usar

1. Descompacte o arquivo `portfolio.zip`
2. Abra o arquivo `index.html` em qualquer navegador moderno

## Personalização

### Alterando Informações Pessoais

Para alterar as informações pessoais, edite o arquivo `index.html`:

- Nome e título na seção Home
- Texto da seção Sobre Mim
- Informações de contato

### Adicionando Novos Projetos

Para adicionar um novo projeto, copie o seguinte código e adicione-o dentro da div `projects-grid` no arquivo `index.html`:

```html
<div class="project-card" data-category="categoria">
    <div class="project-img">
        <img src="images/seu-projeto.jpg" alt="Nome do Projeto">
        <div class="overlay">
            <div class="project-links">
                <a href="#" class="project-link"><i class="fas fa-link"></i></a>
                <a href="#" class="project-link"><i class="fab fa-github"></i></a>
            </div>
        </div>
    </div>
    <div class="project-info">
        <h3>Nome do Projeto</h3>
        <p>Descrição do projeto.</p>
        <div class="tech-stack">
            <span>Tecnologia 1</span>
            <span>Tecnologia 2</span>
            <span>Tecnologia 3</span>
        </div>
    </div>
</div>
```

### Alterando Cores

Para alterar as cores do site, edite as variáveis CSS no início do arquivo `css/style.css`:

```css
:root {
    --primary-color: #6c63ff;
    --secondary-color: #f50057;
    /* outras variáveis de cor */
}
```

## Bibliotecas Utilizadas

- [Font Awesome](https://fontawesome.com/) - Ícones
- [Typed.js](https://github.com/mattboldt/typed.js/) - Efeito de digitação
- [ScrollReveal](https://scrollrevealjs.org/) - Animações de scroll
- [Google Fonts (Poppins)](https://fonts.google.com/specimen/Poppins) - Tipografia

## Suporte

Para qualquer dúvida ou suporte, entre em contato através do formulário no site ou diretamente pelo email fornecido na seção de contato.
