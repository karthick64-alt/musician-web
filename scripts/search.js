// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const clearBtn = document.querySelector('.clear-btn');
    const recentSearches = document.querySelector('.recent-searches');
    
    // Clear recent searches
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (recentSearches) {
                recentSearches.innerHTML = '<p style="color: var(--text-secondary); padding: 1rem;">No recent searches</p>';
            }
        });
    }
    
    // Search input handling
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    console.log('Searching for:', query);
                    // Implement search functionality here
                }
            }
        });
    }
    
    // Search result item clicks
    const searchResultItems = document.querySelectorAll('.search-result-item');
    searchResultItems.forEach(item => {
        item.addEventListener('click', function() {
            const resultName = this.querySelector('.result-name').textContent;
            console.log('Selected:', resultName);
            // Navigate to result page
        });
    });
    
    // Mix card clicks
    const mixCards = document.querySelectorAll('.mix-card');
    mixCards.forEach(card => {
        card.addEventListener('click', function() {
            const mixName = this.querySelector('.mix-name').textContent;
            console.log('Playing mix:', mixName);
            // Play mix functionality
        });
    });
});

