// Cursor Follower
const follower = document.querySelector('.cursor-follower');
if (follower) {
    document.addEventListener('mousemove', (e) => {
        follower.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    });
}

// Navigation Link Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav-link[href*=${sectionId}]`);

        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('text-red');
                link.classList.remove('text-white/80');
            } else {
                link.classList.remove('text-red');
                link.classList.add('text-white/80');
            }
        }
    });
});

// Interactive Console Module Selection
const moduleButtons = document.querySelectorAll('.device-module-btn');
const terminalHeading = document.getElementById('terminal-heading');
const terminalScreen = document.getElementById('terminal-screen');

const moduleLogs = {
    scan: {
        heading: "Target Scanning",
        content: `
            <div class="text-white/40">&gt; Initializing NMAP target scan...</div>
            <div class="text-white/60">&gt; Target host: 192.168.1.1</div>
            <div class="text-red/90">&gt; Port 80/tcp (HTTP) - OPEN (Apache 2.4.41)</div>
            <div class="text-red/90">&gt; Port 22/tcp (SSH) - OPEN (OpenSSH 8.2p1)</div>
            <div class="text-white/80">&gt; Scan complete. 2 open ports discovered.</div>
        `
    },
    owasp: {
        heading: "OWASP Vulnerability Scan",
        content: `
            <div class="text-white/40">&gt; Auditing target web parameter inputs...</div>
            <div class="text-red/90">&gt; [CRITICAL] SQLi vulnerability identified at parameter 'id'</div>
            <div class="text-yellow-400">&gt; [WARNING] Missing Secure cookie attribute on session cookies</div>
            <div class="text-white/60">&gt; [INFO] XSS validation passed successfully</div>
            <div class="text-red/90">&gt; Severity: HIGH. Mitigation recommended.</div>
        `
    },
    code: {
        heading: "APK Static Analyzer",
        content: `
            <div class="text-white/40">&gt; Decompiling mobile build package...</div>
            <div class="text-white/60">&gt; Found hardcoded API keys in class 'SecureConfig'</div>
            <div class="text-red/90">&gt; [FLAG] Exposed AWS endpoint detected in config string</div>
            <div class="text-yellow-400">&gt; [WARNING] Dexguard obfuscation not fully implemented</div>
            <div class="text-white/80">&gt; Analysis done. 2 security flaws flagged.</div>
        `
    }
};

if (moduleButtons && terminalHeading && terminalScreen) {
    moduleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            moduleButtons.forEach(b => {
                b.classList.remove('border-red', 'bg-red/5', 'text-white', 'active');
                b.classList.add('border-white/10', 'bg-white/[0.02]', 'text-white/60');
            });

            // Add active classes
            btn.classList.remove('border-white/10', 'bg-white/[0.02]', 'text-white/60');
            btn.classList.add('border-red', 'bg-red/5', 'text-white', 'active');

            // Update terminal logs
            const mod = btn.dataset.module;
            if (moduleLogs[mod]) {
                terminalHeading.textContent = moduleLogs[mod].heading;
                terminalScreen.innerHTML = moduleLogs[mod].content;
            }
        });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Transmitting payload...</span>`;

        const formData = new FormData(contactForm);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            const res = await response.json();
            if (response.status === 200) {
                alert("Transmission Successful! Your encrypted message has been routed.");
                contactForm.reset();
            } else {
                console.error(res);
                alert("Transmission Failed: " + res.message);
            }
        })
        .catch(error => {
            console.error(error);
            alert("Transmission Error: Check your network connectivity.");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
}

// Counter Animations on Viewport Entry
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const runCounters = () => {
        counters.forEach(counter => {
            const target = counter.dataset.value;
            const isPlus = target.includes('+');
            const cleanTarget = parseInt(target.replace('+', ''), 10);
            let count = 0;
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / cleanTarget));
            
            const timer = setInterval(() => {
                count++;
                counter.textContent = count + (isPlus && count >= cleanTarget ? '+' : '');
                if (count >= cleanTarget) {
                    clearInterval(timer);
                }
            }, stepTime || 20);
        });
    };

    // Simple observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.counter-card').parentElement);
}

// Toggle Nav Bar Background on Scroll
const navShell = document.querySelector('.nav-shell');
if (navShell) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navShell.classList.add('is-scrolled');
        } else {
            navShell.classList.remove('is-scrolled');
        }
    });
}

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}
