import { useEffect } from "react";
import { Header, Footer } from "../../../components/index";
import Seo from "../../../components/seo/Seo";
import { HOME_ROUTE } from "../../../helper/routes";

const IMX_STYLES = `
.imax{overflow-x:hidden;max-width:100%;background:var(--ink);color:var(--white);font-family:'Plus Jakarta Sans',sans-serif;line-height:1.6}
.imax .btn-fire{background:var(--fire);color:#fff;padding:0.9rem 2.2rem;border:none;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.9rem;font-weight:700;cursor:pointer;letter-spacing:0.04em;text-transform:uppercase;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem}
.imax .btn-fire:hover{background:#ff4d70;transform:translateY(-2px);box-shadow:0 14px 35px rgba(255,45,85,0.35)}
.imax .btn-ghost{background:transparent;color:var(--white);padding:0.9rem 2.2rem;border:1.5px solid var(--border);border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.9rem;font-weight:600;cursor:pointer;letter-spacing:0.04em;text-transform:uppercase;transition:all 0.2s;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem}
.imax .btn-ghost:hover{border-color:rgba(255,255,255,0.3);transform:translateY(-2px)}
.imax .ticker-wrap{background:var(--fire);padding:0.6rem 0;overflow:hidden;white-space:nowrap}
.imax .ticker{display:inline-block;animation:imxTicker 30s linear infinite}
.imax .ticker span{font-family:'Space Mono',monospace;font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:0 2.5rem}
.imax .ticker span i{margin-right:0.4rem}
@keyframes imxTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.imax .imax-container{width:100%;max-width:1180px;margin:0 auto;padding:0 2.5rem;box-sizing:border-box}
.imax .sec-label{font-family:'Space Mono',monospace;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--fire);margin-bottom:0.8rem;display:flex;align-items:center;gap:0.5rem}
.imax .sec-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.6rem,4.5vw,4.5rem);line-height:0.95;margin-bottom:1.2rem}
.imax .sec-sub{font-size:1rem;color:var(--mist);max-width:500px;line-height:1.75;margin-bottom:2.5rem}
.imax section.feat{padding:6rem 0}
.imax section.feat.alt{background:var(--smoke)}
.imax .two-col{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
.imax .two-col.flip{direction:rtl}
.imax .two-col.flip>*{direction:ltr}
.imax .feat-list{list-style:none;display:flex;flex-direction:column;gap:0.9rem}
.imax .feat-list li{display:flex;align-items:flex-start;gap:0.75rem;font-size:0.93rem;color:var(--mist);line-height:1.55}
.imax .feat-list li .ico{width:30px;height:30px;border-radius:7px;background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.2);display:flex;align-items:center;justify-content:center;font-size:0.78rem;flex-shrink:0;margin-top:1px;color:var(--fire)}
.imax .img-frame{border-radius:16px;overflow:hidden;border:1px solid var(--border);box-shadow:0 30px 80px rgba(0,0,0,0.5)}
.imax .img-frame img{width:100%;display:block}
.imax .highlight-box{background:var(--slate);border:1px solid var(--border);border-radius:12px;padding:1.5rem;margin-top:1.5rem;border-left:3px solid var(--fire)}
.imax .highlight-box p{font-size:0.88rem;color:var(--mist);line-height:1.65}
.imax .highlight-box strong{color:var(--white)}
.imax .highlight-box i{color:var(--fire);margin-right:0.3rem}
.imax .div-line{height:1px;background:linear-gradient(90deg,transparent,rgba(255,45,85,0.15),transparent);margin:0}
.imax .reveal{opacity:1;transform:translateY(0);transition:opacity 0.65s ease,transform 0.65s ease}
.imax .reveal.hidden{opacity:0;transform:translateY(28px)}
.imax .reveal.visible{opacity:1;transform:translateY(0)}
.imax .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:0;padding-top:5rem;position:relative;overflow:hidden}
.imax .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,45,85,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,85,0.04) 1px,transparent 1px);background-size:55px 55px;z-index:0}
.imax .hero-glow{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 55% 70% at 15% 55%,rgba(255,45,85,0.13) 0%,transparent 65%)}
.imax .hero-left{position:relative;z-index:1;padding:3rem 2.5rem;display:flex;flex-direction:column;justify-content:center}
.imax .os-label{display:inline-flex;align-items:center;gap:0.55rem;background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.3);padding:0.45rem 1.1rem;border-radius:100px;font-family:'Space Mono',monospace;font-size:clamp(0.75rem,1.05vw,0.92rem);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--fire);margin-bottom:1.8rem;width:fit-content;animation:imxFadeUp 0.6s ease both}
.imax .os-label .dot{width:7px;height:7px;background:var(--fire);border-radius:50%;animation:imxBlink 1.4s infinite;flex-shrink:0}
@keyframes imxBlink{50%{opacity:0.15}}
.imax .hero-headline{font-family:'Bebas Neue',sans-serif;font-size:clamp(4.5rem,8.5vw,9.5rem);line-height:0.88;letter-spacing:0.02em;margin-bottom:1.5rem;animation:imxFadeUp 0.65s 0.08s ease both}
.imax .hero-headline .line-fire{color:var(--fire);display:block}
.imax .hero-headline .line-white{color:var(--white);display:block}
.imax .hero-headline .outline{-webkit-text-stroke:3px var(--fire);color:transparent}
.imax .hero-slogan{font-family:'Space Mono',monospace;font-size:clamp(0.82rem,1.1vw,0.98rem);color:var(--amber);letter-spacing:0.06em;margin-bottom:2.2rem;animation:imxFadeUp 0.65s 0.16s ease both}
.imax .hero-btns{display:flex;gap:0.8rem;flex-wrap:wrap;animation:imxFadeUp 0.65s 0.24s ease both}
.imax .hero-right{position:relative;z-index:1;height:100%;min-height:100vh;display:flex;align-items:center;justify-content:flex-end;animation:imxFadeUp 0.7s 0.3s ease both;overflow:hidden}
.imax .pos-img-wrap{width:100%;position:relative}
.imax .pos-img-wrap img{width:100%;display:block;border-radius:20px 0 0 20px;box-shadow:-40px 20px 100px rgba(0,0,0,0.7);border:1px solid rgba(255,255,255,0.06);border-right:none}
.imax .pos-img-wrap::before{content:'';position:absolute;top:0;left:0;bottom:0;width:80px;background:linear-gradient(90deg,var(--ink),transparent);z-index:2;border-radius:20px 0 0 20px}
.imax .pos-badge{position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);background:rgba(24,27,36,0.94);border:1px solid var(--border);border-radius:100px;padding:0.5rem 1.4rem;display:flex;align-items:center;gap:1.4rem;white-space:nowrap;backdrop-filter:blur(16px);box-shadow:0 12px 40px rgba(0,0,0,0.5)}
.imax .hb-item{display:flex;align-items:center;gap:0.45rem;font-size:0.75rem;font-weight:600}
.imax .hb-dot{width:7px;height:7px;border-radius:50%}
@keyframes imxFadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.imax .channels-section{padding:6rem 0}
.imax .channels-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:3rem}
.imax .ch-item{background:var(--steel);padding:1.4rem 1rem;text-align:center;transition:background 0.2s}
.imax .ch-item:hover{background:var(--slate)}
.imax .ch-icon-big{font-size:1.5rem;margin-bottom:0.5rem;color:inherit}
.imax .ch-name{font-size:0.75rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.imax .c-pos{color:var(--fire)}.imax .c-web{color:var(--cyan)}.imax .c-shop{color:var(--amber)}.imax .c-stock{color:var(--green)}.imax .c-app{color:#BF5AF2}
.imax .channels-header{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:flex-start}
.imax .stats-row{display:flex;gap:3rem;flex-wrap:wrap}
.imax .stat-item .num{font-family:'Bebas Neue',sans-serif;font-size:3.2rem;color:var(--fire);line-height:1}
.imax .stat-item .lbl{font-size:0.78rem;color:var(--mist);text-transform:uppercase;letter-spacing:0.08em}
.imax .feat-banner{position:relative;width:100%;min-height:540px;overflow:hidden;background:var(--ink)}
.imax .bslide{position:absolute;inset:0;display:flex;align-items:center;opacity:0;transform:translateX(60px);transition:opacity 0.65s cubic-bezier(.4,0,.2,1),transform 0.65s cubic-bezier(.4,0,.2,1);pointer-events:none}
.imax .bslide.active{opacity:1;transform:translateX(0);pointer-events:all}
.imax .bslide.exit{opacity:0;transform:translateX(-60px)}
.imax .bslide::before{content:'';position:absolute;inset:0;z-index:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}
.imax .bslide-glow{position:absolute;inset:0;pointer-events:none;z-index:0}
.imax .bslide-inner{position:relative;z-index:2;width:100%;max-width:1180px;margin:0 auto;padding:4rem 2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.imax .bslide-text{display:flex;flex-direction:column;gap:1.2rem}
.imax .bslide-label{display:inline-flex;align-items:center;gap:0.5rem;font-family:'Space Mono',monospace;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:100px;padding:0.3rem 0.9rem;width:fit-content}
.imax .bslide-label::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor;animation:imxBlink 1.4s infinite;flex-shrink:0}
.imax .bslide-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.6rem,4.5vw,4rem);line-height:1.0;color:var(--white);letter-spacing:0.02em}
.imax .bslide-desc{font-size:clamp(0.88rem,1vw,0.98rem);color:var(--mist);line-height:1.75;max-width:460px}
.imax .bslide-tags{display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.2rem}
.imax .btag{font-size:0.7rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:0.3rem 0.75rem;color:var(--white)}
.imax .bslide-img{display:flex;align-items:center;justify-content:center;position:relative}
.imax .bslide-img img{width:100%;max-width:520px;height:auto;border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.07);animation:imxBannerFloat 4s ease-in-out infinite}
@keyframes imxBannerFloat{0%,100%{transform:perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(0)}50%{transform:perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(-10px)}}
.imax .pillars-section{padding:5.5rem 0;background:var(--smoke);position:relative;overflow:hidden}
.imax .pillars-section::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,45,85,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,85,0.03) 1px,transparent 1px);background-size:55px 55px;pointer-events:none}
.imax .pillars-section::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--fire),var(--amber),transparent)}
.imax .pillars-inner{position:relative;z-index:1}
.imax .pillars-header{text-align:center;margin-bottom:3.5rem}
.imax .pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem}
.imax .pillar-card{background:var(--steel);border:1px solid var(--border);border-radius:16px;padding:2.2rem 2rem;position:relative;overflow:hidden;transition:transform 0.3s,border-color 0.3s}
.imax .pillar-card:hover{transform:translateY(-5px)}
.imax .pillar-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
.imax .pillar-card.card-setup::before{background:linear-gradient(90deg,var(--fire),var(--amber))}
.imax .pillar-card.card-setup:hover{border-color:rgba(255,45,85,0.35)}
.imax .pillar-card.card-i18n::before{background:linear-gradient(90deg,var(--cyan),#0A84FF)}
.imax .pillar-card.card-i18n:hover{border-color:rgba(50,217,250,0.35)}
.imax .pillar-card.card-notif::before{background:linear-gradient(90deg,var(--green),var(--cyan))}
.imax .pillar-card.card-notif:hover{border-color:rgba(52,199,89,0.35)}
.imax .pillar-glow{position:absolute;width:220px;height:220px;border-radius:50%;top:-60px;right:-60px;pointer-events:none;opacity:0.06}
.imax .card-setup .pillar-glow{background:var(--fire)}
.imax .card-i18n .pillar-glow{background:var(--cyan)}
.imax .card-notif .pillar-glow{background:var(--green)}
.imax .pillar-icon-wrap{width:52px;height:52px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;margin-bottom:1.5rem;position:relative;z-index:1}
.imax .card-setup .pillar-icon-wrap{background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.25);color:var(--fire)}
.imax .card-i18n .pillar-icon-wrap{background:rgba(50,217,250,0.1);border:1px solid rgba(50,217,250,0.25);color:var(--cyan)}
.imax .card-notif .pillar-icon-wrap{background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.25);color:var(--green)}
.imax .pillar-tag{display:inline-flex;align-items:center;gap:0.4rem;font-family:'Space Mono',monospace;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;border-radius:100px;padding:0.25rem 0.75rem;margin-bottom:0.9rem;position:relative;z-index:1}
.imax .card-setup .pillar-tag{color:var(--fire);background:rgba(255,45,85,0.1);border:1px solid rgba(255,45,85,0.25)}
.imax .card-i18n .pillar-tag{color:var(--cyan);background:rgba(50,217,250,0.08);border:1px solid rgba(50,217,250,0.25)}
.imax .card-notif .pillar-tag{color:var(--green);background:rgba(52,199,89,0.08);border:1px solid rgba(52,199,89,0.25)}
.imax .pillar-title{font-family:'Bebas Neue',sans-serif;font-size:2rem;line-height:1.05;letter-spacing:0.02em;margin-bottom:0.8rem;color:var(--white);position:relative;z-index:1}
.imax .pillar-desc{font-size:0.9rem;color:var(--mist);line-height:1.7;margin-bottom:1.5rem;position:relative;z-index:1}
.imax .pillar-features{list-style:none;display:flex;flex-direction:column;gap:0.65rem;position:relative;z-index:1}
.imax .pillar-features li{display:flex;align-items:flex-start;gap:0.65rem;font-size:0.85rem;color:var(--mist);line-height:1.5}
.imax .pillar-features li .pf-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;margin-top:0.45rem}
.imax .card-setup .pillar-features li .pf-dot{background:var(--fire)}
.imax .card-i18n .pillar-features li .pf-dot{background:var(--cyan)}
.imax .card-notif .pillar-features li .pf-dot{background:var(--green)}
.imax .pillar-footer{margin-top:1.8rem;padding-top:1.5rem;border-top:1px solid var(--border);display:flex;align-items:center;gap:0.6rem;position:relative;z-index:1}
.imax .pf-status-dot{width:8px;height:8px;border-radius:50%;animation:imxBlink 1.4s infinite;flex-shrink:0}
.imax .card-setup .pf-status-dot{background:var(--fire);box-shadow:0 0 6px var(--fire)}
.imax .card-i18n .pf-status-dot{background:var(--cyan);box-shadow:0 0 6px var(--cyan)}
.imax .card-notif .pf-status-dot{background:var(--green);box-shadow:0 0 6px var(--green)}
.imax .pf-status-text{font-family:'Space Mono',monospace;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em}
.imax .card-setup .pf-status-text{color:var(--fire)}
.imax .card-i18n .pf-status-text{color:var(--cyan)}
.imax .card-notif .pf-status-text{color:var(--green)}
.imax .platform-bar{background:var(--ink);padding:3rem 0;border-top:1px solid var(--border)}
.imax .plat-badge{display:flex;align-items:center;gap:0.6rem;background:var(--steel);border:1px solid var(--border);border-radius:8px;padding:0.65rem 1.3rem;font-size:0.82rem;font-weight:600;color:var(--mist);transition:border-color 0.2s,color 0.2s}
.imax .plat-badge:hover{border-color:rgba(255,255,255,0.18);color:var(--white)}
.imax .plat-badge i{font-size:1rem}
.imax .cta-section{padding:8rem 0;text-align:center;position:relative;overflow:hidden}
.imax .cta-glow{position:absolute;inset:0;background:radial-gradient(ellipse 65% 65% at 50% 50%,rgba(255,45,85,0.09) 0%,transparent 70%)}
.imax .cta-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,8vw,8rem);line-height:0.9;margin-bottom:1.2rem;position:relative}
.imax .cta-sub{font-size:1.05rem;color:var(--mist);margin-bottom:2.8rem;position:relative}
.imax .cta-btns{display:flex;justify-content:center;gap:1rem;position:relative;flex-wrap:wrap}
.imax .contact-section{padding:7rem 0;background:var(--smoke);position:relative;overflow:hidden}
.imax .contact-bg{position:absolute;inset:0;background:radial-gradient(ellipse 55% 55% at 50% 50%,rgba(255,45,85,0.06) 0%,transparent 70%)}
.imax .contact-inner{position:relative;z-index:1}
.imax .contact-header{text-align:center;margin-bottom:3.5rem}
.imax .contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:2.5rem;align-items:flex-start}
.imax .contact-info-card{background:var(--steel);border:1px solid var(--border);border-radius:16px;padding:2rem}
.imax .contact-info-card h4{font-size:1.2rem;font-weight:700;margin-bottom:1.8rem;color:var(--white)}
.imax .ci-items{display:flex;flex-direction:column;gap:1.3rem;margin-bottom:2rem}
.imax .ci-item{display:flex;align-items:flex-start;gap:0.9rem}
.imax .ci-icon{width:36px;height:36px;border-radius:9px;flex-shrink:0;background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.2);display:flex;align-items:center;justify-content:center;color:var(--fire);font-size:0.85rem}
.imax .ci-label{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--mist);margin-bottom:0.2rem;font-weight:700}
.imax .ci-val{font-size:0.9rem;color:var(--white)}
.imax .ci-social{display:flex;gap:0.7rem}
.imax .ci-social-btn{width:36px;height:36px;border-radius:8px;background:var(--slate);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--mist);font-size:0.9rem;text-decoration:none;transition:all 0.2s}
.imax .ci-social-btn:hover{border-color:var(--fire);color:var(--fire)}
.imax .contact-form-card{background:var(--steel);border:1px solid var(--border);border-radius:16px;padding:2rem}
.imax .contact-form-card h4{font-size:1.2rem;font-weight:700;margin-bottom:1.8rem;color:var(--white)}
.imax .cf-form{display:flex;flex-direction:column;gap:1.1rem}
.imax .cf-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.imax .cf-field{display:flex;flex-direction:column;gap:0.4rem}
.imax .cf-field label{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--mist);display:flex;align-items:center;gap:0.4rem}
.imax .cf-field label i{color:var(--fire);font-size:0.72rem}
.imax .cf-field input,.imax .cf-field textarea{background:rgba(8,9,12,0.6);border:1px solid var(--border);border-radius:8px;padding:0.75rem 1rem;color:var(--white);font-family:'Plus Jakarta Sans',sans-serif;font-size:0.9rem;outline:none;transition:border-color 0.2s,box-shadow 0.2s;resize:none}
.imax .cf-field input::placeholder,.imax .cf-field textarea::placeholder{color:var(--mist)}
.imax .cf-field input:focus,.imax .cf-field textarea:focus{border-color:rgba(255,45,85,0.5);box-shadow:0 0 0 3px rgba(255,45,85,0.08)}
.imax .cf-submit{background:var(--fire);color:#fff;border:none;border-radius:8px;padding:0.9rem 2rem;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.95rem;font-weight:700;cursor:pointer;letter-spacing:0.04em;text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:0.6rem;transition:all 0.2s}
.imax .cf-submit:hover:not(:disabled){background:#ff4d70;transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,45,85,0.35)}
.imax .cf-submit:disabled{opacity:0.7;cursor:not-allowed}
.imax .cf-status{min-height:1.5rem;font-size:0.85rem}
.imax .cf-ok{color:var(--green);display:flex;align-items:center;gap:0.4rem}
.imax .cf-err{color:var(--fire);display:flex;align-items:center;gap:0.4rem}
.imax .install-section{padding:6rem 0;background:var(--ink);position:relative;overflow:hidden}
.imax .install-section::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,45,85,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,85,0.025) 1px,transparent 1px);background-size:55px 55px;pointer-events:none}
.imax .ig-tabs{display:flex;gap:0.5rem;flex-wrap:wrap;background:var(--steel);border:1px solid var(--border);border-radius:12px;padding:0.5rem;margin-bottom:2rem}
.imax .ig-tab{flex:1;min-width:140px;display:flex;align-items:center;gap:0.7rem;padding:0.85rem 1.2rem;border-radius:8px;background:transparent;border:1px solid transparent;cursor:pointer;color:var(--mist);transition:all 0.25s;text-align:left}
.imax .ig-tab:hover{color:var(--white);background:rgba(255,255,255,0.04)}
.imax .ig-tab.active{background:rgba(255,45,85,0.1);border-color:rgba(255,45,85,0.3);color:var(--white)}
.imax .ig-tab-num{font-family:'Bebas Neue',sans-serif;font-size:1.3rem;line-height:1;color:var(--fire);flex-shrink:0}
.imax .ig-tab:not(.active) .ig-tab-num{color:var(--mist)}
.imax .ig-tab-label{font-size:0.8rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;display:flex;align-items:center;gap:0.4rem}
.imax .ig-tab-label i{font-size:0.75rem}
.imax .ig-panels{position:relative}
.imax .ig-panel{display:none}
.imax .ig-panel.active{display:block}
.imax .ig-panel-inner{display:grid;grid-template-columns:1fr 1.35fr;gap:4rem;align-items:start;background:var(--smoke);border:1px solid var(--border);border-radius:16px;padding:3rem}
.imax .ig-step-badge{display:inline-flex;align-items:center;font-family:'Space Mono',monospace;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:var(--fire);background:rgba(255,45,85,0.1);border:1px solid rgba(255,45,85,0.25);border-radius:100px;padding:0.3rem 0.85rem;margin-bottom:1rem}
.imax .ig-panel-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2.2rem,3.5vw,3rem);line-height:1;letter-spacing:0.02em;color:var(--white);margin-bottom:1rem}
.imax .ig-panel-desc{font-size:0.92rem;color:var(--mist);line-height:1.75;margin-bottom:1.8rem}
.imax .ig-checklist{list-style:none;display:flex;flex-direction:column;gap:0.65rem;margin-bottom:2rem}
.imax .ig-checklist li{display:flex;align-items:flex-start;gap:0.7rem;font-size:0.87rem;color:var(--mist);line-height:1.5}
.imax .ig-checklist li i{color:var(--green);font-size:0.8rem;margin-top:0.15rem;flex-shrink:0}
.imax .ig-checklist li strong{color:var(--white)}
.imax .ig-nav-btns{display:flex;gap:0.75rem;flex-wrap:wrap}
.imax .ig-btn-next,.imax .ig-btn-prev{display:inline-flex;align-items:center;gap:0.5rem;padding:0.75rem 1.6rem;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;border:none}
.imax .ig-btn-next{background:var(--fire);color:#fff}
.imax .ig-btn-next:hover{background:#ff4d70;transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,45,85,0.3)}
.imax .ig-btn-prev{background:transparent;color:var(--mist);border:1.5px solid var(--border)}
.imax .ig-btn-prev:hover{border-color:rgba(255,255,255,0.2);color:var(--white)}
.imax .ig-btn-cta{display:inline-flex;align-items:center;gap:0.5rem;background:var(--fire);color:#fff;padding:0.75rem 1.6rem;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;text-decoration:none;transition:all 0.2s}
.imax .ig-btn-cta:hover{background:#ff4d70;transform:translateY(-2px);box-shadow:0 10px 30px rgba(255,45,85,0.3)}
.imax .ig-screen-wrap{border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:0 30px 80px rgba(0,0,0,0.55);background:var(--steel)}
.imax .ig-screen-bar{display:flex;align-items:center;gap:0.5rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.04);border-bottom:1px solid var(--border)}
.imax .ig-bar-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.imax .ig-bar-title{font-family:'Space Mono',monospace;font-size:0.65rem;color:var(--mist);letter-spacing:0.06em;margin-left:0.5rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.imax .ig-screen-wrap img{width:100%;display:block;object-fit:cover}
.imax .ig-screen-caption{margin-top:0.9rem;font-family:'Space Mono',monospace;font-size:0.68rem;color:var(--mist);letter-spacing:0.06em;text-align:center;display:flex;align-items:center;justify-content:center;gap:0.4rem}
.imax .ig-screen-caption i{color:var(--fire);font-size:0.65rem}
.imax .diagram-section{position:relative;overflow:hidden;padding:6rem 0}
.imax .diagram-section::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,45,85,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,85,0.03) 1px,transparent 1px);background-size:55px 55px}
.imax .diagram-inner{position:relative;z-index:1}
.imax .diagram-header{text-align:center;margin-bottom:3.5rem}
.imax .diagram-canvas{background:var(--smoke);border:1px solid var(--border);border-radius:20px;padding:3rem 2rem;position:relative}
.imax .dg-hub{display:flex;flex-direction:column;align-items:center;background:linear-gradient(135deg,rgba(255,45,85,0.15),rgba(255,45,85,0.05));border:1px solid rgba(255,45,85,0.4);border-radius:16px;padding:1.4rem 1.8rem;text-align:center;position:relative;box-shadow:0 0 40px rgba(255,45,85,0.12)}
.imax .dg-hub-icon{font-size:2rem;color:var(--fire);margin-bottom:0.5rem}
.imax .dg-hub-title{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:0.06em;color:var(--white)}
.imax .dg-hub-sub{font-size:0.7rem;color:var(--mist);text-transform:uppercase;letter-spacing:0.1em;font-weight:600;margin-top:0.15rem}
.imax .dg-layout{display:grid;grid-template-columns:1fr auto 1fr;gap:1.5rem;align-items:center}
.imax .dg-left{display:flex;flex-direction:column;gap:1rem}
.imax .dg-right{display:flex;flex-direction:column;gap:1rem;align-items:flex-end}
.imax .dg-platform{display:flex;align-items:center;gap:0.75rem;background:var(--steel);border:1px solid var(--border);border-radius:12px;padding:0.85rem 1.1rem;transition:border-color 0.2s,transform 0.2s;cursor:default;width:100%}
.imax .dg-platform:hover{transform:translateX(4px)}
.imax .dg-platform.pos:hover{border-color:var(--fire)}
.imax .dg-platform.web:hover{border-color:var(--cyan)}
.imax .dg-platform.app:hover{border-color:#BF5AF2}
.imax .dg-platform.shop:hover{border-color:var(--amber)}
.imax .dg-platform.right-node:hover{transform:translateX(-4px)}
.imax .dg-plat-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.imax .dg-plat-name{font-size:0.85rem;font-weight:700}
.imax .dg-plat-type{font-size:0.68rem;color:var(--mist);text-transform:uppercase;letter-spacing:0.07em;font-weight:600}
.imax .dg-center{display:flex;flex-direction:column;align-items:center;gap:1rem}
.imax .dg-internet{display:flex;flex-direction:column;align-items:center;gap:0.3rem;background:rgba(50,217,250,0.06);border:1px dashed rgba(50,217,250,0.25);border-radius:100px;padding:0.4rem 1.2rem;font-family:'Space Mono',monospace;font-size:0.65rem;color:var(--cyan);text-transform:uppercase;letter-spacing:0.08em}
.imax .flow-dots{display:flex;gap:4px;align-items:center}
.imax .flow-dot{width:5px;height:5px;border-radius:50%;background:var(--amber);animation:imxFlowLeft 1.2s ease-in-out infinite}
.imax .flow-dot:nth-child(2){animation-delay:0.3s}
.imax .flow-dot:nth-child(3){animation-delay:0.6s}
.imax .flow-dot.out-dot{background:var(--fire);animation-name:imxFlowRight}
@keyframes imxFlowLeft{from{transform:translateX(0);opacity:1}to{transform:translateX(-28px);opacity:0}}
@keyframes imxFlowRight{from{transform:translateX(0);opacity:1}to{transform:translateX(28px);opacity:0}}
.imax .dg-legend{display:flex;justify-content:center;gap:2rem;margin-top:2rem;flex-wrap:wrap}
.imax .dg-legend-item{display:flex;align-items:center;gap:0.5rem;font-size:0.75rem;color:var(--mist);font-weight:600}
.imax .dg-legend-dot{width:8px;height:8px;border-radius:50%}
@media(max-width:1100px){.imax .hero{grid-template-columns:1fr}.imax .hero-left{padding:3rem 2rem}.imax .hero-right{display:none}.imax .two-col,.imax .channels-header{grid-template-columns:1fr;gap:2.5rem}.imax .two-col.flip{direction:ltr}.imax .channels-strip{grid-template-columns:repeat(3,1fr)}section.feat,.imax .channels-section{padding:4rem 0}.imax .dg-layout{grid-template-columns:1fr;gap:2rem}.imax .dg-right{align-items:flex-start}.imax .diagram-section{padding:4rem 0}}
@media(max-width:900px){.imax .bslide-inner{grid-template-columns:1fr;gap:2rem;padding:3.5rem 1.5rem 5rem}.imax .bslide-img{display:none}.imax .feat-banner{min-height:420px}.imax .pillars-grid{grid-template-columns:1fr}.imax .contact-grid{grid-template-columns:1fr}.imax .cf-row{grid-template-columns:1fr}.imax .contact-section{padding:4rem 0}.imax .ig-panel-inner{grid-template-columns:1fr;gap:2.5rem;padding:2rem 1.5rem}.imax .ig-tabs{gap:0.4rem}.imax .ig-tab{min-width:0;flex:1 1 calc(50% - 0.4rem)}}
@media(max-width:768px){.imax .channels-strip{grid-template-columns:repeat(2,1fr)}.imax .ig-tab{flex:1 1 100%}}
@media(max-width:600px){.imax .stats-row{gap:1.5rem}section.feat,.imax .channels-section,.imax .cta-section,.imax .contact-section{padding:3rem 1.2rem}.imax .pos-badge{flex-wrap:wrap;gap:0.7rem;padding:0.7rem 1rem;white-space:normal;left:50%;transform:translateX(-50%);width:90%;justify-content:center}}
`;

const IMX_HTML = `
<section id="features" style="position:relative;background:var(--ink);overflow:hidden;padding:0;margin-top:60px">
  <div id="bProgress" style="position:absolute;top:0;left:0;height:3px;background:var(--fire);z-index:30;width:0%;transition:none;"></div>
  <div style="position:relative;width:100%;height:580px;">
    <div class="bslide active" data-idx="0">
      <div class="bslide-glow" style="background:radial-gradient(ellipse 60% 70% at 70% 50%, rgba(255,45,85,0.09) 0%, transparent 70%)"></div>
      <div class="bslide-inner">
        <div class="bslide-text">
          <div class="bslide-label" style="color:var(--fire);border-color:rgba(255,45,85,0.25);background:rgba(255,45,85,0.08);">Customer Storefront</div>
          <h2 class="bslide-title">Beautiful Shop.<br><span style="color:var(--fire)">Mobile App.</span><br><span style="color:var(--cyan)">Your Brand.</span></h2>
          <p class="bslide-desc">Your customers get a polished branded shopping experience — native mobile app, web storefront, category browsing, and seamless checkout on every device.</p>
          <div class="bslide-tags"><span class="btag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Mobile App</span><span class="btag" style="color:var(--cyan);border-color:rgba(50,217,250,0.3);background:rgba(50,217,250,0.07);">Web Store</span><span class="btag" style="color:var(--amber);border-color:rgba(255,149,0,0.3);background:rgba(255,149,0,0.07);">Branded UX</span></div>
        </div>
        <div class="bslide-img"><img src="images/banner/banner-storefront.png" alt="Branded customer storefront and mobile app" /></div>
      </div>
    </div>
    <div class="bslide" data-idx="1">
      <div class="bslide-glow" style="background:radial-gradient(ellipse 60% 70% at 60% 50%, rgba(255,149,0,0.07) 0%, transparent 70%)"></div>
      <div class="bslide-inner">
        <div class="bslide-text">
          <div class="bslide-label" style="color:var(--amber);border-color:rgba(255,149,0,0.25);background:rgba(255,149,0,0.08);">Order Management</div>
          <h2 class="bslide-title">Order Details.<br><span style="color:var(--fire)">Tracked.</span><br><span style="color:var(--amber)">Receipts Ready.</span></h2>
          <p class="bslide-desc">Every order has a full details view — payment status, order summary, customer info, shipping address, and one-tap invoice download.</p>
          <div class="bslide-tags"><span class="btag" style="color:var(--fire);border-color:rgba(255,45,85,0.3);background:rgba(255,45,85,0.07);">Order Tracking</span><span class="btag" style="color:var(--amber);border-color:rgba(255,149,0,0.3);background:rgba(255,149,0,0.07);">Invoice Export</span><span class="btag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Returns &amp; Refunds</span></div>
        </div>
        <div class="bslide-img"><img src="images/banner/banner-orders.png" alt="Order details and tracking" /></div>
      </div>
    </div>
    <div class="bslide" data-idx="2">
      <div class="bslide-glow" style="background:radial-gradient(ellipse 60% 70% at 65% 50%, rgba(10,132,255,0.08) 0%, transparent 70%)"></div>
      <div class="bslide-inner">
        <div class="bslide-text">
          <div class="bslide-label" style="color:#0A84FF;border-color:rgba(10,132,255,0.25);background:rgba(10,132,255,0.08);">Windows POS</div>
          <h2 class="bslide-title">Fast POS.<br><span style="color:#0A84FF">Windows.</span><br><span style="color:var(--fire)">Any Hardware.</span></h2>
          <p class="bslide-desc">A powerful retail POS built for Windows — scan barcodes, add to bag, apply promos, take payment. One-click order placement.</p>
          <div class="bslide-tags"><span class="btag" style="color:#0A84FF;border-color:rgba(10,132,255,0.3);background:rgba(10,132,255,0.07);">Barcode Scan</span><span class="btag" style="color:var(--cyan);border-color:rgba(50,217,250,0.3);background:rgba(50,217,250,0.07);">Cash &amp; Card</span><span class="btag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Promo Codes</span></div>
        </div>
        <div class="bslide-img"><img src="images/banner/banner-pos.png" alt="Windows retail POS" /></div>
      </div>
    </div>
    <div class="bslide" data-idx="3">
      <div class="bslide-glow" style="background:radial-gradient(ellipse 60% 70% at 60% 50%, rgba(52,199,89,0.07) 0%, transparent 70%)"></div>
      <div class="bslide-inner">
        <div class="bslide-text">
          <div class="bslide-label" style="color:var(--green);border-color:rgba(52,199,89,0.25);background:rgba(52,199,89,0.08);">Stock Control</div>
          <h2 class="bslide-title">Every Product.<br><span style="color:var(--green)">Tracked.</span><br>Zero Surprises.</h2>
          <p class="bslide-desc">Real-time stock visibility across your POS and online store. Filter, export, and monitor every product.</p>
          <div class="bslide-tags"><span class="btag" style="color:var(--green);border-color:rgba(52,199,89,0.3);background:rgba(52,199,89,0.07);">Live Stock</span><span class="btag" style="color:var(--amber);border-color:rgba(255,149,0,0.3);background:rgba(255,149,0,0.07);">Damage Reports</span><span class="btag" style="color:var(--fire);border-color:rgba(255,45,85,0.3);background:rgba(255,45,85,0.07);">Export &amp; Filter</span></div>
        </div>
        <div class="bslide-img"><img src="images/banner/banner-stock.jpg" alt="Real-time stock control dashboard" /></div>
      </div>
    </div>
  </div>
  <div style="position:absolute;bottom:1.4rem;left:50%;transform:translateX(-50%);z-index:30;display:flex;align-items:center;gap:1rem;">
    <button id="bPrev" style="background:transparent;border:1px solid rgba(255,255,255,0.12);border-radius:7px;color:rgba(255,255,255,0.4);width:30px;height:30px;cursor:pointer;font-size:0.85rem;display:flex;align-items:center;justify-content:center;transition:border-color 0.2s;">&#8592;</button>
    <div id="bDots" style="display:flex;gap:5px;align-items:center;"></div>
    <button id="bNext" style="background:transparent;border:1px solid rgba(255,255,255,0.12);border-radius:7px;color:rgba(255,255,255,0.4);width:30px;height:30px;cursor:pointer;font-size:0.85rem;display:flex;align-items:center;justify-content:center;transition:border-color 0.2s;">&#8594;</button>
  </div>
</section>

<div class="div-line"></div>

<section class="pillars-section reveal" id="why-retailmax">
  <div class="imax-container pillars-inner">
    <div class="pillars-header">
      <div class="sec-label" style="justify-content:center"><i class="fa-solid fa-bolt"></i> // Built Different, From Day One</div>
      <h2 class="sec-title">Everything <span style="color:var(--fire)">Already</span><br>Configured</h2>
      <p class="sec-sub" style="margin:0 auto;text-align:center;max-width:560px;">No DevOps. No fragmented tools. No months of setup. RetailMax ships production-ready.</p>
    </div>
    <div class="pillars-grid">
      <div class="pillar-card card-setup"><div class="pillar-glow"></div><div class="pillar-icon-wrap"><i class="fa-solid fa-rocket"></i></div><div class="pillar-tag"><i class="fa-solid fa-circle-check"></i> Zero Config</div><h3 class="pillar-title">Instant Setup &amp;<br>Your Own Domain</h3><p class="pillar-desc">Install once on your Windows PC — RetailMax self-configures, assigns your domain, and runs your entire retail operation from your own hardware.</p><ul class="pillar-features"><li><span class="pf-dot"></span>One-click installer — live in under 10 minutes</li><li><span class="pf-dot"></span>Automatic SSL certificate on your custom domain</li><li><span class="pf-dot"></span>POS, online store, and admin all on the same URL</li><li><span class="pf-dot"></span>Works fully offline — syncs when connection returns</li><li><span class="pf-dot"></span>No monthly hosting fees. Your hardware, your data.</li></ul><div class="pillar-footer"><span class="pf-status-dot"></span><span class="pf-status-text">yourdomain.com — Live &amp; Ready</span></div></div>
      <div class="pillar-card card-i18n"><div class="pillar-glow"></div><div class="pillar-icon-wrap"><i class="fa-solid fa-earth-europe"></i></div><div class="pillar-tag"><i class="fa-solid fa-language"></i> Internationalisation</div><h3 class="pillar-title">Built For<br>Every Market</h3><p class="pillar-desc">RetailMax is i18n-ready at its core. Set language, currency, date format, and even RTL layout — all from settings.</p><ul class="pillar-features"><li><span class="pf-dot"></span>Full UI translations — staff and customer-facing</li><li><span class="pf-dot"></span>Multi-currency with correct formatting per locale</li><li><span class="pf-dot"></span>Right-to-left (RTL) layout support built in</li><li><span class="pf-dot"></span>Locale-aware date, time, and number display</li><li><span class="pf-dot"></span>Per-language product descriptions on storefront</li></ul><div class="pillar-footer"><span class="pf-status-dot"></span><span class="pf-status-text">EN · AR · FR · ES · DE — &amp; More</span></div></div>
      <div class="pillar-card card-notif"><div class="pillar-glow"></div><div class="pillar-icon-wrap"><i class="fa-solid fa-bell"></i></div><div class="pillar-tag"><i class="fa-solid fa-circle-check"></i> Pre-Configured</div><h3 class="pillar-title">Notifications<br>Ready Out of Box</h3><p class="pillar-desc">Every alert your retail operation needs is already wired — new orders, dispatch confirmations, low stock warnings.</p><ul class="pillar-features"><li><span class="pf-dot"></span>Instant new order alerts to staff and manager devices</li><li><span class="pf-dot"></span>Customer SMS &amp; email order confirmations pre-templated</li><li><span class="pf-dot"></span>Low stock threshold alerts for each product</li><li><span class="pf-dot"></span>Push notifications to your branded mobile app</li><li><span class="pf-dot"></span>Dispatch and delivery status updates to customers</li></ul><div class="pillar-footer"><span class="pf-status-dot"></span><span class="pf-status-text">All Channels Active — No Setup Needed</span></div></div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="channels-section reveal" id="orders">
  <div class="imax-container">
  <div class="channels-strip">
    <div class="ch-item"><div class="ch-icon-big c-pos"><i class="fa-solid fa-desktop fa-lg"></i></div><div class="ch-name c-pos">POS</div></div>
    <div class="ch-item"><div class="ch-icon-big c-web"><i class="fa-solid fa-globe fa-lg"></i></div><div class="ch-name c-web">Online Store</div></div>
    <div class="ch-item"><div class="ch-icon-big c-app"><i class="fa-solid fa-mobile-screen-button fa-lg"></i></div><div class="ch-name c-app">Mobile App</div></div>
    <div class="ch-item"><div class="ch-icon-big c-stock"><i class="fa-solid fa-boxes-stacking fa-lg"></i></div><div class="ch-name c-stock">Stock</div></div>
    <div class="ch-item"><div class="ch-icon-big c-shop"><i class="fa-solid fa-tags fa-lg"></i></div><div class="ch-name c-shop">Promos</div></div>
  </div>
  <div class="channels-header">
    <div>
      <div class="sec-label"><i class="fa-solid fa-layer-group"></i> // Unified Retail Management</div>
      <h2 class="sec-title">Every Sale.<br>One Dashboard.</h2>
      <p class="sec-sub">In-store POS, your online store, and your branded mobile app all report into the same live screen.</p>
      <div class="stats-row">
        <div class="stat-item"><div class="num">5</div><div class="lbl"><i class="fa-solid fa-satellite-dish"></i> Channels</div></div>
        <div class="stat-item"><div class="num">1</div><div class="lbl"><i class="fa-solid fa-display"></i> Dashboard</div></div>
        <div class="stat-item"><div class="num">0</div><div class="lbl"><i class="fa-solid fa-circle-xmark"></i> Oversells</div></div>
      </div>
    </div>
    <div class="img-frame"><img src="images/image_02.png" alt="RetailMax live sales dashboard" /></div>
  </div>
  </div>
</section>

<div class="div-line"></div>

<section class="diagram-section reveal" id="how-it-works">
  <div class="imax-container diagram-inner">
    <div class="diagram-header">
      <div class="sec-label" style="justify-content:center"><i class="fa-solid fa-diagram-project"></i> // System Architecture</div>
      <h2 class="sec-title">Your PC. Your Domain. <span style="color:var(--fire)">Every Sale.</span></h2>
      <p class="sec-sub" style="margin:0 auto;text-align:center;">Your business PC runs everything — your domain, your online store, your mobile app, and every in-store POS transaction.</p>
    </div>
    <div class="diagram-canvas">
      <div class="dg-layout">
        <div class="dg-left">
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.12em;color:var(--mist);margin-bottom:0.2rem;display:flex;align-items:center;gap:0.4rem;"><i class="fa-solid fa-wifi" style="color:var(--amber)"></i> Online Channels</div>
          <div class="dg-platform web"><div class="dg-plat-icon" style="background:rgba(50,217,250,0.1);border:1px solid rgba(50,217,250,0.25);"><i class="fa-solid fa-globe" style="color:var(--cyan)"></i></div><div><div class="dg-plat-name" style="color:var(--cyan)">Online Store</div><div class="dg-plat-type">Web Orders</div></div><div class="flow-dots" style="margin-left:auto"><div class="flow-dot" style="background:var(--cyan)"></div><div class="flow-dot" style="background:var(--cyan);animation-delay:0.3s"></div><div class="flow-dot" style="background:var(--cyan);animation-delay:0.6s"></div></div></div>
          <div class="dg-platform app"><div class="dg-plat-icon" style="background:rgba(191,90,242,0.1);border:1px solid rgba(191,90,242,0.25);"><i class="fa-solid fa-mobile-screen-button" style="color:#BF5AF2"></i></div><div><div class="dg-plat-name" style="color:#BF5AF2">Mobile App</div><div class="dg-plat-type">App Orders</div></div><div class="flow-dots" style="margin-left:auto"><div class="flow-dot" style="background:#BF5AF2"></div><div class="flow-dot" style="background:#BF5AF2;animation-delay:0.3s"></div><div class="flow-dot" style="background:#BF5AF2;animation-delay:0.6s"></div></div></div>
          <div class="dg-platform shop"><div class="dg-plat-icon" style="background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.25);"><i class="fa-solid fa-tags" style="color:var(--amber)"></i></div><div><div class="dg-plat-name" style="color:var(--amber)">Promotions</div><div class="dg-plat-type">Coupons &amp; Deals</div></div><div class="flow-dots" style="margin-left:auto"><div class="flow-dot" style="background:var(--amber)"></div><div class="flow-dot" style="background:var(--amber);animation-delay:0.3s"></div><div class="flow-dot" style="background:var(--amber);animation-delay:0.6s"></div></div></div>
        </div>
        <div class="dg-center">
          <div style="background:rgba(52,199,89,0.07);border:1px solid rgba(52,199,89,0.3);border-radius:12px;padding:0.55rem 1rem;display:flex;align-items:center;gap:0.6rem;width:100%;box-sizing:border-box;justify-content:center;"><span style="width:7px;height:7px;border-radius:50%;background:#34C759;flex-shrink:0;animation:imxBlink 1.4s infinite;box-shadow:0 0 6px #34C759"></span><span style="font-family:'Space Mono',monospace;font-size:0.7rem;color:#34C759;font-weight:700;letter-spacing:0.05em;">yourdomain.com</span><span style="font-family:'Space Mono',monospace;font-size:0.62rem;color:rgba(52,199,89,0.6);text-transform:uppercase;letter-spacing:0.08em;">Live on Internet</span></div>
          <div style="width:1px;height:14px;background:rgba(52,199,89,0.3)"></div>
          <div class="dg-internet"><i class="fa-solid fa-cloud" style="font-size:0.9rem"></i>Internet</div>
          <div style="width:1px;height:16px;background:rgba(50,217,250,0.25)"></div>
          <div class="dg-hub"><div class="dg-hub-icon"><i class="fa-solid fa-server"></i></div><div class="dg-hub-title">Business PC / NAS</div><div class="dg-hub-sub">Central Hub &amp; Server</div></div>
          <div style="width:1px;height:16px;background:rgba(255,45,85,0.25)"></div>
          <div style="font-family:'Space Mono',monospace;font-size:0.62rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,45,85,0.5);text-align:center;">All orders in one place</div>
        </div>
        <div class="dg-right">
          <div style="font-family:'Space Mono',monospace;font-size:0.65rem;text-transform:uppercase;letter-spacing:0.12em;color:var(--mist);margin-bottom:0.2rem;display:flex;align-items:center;gap:0.4rem;"><i class="fa-solid fa-store" style="color:var(--fire)"></i> In-Store</div>
          <div class="dg-platform pos right-node" style="width:100%"><div class="flow-dots" style="margin-right:auto"><div class="flow-dot out-dot"></div><div class="flow-dot out-dot" style="animation-delay:0.3s"></div><div class="flow-dot out-dot" style="animation-delay:0.6s"></div></div><div><div class="dg-plat-name" style="color:var(--fire)">Tablet POS</div><div class="dg-plat-type">In-Store Orders</div></div><div class="dg-plat-icon" style="background:rgba(255,45,85,0.12);border:1px solid rgba(255,45,85,0.3);margin-left:auto"><i class="fa-solid fa-tablet-screen-button" style="color:var(--fire)"></i></div></div>
          <div class="dg-platform right-node" style="width:100%;border-color:rgba(10,132,255,0.2)"><div class="flow-dots" style="margin-right:auto"><div class="flow-dot out-dot" style="background:#0A84FF"></div><div class="flow-dot out-dot" style="background:#0A84FF;animation-delay:0.3s"></div><div class="flow-dot out-dot" style="background:#0A84FF;animation-delay:0.6s"></div></div><div><div class="dg-plat-name" style="color:#0A84FF">Windows POS</div><div class="dg-plat-type">Desktop Orders</div></div><div class="dg-plat-icon" style="background:rgba(10,132,255,0.1);border:1px solid rgba(10,132,255,0.25);margin-left:auto"><i class="fa-solid fa-desktop" style="color:#0A84FF"></i></div></div>
          <div class="dg-platform right-node" style="width:100%;border-color:rgba(52,199,89,0.2)"><div class="flow-dots" style="margin-right:auto"><div class="flow-dot out-dot" style="background:var(--green)"></div><div class="flow-dot out-dot" style="background:var(--green);animation-delay:0.3s"></div><div class="flow-dot out-dot" style="background:var(--green);animation-delay:0.6s"></div></div><div><div class="dg-plat-name" style="color:var(--green)">Stock Sync</div><div class="dg-plat-type">Live Inventory</div></div><div class="dg-plat-icon" style="background:rgba(52,199,89,0.1);border:1px solid rgba(52,199,89,0.25);margin-left:auto"><i class="fa-solid fa-boxes-stacking" style="color:var(--green)"></i></div></div>
        </div>
      </div>
      <div class="dg-legend">
        <div class="dg-legend-item"><div class="dg-legend-dot" style="background:var(--cyan)"></div> Web &amp; app orders inbound</div>
        <div class="dg-legend-item"><div class="dg-legend-dot" style="background:var(--fire)"></div> In-store POS orders</div>
        <div class="dg-legend-item"><div class="dg-legend-dot" style="background:var(--green)"></div> Stock synced across all channels</div>
        <div class="dg-legend-item"><div class="dg-legend-dot" style="background:var(--amber)"></div> Promos pushed from hub</div>
        <div class="dg-legend-item"><div class="dg-legend-dot" style="background:#34C759;box-shadow:0 0 4px #34C759"></div> Hosted on your hardware</div>
      </div>
    </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat alt reveal" id="stock">
  <div class="imax-container">
  <div class="two-col">
    <div>
      <div class="sec-label"><i class="fa-solid fa-boxes-stacking"></i> // Real-Time Stock Control</div>
      <h2 class="sec-title">Every Product.<br>Always<br>Accounted For.</h2>
      <p class="sec-sub">Track every item across your shelves and online store in real time.</p>
      <ul class="feat-list">
        <li><span class="ico"><i class="fa-solid fa-magnifying-glass"></i></span>Filter and search stock by name, category, or status instantly</li>
        <li><span class="ico"><i class="fa-solid fa-file-export"></i></span>Export full stock report to CSV in one click</li>
        <li><span class="ico"><i class="fa-solid fa-triangle-exclamation"></i></span>Damage logging — record write-offs with reason and quantity</li>
        <li><span class="ico"><i class="fa-solid fa-cart-plus"></i></span>Purchase orders — log supplier deliveries directly against stock</li>
        <li><span class="ico"><i class="fa-solid fa-rotate-right"></i></span>Stock auto-decrements on every POS and online sale</li>
        <li><span class="ico"><i class="fa-solid fa-bell"></i></span>Low stock alerts — set thresholds per product</li>
      </ul>
      <div class="highlight-box"><p><i class="fa-solid fa-circle-info"></i> <strong>Unified stock pool.</strong> One inventory feeds your in-store POS, your website, and your mobile app simultaneously.</p></div>
    </div>
    <div class="img-frame"><img src="images/image_stock.jpg" alt="Stock control dashboard" /></div>
  </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat reveal" id="pos-orders">
  <div class="imax-container">
  <div class="two-col flip">
    <div>
      <div class="sec-label"><i class="fa-solid fa-receipt"></i> // POS Order View</div>
      <h2 class="sec-title">Every POS Sale.<br>Full Detail.<br>Print Ready.</h2>
      <p class="sec-sub">Each in-store transaction gets a complete order view — items, pricing, payment type, customer info.</p>
      <ul class="feat-list">
        <li><span class="ico"><i class="fa-solid fa-circle-check"></i></span>Payment &amp; confirmation status visible at a glance</li>
        <li><span class="ico"><i class="fa-solid fa-print"></i></span>Print invoice directly from the order view in one tap</li>
        <li><span class="ico"><i class="fa-solid fa-user"></i></span>Customer details — name, email, phone attached to each order</li>
        <li><span class="ico"><i class="fa-solid fa-money-bill-wave"></i></span>Cash, card, or custom payment types all recorded</li>
        <li><span class="ico"><i class="fa-solid fa-calculator"></i></span>Subtotal, tax fee, and discount breakdown per order</li>
        <li><span class="ico"><i class="fa-solid fa-sliders"></i></span>Update order status — Paid / Confirmed — from the view</li>
      </ul>
    </div>
    <div class="img-frame"><img src="images/image_pos_order.png" alt="POS order detail view" /></div>
  </div>
  </div>
</section>

<div class="div-line"></div>

<section class="feat alt reveal" id="storefront">
  <div class="imax-container">
  <div class="two-col">
    <div>
      <div class="sec-label"><i class="fa-solid fa-store"></i> // Branded Online Storefront</div>
      <h2 class="sec-title">Your Store.<br>Your Brand.<br>Live Online.</h2>
      <p class="sec-sub">Give your customers a stunning, fully branded shopping experience.</p>
      <ul class="feat-list">
        <li><span class="ico"><i class="fa-solid fa-images"></i></span>Promotional banners and seasonal sale sliders</li>
        <li><span class="ico"><i class="fa-solid fa-grid-2"></i></span>Category browsing — Men, Women, Kids, Accessories</li>
        <li><span class="ico"><i class="fa-solid fa-star"></i></span>Trending collections and featured products on homepage</li>
        <li><span class="ico"><i class="fa-solid fa-heart"></i></span>Customer wishlists — save favourites for later</li>
        <li><span class="ico"><i class="fa-solid fa-earth-europe"></i></span>Language switch — serve customers in their preferred language</li>
        <li><span class="ico"><i class="fa-solid fa-mobile-screen-button"></i></span>Native iOS &amp; Android app generated from your storefront</li>
      </ul>
    </div>
    <div class="img-frame"><img src="images/image_storefront.png" alt="Branded online retail storefront" /></div>
  </div>
  </div>
</section>

<div class="div-line"></div>

<section class="install-section reveal" id="install">
  <div class="imax-container">
    <div style="text-align:center;margin-bottom:3rem;">
      <div class="sec-label" style="justify-content:center"><i class="fa-solid fa-terminal"></i> // Installation Guide</div>
      <h2 class="sec-title">Up &amp; Running<br><span style="color:var(--fire)">In Minutes.</span></h2>
      <p class="sec-sub" style="margin:0 auto;text-align:center;max-width:520px;">Follow the step-by-step walkthrough. iClouds RetailMax installs directly on your Windows PC.</p>
    </div>
    <div class="ig-tabs" id="igTabs">
      <button class="ig-tab active" data-tab="0"><span class="ig-tab-num">01</span><span class="ig-tab-label"><i class="fa-solid fa-key"></i> License</span></button>
      <button class="ig-tab" data-tab="1"><span class="ig-tab-num">02</span><span class="ig-tab-label"><i class="fa-solid fa-sliders"></i> Configure</span></button>
      <button class="ig-tab" data-tab="2"><span class="ig-tab-num">03</span><span class="ig-tab-label"><i class="fa-solid fa-boxes-stacking"></i> Stock Setup</span></button>
      <button class="ig-tab" data-tab="3"><span class="ig-tab-num">04</span><span class="ig-tab-label"><i class="fa-solid fa-tag"></i> Products</span></button>
    </div>
    <div class="ig-panels">
      <div class="ig-panel active" id="ig-panel-0">
        <div class="ig-panel-inner">
          <div class="ig-panel-copy">
            <div class="ig-step-badge">Step 01</div>
            <h3 class="ig-panel-title">License &amp;<br>First Launch</h3>
            <p class="ig-panel-desc">Run the iClouds RetailMax installer. On first launch it automatically scans for an existing license key.</p>
            <ul class="ig-checklist"><li><i class="fa-solid fa-circle-check"></i> Installer detects existing license automatically</li><li><i class="fa-solid fa-circle-check"></i> License key stored locally in your install directory</li><li><i class="fa-solid fa-circle-check"></i> Displays your License Key, Client name &amp; file path</li><li><i class="fa-solid fa-circle-check"></i> Click <strong>Continue Install</strong> to proceed through steps</li></ul>
            <div class="ig-nav-btns"><button class="ig-btn-next">Next Step <i class="fa-solid fa-arrow-right"></i></button></div>
          </div>
          <div class="ig-panel-screen"><div class="ig-screen-wrap"><div class="ig-screen-bar"><span class="ig-bar-dot" style="background:#FF5F57"></span><span class="ig-bar-dot" style="background:#FFBD2E"></span><span class="ig-bar-dot" style="background:#28C840"></span><span class="ig-bar-title">iClouds RetailMax Installer</span></div><img src="images/install/step-01-license.jpg" alt="Step 1 — License detection screen" /></div><div class="ig-screen-caption"><i class="fa-solid fa-circle-info"></i> Installer automatically finds and reuses your existing license</div></div>
        </div>
      </div>
      <div class="ig-panel" id="ig-panel-1">
        <div class="ig-panel-inner">
          <div class="ig-panel-copy">
            <div class="ig-step-badge">Step 02</div>
            <h3 class="ig-panel-title">Site &amp;<br>Configuration</h3>
            <p class="ig-panel-desc">Open your admin dashboard and go to Settings → Site. Set your language, currency, timezone.</p>
            <ul class="ig-checklist"><li><i class="fa-solid fa-circle-check"></i> Set date/time format and default timezone</li><li><i class="fa-solid fa-circle-check"></i> Choose default language &amp; enable language switch</li><li><i class="fa-solid fa-circle-check"></i> Set default currency and position</li><li><i class="fa-solid fa-circle-check"></i> Add Google Maps API key for delivery address lookup</li><li><i class="fa-solid fa-circle-check"></i> Configure SMS gateway and email/OTP verification</li></ul>
            <div class="ig-nav-btns"><button class="ig-btn-prev"><i class="fa-solid fa-arrow-left"></i> Previous</button><button class="ig-btn-next">Next Step <i class="fa-solid fa-arrow-right"></i></button></div>
          </div>
          <div class="ig-panel-screen"><div class="ig-screen-wrap"><div class="ig-screen-bar"><span class="ig-bar-dot" style="background:#FF5F57"></span><span class="ig-bar-dot" style="background:#FFBD2E"></span><span class="ig-bar-dot" style="background:#28C840"></span><span class="ig-bar-title">Dashboard / Settings / Site</span></div><img src="images/install/step-02-settings.jpg" alt="Step 2 — Site settings" /></div><div class="ig-screen-caption"><i class="fa-solid fa-circle-info"></i> Language, currency, timezone — all configured in one place</div></div>
        </div>
      </div>
      <div class="ig-panel" id="ig-panel-2">
        <div class="ig-panel-inner">
          <div class="ig-panel-copy">
            <div class="ig-step-badge">Step 03</div>
            <h3 class="ig-panel-title">Stock &amp;<br>Inventory Setup</h3>
            <p class="ig-panel-desc">Head to Dashboard → Stock to see your product inventory.</p>
            <ul class="ig-checklist"><li><i class="fa-solid fa-circle-check"></i> View all products with live quantity and status</li><li><i class="fa-solid fa-circle-check"></i> Filter &amp; search inventory — find any product instantly</li><li><i class="fa-solid fa-circle-check"></i> Export full stock list to CSV with one click</li><li><i class="fa-solid fa-circle-check"></i> Log supplier purchases — stock quantity updates automatically</li><li><i class="fa-solid fa-circle-check"></i> Record damages — track write-offs with reason and date</li></ul>
            <div class="ig-nav-btns"><button class="ig-btn-prev"><i class="fa-solid fa-arrow-left"></i> Previous</button><button class="ig-btn-next">Next Step <i class="fa-solid fa-arrow-right"></i></button></div>
          </div>
          <div class="ig-panel-screen"><div class="ig-screen-wrap"><div class="ig-screen-bar"><span class="ig-bar-dot" style="background:#FF5F57"></span><span class="ig-bar-dot" style="background:#FFBD2E"></span><span class="ig-bar-dot" style="background:#28C840"></span><span class="ig-bar-title">Dashboard / Stock</span></div><img src="images/install/step-03-stock.jpg" alt="Step 3 — Stock management" /></div><div class="ig-screen-caption"><i class="fa-solid fa-circle-info"></i> Full inventory control — quantities, status, purchases and damages</div></div>
        </div>
      </div>
      <div class="ig-panel" id="ig-panel-3">
        <div class="ig-panel-inner">
          <div class="ig-panel-copy">
            <div class="ig-step-badge">Step 04</div>
            <h3 class="ig-panel-title">Add Your<br>Products</h3>
            <p class="ig-panel-desc">Go to Dashboard → Products and start building your catalogue.</p>
            <ul class="ig-checklist"><li><i class="fa-solid fa-circle-check"></i> Add product name, price, category and tax in one panel</li><li><i class="fa-solid fa-circle-check"></i> Upload product photo and write description</li><li><i class="fa-solid fa-circle-check"></i> Assign product type — e.g. Clothing, Electronics, Food</li><li><i class="fa-solid fa-circle-check"></i> Mark as Featured to highlight on your storefront homepage</li><li><i class="fa-solid fa-circle-check"></i> Toggle Active / Inactive without deleting the product</li></ul>
            <div class="ig-nav-btns"><button class="ig-btn-prev"><i class="fa-solid fa-arrow-left"></i> Previous</button><a href="#cta" class="ig-btn-cta"><i class="fa-solid fa-rocket"></i> Get Started</a></div>
          </div>
          <div class="ig-panel-screen"><div class="ig-screen-wrap"><div class="ig-screen-bar"><span class="ig-bar-dot" style="background:#FF5F57"></span><span class="ig-bar-dot" style="background:#FFBD2E"></span><span class="ig-bar-dot" style="background:#28C840"></span><span class="ig-bar-title">Dashboard / Products</span></div><img src="images/install/step-04-products.jpg" alt="Step 4 — Add products" /></div><div class="ig-screen-caption"><i class="fa-solid fa-circle-info"></i> Build your full product catalogue from one simple panel</div></div>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:3.5rem;display:flex;align-items:center;justify-content:center;gap:1.2rem;flex-wrap:wrap;">
      <a href="https://www.youtube.com/watch?v=uAuOePXHOOc" target="_blank" rel="noopener" class="btn-ghost"><i class="fa-brands fa-youtube"></i> Watch Full Install Video</a>
      <a href="#cta" class="btn-fire"><i class="fa-solid fa-rocket"></i> Get Started</a>
    </div>
  </div>
</section>

<div class="platform-bar"><div class="imax-container" style="display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;">
  <div class="plat-badge"><i class="fa-brands fa-windows"></i> Windows 10/11</div>
  <div class="plat-badge"><i class="fa-brands fa-apple"></i> macOS</div>
  <div class="plat-badge"><i class="fa-brands fa-linux"></i> Linux</div>
  <div class="plat-badge"><i class="fa-solid fa-globe"></i> Web Browser</div>
  <div class="plat-badge"><i class="fa-solid fa-mobile-screen-button"></i> iOS &amp; Android</div>
  <div class="plat-badge"><i class="fa-solid fa-cloud"></i> Cloud Access</div>
</div></div>

<div class="div-line"></div>

<section class="cta-section reveal" id="cta"><div class="imax-container">
  <div class="cta-glow"></div>
  <div class="cta-title"><span style="color:var(--mist)">Your PC</span> <span style="color:var(--fire)">Runs.</span><br>Your Retail Business <span style="color:var(--fire)">Runs.</span></div>
  <p class="cta-sub">No overengineering. No juggling subscriptions. Just iClouds RetailMax — and you're live.</p>
  <div class="cta-btns">
    <a href="#" class="btn-fire"><i class="fa-solid fa-rocket"></i> Start Free — 30 Days</a>
    <a href="https://www.youtube.com/watch?v=uAuOePXHOOc" target="_blank" class="btn-ghost"><i class="fa-brands fa-youtube"></i> Watch Install Guide</a>
  </div>
</div></section>

<section class="contact-section reveal" id="contact"><div class="imax-container">
  <div class="contact-bg"></div>
  <div class="contact-inner">
    <div class="contact-header">
      <div class="sec-label" style="justify-content:center"><i class="fa-solid fa-envelope"></i> // Get In Touch</div>
      <h2 class="sec-title" style="text-align:center">Let's Talk<br><span style="color:var(--fire)">Retail Tech.</span></h2>
      <p class="sec-sub" style="margin:0 auto;text-align:center">Have a question about RetailMax? Want a demo? Drop us a message.</p>
    </div>
    <div class="contact-grid">
      <div class="contact-info-card">
        <h4><i class="fa-solid fa-address-card" style="color:var(--fire)"></i> &nbsp;Get in Touch</h4>
        <div class="ci-items">
          <div class="ci-item"><div class="ci-icon"><i class="fa-solid fa-envelope"></i></div><div><div class="ci-label">Email</div><div class="ci-val">jamialhasan@gmail.com</div></div></div>
          <div class="ci-item"><div class="ci-icon"><i class="fa-solid fa-clock"></i></div><div><div class="ci-label">Business Hours</div><div class="ci-val">Mon – Fri: 9:00 AM – 6:00 PM GMT</div></div></div>
          <div class="ci-item"><div class="ci-icon"><i class="fa-solid fa-location-dot"></i></div><div><div class="ci-label">Location</div><div class="ci-val">Oxford, United Kingdom</div></div></div>
          <div class="ci-item"><div class="ci-icon"><i class="fa-solid fa-headset"></i></div><div><div class="ci-label">Support</div><div class="ci-val">iclouds.co.uk</div></div></div>
          <div class="ci-item"><div class="ci-icon"><i class="fa-solid fa-mobile-screen-button"></i></div><div><div class="ci-label">Mobile</div><div class="ci-val"><a href="tel:07926373552" style="color:var(--white);text-decoration:none;">07926 373 552</a></div></div></div>
          <div class="ci-item"><div class="ci-icon" style="background:rgba(37,211,102,0.12);border-color:rgba(37,211,102,0.25);color:#25D366;"><i class="fa-brands fa-whatsapp"></i></div><div><div class="ci-label">WhatsApp</div><div class="ci-val"><a href="https://wa.link/aek0ba" target="_blank" rel="noopener" style="color:#25D366;text-decoration:none;">Chat with us on WhatsApp</a></div></div></div>
        </div>
        <div class="ci-social">
          <a href="#" class="ci-social-btn"><i class="fa-brands fa-youtube"></i></a>
          <a href="#" class="ci-social-btn"><i class="fa-brands fa-twitter"></i></a>
          <a href="#" class="ci-social-btn"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="contact-form-card">
        <h4><i class="fa-solid fa-paper-plane" style="color:var(--fire)"></i> &nbsp;Send a Message</h4>
        <form id="contactForm" class="cf-form">
          <div class="cf-row">
            <div class="cf-field"><label><i class="fa-solid fa-user"></i> Full Name</label><input type="text" id="cf_name" placeholder="Your full name" required /></div>
            <div class="cf-field"><label><i class="fa-solid fa-envelope"></i> Email Address</label><input type="email" id="cf_email" placeholder="your@email.com" required /></div>
          </div>
          <div class="cf-field"><label><i class="fa-solid fa-tag"></i> Subject</label><input type="text" id="cf_subject" placeholder="RetailMax demo / pricing / support..." required /></div>
          <div class="cf-field"><label><i class="fa-solid fa-message"></i> Message</label><textarea id="cf_message" rows="5" placeholder="Tell us about your retail business and what you need..." required></textarea></div>
          <button type="submit" class="cf-submit" id="cfSubmitBtn"><i class="fa-solid fa-paper-plane"></i> Send Message</button>
          <div id="cf-status" class="cf-status"></div>
        </form>
      </div>
    </div>
  </div>
</div></section>
`;

const IMX_JS = `
(function(){
  document.querySelectorAll('.imax .reveal').forEach(function(r){r.classList.add('hidden')});
  var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('hidden');e.target.classList.add('visible')}})},{threshold:0,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.imax .reveal').forEach(function(r){obs.observe(r)});
  setTimeout(function(){document.querySelectorAll('.imax .reveal').forEach(function(r){r.classList.remove('hidden');r.classList.add('visible')})},300);

  var slides=document.querySelectorAll('.imax #features .bslide');
  var dots=document.getElementById('bDots');
  var prog=document.getElementById('bProgress');
  var cur=0,raf,elapsed=0;
  var DUR=6000;
  var dotEls=Array.from({length:slides.length},function(_,i){
    var d=document.createElement('div');
    d.style.cssText='width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.2);cursor:pointer;transition:all 0.3s;flex-shrink:0;';
    d.addEventListener('click',function(){goTo(i)});
    dots.appendChild(d);
    return d;
  });
  function setActive(idx){
    slides.forEach(function(s,i){s.classList.toggle('active',i===idx);s.classList.remove('exit')});
    dotEls.forEach(function(d,i){
      d.style.cssText=i===idx?'width:22px;height:7px;border-radius:4px;background:var(--fire);cursor:pointer;transition:all 0.3s;flex-shrink:0;':'width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.2);cursor:pointer;transition:all 0.3s;flex-shrink:0;';
    });
  }
  function goTo(idx){
    cur=(idx+slides.length)%slides.length;
    setActive(cur);
    elapsed=0;
    cancelAnimationFrame(raf);
    tick();
  }
  function tick(){
    var start=performance.now();
    function frame(now){
      elapsed=now-start;
      prog.style.width=Math.min((elapsed/DUR)*100,100)+'%';
      if(elapsed<DUR){raf=requestAnimationFrame(frame)}
      else{prog.style.width='0%';goTo(cur+1)}
    }
    raf=requestAnimationFrame(frame);
  }
  document.getElementById('bNext').addEventListener('click',function(){goTo(cur+1)});
  document.getElementById('bPrev').addEventListener('click',function(){goTo(cur-1)});
  goTo(0);

  var igTabs=document.querySelectorAll('.imax .ig-tab');
  var igPanels=document.querySelectorAll('.imax .ig-panel');
  function igGoTo(idx){
    igTabs.forEach(function(t,i){t.classList.toggle('active',i===idx)});
    igPanels.forEach(function(p,i){p.classList.toggle('active',i===idx)});
  }
  igTabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      var idx=parseInt(tab.getAttribute('data-tab'));
      igGoTo(idx);
    });
  });

  var cf=document.getElementById('contactForm');
  if(cf){
    cf.addEventListener('submit',async function(e){
      e.preventDefault();
      var btn=document.getElementById('cfSubmitBtn');
      var status=document.getElementById('cf-status');
      var name=document.getElementById('cf_name').value.trim();
      var email=document.getElementById('cf_email').value.trim();
      var subject=document.getElementById('cf_subject').value.trim();
      var message=document.getElementById('cf_message').value.trim();
      if(!name||!email||!subject||!message){status.innerHTML='<span class="cf-err"><i class="fa-solid fa-triangle-exclamation"></i> Please fill in all fields.</span>';return}
      btn.disabled=true;
      btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      status.innerHTML='';
      var templateParams={to_email:'jamialhasan@gmail.com',from_name:name,from_email:email,subject:subject,message:message,timestamp:new Date().toLocaleString()};
      try{
        if(typeof emailjs!=='undefined'){
          emailjs.init('ZT-KBW3S6BNgUbFB9');
          await emailjs.send('service_wfr9n8u','template_nbp220s',templateParams);
        }
        btn.innerHTML='<i class="fa-solid fa-circle-check"></i> Message Sent!';
        btn.style.background='#34C759';
        status.innerHTML='<span class="cf-ok"><i class="fa-solid fa-circle-check"></i> Thanks! We will be in touch shortly.</span>';
        cf.reset();
        setTimeout(function(){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-paper-plane"></i> Send Message';btn.style.background=''},4000);
      }catch(err){
        console.error(err);
        btn.disabled=false;
        btn.innerHTML='<i class="fa-solid fa-paper-plane"></i> Send Message';
        status.innerHTML='<span class="cf-err"><i class="fa-solid fa-triangle-exclamation"></i> Failed to send. Please try again or email us directly.</span>';
      }
    });
  }
})();
`;

export default function ImaxPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const script = document.createElement("script");
    script.textContent = IMX_JS;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="imax">
      <Seo url={HOME_ROUTE} page="imax" />
      <Header />
      <style>{IMX_STYLES}</style>
      <div dangerouslySetInnerHTML={{ __html: IMX_HTML }} />
      <Footer />
    </div>
  );
}
