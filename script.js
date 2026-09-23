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
            <pre class="soc-ascii-art">
                 <span style="color:#38bdf8;font-weight:bold;">┌───────────────────────────┐</span>
                 <span style="color:#38bdf8;font-weight:bold;">│     WINDOWS ENDPOINT      │</span>
                 <span style="color:#38bdf8;font-weight:bold;">└─────────────┬─────────────┘</span>
                               <span style="color:#38bdf8;">│</span>
                     <span style="color:#fbbf24;font-weight:600;">[ Sysmon Agent ]</span>
                               <span style="color:#38bdf8;">│</span>
                               <span style="color:#38bdf8;">▼</span>
                 <span style="color:#ff1e1e;font-weight:bold;">╔═══════════════════════════╗</span>
                 <span style="color:#ff1e1e;font-weight:bold;">║        WAZUH SIEM         ║</span>
                 <span style="color:#ff1e1e;font-weight:bold;">╚═════════════╤═════════════╝</span>
                               <span style="color:#ff1e1e;">│</span>
                   <span style="color:#ff4d4d;font-weight:600;">[ Detection Trigger ]</span>
                               <span style="color:#ff1e1e;">│</span>
                               <span style="color:#ff1e1e;">▼</span>
                 <span style="color:#fbbf24;font-weight:bold;">┌───────────────────────────┐</span>
                 <span style="color:#fbbf24;font-weight:bold;">│       ALERT TRIAGE        │</span>
                 <span style="color:#fbbf24;font-weight:bold;">└─────────────┬─────────────┘</span>
                               <span style="color:#fbbf24;">│</span>
              <span style="color:rgba(255,255,255,0.45);">┌────────────────┴────────────────┐</span>
              <span style="color:rgba(255,255,255,0.45);">│                                 │</span>
              <span style="color:rgba(255,255,255,0.45);">▼                                 ▼</span>
  <span style="color:#fb923c;font-weight:bold;">┌───────────────────────┐</span>         <span style="color:#60a5fa;font-weight:bold;">┌───────────────────────┐</span>
  <span style="color:#fb923c;font-weight:bold;">│  THREAT INTELLIGENCE  │</span>         <span style="color:#60a5fa;font-weight:bold;">│      SNORT NIDS       │</span>
  <span style="color:#fb923c;">│ VirusTotal / AbuseIPDB│</span>         <span style="color:#60a5fa;">│   Network Detection   │</span>
  <span style="color:#fb923c;font-weight:bold;">└───────────┬───────────┘</span>         <span style="color:#60a5fa;font-weight:bold;">└───────────┬───────────┘</span>
              <span style="color:rgba(255,255,255,0.45);">│                                 │</span>
              <span style="color:rgba(255,255,255,0.45);">└────────────────┬────────────────┘</span>
                               <span style="color:rgba(255,255,255,0.45);">│</span>
                    <span style="color:#c084fc;font-weight:600;">[ Evidence Triage ]</span>
                               <span style="color:#c084fc;">│</span>
                               <span style="color:#c084fc;">▼</span>
                 <span style="color:#c084fc;font-weight:bold;">┌───────────────────────────┐</span>
                 <span style="color:#c084fc;font-weight:bold;">│          THEHIVE          │</span>
                 <span style="color:#c084fc;font-weight:bold;">└─────────────┬─────────────┘</span>
                               <span style="color:#c084fc;">│</span>
                    <span style="color:#4ade80;font-weight:600;">[ Automated SOAR ]</span>
                               <span style="color:#4ade80;">│</span>
                               <span style="color:#4ade80;">▼</span>
                 <span style="color:#4ade80;font-weight:bold;">╔═══════════════════════════╗</span>
                 <span style="color:#4ade80;font-weight:bold;">║     INCIDENT RESPONSE     ║</span>
                 <span style="color:#4ade80;font-weight:bold;">╚═══════════════════════════╝</span></pre>
        `
    },
    sysmon: {
        heading: "Sysmon Endpoint Telemetry",
        content: `
            <div class="soc-log-entry">
                <div class="soc-log-meta">
                    <span class="soc-log-badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">SYSMON EVENT 1</span>
                    <span style="color: rgba(255,255,255,0.45);">2026-09-23 10:52:14.301 UTC</span>
                    <span style="margin-left: auto; color: rgba(255,255,255,0.35);">CHANNEL: Microsoft-Windows-Sysmon/Operational</span>
                </div>
                <div class="soc-log-body">
                    <div class="soc-log-row"><span class="soc-log-key">ProcessGuid:</span><span class="soc-log-val" style="color: rgba(255,255,255,0.75);">{a1b2c3d4-e5f6-7890-1234-56789abcdef0}</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">ProcessId:</span><span class="soc-log-val" style="color: #ffffff; font-weight: bold;">4892</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Image:</span><span class="soc-log-val" style="color: #ff4d4d; font-weight: bold;">C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">CommandLine:</span><span class="soc-log-val" style="color: #fbbf24; background: rgba(251, 191, 36, 0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(251, 191, 36, 0.25);">powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgAIAAoAE4AZQB3...</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">ParentImage:</span><span class="soc-log-val" style="color: rgba(255,255,255,0.85);">C:\\Windows\\explorer.exe</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">User:</span><span class="soc-log-val" style="color: #38bdf8;">CORP-WIN10\\Administrator</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Hashes:</span><span class="soc-log-val" style="color: rgba(255,255,255,0.6);">SHA256=7E84B1849D69647C85C5B0992F78D326AA5987BE...</span></div>
                </div>
                <div class="soc-log-alert" style="color: #ff4d4d; border-top: 1px solid rgba(255, 30, 30, 0.2); padding-top: 8px; margin-top: 4px; display: flex; align-items: center; gap: 8px;">
                    <span class="h-2 w-2 rounded-full bg-red animate-ping" style="display:inline-block; width:8px; height:8px; border-radius:99px; background:#ff1e1e;"></span>
                    <span><strong>[TELEMETRY PIPELINE]</strong> Forwarded to Wazuh SIEM Agent via EventChannel Forwarder.</span>
                </div>
            </div>
        `
    },
    wazuh: {
        heading: "Wazuh SIEM Detection Rule",
        content: `
            <div class="soc-log-entry">
                <div class="soc-log-meta">
                    <span class="soc-log-badge" style="background: rgba(255, 30, 30, 0.2); color: #ff4d4d; border: 1px solid rgba(255, 30, 30, 0.45);">ALERT LEVEL 12</span>
                    <span style="color: rgba(255,255,255,0.45);">RULE ID: 100201</span>
                    <span style="margin-left: auto; color: rgba(255,255,255,0.35);">ENGINE: Wazuh Core 4.8.x</span>
                </div>
                <div class="soc-log-body">
                    <div class="soc-log-row"><span class="soc-log-key">Rule Title:</span><span class="soc-log-val" style="color: #ffffff; font-weight: bold;">Suspicious Obfuscated PowerShell Command Execution</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">MITRE ATT&amp;CK:</span><span class="soc-log-val" style="color: #ff4d4d; font-weight: bold; background: rgba(255, 30, 30, 0.12); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(255, 30, 30, 0.3);">T1059.001 &middot; Execution / PowerShell</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Agent / IP:</span><span class="soc-log-val" style="color: #38bdf8;">WIN-ENDPOINT-01 (192.168.1.105)</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Decoder:</span><span class="soc-log-val" style="color: rgba(255,255,255,0.75);">windows-eventchannel / sysmon</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Detection Logic:</span><span class="soc-log-val" style="color: #fbbf24;">Regex match: -enc|-encodedcommand (entropy &gt; 4.5)</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Correlation:</span><span class="soc-log-val" style="color: rgba(255,255,255,0.75);">Interactive user session spawned detached process</span></div>
                </div>
                <div class="soc-log-alert" style="color: #fbbf24; border-top: 1px solid rgba(251, 191, 36, 0.2); padding-top: 8px; margin-top: 4px; display: flex; align-items: center; gap: 8px;">
                    <span class="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" style="display:inline-block; width:8px; height:8px; border-radius:99px; background:#fbbf24;"></span>
                    <span><strong>[TRIAGE TRIGGER]</strong> Dispatched to Automated Alert Triage &amp; Parallel IOC Enrichment.</span>
                </div>
            </div>
        `
    },
    thehive: {
        heading: "TheHive Case Management & IR",
        content: `
            <div class="soc-log-entry">
                <div class="soc-log-meta">
                    <span class="soc-log-badge" style="background: rgba(192, 132, 252, 0.2); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.4);">CASE #104</span>
                    <span style="color: rgba(255,255,255,0.45);">SEVERITY: HIGH [TLP:AMBER]</span>
                    <span style="margin-left: auto; color: rgba(255,255,255,0.35);">SOAR: TheHive 5.x</span>
                </div>
                <div class="soc-log-body">
                    <div class="soc-log-row"><span class="soc-log-key">Case Title:</span><span class="soc-log-val" style="color: #ffffff; font-weight: bold;">[INCIDENT] Obfuscated PowerShell C2 Callback Incursion</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Lead Analyst:</span><span class="soc-log-val" style="color: rgba(255,255,255,0.85);">Yuvaraj C (Tier-2 SOC Analyst)</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">VirusTotal Intel:</span><span class="soc-log-val" style="color: #ff4d4d; font-weight: bold;">48/72 Antivirus Engines Flagged Malicious [Score: 94%]</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">AbuseIPDB Score:</span><span class="soc-log-val" style="color: #ff4d4d; font-weight: bold;">100% Malicious Confidence (185.220.101.5)</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Snort NIDS Rule:</span><span class="soc-log-val" style="color: #60a5fa;">SID:2024101 [ET TROJAN Potential Cobalt Strike Beacon]</span></div>
                    <div class="soc-log-row"><span class="soc-log-key">Containment Status:</span><span class="soc-log-val" style="color: #4ade80; font-weight: bold;">Host Isolated via Wazuh Active Response &middot; Process Terminated</span></div>
                </div>
                <div class="soc-log-alert" style="color: #4ade80; border-top: 1px solid rgba(74, 222, 128, 0.2); padding-top: 8px; margin-top: 4px; display: flex; align-items: center; gap: 8px;">
                    <span class="h-2 w-2 rounded-full bg-green-400 animate-pulse" style="display:inline-block; width:8px; height:8px; border-radius:99px; background:#4ade80;"></span>
                    <span><strong>[PLAYBOOK EXECUTED]</strong> Host contained. Eradication &amp; post-incident reporting complete.</span>
                </div>
            </div>
        `
    }
};

if (moduleButtons && terminalHeading && terminalScreen) {
    moduleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            moduleButtons.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

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
