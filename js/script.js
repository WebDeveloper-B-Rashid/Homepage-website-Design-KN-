document.addEventListener('DOMContentLoaded', () => {
    // Fade-in animation for hero title
    const heroTitle = document.querySelector('.hero-content h1');
    heroTitle.classList.add('fade-in');

    // Simple Count-up effect
    const memberCount = document.getElementById('member-count');
    const targetCount = 1250; // Example number
    let currentCount = 0;
    const increment = targetCount / 100;

    const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(interval);
        }
        memberCount.textContent = Math.floor(currentCount);
    }, 20);

    // Placeholder for Carousel functionality (can be expanded)
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        // Add basic functionality like scroll buttons or swipe detection here
        // For now, it's just a scrollable container
    });
});