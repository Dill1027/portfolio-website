// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Navigation
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar Background on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        }
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
    }
}

// Form Handling
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Enhanced validation
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
        showNotification(validationErrors[0], 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
    
    // Simulate API call delay
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Download CV functionality
function initDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // You can replace this with your actual CV URL or generate a PDF
            const cvContent = generateCVContent();
            downloadPDF(cvContent, 'Prabhath_Dilshan_CV.pdf');
            
            // Show download notification
            showNotification('CV download started!', 'success');
        });
    }
}

function generateCVContent() {
    return `
        PRABHATH DILSHAN ABEYSINGHE
        Full Stack Developer & UI/UX Designer
        
        CONTACT INFORMATION
        Email: prabhathdilshan2001@gmail.com
        Phone: 0765799580 / 0705799581
        Location: Kurunegala, Sri Lanka
        LinkedIn: linkedin.com/in/prabhath-dilshan-abeysinghe-86a672313
        GitHub: github.com/Dill1027
        
        EDUCATION
        IT Undergraduate at SLIIT
        
        SKILLS
        Programming Languages: JavaScript, Python, Java, C/C++, SQL, HTML & CSS, PHP, TypeScript
        Frameworks & Libraries: React.js, Node.js, Express.js, MongoDB, Firebase, Bootstrap, Tailwind CSS, MySQL
        Tools & Platforms: Git & GitHub, Postman, WordPress, Excel, IntelliJ IDEA, VS Code, Zoho Tools
        
        EXPERIENCE
        4+ Years in Web Development
        10+ Projects Completed
        8+ Technologies Mastered
        
        FEATURED PROJECT
        Academic Scheduler - Full-stack web application for automated timetable creation
        Technologies: React, Node.js, MongoDB, OpenAI API, Dialogflow
        Live Demo: https://acedemic-sheduler.netlify.app/
        GitHub: https://github.com/Dill1027/academic-scheduler
    `;
}

function downloadPDF(content, filename) {
    // Simple text download - you can enhance this with a proper PDF library
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Enhanced Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('testimonial-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Math.random() * 300);
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, Math.random() * 200);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.testimonial-card, .skill-item, .project-card, .about-card, .contact-item'
    );
    
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing animation for hero subtitle
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle && window.innerWidth > 768) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid var(--primary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    subtitle.style.borderRight = subtitle.style.borderRight === 'none' 
                        ? '2px solid var(--primary-color)' 
                        : 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles if they don't exist
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 500;
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-success {
                background: var(--primary-color);
            }
            
            .notification-info {
                background: var(--accent-color);
            }
            
            .notification-error {
                background: #ef4444;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name') || formData.get('name').length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.get('email') || !isValidEmail(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('subject') || formData.get('subject').length < 5) {
        errors.push('Subject must be at least 5 characters long');
    }
    
    if (!formData.get('message') || formData.get('message').length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const animationElements = document.querySelectorAll('.skill-item, .project-card, .about-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animationElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing Animation for Hero Section
function setupTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const roles = [
        'Full Stack Developer',
        'MERN Stack Developer',
        'UI/UX Designer',
        'Web Developer',
        'Software Engineer'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            heroSubtitle.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing animation after 1 second
    setTimeout(typeEffect, 1000);
}

// Add some dynamic stats counting
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    const duration = 2000; // 2 seconds
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / (duration / 16); // 60fps
                
                const updateCounter = () => {
                    if (currentValue < finalValue) {
                        currentValue += increment;
                        target.textContent = Math.ceil(currentValue) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window;
    
    if (isMobile || isTouch) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Disable hover effects on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) {
                .project-card:hover,
                .testimonial-card:hover,
                .blog-card:hover,
                .skill-item:hover {
                    transform: none !important;
                    box-shadow: var(--shadow-light) !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Optimize touch interactions
        document.addEventListener('touchstart', function() {}, {passive: true});
        document.addEventListener('touchmove', function() {}, {passive: true});
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
            // Re-calculate any position-dependent elements
            updateActiveNavLink();
        }, 100);
    });
    
    // Prevent zoom on input focus for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
            input.addEventListener('blur', function() {
                this.style.fontSize = '';
            });
        });
    }
}

// Optimize scroll performance for mobile
function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollElements() {
        updateActiveNavLink();
        handleNavbarScroll();
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    // Use passive listeners for better performance
    window.addEventListener('scroll', requestScrollUpdate, {passive: true});
}

// Enhanced mobile navigation
function enhanceMobileNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        const hamburger = document.querySelector('.hamburger');
        
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const hamburger = document.querySelector('.hamburger');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });
}

// Optimize images for mobile
function optimizeImagesForMobile() {
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (profilePhoto && window.innerWidth <= 480) {
        // Add loading optimization for mobile
        profilePhoto.loading = 'lazy';
        profilePhoto.style.willChange = 'transform';
    }
}

// Enhanced touch feedback
function addTouchFeedback() {
    const touchElements = document.querySelectorAll('.btn, .social-link, .project-card, .testimonial-card, .blog-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, {passive: true});
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
            }, 150);
        }, {passive: true});
    });
}

// Viewport height fix for mobile browsers
function fixMobileViewportHeight() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupTypingAnimation();
    animateStats();
    initDownloadCV();
    initScrollAnimations();
    initTypingAnimation();
    initMobileOptimizations();
    optimizeScrollPerformance();
    enhanceMobileNavigation();
    optimizeImagesForMobile();
    addTouchFeedback();
    fixMobileViewportHeight();
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Scroll Events
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleNavbarScroll();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
});

// Add CSS for mobile menu (since we need to add it dynamically)
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: var(--bg-primary);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            border-top: 1px solid var(--border-color);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-item {
            margin: 1rem 0;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
