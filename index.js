// Garantindo que o código só é executado após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos do menu
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    // Função para alternar o menu móvel
    function toggleMenu() {
        console.log('Menu clicado');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        } else {
            navLinks.style.display = 'flex';
            // Pequeno atraso para garantir que o display:flex seja aplicado antes da transição
            setTimeout(() => {
                navLinks.classList.add('active');
            }, 10);
        }
    }

    // Adicionando evento de clique ao ícone do menu, com verificação de existência
    if (menuIcon) {
        console.log('Menu icon encontrado, adicionando listener');
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Fechando o menu ao clicar em links
    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fechando o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 &&
            navLinks.classList.contains('active') &&
            !event.target.closest('.navbar')) {
            toggleMenu();
        }
    });

    // Inicializando o estado do menu baseado no tamanho da tela
    function handleWindowResize() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    }

    // Configuração inicial
    handleWindowResize();

    // Evento de redimensionamento
    window.addEventListener('resize', handleWindowResize);

    // Transições de página
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Não aplicar transição nas páginas já ativas
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';

            if (href === currentPath) {
                return;
            }

            e.preventDefault();

            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });

    // Animação de entrada da página
    window.addEventListener('pageshow', function() {
        document.body.classList.remove('fade-out');
    });
});
