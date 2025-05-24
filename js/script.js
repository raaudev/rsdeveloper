/*
   ========================================
   RS DEVELOPER - Portfolio Script
   ========================================
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se as bibliotecas necessárias estão carregadas
    function checkLibraries() {
        if (typeof Typed === 'undefined') {
            console.error("Typed.js não está disponível");
            return false;
        }
        
        if (typeof ScrollReveal === 'undefined') {
            console.error("ScrollReveal não está disponível");
            return false;
        }
        
        if (typeof emailjs === 'undefined') {
            console.error("EmailJS não está disponível");
            return false;
        }
        
        console.log("Todas as bibliotecas estão disponíveis");
        return true;
    }
    
    // Inicializar quando as bibliotecas estiverem prontas
    function initializeWhenReady(maxAttempts = 5) {
        let attempts = 0;
        
        function tryInitialize() {
            attempts++;
            console.log(`Tentativa ${attempts} de inicializar scripts...`);
            
            if (checkLibraries()) {
                initializeScripts();
                return true;
            } else if (attempts < maxAttempts) {
                console.log(`Aguardando bibliotecas... Nova tentativa em 1 segundo.`);
                setTimeout(tryInitialize, 1000);
                return false;
            } else {
                console.error(`Falha ao carregar bibliotecas após ${maxAttempts} tentativas.`);
                alert("Alguns recursos podem não funcionar corretamente. Por favor, recarregue a página.");
                return false;
            }
        }
        
        return tryInitialize();
    }
    
    // Função principal de inicialização
    function initializeScripts() {
        console.log("Inicializando scripts do site...");
        
        // Preloader
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.classList.add('hide');
            }, 1000);
        });

        // Typed.js initialization
        const options = {
            strings: ['Front End'],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        };
        
        const typed = new Typed('.typed-text', options);

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');
        
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        
        function setActiveLink() {
            let scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelector('.navbar a.active').classList.remove('active');
                    document.querySelector(`.navbar a[href*=${sectionId}]`).classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveLink);

        // Dark/Light theme toggle
        const themeSwitch = document.querySelector('.theme-switch');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeSwitch.querySelector('i').classList.remove('fa-moon');
            themeSwitch.querySelector('i').classList.add('fa-sun');
        }
        
        themeSwitch.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            const icon = themeSwitch.querySelector('i');
            
            if (body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // Project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Skills tabs
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Form submission - CÓDIGO ATUALIZADO
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                console.log("Formulário submetido, iniciando envio...");

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;

                // Log dos dados para verificação
                console.log("Dados a serem enviados:", { name, email, subject, message });

                if (name && email && subject && message) {
                    // Verificar se o EmailJS está disponível
                    if (typeof emailjs === 'undefined') {
                        console.error("EmailJS não está disponível!");
                        alert("Erro: Sistema de email não está disponível. Por favor, recarregue a página e tente novamente.");
                        return;
                    }

                    // Mostrar indicador de carregamento
                    const submitBtn = contactForm.querySelector('button[type="submit"]');
                    const originalBtnText = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                    // Envio CORRETO com EmailJS v4
                    emailjs.send("service_m47fokq", "template_5v21fog", {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                    .then(function (response) {
                        console.log("SUCESSO!", response.status, response.text);
                        
                        // Mensagem de sucesso
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
                        `;
                        contactForm.innerHTML = '';
                        contactForm.appendChild(successMessage);
                    }, function (error) {
                        console.error("ERRO!", error);
                        
                        // Restaurar botão
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        
                        // Mensagem de erro detalhada
                        alert(`Erro ao enviar mensagem: ${error.text}\nPor favor, tente novamente ou entre em contato diretamente pelo email.`);
                    });
                } else {
                    console.warn("Campos incompletos no formulário");
                    alert("Por favor, preencha todos os campos do formulário.");
                }
            });
        }

        // ScrollReveal initialization
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false
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
    }
    
    // Iniciar quando o DOM estiver pronto
    initializeWhenReady();
});
