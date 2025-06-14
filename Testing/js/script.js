// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
    
    // Search functionality
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', handleSearch);
    });
    
    // Story filtering
    const storyFilters = document.querySelectorAll('.story-filter');
    storyFilters.forEach(filter => {
        filter.addEventListener('click', handleStoryFilter);
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Form submission handler
function handleFormSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Form submitted successfully!', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Handle different form types
        if (form.id === 'story-form') {
            window.location.href = 'stories.html';
        } else if (form.id === 'therapist-registration') {
            showNotification('Your application is being reviewed. We\'ll contact you within 48 hours.', 'info');
        }
    }, 2000);
}

// Search handler
function handleSearch(e) {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.querySelector('input[type="text"]').value;
    const location = form.querySelector('input[name="location"]')?.value;
    
    // Show loading state
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
        
        // Simulate search results (replace with actual API call)
        setTimeout(() => {
            displaySearchResults(searchQuery, location);
        }, 1500);
    }
}

// Display search results
function displaySearchResults(query, location) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    // Mock data - replace with actual API response
    const mockResults = [
        {
            name: 'Sarah M.',
            description: 'Diagnosed 2 years ago, loves gardening and meditation',
            type: 'community'
        },
        {
            name: 'Dr. Emily Chen, LCSW',
            description: 'Specializes in cancer care, family support, end-of-life counseling',
            location: '2.3 miles from you',
            type: 'therapist'
        },
        {
            name: 'MS Support Circle',
            description: 'Weekly support meetings for Multiple Sclerosis patients and families',
            schedule: 'Tuesdays 7 PM',
            type: 'meeting'
        }
    ];
    
    let resultsHTML = '<h3>Search Results</h3>';
    
    if (mockResults.length === 0) {
        resultsHTML += '<p>No results found. Try broadening your search terms.</p>';
    } else {
        resultsHTML += '<div class="results-list">';
        mockResults.forEach(result => {
            resultsHTML += `
                <div class="result-item">
                    <div class="result-header">
                        <h4 class="result-title">${result.name}</h4>
                        <span class="result-type">${result.type}</span>
                    </div>
                    <div class="result-meta">
                        ${result.location ? `<span>📍 ${result.location}</span>` : ''}
                        ${result.schedule ? `<span>🕐 ${result.schedule}</span>` : ''}
                    </div>
                    <div class="result-description">${result.description}</div>
                    <div class="result-actions">
                        <button class="btn-primary">Connect</button>
                        <button class="btn-secondary">View Profile</button>
                    </div>
                </div>
            `;
        });
        resultsHTML += '</div>';
    }
    
    resultsContainer.innerHTML = resultsHTML;
}

// Story filtering
function handleStoryFilter(e) {
    const filter = e.target.dataset.filter;
    const stories = document.querySelectorAll('.story-card');
    
    stories.forEach(story => {
        if (filter === 'all' || story.dataset.category === filter) {
            story.style.display = 'block';
        } else {
            story.style.display = 'none';
        }
    });
    
    // Update active filter
    document.querySelectorAll('.story-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                color: white;
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideIn 0.3s ease;
            }
            .notification-success { background: #10B981; }
            .notification-error { background: #EF4444; }
            .notification-info { background: #3B82F6; }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Local storage helpers for saving user data
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Could not read from localStorage:', error);
        return null;
    }
}

// Save form progress
function saveFormProgress(formId, formData) {
    const progressKey = `form_progress_${formId}`;
    saveToStorage(progressKey, formData);
}

// Restore form progress
function restoreFormProgress(formId) {
    const progressKey = `form_progress_${formId}`;
    const savedData = getFromStorage(progressKey);
    
    if (savedData) {
        const form = document.getElementById(formId);
        if (form) {
            Object.keys(savedData).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = savedData[key];
                }
            });
        }
    }
}

// Auto-save form progress
function enableAutoSave(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                saveFormProgress(formId, data);
            });
        });
    }
}

// Initialize auto-save for forms on page load
document.addEventListener('DOMContentLoaded', function() {
    const autoSaveForms = ['story-form', 'therapist-registration', 'connect-form'];
    autoSaveForms.forEach(formId => {
        enableAutoSave(formId);
        restoreFormProgress(formId);
    });
});
