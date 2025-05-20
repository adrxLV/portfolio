
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    function toggleMenu() {
        console.log('Menu clicado');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        } else {
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.classList.add('active');
            }, 10);
        }
    }

    if (menuIcon) {
        console.log('Menu icon encontrado, adicionando listener');
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    }

    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 &&
            navLinks.classList.contains('active') &&
            !event.target.closest('.navbar')) {
            toggleMenu();
        }
    });

    function handleWindowResize() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        } else if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    }

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
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

    window.addEventListener('pageshow', function() {
        document.body.classList.remove('fade-out');
    });
});
