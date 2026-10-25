// Navigation, theme preferences and project filters. No animation hides content.
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const mobileQuery = window.matchMedia('(max-width: 991px)');
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
let initialTheme = 'light';
try { initialTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch {}
setTheme(initialTheme);
themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('theme', theme); } catch {}
});
function setMenu(open, restoreFocus = false) {
    navMenu.classList.toggle('active', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navMenu.inert = mobileQuery.matches && !open;
    if (restoreFocus) hamburger.focus();
}
hamburger.addEventListener('click', () => setMenu(hamburger.getAttribute('aria-expanded') !== 'true'));
mobileQuery.addEventListener('change', () => setMenu(false));
setMenu(false);
navLinks.forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
    }
}));
document.addEventListener('click', event => {
    if (!event.target.closest('.navbar')) setMenu(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) setMenu(false, true);
});
const filters = document.querySelector('.project-filters');
const cards = [...document.querySelectorAll('.project-card')];
const projectCount = document.getElementById('project-count');
filters.hidden = false;
function filterProjects(category) {
    let count = 0;
    cards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) count++;
    });
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    projectCount.textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
}
filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (button) filterProjects(button.dataset.filter);
});
filterProjects('all');
const sections = [...document.querySelectorAll('main > section[id]')];
let scrollPending = false;
function updateNavigation() {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 30);
    const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= 140);
    navLinks.forEach(link => {
        const active = current && link.hash === '#' + current.id;
        link.classList.toggle('active', Boolean(active));
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
    scrollPending = false;
}
window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
updateNavigation();
contactForm.addEventListener('submit', handleFormSubmission);

async function handleFormSubmission(e) {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton.disabled) return;
    const status = document.getElementById('contact-status');
    const formData = new FormData(contactForm);
    for (const field of ['name', 'email', 'subject', 'message']) {
        formData.set(field, String(formData.get(field) || '').trim());
    }
    const errors = validateForm(formData);
    if (errors.length) {
        status.textContent = errors[0];
        return;
    }
    const originalText = submitButton.textContent;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    contactForm.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message...';
    formData.set('_subject', 'Portfolio enquiry: ' + formData.get('subject'));
    formData.set('_replyto', formData.get('email'));
    formData.set('_url', window.location.href);
    try {
        const response = await fetch(contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
            signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || !(result.success === true || result.success === 'true')) {
            throw new Error('Submission was not accepted');
        }
        status.textContent = 'Your message was submitted. Thank you for getting in touch!';
        contactForm.reset();
        document.getElementById('contact-success').showModal();
    } catch (error) {
        status.textContent = error.name === 'AbortError'
            ? 'The request timed out. Your message is still here; please try again or email prabhathdilshan2001@gmail.com.'
            : 'Unable to confirm submission. Your message is still here; please try again or email prabhathdilshan2001@gmail.com.';
    } finally {
        clearTimeout(timeout);
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        contactForm.setAttribute('aria-busy', 'false');
    }
}

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
