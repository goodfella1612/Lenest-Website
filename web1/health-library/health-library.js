
// Search and Filter Functionality
function filterResources() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resourceItems = document.querySelectorAll('.resource-item');
    const noResults = document.getElementById('noResults');
    let hasVisibleItems = false;

    resourceItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords').toLowerCase();
        
        const matchesSearch = title.includes(searchInput) || 
                            description.includes(searchInput) || 
                            keywords.includes(searchInput);

        if (matchesSearch) {
            item.classList.remove('hidden');
            hasVisibleItems = true;
        } else {
            item.classList.add('hidden');
        }
    });

    // Show/hide no results message
    if (hasVisibleItems) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }
}

function filterByCategory(category) {
    const resourceItems = document.querySelectorAll('.resource-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');
    let hasVisibleItems = false;

    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    resourceItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            hasVisibleItems = true;
        } else {
            item.classList.add('hidden');
        }
    });

    // Clear search input when filtering by category
    document.getElementById('searchInput').value = '';

    // Show/hide no results message
    if (hasVisibleItems) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    const resourceItems = document.querySelectorAll('.resource-item');
    const noResults = document.getElementById('noResults');
    
    resourceItems.forEach(item => {
        item.classList.remove('hidden');
    });
    
    noResults.style.display = 'none';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all items are visible on page load
    const resourceItems = document.querySelectorAll('.resource-item');
    resourceItems.forEach(item => {
        item.classList.remove('hidden');
    });
    
    document.getElementById('noResults').style.display = 'none';
});
