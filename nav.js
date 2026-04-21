document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = burgerMenu.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Handle mobile dropdown toggles
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            // Only toggle on mobile
            if (window.innerWidth <= 768) {
                dropdown.classList.toggle('open');
            }
        });
    });
});
