document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. THEME TOGGLE (DARK MODE)
       ========================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Helper to update icon
    const updateIcon = (theme) => {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // Switch to sun when dark
        } else {
            themeIcon.className = 'fas fa-moon'; // Switch to moon when light
        }
    };

    // Initialize icon on load
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    updateIcon(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateIcon(newTheme);
        });
    }

    /* =========================================================
       2. PAGE TRANSITIONS (SPA FEEL)
       ========================================================= */
    // Trigger enter animation
    setTimeout(() => {
        document.body.classList.remove('page-enter');
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 10); // Small delay to ensure CSS transition triggers

    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('href');
            
            // Ignorer les liens externes, les liens d'ancre (sur la même page), ou les clics avec CTRL/CMD
            if (
                target.startsWith('#') || 
                target.startsWith('http') || 
                target.startsWith('mailto') || 
                link.target === '_blank' ||
                e.ctrlKey || 
                e.metaKey
            ) {
                return; 
            }

            // Lien interne : on intercepte
            e.preventDefault();
            document.body.classList.add('page-leave');
            
            // Attendre la fin de l'animation CSS (300ms) avant de naviguer
            setTimeout(() => {
                window.location.href = target;
            }, 300);
        });
    });
});
