// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for smoother transitions
    rootMargin: '-50px 0px -50px 0px' // Adjust trigger area
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Calculate opacity based on intersection ratio
        const opacity = Math.min(entry.intersectionRatio * 2, 1);
        const translateY = 20 * (1 - entry.intersectionRatio);
        
        if (entry.isIntersecting) {
            entry.target.style.opacity = opacity;
            entry.target.style.transform = `translateY(${translateY}px)`;
        } else {
            // Keep elements visible if they're above the viewport
            const boundingRect = entry.target.getBoundingClientRect();
            if (boundingRect.top < 0) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Apply smooth transitions to elements
document.querySelectorAll('.historical-document, .correspondence').forEach(el => {
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Terminal typing effect
class TerminalText {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.current = '';
        this.position = 0;
        this.isRunning = false;
    }

    type() {
        if (this.position < this.text.length) {
            this.current += this.text.charAt(this.position);
            this.element.innerHTML = this.current + '<span class="cursor"></span>';
            this.position++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isRunning = false;
            this.element.innerHTML = this.current;
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.type();
        }
    }
}

// Initialize typing effects
document.addEventListener('DOMContentLoaded', () => {
    // Fade in terminal
    const terminal = document.querySelector('.editorial');
    setTimeout(() => {
        terminal.style.opacity = '1';
        terminal.style.transform = 'translateY(0)';
    }, 300);

    // Initialize terminal messages with delay
    const prompts = document.querySelectorAll('.prompt:not(.system-msg)');
    prompts.forEach((prompt, index) => {
        const text = prompt.textContent.trim();
        prompt.textContent = '';
        setTimeout(() => {
            new TerminalText(prompt, text, 30).start();
        }, index * 1000 + 800);
    });
});

// Smooth scroll handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});