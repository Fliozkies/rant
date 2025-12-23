// Get modal elements
const modal = document.getElementById('rantModal');
const rantButton = document.querySelector('.rantBox');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const rantForm = document.getElementById('rantForm');

// Open modal when Rant button is clicked
rantButton.addEventListener('click', () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal function
function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = 'auto'; // Restore scrolling
    rantForm.reset(); // Clear form fields
}

// Close modal on X button click
closeBtn.addEventListener('click', closeModal);

// Close modal on Cancel button click
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
    }
});

// Handle form submission
rantForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('rantTitle').value;
    const content = document.getElementById('rantContent').value;
    const timestamp = new Date().toLocaleString(); // Get current date/time
    
    // Create the rant object
    const rant = {
        title: title,
        content: content,
        date: timestamp
    };
    
    // Display the rant
    displayRant(rant);
    
    // Optional: Save to localStorage so rants persist
    saveRantToStorage(rant);
    
    closeModal();
});

// Function to display a rant in the UI
function displayRant(rant) {
    const container = document.getElementById('rantsContainer');
    
    // Create rant card element
    const rantCard = document.createElement('div');
    rantCard.className = 'rant-card';
    
    rantCard.innerHTML = `
        <div class="rant-card-header">
            <h3 class="rant-card-title">${escapeHtml(rant.title)}</h3>
            <span class="rant-card-date">${rant.date}</span>
        </div>
        <p class="rant-card-content">${escapeHtml(rant.content)}</p>
    `;
    
    // Add to the top of the container (newest first)
    container.insertBefore(rantCard, container.firstChild);
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Optional: Save to localStorage
function saveRantToStorage(rant) {
    let rants = JSON.parse(localStorage.getItem('rants') || '[]');
    rants.unshift(rant); // Add to beginning
    localStorage.setItem('rants', JSON.stringify(rants));
}

// Optional: Load rants from localStorage when page loads
function loadRantsFromStorage() {
    const rants = JSON.parse(localStorage.getItem('rants') || '[]');
    rants.forEach(rant => displayRant(rant));
}

// Load saved rants when page loads
loadRantsFromStorage();