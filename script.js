/**
 * SAMUYEL DAMMU - PORTFOLIO INTERACTIVITY, THEME TOGGLE, LEGAL MODALS & COOKIE CONSENT
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Light / Dark Theme Management
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('samuyel-portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('samuyel-portfolio-theme', newTheme);
        });
    }

    // -------------------------------------------------------------
    // 2. Navigation & Mobile Menu
    // -------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky / Glass Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    // Smooth Scroll & Auto-Close Mobile Menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    if (navMenu && navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                    const navHeight = navbar ? navbar.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - navHeight - 10,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 3. Active Navigation Link on Scroll (ScrollSpy)
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollY = window.pageYOffset + 140;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                if (correspondingLink) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightActiveSection);

    // -------------------------------------------------------------
    // 4. Typing Effect in Hero Subtitle
    // -------------------------------------------------------------
    const roles = [
        "AI & ML Engineering Graduate",
        "Python Full Stack Developer",
        "Prompt Engineering Specialist",
        "Multi-AI Applications Creator"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedRoleElement = document.querySelector('.typed-role');

    function typeEffect() {
        if (!typedRoleElement) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 350;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    setTimeout(typeEffect, 600);

    // -------------------------------------------------------------
    // 5. Skills Bar Animation via Intersection Observer
    // -------------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');

    if (skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        skillsObserver.observe(skillsSection);
    }

    // -------------------------------------------------------------
    // 6. 3D Tilt Effect on Cards (Desktop only)
    // -------------------------------------------------------------
    if (window.innerWidth > 900) {
        const tiltCards = document.querySelectorAll('.project-card, .cert-card, .internship-card, .achievement-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            });
        });
    }

    // -------------------------------------------------------------
    // 7. Resume Button Handler
    // -------------------------------------------------------------
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const resumeUrl = 'https://drive.google.com/file/d/1eUeRvN4P1bRxnl7KmpOgFSY9dNwzw0y1/view?usp=sharing';
            window.open(resumeUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // -------------------------------------------------------------
    // 8. Cookie & Local Storage Consent Banner Initialization
    // -------------------------------------------------------------
    const cookieConsent = localStorage.getItem('samuyel-cookie-consent');
    if (!cookieConsent) {
        setTimeout(() => {
            const banner = document.getElementById('cookieBanner');
            if (banner) {
                banner.classList.add('visible');
            }
        }, 1200);
    }

    // -------------------------------------------------------------
    // 9. Interactive Floating Particles Canvas
    // -------------------------------------------------------------
    createCanvasParticles();
});

// -------------------------------------------------------------
// Cookie Consent Action
// -------------------------------------------------------------
function acceptCookies() {
    localStorage.setItem('samuyel-cookie-consent', 'accepted');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('visible');
    }
}

// -------------------------------------------------------------
// Global Certificate Lightbox Functions
// -------------------------------------------------------------
function openCertModal(imageUrl, title) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImage');
    const modalTitle = document.getElementById('certModalTitle');

    if (modal && modalImg) {
        modalImg.src = imageUrl;
        if (modalTitle) modalTitle.textContent = title || 'Certificate View';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// -------------------------------------------------------------
// Legal Policy Modal Content & Handlers
// -------------------------------------------------------------
const policyData = {
    privacy: {
        title: "Privacy Policy",
        content: `
            <h4>1. Overview</h4>
            <p>Welcome to Samuyel Dammu's professional portfolio. Your privacy is paramount. This portfolio is designed to showcase engineering projects, academic credentials, and professional skills without conducting intrusive personal surveillance or data monetization.</p>
            
            <h4>2. Information We Collect</h4>
            <p>This website does not require account creation, registration, or financial transactions. We do not automatically collect personal identifying information (PII). When you choose to contact via email, the information you provide (name, email address, message contents) is sent directly via your chosen email client.</p>
            
            <h4>3. Use of Information</h4>
            <p>Any communication received is used strictly for responding to job opportunities, freelance inquiries, project collaborations, or technical questions. Your contact information is never sold, leased, or distributed to third-party marketers or data brokers.</p>
            
            <h4>4. Local Storage Usage</h4>
            <p>This site utilizes modern web browser LocalStorage solely to retain your visual user interface preferences (Light Mode / Dark Mode toggle) and record that you have acknowledged the cookie/storage notice. No tracking or advertising identifiers are stored.</p>
            
            <h4>5. External Links</h4>
            <p>This portfolio contains links to external platforms such as GitHub, LinkedIn, Google Cloud, Netlify, Credly, and Columbia University. We are not responsible for the privacy policies or practices of external services.</p>
            
            <h4>6. Contact for Inquiries</h4>
            <p>For any questions regarding privacy on this portfolio, please contact: <strong>dammusamuyel123@gmail.com</strong>.</p>
        `
    },
    terms: {
        title: "Terms & Conditions",
        content: `
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing or browsing this portfolio website, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part, please exit the site.</p>
            
            <h4>2. Permitted Use</h4>
            <p>This site is intended for prospective employers, recruiters, technical collaborators, and academic peers to review Samuyel Dammu's software projects, academic history, and technical proficiencies.</p>
            
            <h4>3. Intellectual Property Rights</h4>
            <p>All original code samples, system architectures, UI designs, and written project documentation authored by Samuyel Dammu remain his intellectual property. Code shared via public GitHub repositories is subject to the corresponding open-source license detailed in each respective repository.</p>
            
            <h4>4. Disclaimer of Warranties</h4>
            <p>All portfolio information and deployed web application demonstrations (e.g. AI Portfolio Developer, AI DECK Hub, Sign Speak, Rain Watch) are provided on an "as-is" and "as-available" basis for demonstration and evaluation purposes without warranties of any kind.</p>
            
            <h4>5. Limitation of Liability</h4>
            <p>Under no circumstances shall the author be held liable for any damages arising out of the use, inability to use, or reliance on materials or external links present on this site.</p>
        `
    },
    cookies: {
        title: "Cookie & Local Storage Policy",
        content: `
            <h4>1. Transparent Storage Practices</h4>
            <p>This portfolio complies with global privacy principles by avoiding non-essential tracking cookies and third-party advertising cookies.</p>
            
            <h4>2. What We Store</h4>
            <ul>
                <li><strong>samuyel-portfolio-theme:</strong> Saves your selected color theme preference ('dark' or 'light') so your choice is maintained across page visits.</li>
                <li><strong>samuyel-cookie-consent:</strong> Records that you have seen and accepted the informational storage banner so it does not repeatedly obscure your screen.</li>
            </ul>
            
            <h4>3. Managing Your Storage</h4>
            <p>You can clear or disable LocalStorage at any time directly through your web browser's Developer Tools or Settings under "Privacy and Security -> Cookies and Site Data".</p>
        `
    },
    copyright: {
        title: "Copyright & Attribution Notice",
        content: `
            <h4>1. Original Works Copyright</h4>
            <p>&copy; 2026 Samuyel Dammu. All rights reserved. The personal portfolio layout, visual styling, original custom graphics, and documentation are protected by applicable copyright and intellectual property laws.</p>
            
            <h4>2. Third-Party Trademarks & Badges</h4>
            <p>This portfolio references reputable companies and academic institutions solely to truthfully identify completed coursework, certifications, and virtual internships:</p>
            <ul>
                <li><strong>Columbia University & OpenAI:</strong> "Prompt Engineering and Programming with OpenAI" credential verified through Columbia Engineering Plus.</li>
                <li><strong>IBM:</strong> "Job Application Essentials" and "IBM SkillsBuild" ambassador credentials verified through Credly.</li>
                <li><strong>Simplilearn:</strong> "Introduction to Generative AI Studio" course certification.</li>
                <li><strong>Google, Zscaler, AICTE, & Edunet Foundation:</strong> Virtual internship training partner programs.</li>
            </ul>
            <p>All trademarks, service marks, and trade names are the property of their respective holders.</p>
        `
    }
};

function openPolicyModal(type) {
    const modal = document.getElementById('policyModal');
    const modalTitle = document.getElementById('policyModalTitle');
    const modalBody = document.getElementById('policyModalBody');
    const data = policyData[type];

    if (modal && modalTitle && modalBody && data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modals on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
        closePolicyModal();
    }
});

// -------------------------------------------------------------
// Canvas Interactive Particle Mesh
// -------------------------------------------------------------
function createCanvasParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'ambientCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.45';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 40);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6 + 0.6,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(139, 92, 246, '
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '0.5)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}