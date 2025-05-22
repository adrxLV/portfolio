document.addEventListener('DOMContentLoaded', () => {
    window.toggleMenu = function() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('active');
    };

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.experience-content').forEach(content => {
                content.classList.add('hidden');
            });

            const target = btn.getAttribute('data-target');
            const content = document.getElementById(`${target}-content`);
            content.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');

            // Update active link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Reveal projects on scroll
    const revealProjects = () => {
        const projects = document.querySelectorAll('.project-card');
        const windowHeight = window.innerHeight;

        projects.forEach(project => {
            const projectTop = project.getBoundingClientRect().top;
            if (projectTop < windowHeight - 100) {
                project.classList.add('visible');
            }
        });
    };

    // Initial check for projects in view
    revealProjects();

    // Check for projects on scroll
    window.addEventListener('scroll', revealProjects);

    // Active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Page transition effect
    window.addEventListener('beforeunload', function() {
        document.body.classList.add('fade-out');
    });
});
