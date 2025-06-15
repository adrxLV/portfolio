document.addEventListener('DOMContentLoaded', () => {
    let isScrollingFromClick = false;

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

            isScrollingFromClick = true;

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            document.getElementById('navLinks').classList.remove('active');

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            setTimeout(() => {
                isScrollingFromClick = false;
            }, 1000);
        });
    });

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

    revealProjects();

    window.addEventListener('scroll', revealProjects);

    window.addEventListener('scroll', () => {
        if (isScrollingFromClick) {
            return;
        }

        let current = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        if (!current && sections.length > 0) {
            const lastSection = sections[sections.length - 1];
            const lastSectionTop = lastSection.offsetTop;
            if (scrollPosition >= lastSectionTop) {
                current = lastSection.getAttribute('id');
            }
        }

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    window.addEventListener('beforeunload', function() {
        document.body.classList.add('fade-out');
    });
});
