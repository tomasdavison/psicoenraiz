"use client";

import { useEffect } from "react";

const MARKUP = `
<div style="position:relative; min-height:100vh; background:var(--bg); overflow-x:clip;">

  <!-- top sentinel para estado del nav -->
  <div id="topSentinel" style="position:absolute; top:0; left:0; width:1px; height:50px; pointer-events:none;"></div>

  <!-- ambient canvas background (raíz / partículas orgánicas) -->
  <canvas id="bgCanvas" style="position:fixed; inset:0; width:100%; height:100%; z-index:0; pointer-events:none; opacity:.62;"></canvas>

  <!-- film grain overlay -->
  <div style="position:fixed; inset:0; z-index:2; pointer-events:none; mix-blend-mode:multiply; opacity:.06; background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;);"></div>

  <!-- ================= NAV ================= -->
  <nav id="site-nav">
    <a href="#top" style="display:flex; align-items:center; gap:10px; color:var(--ink);">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style="flex:none;">
        <path d="M12 3c0 5 0 8 0 18M12 9c-2.4-1.8-4.2-1.6-6-3M12 12c2.6-1.6 4.4-1.2 6.5-3.2M12 16c-1.9-1.2-3.3-1-4.8-2.2" stroke="var(--sage-deep)" stroke-width="1.3" stroke-linecap="round"></path>
      </svg>
      <span style="font-family:'Cormorant Garamond'; font-weight:500; font-size:20px; letter-spacing:.01em;">psico<span style="color:var(--terra-deep);">.</span>enraiz</span>
    </a>
    <div data-navlinks="" style="display:flex; align-items:center; gap:clamp(18px,2.4vw,34px); font-size:13.5px; letter-spacing:.01em;">
      <a href="#enfoque" style="color:var(--ink-soft);">Enfoque</a>
      <a href="#especialidades" style="color:var(--ink-soft);">Especialidades</a>
      <a href="#charlas" style="color:var(--ink-soft);">Charlas</a>
      <a href="#inversion" style="color:var(--ink-soft);">Sesiones</a>
      <a href="#contacto" class="h-dark" style="display:inline-flex; align-items:center; gap:7px; padding:9px 18px; border-radius:999px; background:var(--ink); color:var(--paper);">Escribime</a>
    </div>
    <button id="burger" data-burger="" style="display:none; align-items:center; justify-content:center; width:44px; height:44px; border:1px solid var(--line-strong); border-radius:999px; background:rgba(248,243,233,.6); color:var(--ink); cursor:pointer;">
      <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path></svg>
    </button>
  </nav>

  <!-- mobile menu -->
  <div id="mobileMenu" style="display:none; position:fixed; inset:0; z-index:55; background:rgba(241,234,221,.97); backdrop-filter:blur(6px); flex-direction:column; justify-content:center; gap:6px; padding:40px;">
    <button id="mobileClose" style="position:absolute; top:24px; right:24px; width:44px; height:44px; border:1px solid var(--line-strong); border-radius:999px; background:transparent; color:var(--ink); cursor:pointer; font-size:20px;">×</button>
    <a href="#enfoque" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Enfoque</a>
    <a href="#especialidades" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Especialidades</a>
    <a href="#charlas" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Charlas y talleres</a>
    <a href="#inversion" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Inversión</a>
    <a href="#contacto" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--terra-deep); padding:8px 0;"><em>Escribime</em></a>
  </div>

  <!-- ================= CONTENIDO ================= -->
  <main id="scope" style="position:relative; z-index:3;">

    <!-- HERO -->
    <header data-m="hero-a" style="min-height:92svh; display:grid; grid-template-columns:1.1fr .9fr; gap:clamp(20px,4vw,64px); align-items:center; align-content:start; padding:clamp(94px,11vh,126px) clamp(18px,4vw,56px) clamp(48px,7vh,80px);">
      <div style="max-width:760px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:clamp(20px,4vh,40px);"><span style="width:34px; height:1px; background:var(--muted);"></span><span style="font-size:11.5px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">Psicología clínica · Online</span></div>
        <h1 data-hero="" style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(46px,8.4vw,116px); line-height:.96; letter-spacing:-.015em; margin:0; color:var(--ink);">
          <span style="display:block; overflow:hidden;"><span data-line="" style="display:block;">Volver a la <em style="color:var(--terra-deep);">raíz</em></span></span>
          <span style="display:block; overflow:hidden;"><span data-line="" style="display:block;">de lo que <em style="color:var(--terra-deep);">duele</em></span></span>
          <span style="display:block; overflow:hidden;"><span data-line="" style="display:block;">e <em style="color:var(--terra-deep);">insiste</em>.</span></span>
        </h1>
        <p data-reveal="" style="max-width:44ch; margin:clamp(24px,4vh,40px) 0 0; font-size:clamp(16px,1.3vw,19px); line-height:1.6; color:var(--ink-soft);">Acompaño a personas, parejas y familias que quieren entender qué les pasa: no solo aliviar el síntoma, sino comprender por qué les pasa lo que les pasa, y cómo dejar de repetir esos patrones.</p>
        <div data-reveal="" style="display:flex; flex-wrap:wrap; align-items:center; gap:14px; margin-top:clamp(28px,4vh,40px);">
          <a href="#contacto" class="h-dark" style="display:inline-flex; align-items:center; gap:9px; padding:14px 26px; border-radius:999px; background:var(--ink); color:var(--paper); font-size:14.5px;">Contame qué te pasa <span style="font-size:16px;">→</span></a>
          <a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener" style="display:inline-flex; align-items:center; gap:8px; font-size:14px; color:var(--ink-soft);"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"></rect><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"></circle></svg>@psico.enraiz</a>
        </div>
      </div>
      <!-- portrait -->
      <div data-reveal="" style="position:relative; align-self:stretch; min-height:clamp(380px,74vh,900px); display:flex; align-items:flex-end;">
        <div data-parallax="" style="position:relative; width:100%; height:clamp(380px,74vh,900px); border-radius:240px 240px 26px 26px; overflow:hidden; will-change:transform; border:1px solid var(--line); background:var(--bg-2);">
          <img src="/assets/juli.jpg" alt="Lic. Juliana Nuñez Laya" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 30%;">
          <div style="position:absolute; left:0; right:0; bottom:0; height:140px; background:linear-gradient(180deg, rgba(42,38,32,0), rgba(42,38,32,.42));"></div>
        </div>
      </div>
    </header>

    <!-- meta strip -->
    <div data-reveal="" style="display:flex; flex-wrap:wrap; gap:clamp(20px,4vw,56px); padding:0 clamp(18px,4vw,56px) clamp(48px,8vh,90px); border-bottom:1px solid var(--line); font-size:13px; color:var(--ink-soft);">
      <div><div style="font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); margin-bottom:6px;">Modalidad</div>Sesiones online</div>
      <div><div style="font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); margin-bottom:6px;">Atención</div>Adolescentes · Adultos · Parejas · Familias</div>
    </div>

    <!-- MARQUEE -->
    <div style="overflow:hidden; padding:clamp(22px,4vh,40px) 0; border-bottom:1px solid var(--line);">
      <div id="marquee" style="display:flex; width:max-content; will-change:transform;">
        <span style="display:flex; align-items:center; font-family:'Cormorant Garamond'; font-style:italic; font-weight:300; font-size:clamp(30px,5vw,64px); color:var(--sage-deep); white-space:nowrap;">psicoterapia integrativa&nbsp;<span style="color:var(--terra);">·</span>&nbsp;vínculos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;identidad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;ansiedad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;parejas&nbsp;<span style="color:var(--terra);">·</span>&nbsp;duelos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;autoestima&nbsp;<span style="color:var(--terra);">·</span>&nbsp;</span>
        <span aria-hidden="true" style="display:flex; align-items:center; font-family:'Cormorant Garamond'; font-style:italic; font-weight:300; font-size:clamp(30px,5vw,64px); color:var(--sage-deep); white-space:nowrap;">psicoterapia integrativa&nbsp;<span style="color:var(--terra);">·</span>&nbsp;vínculos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;identidad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;ansiedad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;parejas&nbsp;<span style="color:var(--terra);">·</span>&nbsp;duelos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;autoestima&nbsp;<span style="color:var(--terra);">·</span>&nbsp;</span>
      </div>
    </div>

    <!-- ENFOQUE -->
    <section id="enfoque" data-m="two" style="display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,80px); padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px); align-items:start;">
      <div data-reveal="" data-m="sticky" style="position:sticky; top:120px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:22px;"><span style="width:30px; height:1px; background:var(--muted);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">El enfoque</span></div>
        <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(38px,5vw,72px); line-height:1; letter-spacing:-.01em; margin:0; color:var(--ink);">Lo que <em style="color:var(--terra-deep);">angustia</em><br>también orienta.</h2>
      </div>
      <div style="max-width:52ch;">
        <p data-reveal="" style="font-size:clamp(17px,1.4vw,21px); line-height:1.62; color:var(--ink-soft); margin:0 0 22px;">Trabajo desde un enfoque <strong style="font-weight: 500; color: var(--ink);">psicoanalítico </strong>con una mirada <b>integrativa</b>. Voy a la raíz de aquello que existe integrando herramientas contemporáneas: como por ejemplo la escritura terapéutica y/o la respiración consciente.</p>
        <p data-reveal="" style="font-size:clamp(15px,1.2vw,17px); line-height:1.68; color:var(--ink-soft); margin:0 0 22px;">Escucha profunda y respeto por los tiempos subjetivos: cada historia merece ser leída con cuidado. No venís a que te diagnostique; venís a que algo que se repite o te causa malestar pueda, por fin, ponerse en palabras.</p>
        <p data-reveal="" style="font-family:'Cormorant Garamond'; font-style:italic; font-size:clamp(22px,2.4vw,30px); line-height:1.3; color:var(--forest); margin:34px 0 40px;">"Vincularnos también es un espejo de nuestra historia."</p>
        <div data-reveal="" style="padding-top:26px; border-top:1px solid var(--line);">
          <div style="font-size:12.5px; color:var(--muted); letter-spacing:.02em;">Lic. Juliana Nuñez Laya · Psicóloga clínica</div>
        </div>
      </div>
    </section>

    <!-- MANIFIESTO (pineado) -->
    <section data-manifesto="" style="position:relative; height:300vh; background:var(--forest); color:var(--paper);">
      <div style="position:sticky; top:0; height:100svh; display:flex; align-items:center; justify-content:center; overflow:hidden; text-align:center; padding:0 clamp(18px,6vw,80px);">
        <div style="position:relative; width:100%; max-width:1100px; height:clamp(190px,42vh,360px);">
          <span data-mline="" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond'; font-weight:300; font-size:clamp(42px,8.5vw,120px); line-height:1.06; letter-spacing:-.02em; will-change:transform,opacity;"><span style="display:block; width:100%; max-width:8.5em; margin:0 auto; text-align:center;">Lo que <em style="color:var(--terra);">insiste</em> no es destino.</span></span>
          <span data-mline="" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond'; font-weight:300; font-size:clamp(42px,8.5vw,120px); line-height:1.06; letter-spacing:-.02em; opacity:0; will-change:transform,opacity;"><span style="display:block; width:100%; max-width:8.5em; margin:0 auto; text-align:center;">Es una <em style="color:var(--sage);">repetición</em> que dice algo.</span></span>
          <span data-mline="" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond'; font-weight:300; font-size:clamp(42px,8.5vw,120px); line-height:1.06; letter-spacing:-.02em; opacity:0; will-change:transform,opacity;"><span style="display:block; width:100%; max-width:8.5em; margin:0 auto; text-align:center;">Y entenderla, empieza por volver a la <em style="color:var(--terra);">raíz</em>.</span></span>
        </div>
      </div>
    </section>

    <!-- ESPECIALIDADES -->
    <section id="especialidades" style="padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px);">
      <div data-reveal="" style="display:flex; align-items:flex-end; justify-content:space-between; gap:20px; flex-wrap:wrap; max-width:1180px; margin:0 auto clamp(36px,6vh,64px);">
        <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(36px,5vw,72px); line-height:1; letter-spacing:-.01em; margin:0; max-width:16ch;">Con quién <em style="color:var(--terra-deep);">trabajo</em>.</h2>
      </div>
      <div style="border-bottom:1px solid var(--line-strong); max-width:1180px; margin:0 auto;">
        <div data-reveal="" class="h-spec" style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,4vw,56px); padding:clamp(30px,4.5vh,52px) clamp(4px,1.4vw,20px); border-top:1px solid var(--line-strong); transition:background .35s ease, padding-left .35s ease;">
          <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:clamp(24px,3vw,40px); color:var(--sage-deep); line-height:1;">01</span>
          <div data-m="two" style="display:grid; grid-template-columns:1.05fr 1fr; gap:clamp(12px,3vw,48px); align-items:baseline;">
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(30px,3.4vw,50px); font-weight:500; margin:0 0 12px; color:var(--ink); line-height:1;">Adolescentes</h3>
            </div>
            <p style="font-size:14px; line-height:1.62; color:var(--ink-soft); margin:0;">Un espacio para construir identidad, sostener los vínculos y darle lugar a la ansiedad propia de esta etapa.</p>
          </div>
        </div>
        <div data-reveal="" class="h-spec" style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,4vw,56px); padding:clamp(30px,4.5vh,52px) clamp(4px,1.4vw,20px); border-top:1px solid var(--line-strong); transition:background .35s ease, padding-left .35s ease;">
          <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:clamp(24px,3vw,40px); color:var(--terra-deep); line-height:1;">02</span>
          <div data-m="two" style="display:grid; grid-template-columns:1.05fr 1fr; gap:clamp(12px,3vw,48px); align-items:baseline;">
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(30px,3.4vw,50px); font-weight:500; margin:0 0 12px; color:var(--ink); line-height:1;">Adultos</h3>
            </div>
            <p style="font-size:14px; line-height:1.62; color:var(--ink-soft); margin:0;">Crisis vitales, duelos, ansiedad, autoestima, vínculos y dependencia emocional. Comprender la raíz de lo que se repite.</p>
          </div>
        </div>
        <div data-reveal="" class="h-spec" style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,4vw,56px); padding:clamp(30px,4.5vh,52px) clamp(4px,1.4vw,20px); border-top:1px solid var(--line-strong); transition:background .35s ease, padding-left .35s ease;">
          <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:clamp(24px,3vw,40px); color:var(--forest); line-height:1;">03</span>
          <div data-m="two" style="display:grid; grid-template-columns:1.05fr 1fr; gap:clamp(12px,3vw,48px); align-items:baseline;">
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(30px,3.4vw,50px); font-weight:500; margin:0 0 12px; color:var(--ink); line-height:1;">Parejas</h3>
            </div>
            <p style="font-size:14px; line-height:1.62; color:var(--ink-soft); margin:0;">Comunicación, convivencia, deseos, distancias, separaciones y la pregunta de si el vínculo puede sostenerse.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CHARLAS -->
    <section id="charlas" style="padding:clamp(72px,13vh,160px) clamp(18px,4vw,56px); background:var(--forest); color:var(--paper);">
      <div data-m="two" style="max-width:1160px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:clamp(36px,6vw,92px); align-items:center;">
        <div data-reveal="">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;"><span style="width:32px; height:1px; background:rgba(248,243,233,.4);"></span><span style="font-size:11px; letter-spacing:.22em; text-transform:uppercase; color:var(--sage);">Para equipos, colegios e instituciones</span></div>
          <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(38px,5.4vw,78px); line-height:1; letter-spacing:-.015em; margin:0 0 24px; color:var(--paper);"><em style="color:var(--terra);">Charlas y talleres</em>, fuera del consultorio.</h2>
          <p style="max-width:46ch; font-size:clamp(15px,1.3vw,18px); line-height:1.62; color:rgba(248,243,233,.82); margin:0 0 34px;">Brindo charlas y talleres para pensar juntos cuestiones de la actualidad, la identidad, los vínculos, la ansiedad y el bienestar. A&nbsp;la medida de tu grupo, sea un colegio, un equipo de trabajo o una comunidad.</p>
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:18px;">
            <a href="mailto:lic.juliana.nl@gmail.com?subject=Charla%20o%20taller" class="h-charla" style="display:inline-flex; align-items:center; gap:9px; padding:16px 32px; border-radius:999px; background:var(--paper); color:var(--forest); font-size:15px;">Invitame a hablar <span style="font-size:16px;">→</span></a>
            <a href="https://www.linkedin.com/in/juliana-nu%C3%B1ez-laya-8b7451181/" target="_blank" rel="noopener" class="h-charla-link" style="font-size:14px; color:var(--paper); border-bottom:1px solid rgba(248,243,233,.4); padding-bottom:3px;">o escribime por LinkedIn</a>
          </div>
        </div>
        <div data-reveal="" style="display:flex; flex-direction:column;">
          <div style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,2vw,24px); padding:clamp(20px,2.6vh,26px) 2px; border-top:1px solid rgba(248,243,233,.2);">
            <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:22px; color:var(--sage); line-height:1; opacity:.85;">01</span>
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(23px,2.3vw,30px); font-weight:500; margin:0 0 6px; color:var(--paper);">Educativo</h3>
              <p style="font-size:13.5px; line-height:1.55; color:rgba(248,243,233,.75); margin:0;">Colegios, universidades y familias: etapas escolares, identidad, vínculos y orientación a padres.</p>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,2vw,24px); padding:clamp(20px,2.6vh,26px) 2px; border-top:1px solid rgba(248,243,233,.2);">
            <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:22px; color:var(--sage); line-height:1; opacity:.85;">02</span>
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(23px,2.3vw,30px); font-weight:500; margin:0 0 6px; color:var(--paper);">Laboral</h3>
              <p style="font-size:13.5px; line-height:1.55; color:rgba(248,243,233,.75); margin:0;">Equipos y organizaciones: bienestar, salud mental, clima y comunicación.</p>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,2vw,24px); padding:clamp(20px,2.6vh,26px) 2px; border-top:1px solid rgba(248,243,233,.2); border-bottom:1px solid rgba(248,243,233,.2);">
            <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:22px; color:var(--sage); line-height:1; opacity:.85;">03</span>
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(23px,2.3vw,30px); font-weight:500; margin:0 0 6px; color:var(--paper);">Comunitario</h3>
              <p style="font-size:13.5px; line-height:1.55; color:rgba(248,243,233,.75); margin:0;">Instituciones, grupos y comunidades que quieren pensar juntas la salud mental.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INVERSIÓN -->
    <section id="inversion" style="padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px);">
      <div data-m="two" style="display:grid; grid-template-columns:.9fr 1.1fr; gap:clamp(28px,5vw,72px); align-items:start;">
        <div data-reveal="">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:22px;"><span style="width:30px; height:1px; background:var(--muted);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">SESIONES</span></div>
          <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(36px,4.6vw,64px); line-height:1; letter-spacing:-.01em; margin:0 0 22px;">Un espacio de <i style="color: #A87655">escucha</i>.</h2>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:40ch; margin:0 0 24px;">Todas las sesiones son virtuales sin importar en qué parte del mundo estés.</p>
        </div>
        <div>
          <div data-reveal="" data-m="pricecards" style="display:grid; grid-template-columns:1fr 1fr; gap:clamp(14px,1.6vw,20px);">
            <div style="padding:clamp(26px,3vw,38px); border-radius:20px; background:var(--paper); border:1px solid var(--line);">
              <div style="font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:14px;">Sesión individual</div>
              <div style="font-family:'Cormorant Garamond'; font-size:clamp(40px,5vw,60px); line-height:1; color:var(--ink);"><span data-price="" id="priceInd">$45.000</span></div>
            </div>
            <div style="padding:clamp(26px,3vw,38px); border-radius:20px; background:var(--forest); color:var(--paper); border:1px solid var(--forest);">
              <div style="font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--sage); margin-bottom:14px;">Sesión de pareja</div>
              <div style="font-family:'Cormorant Garamond'; font-size:clamp(40px,5vw,60px); line-height:1;"><span data-price="" id="priceCouple">$65.000</span></div>
            </div>
          </div>
          <p id="noteAR" data-reveal="" style="margin:22px 0 0; font-size:13px; line-height:1.6; color:var(--ink-soft); padding:16px 20px; border-radius:14px; background:var(--bg-2);">Pagás por <strong style="font-weight:500;">transferencia</strong> o <strong style="font-weight:500;">MercadoPago</strong>. Se emite factura para reintegro de obra social o prepaga.</p>
          <p id="noteEXT" data-reveal="" style="display:none; margin:22px 0 0; font-size:13px; line-height:1.6; color:var(--ink-soft); padding:16px 20px; border-radius:14px; background:var(--bg-2);">Desde el exterior coordinamos el medio de pago internacional al momento de agendar. Sesiones 100% online.</p>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <section id="contacto" style="padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px); background:var(--forest); color:var(--paper);">
      <div style="text-align:center; max-width:900px; margin:0 auto;">
        <div data-reveal="" style="display:inline-flex; align-items:center; gap:12px; margin-bottom:24px;"><span style="width:30px; height:1px; background:rgba(248,243,233,.4);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--sage);">Contacto</span><span style="width:30px; height:1px; background:rgba(248,243,233,.4);"></span></div>
        <h2 data-reveal="" style="font-family:'Cormorant Garamond'; font-weight:300; font-size:clamp(44px,7vw,96px); line-height:1; letter-spacing:-.015em; margin:0 0 20px;">Cuando quieras,<br>estoy <em style="color:var(--terra);">del otro lado</em>.</h2>
        <p data-reveal="" style="font-size:clamp(15px,1.3vw,18px); line-height:1.6; color:rgba(248,243,233,.72); max-width:46ch; margin:0 auto 44px;">Escribime y nos conocemos. Sin apuro: contame qué te trae y vemos cómo seguir.</p>
        <div data-reveal="" data-m="three" style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; max-width:720px; margin:0 auto;">
          <a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener" class="h-card" style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:26px 16px; border-radius:18px; background:rgba(248,243,233,.06); border:1px solid rgba(248,243,233,.16); color:var(--paper);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"></rect><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"></circle></svg><span style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--sage);">Instagram</span><span style="font-size:14px;">@psico.enraiz</span></a>
          <a href="mailto:lic.juliana.nl@gmail.com" class="h-card" style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:26px 16px; border-radius:18px; background:rgba(248,243,233,.06); border:1px solid rgba(248,243,233,.16); color:var(--paper);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"></rect><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.5"></path></svg><span style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--sage);">Email</span><span style="font-size:13px; word-break:break-all;">lic.juliana.nl@gmail.com</span></a>
          <a href="https://www.linkedin.com/in/juliana-nu%C3%B1ez-laya-8b7451181/" target="_blank" rel="noopener" class="h-card" style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:26px 16px; border-radius:18px; background:rgba(248,243,233,.06); border:1px solid rgba(248,243,233,.16); color:var(--paper);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"></rect><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg><span style="font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--sage);">LinkedIn</span><span style="font-size:14px;">Juliana Nuñez Laya</span></a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer style="padding:clamp(48px,7vh,80px) clamp(18px,4vw,56px) 40px;">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:30px; flex-wrap:wrap; padding-bottom:36px; border-bottom:1px solid var(--line);">
        <div style="font-family:'Cormorant Garamond'; font-size:clamp(30px,4vw,52px); line-height:1; color:var(--ink);">Volver a la <em style="color:var(--terra-deep);">raíz</em>.</div>
        <div style="display:flex; gap:clamp(24px,4vw,56px); flex-wrap:wrap; font-size:13.5px;">
          <div style="display:flex; flex-direction:column; gap:9px;"><span style="font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);">Secciones</span><a href="#enfoque" style="color:var(--ink-soft);">Enfoque</a><a href="#especialidades" style="color:var(--ink-soft);">Especialidades</a><a href="#charlas" style="color:var(--ink-soft);">Charlas</a><a href="#inversion" style="color:var(--ink-soft);">Inversión</a></div>
          <div style="display:flex; flex-direction:column; gap:9px;"><span style="font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);">Encontrame</span><a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener" style="color:var(--ink-soft);">Instagram</a><a href="mailto:lic.juliana.nl@gmail.com" style="color:var(--ink-soft);">Email</a><a href="https://www.linkedin.com/in/juliana-nu%C3%B1ez-laya-8b7451181/" target="_blank" rel="noopener" style="color:var(--ink-soft);">LinkedIn</a></div>
        </div>
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; padding-top:22px; font-size:12px; color:var(--muted);">
        <span>© 2026 Lic. Juliana Nuñez Laya · Modalidad online</span>
        <span>Psicoterapia integrativa · CABA, Argentina</span>
      </div>
    </footer>
  </main>

</div>
`;

export default function PsicoEnraiz() {
  useEffect(() => {
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = !reduced;

    const scope = document.getElementById("scope");
    const canvas = document.getElementById("bgCanvas");

    let bgRaf = null;
    let manRaf = null;
    let io = null;
    let navIo = null;
    let onPara = null;
    let paraEls = null;
    let mqTween = null;
    let bgResize = null;

    // ---------- región (auto-detección por zona horaria) ----------
    (function detectRegion() {
      let ar = true;
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        ar = /America\/Argentina/i.test(tz);
      } catch (e) {
        /* keep default */
      }
      const pi = document.getElementById("priceInd");
      const pc = document.getElementById("priceCouple");
      const nAR = document.getElementById("noteAR");
      const nEXT = document.getElementById("noteEXT");
      if (pi) pi.textContent = ar ? "$45.000" : "USD 45";
      if (pc) pc.textContent = ar ? "$65.000" : "USD 65";
      if (nAR) nAR.style.display = ar ? "" : "none";
      if (nEXT) nEXT.style.display = ar ? "none" : "";
    })();

    // ---------- menú mobile ----------
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobileMenu");
    const mClose = document.getElementById("mobileClose");
    const openMenu = () => {
      if (menu) menu.style.display = "flex";
    };
    const closeMenu = () => {
      if (menu) menu.style.display = "none";
    };
    if (burger) burger.addEventListener("click", openMenu);
    if (mClose) mClose.addEventListener("click", closeMenu);
    const mmLinks = Array.from(document.querySelectorAll(".mm-link"));
    mmLinks.forEach((a) => a.addEventListener("click", closeMenu));

    // ---------- nav: fondo al hacer scroll (sentinel) ----------
    const sentinel = document.getElementById("topSentinel");
    const nav = document.getElementById("site-nav");
    if (sentinel && nav) {
      navIo = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) nav.classList.remove("scrolled");
          else nav.classList.add("scrolled");
        },
        { threshold: 0 }
      );
      navIo.observe(sentinel);
    }

    // ---------- manifiesto: intercambio de líneas por progreso de scroll ----------
    function setupManifesto() {
      if (manRaf) {
        cancelAnimationFrame(manRaf);
        manRaf = null;
      }
      const sec = scope && scope.querySelector("[data-manifesto]");
      if (!sec) return;
      const lines = sec.querySelectorAll("[data-mline]");
      const fill = sec.querySelector("[data-mfill]");
      if (lines.length !== 3) return;
      if (!motion) {
        lines[0].style.opacity = 1;
        lines[1].style.opacity = 0;
        lines[2].style.opacity = 0;
        if (fill) fill.style.width = "100%";
        return;
      }
      const cl = (v) => Math.max(0, Math.min(1, v));
      const seg = (p, a, b) => cl((p - a) / (b - a));
      const loop = () => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const total = rect.height - vh;
        const p = total > 0 ? cl(-rect.top / total) : 0;
        if (fill) fill.style.width = (p * 100).toFixed(1) + "%";
        const o1 = seg(p, 0.26, 0.4);
        lines[0].style.opacity = (1 - o1).toFixed(3);
        lines[0].style.transform =
          "translateY(" +
          (-55 * o1).toFixed(1) +
          "px) scale(" +
          (1 + 0.05 * seg(p, 0, 0.26)).toFixed(3) +
          ")";
        const in2 = seg(p, 0.32, 0.46),
          out2 = seg(p, 0.56, 0.68);
        lines[1].style.opacity = Math.max(0, Math.min(in2, 1 - out2)).toFixed(3);
        lines[1].style.transform =
          "translateY(" +
          (55 * (1 - in2) - 55 * out2).toFixed(1) +
          "px) scale(" +
          (1 + 0.05 * out2).toFixed(3) +
          ")";
        const in3 = seg(p, 0.6, 0.74);
        lines[2].style.opacity = in3.toFixed(3);
        lines[2].style.transform =
          "translateY(" +
          (55 * (1 - in3)).toFixed(1) +
          "px) scale(" +
          (1 + 0.1 * seg(p, 0.8, 1)).toFixed(3) +
          ")";
        manRaf = requestAnimationFrame(loop);
      };
      loop();
    }

    // ---------- fondo canvas: raíces reveladas con el scroll ----------
    function setupBg() {
      const c = canvas;
      if (!c) return;
      if (reduced) {
        c.style.display = "none";
        return;
      }
      const ctx = c.getContext("2d");
      const mobile = window.innerWidth < 820;
      let W, H, dpr, segs = [], glows = [];
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = c.width = window.innerWidth * dpr;
        H = c.height = window.innerHeight * dpr;
        c.style.width = window.innerWidth + "px";
        c.style.height = window.innerHeight + "px";
      };
      const gen = () => {
        resize();
        glows = [
          { x: W * 0.22, y: H * 0.16, c: "rgba(200,155,123,0.03)" },
          { x: W * 0.84, y: H * 0.72, c: "rgba(111,132,102,0.03)" },
        ];
        segs = [];
        const tones = ["111,132,102", "168,120,85", "65,81,58"];
        const roots = [];
        let created = 0;
        const maxRoots = mobile ? 24 : 58;
        const seedN = mobile ? 4 : 7;
        const spawn = (x, y, ang, width, col, depth) => {
          if (created >= maxRoots) return;
          created++;
          roots.push({ x, y, ang, width, col, depth, steps: 0, done: false });
        };
        for (let i = 0; i < seedN; i++) {
          spawn(
            ((i + 0.5 + (Math.random() - 0.5) * 0.6) / seedN) * W,
            -10 * dpr,
            Math.PI / 2 + (Math.random() - 0.5) * 0.5,
            (1.8 + Math.random()) * dpr,
            tones[i % tones.length],
            0
          );
        }
        let active = 1,
          guard = 0;
        while (active > 0 && guard < 6000) {
          active = 0;
          for (let k = 0; k < roots.length; k++) {
            const r = roots[k];
            if (r.done) continue;
            active++;
            r.ang += (Math.random() - 0.5) * 0.5;
            r.ang += (Math.PI / 2 - r.ang) * 0.05;
            const len = (5 + Math.random() * 4) * dpr;
            const nx = r.x + Math.cos(r.ang) * len,
              ny = r.y + Math.sin(r.ang) * len;
            segs.push({
              x1: r.x,
              y1: r.y,
              x2: nx,
              y2: ny,
              w: Math.max(0.45 * dpr, r.width),
              col: r.col,
              a: 0.05 + r.depth * 0.006,
            });
            r.x = nx;
            r.y = ny;
            r.width *= 0.992;
            r.steps++;
            if (Math.random() < 0.03 && r.width > 0.9 * dpr && created < maxRoots) {
              spawn(
                r.x,
                r.y,
                r.ang + (Math.random() < 0.5 ? -1 : 1) * (0.4 + Math.random() * 0.5),
                r.width * 0.7,
                r.col,
                r.depth + 1
              );
            }
            if (ny > H + 20 * dpr || r.steps > 130 || r.width < 0.5 * dpr) r.done = true;
          }
          guard++;
        }
      };
      const band = 150;
      const drawTo = (revealYcss) => {
        const revealY = revealYcss * dpr;
        ctx.clearRect(0, 0, W, H);
        glows.forEach((gl) => {
          const r = Math.max(W, H) * 0.55;
          const grd = ctx.createRadialGradient(gl.x, gl.y, 0, gl.x, gl.y, r);
          grd.addColorStop(0, gl.c);
          grd.addColorStop(1, "rgba(241,234,221,0)");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(gl.x, gl.y, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.lineCap = "round";
        const bandpx = band * dpr;
        for (let i = 0; i < segs.length; i++) {
          const s = segs[i];
          if (s.y2 > revealY) continue;
          let f = 1;
          const d = revealY - s.y2;
          if (d < bandpx) f = d / bandpx;
          if (f <= 0) continue;
          ctx.strokeStyle = "rgba(" + s.col + "," + (s.a * f).toFixed(3) + ")";
          ctx.lineWidth = s.w;
          ctx.beginPath();
          ctx.moveTo(s.x1, s.y1);
          ctx.lineTo(s.x2, s.y2);
          ctx.stroke();
        }
      };
      let lastReveal = -999;
      const loop = () => {
        const root = scope;
        let p = 0;
        if (root) {
          const rect = root.getBoundingClientRect();
          const max = rect.height - window.innerHeight || 1;
          p = Math.min(1, Math.max(0, -rect.top / max));
        }
        const revealY = p * window.innerHeight + band;
        if (Math.abs(revealY - lastReveal) > 1.5) {
          lastReveal = revealY;
          drawTo(revealY);
        }
        bgRaf = requestAnimationFrame(loop);
      };
      gen();
      drawTo(band);
      loop();
      bgResize = () => {
        gen();
        lastReveal = -999;
        drawTo(band);
      };
      window.addEventListener("resize", bgResize);
    }

    // ---------- escena GSAP (hero, reveals, parallax, marquee) ----------
    function buildScene() {
      const g = window.gsap;
      if (!g || !scope) return;

      // hero: reveal por líneas con máscara
      const lines = scope.querySelectorAll("[data-hero] [data-line]");
      if (lines.length) {
        if (motion) {
          g.set(lines, { yPercent: 115 });
          g.to(lines, {
            yPercent: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.11,
            delay: 0.15,
          });
        } else {
          g.set(lines, { yPercent: 0, opacity: 1 });
        }
      }

      // reveals on-scroll (IntersectionObserver)
      if (io) {
        io.disconnect();
        io = null;
      }
      const items = scope.querySelectorAll("[data-reveal]");
      if (!motion) {
        items.forEach((el) => g.set(el, { opacity: 1, y: 0, clearProps: "filter" }));
      } else {
        items.forEach((el) => {
          const kind = el.getAttribute("data-reveal");
          if (kind === "stagger") g.set(el.children, { opacity: 0, y: 26 });
          else g.set(el, { opacity: 0, y: 34 });
        });
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target;
              const kind = el.getAttribute("data-reveal");
              if (kind === "stagger") {
                g.to(el.children, {
                  opacity: 1,
                  y: 0,
                  duration: 1.05,
                  ease: "power2.out",
                  stagger: 0.1,
                });
              } else {
                g.to(el, { opacity: 1, y: 0, duration: 1.15, ease: "power2.out" });
              }
              io.unobserve(el);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
        );
        items.forEach((el) => io.observe(el));
      }

      // parallax sutil (retrato)
      paraEls = scope.querySelectorAll("[data-parallax]");
      if (paraEls.length && motion) {
        const vh = () => window.innerHeight || 800;
        onPara = () => {
          paraEls.forEach((el) => {
            const r = el.getBoundingClientRect();
            const off = (r.top + r.height / 2 - vh() / 2) / vh();
            el.style.transform = "translate3d(0," + (off * -26).toFixed(1) + "px,0)";
          });
        };
        window.addEventListener("scroll", onPara, { passive: true });
        onPara();
      }

      // marquee
      const mq = document.getElementById("marquee");
      if (mq && motion) {
        mqTween = g.to(mq, {
          xPercent: -50,
          duration: 34,
          ease: "none",
          repeat: -1,
        });
      }

      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }

    // ---------- arranque: esperar GSAP, luego montar la escena ----------
    let attempts = 0;
    const go = () => {
      setupBg();
      setupManifesto();
      if (window.gsap) requestAnimationFrame(buildScene);
    };
    const tick = () => {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        go();
      } else if (attempts++ < 120) {
        setTimeout(tick, 50);
      } else {
        go(); // sin GSAP: el contenido igual se ve; fondo + manifiesto siguen andando
      }
    };
    tick();

    const onResize = () => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // ---------- limpieza ----------
    return () => {
      if (io) io.disconnect();
      if (navIo) navIo.disconnect();
      if (manRaf) cancelAnimationFrame(manRaf);
      if (bgRaf) cancelAnimationFrame(bgRaf);
      if (mqTween && mqTween.kill) mqTween.kill();
      if (onPara) window.removeEventListener("scroll", onPara);
      if (bgResize) window.removeEventListener("resize", bgResize);
      window.removeEventListener("resize", onResize);
      if (burger) burger.removeEventListener("click", openMenu);
      if (mClose) mClose.removeEventListener("click", closeMenu);
      mmLinks.forEach((a) => a.removeEventListener("click", closeMenu));
      if (window.ScrollTrigger)
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />;
}
