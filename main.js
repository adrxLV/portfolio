document.addEventListener('DOMContentLoaded', () => {
    let isScrollingFromClick = false;

    window.toggleMenu = function() {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    };

    document.addEventListener('click', (e) => {
        const navLinks = document.getElementById('navLinks');
        const menuIcon = document.querySelector('.menu-icon');
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        }
    });

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
            if (content) {
                content.classList.remove('hidden');
            }
        });
    });

    document.querySelectorAll('.nav-link, .find-more-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    isScrollingFromClick = true;

                    const navLinks = document.getElementById('navLinks');
                    if (navLinks) {
                        navLinks.classList.remove('active');
                    }

                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });

                    const correspondingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                    if (correspondingNavLink) {
                        correspondingNavLink.classList.add('active');
                    }

                    const targetOffset = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        isScrollingFromClick = false;
                    }, 800);
                }
            }
        });
    });

    const updateActiveNav = () => {
        if (isScrollingFromClick) return;

        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 160;
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (!currentSectionId && window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentSectionId = lastSection.getAttribute('id');
            }
        }

        if (currentSectionId) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = requestAnimationFrame(() => {
                updateActiveNav();
                scrollTimeout = null;
            });
        }
    }, { passive: true });

    updateActiveNav();
});
