import { useEffect } from "react";
import { Header, Footer } from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import { HOME_ROUTE } from "../../../helper/routes";

const PROPERTY_STYLES = `
.pph{overflow-x:hidden;max-width:100%;background:var(--ink);color:var(--white);font-family:'Plus Jakarta Sans',sans-serif;line-height:1.6}
.pph .btn-fire{background:var(--fire);color:#fff;padding:0.9rem 2.2rem;border:none;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.9rem;font-weight:700;cursor:pointer;letter-spacing:0.04em;text-transform:uppercase;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem}
.pph .btn-fire:hover{background:#ff4d70;transform:translateY(-2px);box-shadow:0 14px 35px rgba(255,45,85,0.35)}
.pph .btn-ghost{background:transparent;color:var(--white);padding:0.9rem 2.2rem;border:1.5px solid var(--border);border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.9rem;font-weight:600;cursor:pointer;letter-spacing:0.04em;text-transform:uppercase;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem}
.pph .btn-ghost:hover{border-color:rgba(255,255,255,0.3);transform:translateY(-2px)}
.pph .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:7rem 5% 5rem;position:relative;overflow:hidden}
.pph .hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,45,85,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,85,0.04) 1px,transparent 1px);background-size:55px 55px;z-index:0}
.pph .hero-glow{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 60% 60% at 50% 30%,rgba(255,45,85,0.12) 0%,transparent 70%)}
.pph .hero-content{position:relative;z-index:1;max-width:900px}
.pph .hero-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.3);padding:0.45rem 1.1rem;border-radius:100px;font-family:'Space Mono',monospace;font-size:clamp(0.72rem,1vw,0.85rem);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--fire);margin-bottom:1.8rem;animation:pphFadeUp 0.6s ease both}
.pph .hero-badge .dot{width:7px;height:7px;background:var(--fire);border-radius:50%;animation:pphBlink 1.4s infinite;flex-shrink:0}
@keyframes pphBlink{50%{opacity:0.15}}
.pph .hero h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,8vw,8.5rem);line-height:0.88;letter-spacing:0.02em;margin-bottom:1.5rem;animation:pphFadeUp 0.65s 0.08s ease both}
.pph .hero h1 .line-fire{color:var(--fire);display:block}
.pph .hero h1 .line-white{color:var(--white);display:block}
.pph .hero h1 .outline{-webkit-text-stroke:3px var(--fire);color:transparent}
.pph .hero-sub{font-size:clamp(0.95rem,1.2vw,1.1rem);color:var(--mist);max-width:600px;margin:0 auto 2.5rem;line-height:1.75;animation:pphFadeUp 0.65s 0.16s ease both}
.pph .hero-btns{display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;animation:pphFadeUp 0.65s 0.24s ease both}
.pph .hero-stats{display:flex;gap:3rem;justify-content:center;flex-wrap:wrap;margin-top:3rem;animation:pphFadeUp 0.65s 0.32s ease both}
.pph .hero-stat .num{font-family:'Bebas Neue',sans-serif;font-size:2.8rem;color:var(--fire);line-height:1}
.pph .hero-stat .lbl{font-size:0.75rem;color:var(--mist);text-transform:uppercase;letter-spacing:0.08em}
@keyframes pphFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.pph .ticker-wrap{background:var(--fire);padding:0.6rem 0;overflow:hidden;white-space:nowrap}
.pph .ticker{display:inline-block;animation:pphTicker 35s linear infinite}
.pph .ticker span{font-family:'Space Mono',monospace;font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:0 2.5rem;color:#fff}
.pph .ticker span i{margin-right:0.4rem}
@keyframes pphTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.pph .pph-container{width:100%;max-width:1180px;margin:0 auto;padding:0 2.5rem;box-sizing:border-box}
.pph .sec-label{font-family:'Space Mono',monospace;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--fire);margin-bottom:0.8rem;display:flex;align-items:center;gap:0.5rem}
.pph .sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.6rem,4.5vw,4.5rem);line-height:0.95;margin-bottom:1.2rem}
.pph .sec-sub{font-size:1rem;color:var(--mist);max-width:500px;line-height:1.75;margin-bottom:2.5rem}
.pph section.feat{padding:6rem 0}
.pph section.feat.alt{background:var(--smoke)}
.pph .two-col{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.pph .two-col.flip{direction:rtl}
.pph .two-col.flip>*{direction:ltr}
.pph .feat-list{list-style:none;display:flex;flex-direction:column;gap:0.9rem}
.pph .feat-list li{display:flex;align-items:flex-start;gap:0.75rem;font-size:0.93rem;color:var(--mist);line-height:1.55}
.pph .feat-list li .ico{width:30px;height:30px;border-radius:7px;background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.2);display:flex;align-items:center;justify-content:center;font-size:0.78rem;flex-shrink:0;margin-top:1px;color:var(--fire)}
.pph .img-frame{border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 30px 80px rgba(0,0,0,0.5);background:var(--steel)}
.pph .highlight-box{background:var(--slate);border:1px solid var(--border);border-radius:12px;padding:1.5rem;margin-top:1.5rem;border-left:3px solid var(--fire)}
.pph .highlight-box p{font-size:0.88rem;color:var(--mist);line-height:1.65}
.pph .highlight-box strong{color:var(--white)}
.pph .highlight-box i{color:var(--fire);margin-right:0.3rem}
.pph .feat-grid-section{padding:6rem 0;background:var(--ink)}
.pph .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:1.5rem}
.pph .fg-card{background:var(--steel);border:1px solid var(--border);border-radius:16px;padding:2rem;transition:transform 0.3s,border-color 0.3s;position:relative;overflow:hidden}
.pph .fg-card:hover{transform:translateY(-4px)}
.pph .fg-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
.pph .fg-card.c-blue::before{background:linear-gradient(90deg,var(--blue),var(--cyan))}
.pph .fg-card.c-blue:hover{border-color:rgba(10,132,255,0.3)}
.pph .fg-card.c-green::before{background:linear-gradient(90deg,var(--green),var(--cyan))}
.pph .fg-card.c-green:hover{border-color:rgba(52,199,89,0.3)}
.pph .fg-card.c-purple::before{background:linear-gradient(90deg,var(--purple),var(--fire))}
.pph .fg-card.c-purple:hover{border-color:rgba(168,85,247,0.3)}
.pph .fg-card.c-amber::before{background:linear-gradient(90deg,var(--amber),var(--fire))}
.pph .fg-card.c-amber:hover{border-color:rgba(255,149,0,0.3)}
.pph .fg-card.c-fire::before{background:linear-gradient(90deg,var(--fire),var(--amber))}
.pph .fg-card.c-fire:hover{border-color:rgba(255,45,85,0.3)}
.pph .fg-card.c-cyan::before{background:linear-gradient(90deg,var(--cyan),var(--blue))}
.pph .fg-card.c-cyan:hover{border-color:rgba(50,217,250,0.3)}
.pph .fg-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.2rem}
.pph .c-blue .fg-icon{background:rgba(10,132,255,0.1);border:1px solid rgba(10,132,255,0.25);color:var(--blue)}
.pph .c-green .fg-icon{background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.25);color:var(--green)}
.pph .c-purple .fg-icon{background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);color:var(--purple)}
.pph .c-amber .fg-icon{background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.25);color:var(--amber)}
.pph .c-fire .fg-icon{background:rgba(255,45,85,0.1);border:1px solid rgba(255,45,85,0.25);color:var(--fire)}
.pph .c-cyan .fg-icon{background:rgba(50,217,250,0.1);border:1px solid rgba(50,217,250,0.25);color:var(--cyan)}
.pph .fg-title{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.02em;margin-bottom:0.6rem}
.pph .fg-desc{font-size:0.88rem;color:var(--mist);line-height:1.7;margin-bottom:1rem}
.pph .fg-tags{display:flex;gap:0.4rem;flex-wrap:wrap}
.pph .fg-tag{font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:0.25rem 0.65rem;color:var(--white)}
.pph .cta-section{padding:8rem 0;text-align:center;position:relative;overflow:hidden}
.pph .cta-glow{position:absolute;inset:0;background:radial-gradient(ellipse 65% 65% at 50% 50%,rgba(255,45,85,0.09) 0%,transparent 70%)}
.pph .cta-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,8vw,8rem);line-height:0.9;margin-bottom:1.2rem;position:relative}
.pph .cta-sub{font-size:1.05rem;color:var(--mist);margin-bottom:2.8rem;position:relative}
.pph .cta-btns{display:flex;justify-content:center;gap:1rem;position:relative;flex-wrap:wrap}
.pph .div-line{height:1px;background:linear-gradient(90deg,transparent,rgba(255,45,85,0.15),transparent);margin:0}
.pph .reveal{opacity:1;transform:translateY(0);transition:opacity 0.65s ease,transform 0.65s ease}
.pph .reveal.hidden{opacity:0;transform:translateY(28px)}
.pph .reveal.visible{opacity:1;transform:translateY(0)}
.pph .softbot-section{padding:4rem 0 6rem;text-align:center;position:relative}
.pph .softbot-card{max-width:560px;margin:0 auto;background:var(--steel);border:1px solid var(--border);border-radius:20px;padding:2.5rem 2rem;position:relative;overflow:hidden}
.pph .softbot-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--fire),var(--amber),var(--purple),var(--cyan))}
.pph .softbot-avatar{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--fire),var(--amber));display:flex;align-items:center;justify-content:center;margin:0 auto 1.2rem;font-size:1.6rem;color:#fff;box-shadow:0 8px 30px rgba(255,45,85,0.3)}
.pph .softbot-title{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:0.03em;margin-bottom:0.4rem;color:var(--white)}
.pph .softbot-sub{font-size:0.85rem;color:var(--mist);margin-bottom:1.5rem;line-height:1.7;max-width:420px;margin-left:auto;margin-right:auto}
.pph .softbot-chat{background:var(--ink);border:1px solid var(--border);border-radius:14px;padding:1rem;text-align:left;max-height:180px;overflow-y:auto;margin-bottom:1.2rem}
.pph .softbot-msg{display:flex;gap:0.6rem;margin-bottom:0.8rem}
.pph .softbot-msg:last-child{margin-bottom:0}
.pph .softbot-msg-icon{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,var(--fire),var(--amber));display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.7rem;color:#fff}
.pph .softbot-msg-bubble{background:var(--steel);border:1px solid var(--border);border-radius:10px;padding:0.6rem 0.9rem;font-size:0.8rem;color:var(--mist);line-height:1.6}
.pph .softbot-msg-bubble strong{color:var(--white)}
.pph .softbot-input-wrap{display:flex;gap:0.5rem}
.pph .softbot-input{flex:1;background:var(--ink);border:1px solid var(--border);border-radius:10px;padding:0.7rem 1rem;color:var(--white);font-size:0.85rem;font-family:'Plus Jakarta Sans',sans-serif;outline:none;transition:border-color 0.2s}
.pph .softbot-input::placeholder{color:var(--mist)}
.pph .softbot-input:focus{border-color:var(--fire)}
.pph .softbot-send{background:var(--fire);border:none;border-radius:10px;padding:0.7rem 1.2rem;color:#fff;cursor:pointer;font-size:0.9rem;transition:all 0.2s}
.pph .softbot-send:hover{background:#ff4d70;transform:translateY(-1px)}
.pph .softbot-powered{font-size:0.68rem;color:var(--mist);margin-top:1rem;letter-spacing:0.05em;text-transform:uppercase;font-weight:600}
@media(max-width:1100px){.pph .two-col{grid-template-columns:1fr;gap:2.5rem}.pph .two-col.flip{direction:ltr}section.feat{padding:4rem 0}}
@media(max-width:768px){.pph .nav-inner{padding:1rem 1.2rem}.pph .container{padding:0 1.2rem}.pph .feat-grid{grid-template-columns:1fr}}
@media(max-width:600px){.pph .hero h1{font-size:3rem}.pph .hero-stats{gap:1.5rem}section.feat,.pph .feat-grid-section,.pph .cta-section{padding:3rem 1.2rem}}
`;

const PROPERTY_HTML = `
<section class="hero">
  <div class="hero-glow"></div>
  <div class="hero-content">
    <div class="hero-badge"><span class="dot"></span> AI-Powered Property Platform</div>
    <h1><span class="line-white">One Platform.</span><span class="line-fire">Every Property.</span><span class="line-white outline">Every Tenant.</span></h1>
    <p class="hero-sub">Stop juggling spreadsheets and scattered tools. One intelligent platform to handle properties, tenants, leases, payments, and maintenance — so you can focus on growing your portfolio.</p>
    <div class="hero-btns">
      <a href="#cta" class="btn-fire"><i class="fa-solid fa-rocket"></i> Start Free Trial</a>
      <a href="#properties" class="btn-ghost"><i class="fa-solid fa-play"></i> See How It Works</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="num">15+</div><div class="lbl">Modules</div></div>
      <div class="hero-stat"><div class="num">3</div><div class="lbl">User Roles</div></div>
      <div class="hero-stat"><div class="num">24/7</div><div class="lbl">Tenant Portal</div></div>
      <div class="hero-stat"><div class="num">100%</div><div class="lbl">White Label</div></div>
    </div>
  </div>
</section>

<section class="softbot-section">
  <div class="pph-container">
    <div class="softbot-card reveal">
      <div class="softbot-avatar"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div class="softbot-title">Ask Softbot</div>
      <p class="softbot-sub">Your intelligent property assistant. From onboarding tenants to tracking maintenance — just ask and get step-by-step guidance instantly.</p>
      <div class="softbot-chat">
        <div class="softbot-msg">
          <div class="softbot-msg-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
          <div class="softbot-msg-bubble">Hello! I'm <strong>Softbot</strong> — your property management assistant. Ask me anything about properties, tenants, leases, payments, or maintenance.</div>
        </div>
        <div class="softbot-msg" style="justify-content:flex-end">
          <div class="softbot-msg-bubble" style="background:rgba(255,45,85,0.12);border-color:rgba(255,45,85,0.25);color:var(--white)">A tenant submitted a maintenance request. How do I assign a vendor?</div>
          <div class="softbot-msg-icon" style="background:var(--slate)"><i class="fa-solid fa-user"></i></div>
        </div>
        <div class="softbot-msg">
          <div class="softbot-msg-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
          <div class="softbot-msg-bubble">Go to <strong>Maintenance → Open Requests</strong>. Click the request, hit <strong>"Assign Vendor"</strong>, select from your vendor list, and set priority. The tenant gets notified automatically and you can track progress in real time.</div>
        </div>
      </div>
      <div class="softbot-input-wrap">
        <input type="text" class="softbot-input" placeholder="Ask Softbot anything..." readonly />
        <button class="softbot-send"><i class="fa-solid fa-arrow-up"></i></button>
      </div>
      <div class="softbot-powered">Powered by Softbot AI</div>
    </div>
  </div>
</section>

<div class="ticker-wrap">
  <div class="ticker">
    <span><i class="fa-solid fa-building"></i> Property Management</span>
    <span><i class="fa-solid fa-users"></i> Tenant Portal</span>
    <span><i class="fa-solid fa-file-contract"></i> Lease Tracking</span>
    <span><i class="fa-solid fa-credit-card"></i> Stripe Payments</span>
    <span><i class="fa-solid fa-wrench"></i> Maintenance</span>
    <span><i class="fa-solid fa-comments"></i> Realtime Chat</span>
    <span><i class="fa-solid fa-chart-line"></i> Analytics</span>
    <span><i class="fa-solid fa-calendar"></i> Events &amp; Calendar</span>
    <span><i class="fa-solid fa-shield-halved"></i> Role-Based Access</span>
    <span><i class="fa-solid fa-file-invoice"></i> PDF Invoices</span>
    <span><i class="fa-solid fa-building"></i> Property Management</span>
    <span><i class="fa-solid fa-users"></i> Tenant Portal</span>
    <span><i class="fa-solid fa-file-contract"></i> Lease Tracking</span>
    <span><i class="fa-solid fa-credit-card"></i> Stripe Payments</span>
    <span><i class="fa-solid fa-wrench"></i> Maintenance</span>
    <span><i class="fa-solid fa-comments"></i> Realtime Chat</span>
    <span><i class="fa-solid fa-chart-line"></i> Analytics</span>
    <span><i class="fa-solid fa-calendar"></i> Events &amp; Calendar</span>
    <span><i class="fa-solid fa-shield-halved"></i> Role-Based Access</span>
    <span><i class="fa-solid fa-file-invoice"></i> PDF Invoices</span>
  </div>
</div>

<div class="div-line"></div>

<section class="feat reveal" id="properties">
  <div class="pph-container">
    <div class="two-col">
      <div>
        <div class="sec-label"><i class="fa-solid fa-building"></i> // Property &amp; Unit Management</div>
        <h2 class="sec-title">Every Property.<br>Every Unit.<br>Always Tracked.</h2>
        <p class="sec-sub">Add unlimited properties with photos, descriptions, pricing, and location details. Manage individual units under each property with full status tracking.</p>
        <ul class="feat-list">
          <li><span class="ico"><i class="fa-solid fa-plus"></i></span>Add unlimited properties with photos, descriptions, pricing, and location details</li>
          <li><span class="ico"><i class="fa-solid fa-layer-group"></i></span>Manage individual units under each property</li>
          <li><span class="ico"><i class="fa-solid fa-circle-dot"></i></span>Track status — Available, Occupied, Under Maintenance</li>
          <li><span class="ico"><i class="fa-solid fa-magnifying-glass"></i></span>Advanced search and filtering for faster portfolio management</li>
          <li><span class="ico"><i class="fa-solid fa-check-double"></i></span>Bulk actions for managing large property collections</li>
          <li><span class="ico"><i class="fa-solid fa-grip"></i></span>Grid and list view support for flexible browsing</li>
        </ul>
      </div>
      <div class="img-frame" style="background:linear-gradient(135deg, #1a1220, #121a1e); min-height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="text-align:center;padding:3rem;">
          <i class="fa-solid fa-building" style="font-size:4rem;color:var(--fire);opacity:0.6;margin-bottom:1rem;display:block;"></i>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--white);">Property Portfolio</div>
          <div style="color:var(--mist);font-size:0.85rem;margin-top:0.5rem;">Unlimited properties &amp; units</div>
          <div style="display:flex;gap:0.8rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
            <div style="background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--green);font-weight:600;">Available: 24</div>
            <div style="background:rgba(255,45,85,0.1);border:1px solid rgba(255,45,85,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--fire);font-weight:600;">Occupied: 18</div>
            <div style="background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--amber);font-weight:600;">Maintenance: 3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat alt reveal" id="tenants">
  <div class="pph-container">
    <div class="two-col flip">
      <div>
        <div class="sec-label"><i class="fa-solid fa-users"></i> // Tenant Management &amp; Portal</div>
        <h2 class="sec-title">Complete Tenant<br>Lifecycle.<br>Dedicated Portal.</h2>
        <p class="sec-sub">From application to move-out — manage the full tenant journey with a dedicated portal for payments, leases, requests, and communication.</p>
        <ul class="feat-list">
          <li><span class="ico"><i class="fa-solid fa-user-plus"></i></span>Complete tenant lifecycle from application to move-out</li>
          <li><span class="ico"><i class="fa-solid fa-gauge-high"></i></span>Dedicated tenant portal — payments, leases, requests, communication</li>
          <li><span class="ico"><i class="fa-solid fa-clipboard-check"></i></span>Tenant application tracking and approval workflow</li>
          <li><span class="ico"><i class="fa-solid fa-folder-open"></i></span>Upload and manage tenant documents and agreements</li>
          <li><span class="ico"><i class="fa-solid fa-clock-rotate-left"></i></span>Tenant activity history and communication records</li>
          <li><span class="ico"><i class="fa-solid fa-palette"></i></span>Clean portal design aligned with admin experience</li>
        </ul>
        <div class="highlight-box">
          <p><i class="fa-solid fa-circle-info"></i> <strong>Tenant self-service.</strong> Tenants can view leases, pay rent, submit maintenance requests, and communicate with property managers — all from one portal.</p>
        </div>
      </div>
      <div class="img-frame" style="background:linear-gradient(135deg, #0e1a2a, #121a1e); min-height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="text-align:center;padding:3rem;">
          <i class="fa-solid fa-users" style="font-size:4rem;color:var(--cyan);opacity:0.6;margin-bottom:1rem;display:block;"></i>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--white);">Tenant Portal</div>
          <div style="color:var(--mist);font-size:0.85rem;margin-top:0.5rem;">Self-service dashboard</div>
          <div style="display:flex;gap:0.6rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
            <div style="background:rgba(50,217,250,0.1);border:1px solid rgba(50,217,250,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--cyan);font-weight:600;"><i class="fa-solid fa-credit-card"></i> Pay Rent</div>
            <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--purple);font-weight:600;"><i class="fa-solid fa-wrench"></i> Requests</div>
            <div style="background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--green);font-weight:600;"><i class="fa-solid fa-file-contract"></i> Leases</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat reveal" id="leases">
  <div class="pph-container">
    <div class="two-col">
      <div>
        <div class="sec-label"><i class="fa-solid fa-file-contract"></i> // Lease Management</div>
        <h2 class="sec-title">Create. Renew.<br>Track Every<br>Lease.</h2>
        <p class="sec-sub">Create, edit, renew, and terminate leases easily. Track active, expired, and upcoming renewals with automatic invoice generation.</p>
        <ul class="feat-list">
          <li><span class="ico"><i class="fa-solid fa-pen-to-square"></i></span>Create, edit, renew, and terminate leases easily</li>
          <li><span class="ico"><i class="fa-solid fa-list-check"></i></span>Track active, expired, and upcoming lease renewals</li>
          <li><span class="ico"><i class="fa-solid fa-file-invoice"></i></span>Automatic invoice generation based on lease terms</li>
          <li><span class="ico"><i class="fa-solid fa-bell"></i></span>Lease expiration alerts and dashboard notifications</li>
          <li><span class="ico"><i class="fa-solid fa-clock-rotate-left"></i></span>Lease history for long-term record keeping</li>
        </ul>
      </div>
      <div class="img-frame" style="background:linear-gradient(135deg, #1a1508, #121a1e); min-height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="text-align:center;padding:3rem;">
          <i class="fa-solid fa-file-contract" style="font-size:4rem;color:var(--amber);opacity:0.6;margin-bottom:1rem;display:block;"></i>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--white);">Lease Pipeline</div>
          <div style="color:var(--mist);font-size:0.85rem;margin-top:0.5rem;">Full lifecycle tracking</div>
          <div style="display:flex;gap:0.6rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
            <div style="background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--green);font-weight:600;">Active: 42</div>
            <div style="background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--amber);font-weight:600;">Expiring Soon: 5</div>
            <div style="background:rgba(255,45,85,0.1);border:1px solid rgba(255,45,85,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--fire);font-weight:600;">Expired: 2</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat alt reveal" id="payments">
  <div class="pph-container">
    <div class="two-col flip">
      <div>
        <div class="sec-label"><i class="fa-solid fa-credit-card"></i> // Rent Collection &amp; Payments</div>
        <h2 class="sec-title">Stripe Integration.<br>PDF Invoices.<br>Full Tracking.</h2>
        <p class="sec-sub">Stripe integration for online rent collection. Generate professional invoices, track payments, and manage multi-currency support.</p>
        <ul class="feat-list">
          <li><span class="ico"><i class="fa-brands fa-stripe"></i></span>Stripe integration for online rent collection</li>
          <li><span class="ico"><i class="fa-solid fa-file-pdf"></i></span>Generate and send professional PDF invoices</li>
          <li><span class="ico"><i class="fa-solid fa-list"></i></span>Track paid, unpaid, overdue, and partial payments</li>
          <li><span class="ico"><i class="fa-solid fa-clock-rotate-left"></i></span>Payment history with clear status tracking</li>
          <li><span class="ico"><i class="fa-solid fa-coins"></i></span>Multi-currency support</li>
          <li><span class="ico"><i class="fa-solid fa-chart-pie"></i></span>Collection rate analytics and finance reporting</li>
        </ul>
      </div>
      <div class="img-frame" style="background:linear-gradient(135deg, #0d1a0e, #121a1e); min-height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="text-align:center;padding:3rem;">
          <i class="fa-solid fa-credit-card" style="font-size:4rem;color:var(--green);opacity:0.6;margin-bottom:1rem;display:block;"></i>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--white);">Payment Dashboard</div>
          <div style="color:var(--mist);font-size:0.85rem;margin-top:0.5rem;">Stripe-powered collection</div>
          <div style="display:flex;gap:0.8rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
            <div style="background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--green);font-weight:600;">Paid: 38</div>
            <div style="background:rgba(255,45,85,0.1);border:1px solid rgba(255,45,85,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--fire);font-weight:600;">Overdue: 4</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat reveal" id="maintenance">
  <div class="pph-container">
    <div class="two-col">
      <div>
        <div class="sec-label"><i class="fa-solid fa-wrench"></i> // Maintenance &amp; Work Orders</div>
        <h2 class="sec-title">Submit. Track.<br>Resolve. Fast.</h2>
        <p class="sec-sub">Tenants submit maintenance requests with photos. Track from Submitted to In Progress to Resolved with vendor assignment and repair coordination.</p>
        <ul class="feat-list">
          <li><span class="ico"><i class="fa-solid fa-camera"></i></span>Tenants submit requests with photo attachments</li>
          <li><span class="ico"><i class="fa-solid fa-arrow-right-arrow-left"></i></span>Track status — Submitted to In Progress to Resolved</li>
          <li><span class="ico"><i class="fa-solid fa-user-gear"></i></span>Vendor assignment and repair coordination</li>
          <li><span class="ico"><i class="fa-solid fa-triangle-exclamation"></i></span>Emergency maintenance prioritization</li>
        </ul>
      </div>
      <div class="img-frame" style="background:linear-gradient(135deg, #1a1018, #121a1e); min-height: 400px; display: flex; align-items: center; justify-content: center;">
        <div style="text-align:center;padding:3rem;">
          <i class="fa-solid fa-wrench" style="font-size:4rem;color:var(--purple);opacity:0.6;margin-bottom:1rem;display:block;"></i>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--white);">Work Order Board</div>
          <div style="color:var(--mist);font-size:0.85rem;margin-top:0.5rem;">Track every request</div>
          <div style="display:flex;gap:0.6rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
            <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--purple);font-weight:600;">Submitted: 6</div>
            <div style="background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--amber);font-weight:600;">In Progress: 3</div>
            <div style="background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.3);border-radius:8px;padding:0.5rem 1rem;font-size:0.75rem;color:var(--green);font-weight:600;">Resolved: 28</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat-grid-section reveal" id="more">
  <div class="pph-container">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <div class="sec-label" style="justify-content:center"><i class="fa-solid fa-ellipsis"></i> // Built-In Modules</div>
      <h2 class="sec-title">Everything You Need.<br><span style="color:var(--fire)">Already Included.</span></h2>
      <p class="sec-sub" style="margin:0 auto;text-align:center;max-width:560px;">Beyond property and tenant management — PropertyHub ships with a full suite of built-in modules for communication, finance, analytics, and operations.</p>
    </div>
    <div class="feat-grid">
      <div class="fg-card c-blue"><div class="fg-icon"><i class="fa-solid fa-ticket"></i></div><div class="fg-title">Support Ticket System</div><div class="fg-desc">Built-in support ticket module for organized communication. Track issue history and responses inside the system — helpful for property teams, managers, and tenants.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--blue);border-color:rgba(10,132,255,0.3);background:rgba(10,132,255,0.07);">Ticket Tracking</span><span class="fg-tag" style="color:var(--blue);border-color:rgba(10,132,255,0.3);background:rgba(10,132,255,0.07);">Issue History</span></div></div>
      <div class="fg-card c-green"><div class="fg-icon"><i class="fa-solid fa-clipboard-check"></i></div><div class="fg-title">Inspection Management</div><div class="fg-desc">Dedicated inspection module for admin and property operations. Schedule and manage property inspections efficiently. Improve reporting and internal property tracking.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Scheduling</span><span class="fg-tag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Reporting</span></div></div>
      <div class="fg-card c-purple"><div class="fg-icon"><i class="fa-solid fa-comments"></i></div><div class="fg-title">Realtime Communication</div><div class="fg-desc">Realtime chat between managers and tenants. One-to-one conversations and group messaging, announcements module, push notifications, read receipts, and SSE-powered performance.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--purple);border-color:rgba(168,85,247,0.3);background:rgba(168,85,247,0.07);">Live Chat</span><span class="fg-tag" style="color:var(--purple);border-color:rgba(168,85,247,0.3);background:rgba(168,85,247,0.07);">Announcements</span><span class="fg-tag" style="color:var(--purple);border-color:rgba(168,85,247,0.3);background:rgba(168,85,247,0.07);">Push Notifications</span></div></div>
      <div class="fg-card c-amber"><div class="fg-icon"><i class="fa-solid fa-chart-line"></i></div><div class="fg-title">Finance Module</div><div class="fg-desc">Dedicated finance module for better financial oversight. Track revenue, payment activity, and business performance. Improved dashboard data accuracy for finance insights.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--amber);border-color:rgba(255,149,0,0.3);background:rgba(255,149,0,0.07);">Revenue Tracking</span><span class="fg-tag" style="color:var(--amber);border-color:rgba(255,149,0,0.3);background:rgba(255,149,0,0.07);">Finance Dashboard</span></div></div>
      <div class="fg-card c-fire"><div class="fg-icon"><i class="fa-solid fa-calendar-days"></i></div><div class="fg-title">Events &amp; Calendar</div><div class="fg-desc">Create and manage events, inspections, and appointments. RSVP tracking, automated event reminders, and Google Calendar integration support.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--fire);border-color:rgba(255,45,85,0.3);background:rgba(255,45,85,0.07);">RSVP</span><span class="fg-tag" style="color:var(--fire);border-color:rgba(255,45,85,0.3);background:rgba(255,45,85,0.07);">Google Calendar</span><span class="fg-tag" style="color:var(--fire);border-color:rgba(255,45,85,0.3);background:rgba(255,45,85,0.07);">Reminders</span></div></div>
      <div class="fg-card c-cyan"><div class="fg-icon"><i class="fa-solid fa-shield-halved"></i></div><div class="fg-title">Role-Based Access Control</div><div class="fg-desc">Three roles — Admin, Property Manager, and Tenant. Separate dashboard experiences by role. Permission-based actions, protected workflows, JWT and NextAuth.js authentication.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--cyan);border-color:rgba(50,217,250,0.3);background:rgba(50,217,250,0.07);">3 Roles</span><span class="fg-tag" style="color:var(--cyan);border-color:rgba(50,217,250,0.3);background:rgba(50,217,250,0.07);">JWT Auth</span><span class="fg-tag" style="color:var(--cyan);border-color:rgba(50,217,250,0.3);background:rgba(50,217,250,0.07);">Permissions</span></div></div>
      <div class="fg-card c-blue"><div class="fg-icon"><i class="fa-solid fa-chart-pie"></i></div><div class="fg-title">Analytics &amp; Reporting</div><div class="fg-desc">Realtime portfolio overview with occupancy and revenue insights. Revenue and expense charts, vacancy rate reporting, maintenance analytics, lease renewal forecasting, and activity timeline.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--blue);border-color:rgba(10,132,255,0.3);background:rgba(10,132,255,0.07);">Occupancy</span><span class="fg-tag" style="color:var(--blue);border-color:rgba(10,132,255,0.3);background:rgba(10,132,255,0.07);">Revenue Charts</span><span class="fg-tag" style="color:var(--blue);border-color:rgba(10,132,255,0.3);background:rgba(10,132,255,0.07);">Forecasting</span></div></div>
      <div class="fg-card c-green"><div class="fg-icon"><i class="fa-solid fa-sliders"></i></div><div class="fg-title">Admin Experience</div><div class="fg-desc">User management and role assignment. System monitoring and activity logs. Application-wide settings, improved sidebar navigation, and enhanced dashboard card design.</div><div class="fg-tags"><span class="fg-tag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">User Management</span><span class="fg-tag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Activity Logs</span></div></div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="cta-section reveal" id="cta">
  <div class="pph-container">
    <div class="cta-glow"></div>
    <div class="cta-title"><span style="color:var(--mist)">Your Properties.</span><br><span style="color:var(--fire)">One Platform.</span></div>
    <p class="cta-sub">No fragmented tools. No missed rent. No maintenance headaches. Just IPRO — and you're live.</p>
    <div class="cta-btns">
      <a href="#cta" class="btn-fire"><i class="fa-solid fa-rocket"></i> Start Free Trial</a>
      <a href="#properties" class="btn-ghost"><i class="fa-solid fa-play"></i> Explore Features</a>
    </div>
  </div>
</section>


`;

export default function PropertyPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const revealEls = document.querySelectorAll(".pph .reveal");
    revealEls.forEach((r) => r.classList.add("hidden"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("hidden");
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((r) => obs.observe(r));
    setTimeout(() => {
      document.querySelectorAll(".pph .reveal").forEach((r) => {
        r.classList.remove("hidden");
        r.classList.add("visible");
      });
    }, 300);

    return () => {
      obs.disconnect();
    };
  }, []);

  return (
    <div className="pph">
      <Seo url={HOME_ROUTE} page="property" />
      <Header />
      <style>{PROPERTY_STYLES}</style>
      <div dangerouslySetInnerHTML={{ __html: PROPERTY_HTML }} />
      <Footer />
    </div>
  );
}
