/*
   ========================================
   RS DEVELOPER - Portfolio Script
   ========================================
*/

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Carregado, inicializando scripts...");

    // Esconder Preloader imediatamente após DOM carregar
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hide');
        // Opcional: remover o preloader do DOM após a transição
        // preloader.addEventListener('transitionend', () => preloader.remove());
    }

    // Função principal de inicialização (agora chamada diretamente)
    function initializeScripts() {
        console.log("Inicializando funcionalidades do site...");

        // Typed.js initialization (Verificar se Typed está definido antes de usar)
        if (typeof Typed !== 'undefined') {
            const options = {
                strings: ['Freelancer', 'Criativo', 'Web'],
                typeSpeed: 100,
                backSpeed: 50,
                backDelay: 2000,
                loop: true
            };
            try {
                const typed = new Typed('.typed-text', options);
            } catch (e) {
                console.error("Erro ao inicializar Typed.js:", e);
            }
        } else {
            console.warn("Typed.js não carregado ou não encontrado.");
        }

        // Header scroll effect
        const header = document.getElementById('header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');
        if (menuToggle && navbar) {
            menuToggle.addEventListener('click', function() {
                navbar.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navbar.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar a');
        if (navbar && menuToggle) { // Certificar que navbar e menuToggle existem
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbar.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }

        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        const navLinksForScroll = document.querySelectorAll('.navbar a'); // Selecionar novamente para garantir

        function setActiveLink() {
            let scrollPosition = window.scrollY + 100;
            let currentActive = document.querySelector('.navbar a.active');

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.navbar a[href*=${sectionId}]`);

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                    if (correspondingLink) {
                        correspondingLink.classList.add('active');
                        currentActive = correspondingLink; // Atualiza o link ativo atual
                    }
                } else {
                     if (correspondingLink) {
                        correspondingLink.classList.remove('active'); // Garante que outros links não fiquem ativos
                     }
                }
            });
            // Caso especial: se estiver no topo, ativar 'Home'
            if (window.scrollY < sections[0].offsetTop) {
                 if (currentActive) currentActive.classList.remove('active');
                 const homeLink = document.querySelector('.navbar a[href="#home"]');
                 if (homeLink) homeLink.classList.add('active');
            }
        }

        if (sections.length > 0 && navLinksForScroll.length > 0) {
            window.addEventListener('scroll', setActiveLink);
            setActiveLink(); // Define o link ativo inicial
        }

        // Dark/Light theme toggle
        const themeSwitch = document.querySelector('.theme-switch');
        const body = document.body;
        if (themeSwitch && body) {
            const savedTheme = localStorage.getItem('theme');
            const themeIcon = themeSwitch.querySelector('i');

            function applyTheme(theme) {
                if (theme === 'dark') {
                    body.classList.add('dark-theme');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    body.classList.remove('dark-theme');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }

            if (savedTheme) {
                applyTheme(savedTheme);
            }

            themeSwitch.addEventListener('click', function() {
                const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }

        // Project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        if (filterButtons.length > 0 && projectCards.length > 0) {
            // Ativar o primeiro botão por padrão (se existir)
            if (filterButtons[0]) {
                 filterButtons[0].classList.add('active');
                 // Filtrar inicialmente com base no botão ativo
                 const initialFilter = filterButtons[0].getAttribute('data-filter');
                 projectCards.forEach(card => {
                    if (initialFilter === 'all' || card.getAttribute('data-category') === initialFilter) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                    }
                });
            }

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const filterValue = this.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        const matchesFilter = filterValue === 'all' || cardCategory === filterValue;

                        // Animação de fade out/in
                        if (matchesFilter) {
                            card.style.display = 'block';
                            setTimeout(() => { // Pequeno delay para garantir display block antes da animação
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300); // Tempo da transição CSS
                        }
                    });
                });
            });
        }

        // Skills tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        if (tabButtons.length > 0 && tabPanes.length > 0) {
             // Ativar a primeira aba por padrão
             if (tabButtons[0] && tabPanes[0]) {
                 tabButtons[0].classList.add('active');
                 tabPanes[0].classList.add('active');
             }

            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));

                    this.classList.add('active');
                    const tabId = this.getAttribute('data-tab');
                    const targetPane = document.getElementById(tabId);
                    if (targetPane) {
                        targetPane.classList.add('active');
                    }
                });
            });
        }

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                console.log("Formulário submetido, iniciando envio...");

                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const subjectInput = document.getElementById('subject');
                const messageInput = document.getElementById('message');
                const submitBtn = contactForm.querySelector('button[type="submit"]');

                const name = nameInput ? nameInput.value : '';
                const email = emailInput ? emailInput.value : '';
                const subject = subjectInput ? subjectInput.value : '';
                const message = messageInput ? messageInput.value : '';

                console.log("Dados a serem enviados:", { name, email, subject, message });

                if (name && email && subject && message && submitBtn) {
                    if (typeof emailjs === 'undefined') {
                        console.error("EmailJS SDK não está carregado!");
                        alert("Erro ao enviar mensagem: Serviço de email indisponível.");
                        return;
                    }

                    const originalBtnText = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                    // Substitua pelos seus IDs reais do EmailJS
                    const serviceID = 'service_m47fokq'; // Mantenha o seu service ID
                    const templateID = 'template_5v21fog'; // Mantenha o seu template ID
                    // const publicKey = 'YOUR_PUBLIC_KEY'; // Adicione sua Public Key aqui

                    // Inicialize o EmailJS com sua Public Key (faça isso uma vez, talvez fora desta função se preferir)
                    // emailjs.init(publicKey);

                    emailjs.send(serviceID, templateID, {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                    .then(function (response) {
                        console.log("SUCESSO!", response.status, response.text);
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
                        `;
                        contactForm.innerHTML = ''; // Limpa o formulário
                        contactForm.appendChild(successMessage);
                    }, function (error) {
                        console.error("ERRO ao enviar email!", error);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        alert(`Erro ao enviar mensagem: ${error.text || 'Erro desconhecido'}. Por favor, tente novamente.`);
                    });
                } else {
                    console.warn("Campos incompletos ou botão de envio não encontrado.");
                    alert("Por favor, preencha todos os campos do formulário.");
                }
            });
        }

        // ScrollReveal initialization (Verificar se ScrollReveal está definido)
        if (typeof ScrollReveal !== 'undefined') {
            try {
                const sr = ScrollReveal({
                    origin: 'top',
                    distance: '60px',
                    duration: 1000,
                    delay: 200,
                    reset: false // Manter false para animação ocorrer apenas uma vez
                });

                // Apply ScrollReveal to elements
                sr.reveal('.hero .text-content', {});
                sr.reveal('.hero-image', { delay: 400 });
                sr.reveal('.social-icons', { delay: 600 });
                sr.reveal('.section-header', {});
                sr.reveal('.about-image', { origin: 'left' });
                sr.reveal('.about-text', { origin: 'right', delay: 300 });
                sr.reveal('.filter-buttons', {});
                sr.reveal('.project-card', { interval: 200 });
                sr.reveal('.skills-tabs', {});
                sr.reveal('.skill-item', { interval: 100 });
                sr.reveal('.contact-card', { interval: 200 });
                sr.reveal('.contact-form', { delay: 300 });
                sr.reveal('.footer-content > div', { interval: 200 });
            } catch (e) {
                console.error("Erro ao inicializar ScrollReveal:", e);
            }
        } else {
            console.warn("ScrollReveal não carregado ou não encontrado.");
        }
    }

    // Chamar a função principal de inicialização
    initializeScripts();

});
