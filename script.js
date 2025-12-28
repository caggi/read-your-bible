// Simple animations and interactivity for Read Your Bible website

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth fade-in animation to sections
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial styles and observe sections
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Add click analytics (console log for demo purposes)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            console.log(`Botão clicado: ${buttonText}`);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'i' to go to Instagram
        if (e.key === 'i' || e.key === 'I') {
            const instagramBtn = document.querySelector('.btn-instagram');
            if (instagramBtn) {
                instagramBtn.click();
            }
        }
        // Press 'w' to go to WhatsApp
        if (e.key === 'w' || e.key === 'W') {
            const whatsappBtn = document.querySelector('.btn-whatsapp');
            if (whatsappBtn) {
                whatsappBtn.click();
            }
        }
    });

    console.log('Read Your Bible website carregado com sucesso! 📖');
});
