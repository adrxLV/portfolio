document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href.indexOf('http') !== 0 && href.indexOf('#') !== 0) {
                e.preventDefault();

                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
});

window.addEventListener('pageshow', function() {
    document.body.classList.add('fade-out');

    setTimeout(() => {
        document.body.classList.remove('fade-out');
    }, 10);
});
