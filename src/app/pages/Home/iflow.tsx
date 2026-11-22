import { useEffect } from "react";
import { Header, Footer } from "../../../components/index";
import { HOME_ROUTE } from "../../../helper/routes";
import Seo from "../../../components/seo/Seo";

const IFL_STYLES = `
.ifl{background:#0A0A0A;color:#F0EDE8;font-family:'Inter',sans-serif;overflow-x:hidden}
.ifl *{box-sizing:border-box}
.ifl h1,.ifl h2,.ifl h3,.ifl h4{font-family:'Poppins',sans-serif;line-height:1.15}
.ifl .ifl-container{max-width:1200px;margin:0 auto;padding:0 2.5rem}
.ifl .section-label{display:inline-block;font-size:0.72rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#E8201A;margin-bottom:12px}
.ifl .section-title{font-size:clamp(1.9rem,4vw,3rem);font-weight:800}
.ifl .section-title .accent{color:#E8201A}
.ifl .section-sub{color:#888;font-size:1rem;margin-top:10px;font-weight:300}
.ifl .ifl-hero{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px 5% 60px;position:relative;overflow:hidden;background:radial-gradient(ellipse 80% 60% at 50% 10%,rgba(232,32,26,0.18) 0%,transparent 65%),linear-gradient(180deg,#0f0f0f 0%,#0A0A0A 100%)}
.ifl .ifl-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.018'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");pointer-events:none}
.ifl .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(232,32,26,0.12);border:1px solid rgba(232,32,26,0.3);color:#FF3B35;font-size:0.75rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:28px}
.ifl .lang-selector{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:24px;flex-wrap:wrap}
.ifl .lang-label{color:#888;font-size:0.8rem;font-weight:600}
.ifl .lang-options{display:flex;gap:8px}
.ifl .lang-option{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#F0EDE8;font-size:0.8rem;font-weight:500;padding:6px 14px;border-radius:20px;cursor:pointer;transition:all 0.2s}
.ifl .lang-option:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.2)}
.ifl .lang-option.active{background:rgba(232,32,26,0.15);border-color:#E8201A;color:#FF3B35}
.ifl .ifl-hero h1{font-size:clamp(2.8rem,7vw,5.5rem);font-weight:800;max-width:820px}
.ifl .ifl-hero h1 .accent{color:#E8201A}
.ifl .hero-sub{font-size:1.1rem;color:#888;max-width:560px;margin:20px auto 0;font-weight:300}
.ifl .hero-pc-badge{display:inline-flex;align-items:center;gap:10px;background:rgba(52,199,89,0.08);border:1px solid rgba(52,199,89,0.25);color:#34C759;font-size:0.8rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:8px 20px;border-radius:20px;margin:24px auto 0;font-family:'Space Mono',monospace}
.ifl .pc-badge-dot{width:8px;height:8px;border-radius:50%;background:#34C759;flex-shrink:0;animation:iflBlink 1.4s infinite;box-shadow:0 0 6px #34C759}
@keyframes iflBlink{50%{opacity:0.15}}
.ifl .hero-options{display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin:32px auto 0;max-width:1000px}
.ifl .hero-option{flex:1;min-width:300px;max-width:450px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:28px;text-align:center;transition:all 0.3s ease}
.ifl .hero-option:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.15);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.3)}
.ifl .option-icon{font-size:2.5rem;margin-bottom:16px}
.ifl .option-title{font-family:'Poppins',sans-serif;font-size:1.5rem;font-weight:700;color:#F0EDE8;margin-bottom:12px}
.ifl .option-desc{color:#888;font-size:0.95rem;line-height:1.5;margin-bottom:20px}
.ifl .option-price{margin:20px 0}
.ifl .price-label{color:#888;font-size:0.85rem;margin-bottom:4px}
.ifl .price-num{font-family:'Poppins',sans-serif;font-size:2.2rem;font-weight:800;color:#F5C842;line-height:1}
.ifl .price-note{font-size:0.8rem;color:#888;margin-top:6px}
.ifl .btn-opt{display:inline-block;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;transition:all 0.2s;margin-top:10px;width:100%;box-sizing:border-box}
.ifl .btn-opt-pc{background:rgba(52,199,89,0.12);color:#34C759;border:1px solid rgba(52,199,89,0.3)}
.ifl .btn-opt-pc:hover{background:rgba(52,199,89,0.2);border-color:#34C759}
.ifl .btn-opt-std{background:rgba(232,32,26,0.12);color:#E8201A;border:1px solid rgba(232,32,26,0.3)}
.ifl .btn-opt-std:hover{background:rgba(232,32,26,0.2);border-color:#E8201A}
.ifl .hero-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:36px}
.ifl .btn-primary{background:#E8201A;color:#fff;padding:14px 32px;font-family:'Poppins',sans-serif;font-weight:700;font-size:0.95rem;border-radius:8px;text-decoration:none;transition:all .2s;border:none;cursor:pointer}
.ifl .btn-primary:hover{background:#FF3B35;transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,32,26,0.35)}
.ifl .btn-ghost{background:transparent;color:#F0EDE8;padding:14px 32px;font-family:'Poppins',sans-serif;font-weight:700;font-size:0.95rem;border-radius:8px;text-decoration:none;border:1px solid rgba(255,255,255,0.07);transition:all .2s;cursor:pointer}
.ifl .btn-ghost:hover{border-color:rgba(255,255,255,0.25);background:rgba(255,255,255,0.04)}
.ifl .ifl-how{padding:80px 5%;background:#111;text-align:center}
.ifl .flow-wrap{margin-top:52px;background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:36px 24px;overflow-x:auto}
.ifl .ifl-integrations{padding:80px 5%;background:#111;text-align:center}
.ifl .platforms{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:44px}
.ifl .platform-pill{background:#161616;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:18px 28px;display:flex;align-items:center;gap:12px;font-weight:600;font-size:0.95rem;transition:border-color .2s}
.ifl .platform-pill:hover{border-color:rgba(255,255,255,0.2)}
.ifl .platform-pill .dot{width:10px;height:10px;border-radius:50%}
.ifl .ifl-features{padding:80px 5%;background:#0A0A0A}
.ifl .features-inner{max-width:1100px;margin:0 auto}
.ifl .feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:56px}
.ifl .feat-card{background:#161616;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:36px;transition:transform .2s}
.ifl .feat-card:hover{transform:translateY(-3px)}
.ifl .feat-card .icon-wrap{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:20px}
.ifl .feat-card h3{font-size:1.2rem;font-weight:700;margin-bottom:10px}
.ifl .feat-card p{font-size:0.9rem;color:#888;line-height:1.7}
.ifl .feat-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.ifl .feat-tag{font-size:0.72rem;font-weight:600;letter-spacing:0.06em;padding:4px 10px;border-radius:20px}
.ifl .ifl-screenshots{padding:80px 5%;background:#0A0A0A;text-align:center}
.ifl .screenshot-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;margin-top:56px;max-width:1400px;margin-left:auto;margin-right:auto}
.ifl .screenshot-card{background:#161616;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s}
.ifl .screenshot-card:hover{transform:translateY(-6px);box-shadow:0 20px 40px rgba(0,0,0,0.4)}
.ifl .screenshot-image{height:200px;overflow:hidden;position:relative}
.ifl .screenshot-image img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}
.ifl .screenshot-card:hover .screenshot-image img{transform:scale(1.05)}
.ifl .screenshot-info{padding:24px;text-align:left}
.ifl .screenshot-info h3{font-size:1.1rem;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:10px}
.ifl .screenshot-info h3 i{color:#E8201A;font-size:1rem}
.ifl .screenshot-info p{font-size:0.88rem;color:#888;line-height:1.6;margin-bottom:16px}
.ifl .screenshot-tags{display:flex;gap:8px;flex-wrap:wrap}
.ifl .screenshot-tag{font-size:0.7rem;font-weight:600;letter-spacing:0.06em;padding:4px 10px;border-radius:20px;background:rgba(255,255,255,0.05);color:#888;border:1px solid rgba(255,255,255,0.1)}
.ifl .screenshot-cta{margin-top:48px;padding:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;max-width:600px;margin-left:auto;margin-right:auto}
.ifl .screenshot-cta p{font-size:0.95rem;color:#888}
.ifl .accent-link{color:#E8201A;text-decoration:none;font-weight:600}
.ifl .accent-link:hover{text-decoration:underline}
.ifl .ifl-hardware{padding:80px 5%;background:#111;text-align:center}
.ifl .hw-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:44px}
.ifl .hw-card{background:#161616;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:28px 20px;text-align:center;transition:transform .2s}
.ifl .hw-card:hover{transform:translateY(-3px)}
.ifl .hw-card .hw-icon{font-size:2.2rem;margin-bottom:12px}
.ifl .hw-card h4{font-size:0.95rem;font-weight:700;margin-bottom:6px}
.ifl .hw-card p{font-size:0.8rem;color:#888}
.ifl .ifl-cta{padding:80px 5%;text-align:center;background:linear-gradient(135deg,#1a0808 0%,#0f0f0f 50%,#080f1a 100%);position:relative;overflow:hidden}
.ifl .ifl-cta::before{content:'';position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(232,32,26,0.12) 0%,transparent 70%);pointer-events:none}
.ifl .ifl-cta h2{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;position:relative}
.ifl .ifl-cta>p{color:#888;margin:16px auto 36px;max-width:500px;position:relative}
.ifl .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative}
.ifl .contact-cards{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:44px;position:relative}
.ifl .contact-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px 28px;display:flex;align-items:center;gap:12px;text-decoration:none;color:#F0EDE8;transition:all .2s}
.ifl .contact-card:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15)}
.ifl .contact-card .icon{font-size:1.3rem}
.ifl .contact-card span{font-size:0.88rem;font-weight:500}
.ifl .contact-card strong{display:block;font-size:0.75rem;color:#888;font-weight:400}
.ifl .ifl-divider{height:1px;background:rgba(255,255,255,0.07);margin:0}
.ifl .reveal{opacity:1;transform:translateY(0);transition:opacity 0.6s ease,transform 0.6s ease}
.ifl .reveal.hidden{opacity:0;transform:translateY(28px)}
.ifl .reveal.visible{opacity:1;transform:translateY(0)}
@media(max-width:720px){.ifl .feat-grid{grid-template-columns:1fr}.ifl .screenshot-grid{grid-template-columns:1fr}.ifl .screenshot-image{height:180px}}
@media(max-width:640px){.ifl .ifl-hero h1{font-size:2.4rem}}
`;

const IFL_HTML = `
<section class="ifl-hero">
  <div class="hero-badge">Restaurant Technology &middot; iClouds RestFlow</div>
  <div class="lang-selector">
    <div class="lang-label">Choose Language:</div>
    <div class="lang-options">
      <button class="lang-option active" data-lang="en"><span class="lang-flag">&#127468;&#127463;</span> English</button>
      <button class="lang-option" data-lang="pt"><span class="lang-flag">&#127463;&#127479;</span> Portuguese</button>
      <button class="lang-option" data-lang="bn"><span class="lang-flag">&#127463;&#127469;</span> Bangla</button>
    </div>
  </div>
  <h1>Your Complete<br><span class="accent">Restaurant OS</span></h1>
  <p class="hero-sub">One platform to run your POS, take orders from every channel, manage deliveries and grow your business.</p>
  <div class="hero-pc-badge">
    <span class="pc-badge-dot"></span>
    <span>Your PC. Your Domain. <span style="color:#F5C842">Live on Internet.</span></span>
  </div>
  <div class="hero-options">
    <div class="hero-option">
      <div class="option-icon"><i class="fas fa-desktop"></i></div>
      <h3 class="option-title">Run Your Business From PC &amp; Access Anywhere</h3>
      <p class="option-desc">No upfront pricing. Contact us first, discuss your needs, and after satisfaction price is negotiable.</p>
      <div class="option-price">
        <div class="price-label">Custom Pricing</div>
        <div class="price-note">Tailored to your business size</div>
      </div>
      <a href="#contact" class="btn-opt btn-opt-pc">Contact for Custom Quote</a>
    </div>
    <div class="hero-option">
      <div class="option-icon"><i class="fas fa-rocket"></i></div>
      <h3 class="option-title">Standard Software Technology</h3>
      <p class="option-desc">Just contact with us and we will do the rest. Everything included, ready to deploy.</p>
      <div class="option-price">
        <div class="price-label">Starting From</div>
        <div class="price-num">&pound;149</div>
        <div class="price-note">No long contracts &middot; Full setup included</div>
      </div>
      <a href="#contact" class="btn-opt btn-opt-std">Get Started Now</a>
    </div>
  </div>
  <div class="hero-actions">
    <a href="#contact" class="btn-primary">Get Started Today</a>
    <a href="#contact" class="btn-ghost">Talk to Us</a>
  </div>
</section>

<div class="ifl-divider"></div>

<section class="ifl-how reveal" id="how">
  <div class="ifl-container">
    <div class="section-label">How It Works</div>
    <h2 class="section-title">Every Order. <span class="accent">One Flow.</span></h2>
    <p class="section-sub">All channels route into your POS &mdash; zero chaos.</p>
    <div class="flow-wrap">
      <svg width="100%" viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg" style="max-width:900px;display:block;margin:0 auto;">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
          <marker id="arr-dash" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="#444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
        </defs>
        <text x="100" y="16" text-anchor="middle" fill="#E8201A" font-size="9" font-weight="700" letter-spacing="2">INCOMING ORDERS</text>
        <text x="530" y="16" text-anchor="middle" fill="#E8201A" font-size="9" font-weight="700" letter-spacing="2">WALK-IN / IN-STORE</text>
        <rect x="16" y="30" width="170" height="44" rx="8" fill="#0e2a27" stroke="#1d6b5e" stroke-width="0.8"/><text x="101" y="56" text-anchor="middle" fill="#5DCAA5" font-size="12" font-weight="600">Online Order Website</text>
        <rect x="16" y="90" width="170" height="44" rx="8" fill="#2a1a12" stroke="#7a3a20" stroke-width="0.8"/><text x="101" y="116" text-anchor="middle" fill="#F0997B" font-size="12" font-weight="600">Just Eat</text>
        <rect x="16" y="150" width="170" height="44" rx="8" fill="#2a200e" stroke="#7a5510" stroke-width="0.8"/><text x="101" y="176" text-anchor="middle" fill="#EF9F27" font-size="12" font-weight="600">Uber Eats</text>
        <rect x="16" y="210" width="170" height="44" rx="8" fill="#112214" stroke="#2d6638" stroke-width="0.8"/><text x="101" y="236" text-anchor="middle" fill="#97C459" font-size="12" font-weight="600">Deliveroo</text>
        <rect x="16" y="270" width="170" height="44" rx="8" fill="#1e1530" stroke="#5a3fa0" stroke-width="0.8"/><text x="101" y="296" text-anchor="middle" fill="#AFA9EC" font-size="12" font-weight="600">Order Taking App</text>
        <line x1="186" y1="52" x2="276" y2="188" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="186" y1="112" x2="276" y2="193" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="186" y1="172" x2="276" y2="198" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="186" y1="232" x2="276" y2="203" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="186" y1="292" x2="276" y2="210" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <rect x="268" y="162" width="184" height="76" rx="14" fill="#1a1a1a" stroke="#555" stroke-width="1.5"/>
        <text x="360" y="192" text-anchor="middle" fill="#F0EDE8" font-size="13" font-weight="700">POS Terminal</text>
        <text x="360" y="212" text-anchor="middle" fill="#888" font-size="10">Central Hub</text>
        <rect x="296" y="222" width="128" height="2" rx="1" fill="#E8201A" opacity="0.5"/>
        <line x1="452" y1="185" x2="534" y2="62" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="452" y1="192" x2="534" y2="122" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="452" y1="200" x2="534" y2="182" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <line x1="452" y1="207" x2="534" y2="242" stroke="#444" stroke-width="1" marker-end="url(#arr)"/>
        <rect x="534" y="40" width="170" height="44" rx="8" fill="#0e1e34" stroke="#1e5a90" stroke-width="0.8"/><text x="619" y="66" text-anchor="middle" fill="#85B7EB" font-size="12" font-weight="600">Counter / Walk-in</text>
        <rect x="534" y="100" width="170" height="44" rx="8" fill="#0e1e34" stroke="#1e5a90" stroke-width="0.8"/><text x="619" y="126" text-anchor="middle" fill="#85B7EB" font-size="12" font-weight="600">Caller ID</text>
        <rect x="534" y="160" width="170" height="44" rx="8" fill="#0e1e34" stroke="#1e5a90" stroke-width="0.8"/><text x="619" y="186" text-anchor="middle" fill="#85B7EB" font-size="12" font-weight="600">Self-Service Kiosk</text>
        <rect x="534" y="220" width="170" height="44" rx="8" fill="#0e1e34" stroke="#1e5a90" stroke-width="0.8"/><text x="619" y="246" text-anchor="middle" fill="#85B7EB" font-size="12" font-weight="600">Card Reader</text>
        <rect x="16" y="348" width="210" height="72" rx="10" fill="#0d2212" stroke="#2d6638" stroke-width="0.8"/>
        <text x="121" y="372" text-anchor="middle" fill="#97C459" font-size="12" font-weight="700">WhatsApp Marketing</text>
        <text x="121" y="390" text-anchor="middle" fill="#5a7a46" font-size="10">AI-powered campaigns</text>
        <text x="121" y="406" text-anchor="middle" fill="#5a7a46" font-size="10">&amp; customer re-engagement</text>
        <rect x="254" y="348" width="210" height="72" rx="10" fill="#181818" stroke="#444" stroke-width="0.8"/>
        <text x="359" y="372" text-anchor="middle" fill="#ccc" font-size="12" font-weight="700">Connected Devices</text>
        <text x="359" y="390" text-anchor="middle" fill="#666" font-size="10">Receipt Printer</text>
        <text x="359" y="406" text-anchor="middle" fill="#666" font-size="10">Kitchen Printer</text>
        <rect x="494" y="348" width="210" height="72" rx="10" fill="#2a1f08" stroke="#7a5510" stroke-width="0.8"/>
        <text x="599" y="372" text-anchor="middle" fill="#EF9F27" font-size="12" font-weight="700">AI Report Chatbot</text>
        <text x="599" y="390" text-anchor="middle" fill="#7a5a25" font-size="10">Ask anything about sales,</text>
        <text x="599" y="406" text-anchor="middle" fill="#7a5a25" font-size="10">trend &amp; performance</text>
        <line x1="330" y1="238" x2="130" y2="348" stroke="#333" stroke-width="1" stroke-dasharray="5 4" marker-end="url(#arr-dash)"/>
        <line x1="360" y1="238" x2="359" y2="348" stroke="#333" stroke-width="1" stroke-dasharray="5 4" marker-end="url(#arr-dash)"/>
        <line x1="390" y1="238" x2="590" y2="348" stroke="#333" stroke-width="1" stroke-dasharray="5 4" marker-end="url(#arr-dash)"/>
      </svg>
    </div>
  </div>
</section>

<div class="ifl-divider"></div>

<section class="ifl-integrations reveal">
  <div class="ifl-container">
    <div class="section-label">Integrations</div>
    <h2 class="section-title">Connect Your <span class="accent">Delivery Platforms</span></h2>
    <p class="section-sub">Paste credentials &middot; Live menu sync &middot; Auto order acceptance &middot; Real-time push</p>
    <div class="platforms">
      <div class="platform-pill"><div class="dot" style="background:#FF6600"></div> Just Eat &mdash; Auto order flow</div>
      <div class="platform-pill"><div class="dot" style="background:#06C167"></div> Uber Eats &mdash; Live menu sync</div>
      <div class="platform-pill"><div class="dot" style="background:#00CCBC"></div> Deliveroo &mdash; ETA &amp; status sync</div>
    </div>
    <p style="margin-top:28px;color:#888;font-size:0.88rem">All 3 platforms route into <strong style="color:#F0EDE8">one live dashboard</strong> &mdash; no tablet juggling, no missed orders.</p>
  </div>
</section>

<div class="ifl-divider"></div>

<section class="ifl-features reveal">
  <div class="features-inner">
    <div style="text-align:center">
      <div class="section-label">Smart Features</div>
      <h2 class="section-title">Grow Smarter with <span class="accent">AI &amp; WhatsApp</span></h2>
      <p class="section-sub">Retain customers and make data-driven decisions automatically</p>
    </div>
    <div class="feat-grid">
      <div class="feat-card">
        <div class="icon-wrap" style="background:rgba(34,197,94,0.1)">&#128172;</div>
        <h3>WhatsApp AI Marketing</h3>
        <p>Re-engage your customers with AI-crafted WhatsApp campaigns. Send personalised promotions, order updates and loyalty offers automatically at scale.</p>
        <div class="feat-tags">
          <span class="feat-tag" style="background:rgba(34,197,94,0.1);color:#22C55E">AI-Powered</span>
          <span class="feat-tag" style="background:rgba(34,197,94,0.1);color:#22C55E">Personalised</span>
          <span class="feat-tag" style="background:rgba(34,197,94,0.1);color:#22C55E">Automated</span>
        </div>
      </div>
      <div class="feat-card">
        <div class="icon-wrap" style="background:rgba(245,200,66,0.1)">&#129302;</div>
        <h3>AI Report Chatbot</h3>
        <p>Ask your business data anything. "What was my best-selling item last week?" &mdash; your AI chatbot answers instantly with insights in plain English.</p>
        <div class="feat-tags">
          <span class="feat-tag" style="background:rgba(245,200,66,0.1);color:#F5C842">Natural Language</span>
          <span class="feat-tag" style="background:rgba(245,200,66,0.1);color:#F5C842">Live Data</span>
          <span class="feat-tag" style="background:rgba(245,200,66,0.1);color:#F5C842">Instant Insights</span>
        </div>
      </div>
      <div class="feat-card">
        <div class="icon-wrap" style="background:rgba(6,182,212,0.1)">&#128279;</div>
        <h3>System Integration</h3>
        <p>Already have a web-based system? We connect it. Database integrations, webhooks, and API bridges mean your old system talks to your new one.</p>
        <div class="feat-tags">
          <span class="feat-tag" style="background:rgba(6,182,212,0.1);color:#06B6D4">Webhook</span>
          <span class="feat-tag" style="background:rgba(6,182,212,0.1);color:#06B6D4">API Bridge</span>
          <span class="feat-tag" style="background:rgba(6,182,212,0.1);color:#06B6D4">DB Connect</span>
        </div>
      </div>
      <div class="feat-card">
        <div class="icon-wrap" style="background:rgba(232,32,26,0.1)">&#128205;</div>
        <h3>Google Business SEO</h3>
        <p>Get your restaurant found by local customers. We set up and optimise your Google Business profile, map listing, and local SEO.</p>
        <div class="feat-tags">
          <span class="feat-tag" style="background:rgba(232,32,26,0.1);color:#FF3B35">Google Maps</span>
          <span class="feat-tag" style="background:rgba(232,32,26,0.1);color:#FF3B35">Local SEO</span>
          <span class="feat-tag" style="background:rgba(232,32,26,0.1);color:#FF3B35">Reviews</span>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="ifl-divider"></div>

<section class="ifl-screenshots reveal" id="screenshots">
  <div class="ifl-container">
    <div class="section-label">Screenshots</div>
    <h2 class="section-title">See <span class="accent">RestFlow in Action</span></h2>
    <p class="section-sub">Real interface examples from our restaurant technology platform</p>
    <div class="screenshot-grid">
      <div class="screenshot-card">
        <div class="screenshot-image"><img src="images/banner-pos.png" alt="RestFlow POS Interface" loading="lazy" /></div>
        <div class="screenshot-info">
          <h3><i class="fas fa-cash-register"></i> POS Dashboard</h3>
          <p>Modern point-of-sale interface with order management, table layout, and real-time analytics.</p>
          <div class="screenshot-tags"><span class="screenshot-tag">Live Orders</span><span class="screenshot-tag">Table Management</span><span class="screenshot-tag">Analytics</span></div>
        </div>
      </div>
      <div class="screenshot-card">
        <div class="screenshot-image"><img src="images/banner-kds.png" alt="Kitchen Display System" loading="lazy" /></div>
        <div class="screenshot-info">
          <h3><i class="fas fa-utensils"></i> Kitchen Display</h3>
          <p>Kitchen order tickets with preparation timers, modifiers, and station routing.</p>
          <div class="screenshot-tags"><span class="screenshot-tag">Order Tickets</span><span class="screenshot-tag">Prep Timers</span><span class="screenshot-tag">Station Routing</span></div>
        </div>
      </div>
      <div class="screenshot-card">
        <div class="screenshot-image"><img src="images/banner-kiosk.png" alt="Self-Service Kiosk" loading="lazy" /></div>
        <div class="screenshot-info">
          <h3><i class="fas fa-tablet-alt"></i> Self-Service Kiosk</h3>
          <p>Customer-facing kiosk interface for quick ordering, customization, and payment.</p>
          <div class="screenshot-tags"><span class="screenshot-tag">Self-Ordering</span><span class="screenshot-tag">Customization</span><span class="screenshot-tag">Quick Pay</span></div>
        </div>
      </div>
      <div class="screenshot-card">
        <div class="screenshot-image"><img src="images/banner-ecommerce.png" alt="Online Ordering System" loading="lazy" /></div>
        <div class="screenshot-info">
          <h3><i class="fas fa-shopping-cart"></i> Online Ordering</h3>
          <p>Web-based ordering system with menu management, delivery zones, and real-time tracking.</p>
          <div class="screenshot-tags"><span class="screenshot-tag">Menu Management</span><span class="screenshot-tag">Delivery Zones</span><span class="screenshot-tag">Live Tracking</span></div>
        </div>
      </div>
    </div>
    <div class="screenshot-cta"><p>Want to see more? <a href="#contact" class="accent-link">Contact us for a live demo</a> of the full system.</p></div>
  </div>
</section>

<div class="ifl-divider"></div>

<section class="ifl-hardware reveal" id="hardware">
  <div class="ifl-container">
    <div class="section-label">Hardware</div>
    <h2 class="section-title">Plug In &amp; <span class="accent">Go Live</span></h2>
    <p class="section-sub">No drivers to hunt. No middleware. Just works out of the box.</p>
    <div class="hw-grid">
      <div class="hw-card"><div class="hw-icon">&#128222;</div><h4>Caller ID</h4><p>Customer profile before you say hello</p></div>
      <div class="hw-card"><div class="hw-icon">&#128424;&#65039;</div><h4>Receipt Printer</h4><p>Branded receipts with QR, auto-print</p></div>
      <div class="hw-card"><div class="hw-icon">&#127859;</div><h4>Kitchen Printer</h4><p>Tickets with modifiers to kitchen</p></div>
      <div class="hw-card"><div class="hw-icon">&#128179;</div><h4>Card Reader</h4><p>Contactless &amp; chip integrated</p></div>
      <div class="hw-card"><div class="hw-icon">&#128421;&#65039;</div><h4>POS Terminal</h4><p>Modern Windows terminal hardware</p></div>
    </div>
  </div>
</section>

<div class="ifl-divider"></div>

<section class="ifl-cta reveal" id="contact">
  <h2>Ready to <span style="color:#E8201A">Go Live?</span></h2>
  <p>Get your complete restaurant system live from &pound;149 &mdash; one-time, fully set up, no monthly fees.</p>
  <div class="cta-btns">
    <a href="tel:+447926373552" class="btn-primary" style="font-size:1rem;padding:16px 36px">Get Started Today</a>
  </div>
  <div class="contact-cards">
    <a href="tel:+447926373552" class="contact-card">
      <span class="icon">&#128222;</span>
      <div><strong>Call us</strong><span>+44 7926 373 552</span></div>
    </a>
    <a href="tel:+447873144306" class="contact-card">
      <span class="icon">&#128241;</span>
      <div><strong>Call us</strong><span>+44 7873 144 306</span></div>
    </a>
    <a href="https://wa.me/447926373552" class="contact-card">
      <span class="icon">&#128172;</span>
      <div><strong>WhatsApp</strong><span>wa.link/sek6lua</span></div>
    </a>
    <a href="mailto:jamialhasan@gmail.com" class="contact-card">
      <span class="icon">&#9993;&#65039;</span>
      <div><strong>Email us</strong><span>jamialhasan@gmail.com</span></div>
    </a>
  </div>
</section>
`;

const IFL_JS = `
(function(){
  document.querySelectorAll('.ifl .reveal').forEach(function(r){r.classList.add('hidden')});
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('hidden');e.target.classList.add('visible')}})},{threshold:0,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.ifl .reveal').forEach(function(r){obs.observe(r)});
  setTimeout(function(){document.querySelectorAll('.ifl .reveal').forEach(function(r){r.classList.remove('hidden');r.classList.add('visible')})},300);

  var langBtns=document.querySelectorAll('.ifl .lang-option');
  langBtns.forEach(function(btn){btn.addEventListener('click',function(){langBtns.forEach(function(b){b.classList.remove('active')});btn.classList.add('active')})});
})();
`;

export default function IflowPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const script = document.createElement("script");
    script.textContent = IFL_JS;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ifl">
      <Seo url={HOME_ROUTE} page="iflow" />
      <Header />
      <style>{IFL_STYLES}</style>
      <div dangerouslySetInnerHTML={{ __html: IFL_HTML }} />
      <Footer />
    </div>
  );
}
