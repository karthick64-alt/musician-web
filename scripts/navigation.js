// Navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && (currentPage === href || (currentPage === '' && href === 'index.html'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

