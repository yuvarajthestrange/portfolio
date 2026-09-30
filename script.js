import { annotate, annotationGroup } from 'rough-notation';

// Cursor Follower
const follower = document.querySelector('.cursor-follower');
if (follower) {
    document.addEventListener('mousemove', (e) => {
        follower.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
    });
}

// Navigation Link Highlighting on Scroll & Dropdown Parent State
const sections = document.querySelectorAll('section[id]');
const portfolioSectionIds = ['projects', 'detection-lab', 'playbooks', 'evidence', 'services'];
const credentialsSectionIds = ['certifications', 'education'];

window.addEventListener('scroll', () => {
    try {
        let scrollY = window.pageYOffset || document.documentElement.scrollTop;
        let activePortfolio = false;
        let activeCredentials = false;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 160;
            const sectionId = current.getAttribute('id');
            if (sectionId) {
                const link = document.querySelector(`.nav-links-container > li > .nav-link[href*="${sectionId}"]`);
                const isInView = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
                
                if (link) {
                    if (isInView) {
                        link.classList.add('text-red');
                        link.classList.remove('text-white/80');
                    } else {
                        link.classList.remove('text-red');
                        link.classList.add('text-white/80');
                    }
                }

                if (isInView) {
                    if (portfolioSectionIds.includes(sectionId)) activePortfolio = true;
                    if (credentialsSectionIds.includes(sectionId)) activeCredentials = true;
                }
            }
        });

        // Highlight dropdown trigger parents when their child sections are in view
        document.querySelectorAll('.nav-dropdown-item').forEach(item => {
            const btn = item.querySelector('.nav-dropdown-btn');
            const hasPortfolio = item.querySelector('a[href="#projects"]');
            const hasCredentials = item.querySelector('a[href="#certifications"]');
            if (btn) {
                if (hasPortfolio && activePortfolio) {
                    btn.classList.add('text-red');
                    btn.classList.remove('text-white/80');
                } else if (hasCredentials && activeCredentials) {
                    btn.classList.add('text-red');
                    btn.classList.remove('text-white/80');
                } else {
                    btn.classList.remove('text-red');
                    btn.classList.add('text-white/80');
                }
            }
        });
    } catch (e) {
        console.error("Highlight scroll error caught:", e);
    }
});

// Dropdown click/touch toggle for mobile/tablet & focus handling
document.querySelectorAll('.nav-dropdown-item').forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('dropdown-open');
            document.querySelectorAll('.nav-dropdown-item').forEach(d => d.classList.remove('dropdown-open'));
            if (!isOpen) dropdown.classList.add('dropdown-open');
        });
    }
    dropdown.querySelectorAll('.dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            dropdown.classList.remove('dropdown-open');
        });
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown-item').forEach(d => d.classList.remove('dropdown-open'));
});

// Interactive Console Module Selection
const moduleButtons = document.querySelectorAll('.device-module-btn');
const terminalHeading = document.getElementById('terminal-heading');
const terminalScreen = document.getElementById('terminal-screen');

const moduleLogs = {
    architecture: {
        heading: "Full Architecture Schematic",
        content: `
            <div class="soc-schematic-panel">
                <!-- Node 1: Windows Endpoint -->
                <div class="soc-node-box">
                    <div class="soc-node-badge">SOURCE TELEMETRY</div>
                    <div class="soc-node-name">WINDOWS ENDPOINT</div>
                    <div class="soc-node-sub">Sysmon &middot; Win Event Log</div>
                </div>

                <!-- Connector 1 -->
                <div class="soc-flow-connector">
                    <div class="soc-flow-line"></div>
                    <div class="soc-flow-pill">[ Sysmon Agent ]</div>
                    <div class="soc-flow-line"></div>
                    <div class="soc-flow-arrow">&#9660;</div>
                </div>

                <!-- Node 2: Wazuh SIEM -->
                <div class="soc-node-box soc-node-hub">
                    <div class="soc-node-badge text-red"><span class="h-1.5 w-1.5 rounded-full bg-red animate-pulse mr-1 inline-block" style="display:inline-block;width:6px;height:6px;border-radius:99px;background:#ff1e1e;"></span>CENTRAL HUB</div>
                    <div class="soc-node-name">WAZUH SIEM</div>
                    <div class="soc-node-sub">Log Ingestion &middot; Correlation Engine</div>
                </div>

                <!-- Connector 2: Active Detection Trigger (Neon Red Accent) -->
                <div class="soc-flow-connector">
                    <div class="soc-flow-line soc-line-active"></div>
                    <div class="soc-flow-pill soc-pill-active">[ Detection Trigger ]</div>
                    <div class="soc-flow-line soc-line-active"></div>
                    <div class="soc-flow-arrow soc-arrow-active">&#9660;</div>
                </div>

                <!-- Node 3: Alert Triage -->
                <div class="soc-node-box">
                    <div class="soc-node-badge">PIPELINE STAGE</div>
                    <div class="soc-node-name">ALERT TRIAGE</div>
                    <div class="soc-node-sub">Severity Scoring &middot; Stream Splitting</div>
                </div>

                <!-- Fork Connector to Parallel Nodes -->
                <div class="soc-fork-connector">
                    <svg class="soc-fork-svg" viewBox="0 0 100 30" preserveAspectRatio="none" fill="none">
                        <path d="M50 0 V14 H25 V26 M50 14 H75 V26" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" vector-effect="non-scaling-stroke"></path>
                        <path d="M22 24 L25 30 L28 24 Z M72 24 L75 30 L78 24 Z" fill="rgba(255,255,255,0.4)"></path>
                    </svg>
                </div>

                <!-- Parallel Nodes (Threat Intel & Snort NIDS) -->
                <div class="soc-parallel-grid">
                    <div class="soc-node-box soc-node-subbranch">
                        <div class="soc-node-badge">ENRICHMENT</div>
                        <div class="soc-node-name">THREAT INTELLIGENCE</div>
                        <div class="soc-node-sub">VirusTotal &middot; AbuseIPDB</div>
                    </div>
                    <div class="soc-node-box soc-node-subbranch">
                        <div class="soc-node-badge">NIDS ENGINE</div>
                        <div class="soc-node-name">SNORT NIDS</div>
                        <div class="soc-node-sub">Network Packet Detection</div>
                    </div>
                </div>

                <!-- Merge Connector from Parallel Nodes -->
                <div class="soc-merge-connector">
                    <svg class="soc-merge-svg" viewBox="0 0 100 22" preserveAspectRatio="none" fill="none">
                        <path d="M25 0 V12 H50 V22 M75 0 V12 H50" stroke="rgba(255,255,255,0.22)" stroke-width="1.5" vector-effect="non-scaling-stroke"></path>
                    </svg>
                    <div class="soc-flow-pill mt-1">[ Evidence Triage ]</div>
                    <div class="soc-flow-line"></div>
                    <div class="soc-flow-arrow">&#9660;</div>
                </div>

                <!-- Node 6: TheHive -->
                <div class="soc-node-box">
                    <div class="soc-node-badge">CASE MANAGEMENT</div>
                    <div class="soc-node-name">THEHIVE</div>
                    <div class="soc-node-sub">Incident Escalation &middot; Case #104</div>
                </div>

                <!-- Connector 6 -->
                <div class="soc-flow-connector">
                    <div class="soc-flow-line"></div>
                    <div class="soc-flow-pill">[ Automated SOAR ]</div>
                    <div class="soc-flow-line"></div>
                    <div class="soc-flow-arrow">&#9660;</div>
                </div>

                <!-- Node 7: Incident Response -->
                <div class="soc-node-box soc-node-response">
                    <div class="soc-node-badge text-green-400 font-bold"><span class="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse mr-1 inline-block" style="display:inline-block;width:6px;height:6px;border-radius:99px;background:#4ade80;"></span>CONTAINMENT ENGAGED</div>
                    <div class="soc-node-name text-white">INCIDENT RESPONSE</div>
                    <div class="soc-node-sub">Host Isolation &middot; Firewall IP Block</div>
                </div>
            </div>
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

// Tactical AnimatedList Sequential Stagger Engine
function triggerAnimatedList(container, customDelay = null) {
    if (!container) return;
    const items = container.querySelectorAll('.animated-item');
    if (!items.length) return;

    const delay = customDelay !== null ? customDelay : (parseInt(container.dataset.delay, 10) || 120);

    // Reset current animation states
    items.forEach(item => item.classList.remove('animate-in'));

    // Force reflow so re-trigger works smoothly
    void container.offsetWidth;

    // Stagger animation items
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * delay);
    });
}

// Case Playbook Scenarios Tab Switcher
const caseTabBtns = document.querySelectorAll('.case-tab-btn');
const caseScenarios = document.querySelectorAll('.case-scenario');

if (caseTabBtns.length > 0 && caseScenarios.length > 0) {
    caseTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs & scenarios
            caseTabBtns.forEach(b => b.classList.remove('active'));
            caseScenarios.forEach(s => s.classList.remove('active'));

            // Activate clicked tab
            btn.classList.add('active');

            // Show corresponding scenario
            const targetId = btn.dataset.scenario;
            const targetScenario = document.getElementById(targetId);
            if (targetScenario) {
                targetScenario.classList.add('active');
                const timeline = targetScenario.querySelector('.case-timeline.animated-list');
                if (timeline) {
                    triggerAnimatedList(timeline, 120);
                }
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

// Evidence Lightbox Modal Controls
window.openEvidenceModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeEvidenceModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Global escape key and outside click handling for evidence modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.evidence-modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('evidence-modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Experience Blocks Intersection Observer (Terminal White Flash & Sequential Tags)
const initExperienceObserver = () => {
    const elementsToAnimate = document.querySelectorAll('.experience-block');
    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled-in');
                const tagsList = entry.target.querySelector('.op-log-tags.animated-list');
                if (tagsList) {
                    setTimeout(() => {
                        triggerAnimatedList(tagsList, 100);
                    }, 250);
                }
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initExperienceObserver);
} else {
    initExperienceObserver();
}

// Technical Arsenal Grid Observer (Sequential Stagger)
const initArsenalObserver = () => {
    const arsenalList = document.querySelector('#arsenal .animated-list');
    if (!arsenalList) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerAnimatedList(arsenalList, 160);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(arsenalList);
};

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initArsenalObserver);
} else {
    initArsenalObserver();
}

// Incident Playbooks Observer (Initial Scroll Stagger)
const initPlaybooksObserver = () => {
    const playbooksSection = document.getElementById('playbooks');
    if (!playbooksSection) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeTimeline = playbooksSection.querySelector('.case-scenario.active .case-timeline.animated-list');
                if (activeTimeline) {
                    triggerAnimatedList(activeTimeline, 120);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    observer.observe(playbooksSection);
};

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initPlaybooksObserver);
} else {
    initPlaybooksObserver();
}

// Typing Headers Intersection Observer
const initTypingHeaderObserver = () => {
    const typingHeaders = document.querySelectorAll('.typing-header');
    if (!typingHeaders.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15
    });

    typingHeaders.forEach(header => {
        observer.observe(header);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initTypingHeaderObserver);
} else {
    initTypingHeaderObserver();
}

// Mobile Navigation Drawer Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
const menuIcon = document.getElementById('menu-icon');

if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = !mobileMenuDrawer.classList.contains('hidden');
        if (isOpen) {
            mobileMenuDrawer.classList.add('hidden');
            if (menuIcon) {
                menuIcon.classList.remove('uil-multiply');
                menuIcon.classList.add('uil-bars');
            }
        } else {
            mobileMenuDrawer.classList.remove('hidden');
            if (menuIcon) {
                menuIcon.classList.remove('uil-bars');
                menuIcon.classList.add('uil-multiply');
            }
        }
    });

    // Close mobile menu on clicking any link
    mobileMenuDrawer.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuDrawer.classList.add('hidden');
            if (menuIcon) {
                menuIcon.classList.remove('uil-multiply');
                menuIcon.classList.add('uil-bars');
            }
        });
    });
}

// Magic UI / Rough Notation Highlighter Engine for About Section
function initAboutHighlighter() {
    const aboutSection = document.getElementById('about');
    const socEl = document.getElementById('hl-soc');
    const pentestEl = document.getElementById('hl-pentest');
    const siemEl = document.getElementById('hl-siem');
    const iocEl = document.getElementById('hl-ioc');

    if (!aboutSection || !socEl || !pentestEl) return;

    // Tactical red palette: Semi-transparent glowing red highlight & crisp neon-red underline
    const a1 = annotate(socEl, {
        type: 'highlight',
        color: 'rgba(220, 38, 38, 0.28)',
        multiline: true,
        animationDuration: 600
    });

    const a2 = annotate(pentestEl, {
        type: 'highlight',
        color: 'rgba(220, 38, 38, 0.28)',
        multiline: true,
        animationDuration: 650
    });

    const a3 = siemEl ? annotate(siemEl, {
        type: 'underline',
        color: '#ff5252',
        strokeWidth: 2.2,
        padding: 2,
        multiline: true,
        animationDuration: 450
    }) : null;

    const a4 = iocEl ? annotate(iocEl, {
        type: 'underline',
        color: '#ff5252',
        strokeWidth: 2.2,
        padding: 2,
        multiline: true,
        animationDuration: 450
    }) : null;

    const group = annotationGroup([a1, a2, a3, a4].filter(Boolean));

    let hasTriggered = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTriggered) {
                hasTriggered = true;
                // Slight delay for smooth aesthetic entrance after scroll reveal
                setTimeout(() => {
                    group.show();
                }, 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.25
    });

    observer.observe(aboutSection);
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initAboutHighlighter);
} else {
    initAboutHighlighter();
}

