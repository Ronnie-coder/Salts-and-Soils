document.addEventListener('DOMContentLoaded', () => {
    const lightModeBtn = document.getElementById('light-mode');
    const darkModeBtn = document.getElementById('dark-mode');
    const fallingItemsContainer = document.querySelector('.falling-items');
    const heroText = document.querySelector('.animated-text');
    const starsContainer = document.querySelector('.stars-container');
    const arrowsContainer = document.querySelector('.arrows-container');
    const socialLinks = document.querySelectorAll('.social-link');

    // Theme toggle functionality
    lightModeBtn.addEventListener('click', () => {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    });

    darkModeBtn.addEventListener('click', () => {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    });

    // Function to create and animate falling words
    function createFallingWords() {
        const words = ['Designer', 'Graphic', 'Artist'];
        const hero = document.querySelector('.hero');

        words.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.textContent = word;
            wordElement.classList.add('falling-word');
            
            // Position the word above the viewport
            const startX = Math.random() * window.innerWidth;
            const startY = -50; // Start above the viewport
            
            wordElement.style.left = `${startX}px`;
            wordElement.style.top = `${startY}px`;
            
            hero.appendChild(wordElement);

            // Calculate the final position to land on "Salt & Soils"
            const heroTextRect = heroText.getBoundingClientRect();
            const finalX = heroTextRect.left + Math.random() * heroTextRect.width;
            const finalY = heroTextRect.top + heroTextRect.height;

            // Animate the word falling
            animateWord(wordElement, startX, startY, finalX, finalY);
        });
    }

    function animateWord(element, startX, startY, finalX, finalY) {
        const duration = 3000; // 3 seconds
        let startTime = null;

        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const currentX = startX + (finalX - startX) * progress;
            const currentY = startY + (finalY - startY) * progress;

            element.style.left = `${currentX}px`;
            element.style.top = `${currentY}px`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Word has reached its final position
                element.style.transition = 'all 0.3s ease-out';
                element.style.left = `${finalX}px`;
                element.style.top = `${finalY}px`;
            }
        }

        requestAnimationFrame(animate);
    }

    // Function to create stars
    function createStars() {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            starsContainer.appendChild(star);
        }
    }

    // Function to create arrows
    function createArrows() {
        for (let i = 0; i < 3; i++) {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            arrow.style.left = `${Math.random() * 100}%`;
            arrowsContainer.appendChild(arrow);
        }
    }

    // Function to add hover effect to social links
    function addSocialLinkHoverEffect() {
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.classList.add('hovered');
            });
            link.addEventListener('mouseleave', () => {
                link.classList.remove('hovered');
            });
        });
    }

    // Call these functions when the page loads
    window.addEventListener('load', () => {
        createFallingWords();
        createStars();
        createArrows();
        addSocialLinkHoverEffect();
    });
});