document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, observerOptions);

    items.forEach(el => io.observe(el));

    // Pequeno log (pode remover depois)
    console.log('Read Your Bible website carregado com sucesso! 📖');
});
