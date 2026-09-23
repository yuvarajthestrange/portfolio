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
    try {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            if (sectionId) {
                const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
                if (link) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('text-red');
                        link.classList.remove('text-white/80');
                    } else {
                        link.classList.remove('text-red');
                        link.classList.add('text-white/80');
                    }
                }
            }
        });
    } catch (e) {
        console.error("Highlight scroll error caught:", e);
    }
});

// Interactive Console Module Selection
const moduleButtons = document.querySelectorAll('.device-module-btn');
const terminalHeading = document.getElementById('terminal-heading');
const terminalScreen = document.getElementById('terminal-screen');

const moduleLogs = {
    architecture: {
        heading: "Full Architecture Schematic",
        content: `
            <pre class="text-white/85 font-mono text-[9px] md:text-[10px] leading-tight select-none whitespace-pre">
                 WINDOWS ENDPOINT
                       │
                    Sysmon
                       │
                       ▼
                 ┌───────────┐
                 │   Wazuh   │
                 │    SIEM   │
                 └─────┬─────┘
                       │
                  Detection
                       │
                       ▼
                  Alert Triage
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   Threat Intelligence         Snort
   VirusTotal / AbuseIPDB      Network Detection
          │                         │
          └────────────┬────────────┘
                       ▼
                   Investigation
                       │
                       ▼
                    TheHive
                       │
                       ▼
               Incident Response</pre>
        `
    },
    sysmon: {
        heading: "Sysmon Endpoint Telemetry",
        content: `
            <div class="text-white/40">&gt; Event ID 1: Process Creation Detected</div>
            <div class="text-white/60">&gt; UtcTime: 2026-09-23 10:52:14.301</div>
            <div class="text-white/60">&gt; ProcessGuid: {a1b2c3d4-e5f6-7890-1234-56789abcdef0}</div>
            <div class="text-red/90">&gt; Image: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe</div>
            <div class="text-yellow-400">&gt; CommandLine: powershell.exe -enc SQBFAFgAIAAoAE4AZQB3...</div>
            <div class="text-white/60">&gt; ParentImage: C:\\Windows\\explorer.exe</div>
            <div class="text-red/90">&gt; [ALERT] Suspicious obfuscated payload execution logged by Sysmon.</div>
        `
    },
    wazuh: {
        heading: "Wazuh SIEM Detection Rule",
        content: `
            <div class="text-white/40">&gt; Wazuh Rule ID: 100201 [Severity Level: 12 - HIGH]</div>
            <div class="text-white/60">&gt; Rule Description: PowerShell executed with encoded command-line</div>
            <div class="text-red/90">&gt; MITRE ATT&amp;CK: T1059.001 (Command &amp; Scripting Interpreter)</div>
            <div class="text-white/60">&gt; Agent: WIN-ENDPOINT-01 (192.168.1.105)</div>
            <div class="text-yellow-400">&gt; Correlation: Child process spawned from user-level interactive shell</div>
            <div class="text-red/90">&gt; Action: Forwarding to Alert Triage engine for automated enrichment.</div>
        `
    },
    thehive: {
        heading: "TheHive Case Management & IR",
        content: `
            <div class="text-white/40">&gt; Opening Incident Case #104 in TheHive...</div>
            <div class="text-white/60">&gt; Title: [INCIDENT] Malicious PowerShell Execution on Windows Endpoint</div>
            <div class="text-red/90">&gt; Threat Intel: VirusTotal Malicious Score (48/72 vendors)</div>
            <div class="text-yellow-400">&gt; Snort Alert: Outbound C2 beaconing detected to 185.220.101.5:4444</div>
            <div class="text-white/60">&gt; Playbook: Host Isolation &amp; Memory Dump Initiated</div>
            <div class="text-red/90">&gt; Status: Escalated to SOC Tier 2 Analyst. Host contained.</div>
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
            const totalSteps = 50;
            const increment = Math.ceil(cleanTarget / totalSteps);
            const stepTime = duration / totalSteps;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= cleanTarget) {
                    count = cleanTarget;
                    clearInterval(timer);
                }
                counter.textContent = count + (isPlus ? '+' : '');
            }, stepTime);
        });
    };

    // Scroll Counter Activator Fallback
    let countersRun = false;
    const checkCountersScroll = () => {
        if (countersRun) return;
        const counterCard = document.querySelector('.counter-card');
        if (counterCard) {
            const rect = counterCard.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                runCounters();
                countersRun = true;
                window.removeEventListener('scroll', checkCountersScroll);
            }
        }
    };
    window.addEventListener('scroll', checkCountersScroll);
    window.addEventListener('resize', checkCountersScroll);
    
    // Run once on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkCountersScroll);
    } else {
        checkCountersScroll();
    }
}

// Toggle Nav Bar Background on Scroll
const navShell = document.querySelector('.nav-shell');
if (navShell) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > 20) {
            navShell.classList.add('is-scrolled');
        } else {
            navShell.classList.remove('is-scrolled');
        }
    });
}

// Scroll Reveal Engine
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if (revealElements.length > 0) {
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        revealElements.forEach(el => {
            if (!el.classList.contains('active')) {
                const rect = el.getBoundingClientRect();
                // Trigger when 10% of the element is visible
                const triggerPoint = windowHeight - 40;
                if (rect.top <= triggerPoint && rect.bottom >= 0) {
                    el.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', revealOnScroll);
    } else {
        revealOnScroll();
    }
}
