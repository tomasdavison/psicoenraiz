"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ContactForm from "./ContactForm";

const MARKUP = `
<div style="position:relative; min-height:100vh; background:var(--bg); overflow-x:clip;">

  <!-- top sentinel para estado del nav -->
  <div id="topSentinel" style="position:absolute; top:0; left:0; width:1px; height:50px; pointer-events:none;"></div>

  <!-- Raíces decorativas a lo largo de toda la página. -->
  <svg id="bgRoots" aria-hidden="true" focusable="false" style="position:absolute; inset:0; width:100%; height:100%; z-index:4; pointer-events:none; overflow:hidden;"></svg>

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
    <div data-navlinks="" style="display:flex; align-items:center; gap:clamp(16px,2.2vw,30px); font-size:13.5px; letter-spacing:.01em;">
      <a href="#enfoque" style="color:var(--ink-soft);">Enfoque</a>
      <a href="#especialidades" style="color:var(--ink-soft);">Especialidades</a>
      <a href="#supervision" style="color:var(--ink-soft);">Supervisión</a>
      <a href="#charlas" style="color:var(--ink-soft);">Escuelas y empresas</a>
      <a href="#sesiones" style="color:var(--ink-soft);">Sesiones</a>
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
    <a href="#supervision" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Supervisión</a>
    <a href="#charlas" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Escuelas y empresas</a>
    <a href="#sesiones" class="mm-link" style="font-family:'Cormorant Garamond'; font-size:38px; color:var(--ink); padding:8px 0;">Sesiones</a>
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
        <p data-reveal="" style="max-width:44ch; margin:clamp(24px,4vh,40px) 0 0; font-size:clamp(16px,1.3vw,19px); line-height:1.6; color:var(--ink-soft);">Acompaño a adolescentes, adultos, parejas y familias a comprender lo que les pasa y trabajar sobre aquello que se repite en sus vínculos y en su vida.</p>
        <div data-reveal="" style="display:flex; flex-wrap:wrap; align-items:center; gap:14px; margin-top:clamp(28px,4vh,40px);">
          <a href="#contacto" data-contact-service="individual" class="h-dark" style="display:inline-flex; align-items:center; gap:9px; padding:14px 26px; border-radius:999px; background:var(--ink); color:var(--paper); font-size:14.5px;">Contame qué te pasa <span style="font-size:16px;">→</span></a>
          <a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener" style="display:inline-flex; align-items:center; gap:8px; font-size:14px; color:var(--ink-soft);"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"></rect><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"></circle></svg>@psico.enraiz</a>
        </div>
        <p data-reveal="" style="margin:22px 0 0; max-width:52ch; font-size:13.5px; line-height:1.6;"><a href="#charlas" class="hero-organizations-link" style="color:var(--ink-soft); text-decoration:underline; text-underline-offset:4px;">Escuelas, empresas y organizaciones: conocé mis propuestas&nbsp;<span aria-hidden="true">→</span></a></p>
      </div>
      <!-- portrait -->
      <div data-reveal="" style="position:relative; align-self:stretch; min-height:clamp(380px,74vh,900px); display:flex; align-items:flex-end;">
        <div data-parallax="" style="position:relative; width:100%; height:clamp(380px,74vh,900px); border-radius:240px 240px 26px 26px; overflow:hidden; will-change:transform; border:1px solid var(--line); background:var(--bg-2);">
          <img src="/assets/juliana-inicio.jpg" alt="Lic. Juliana Núñez Laya" width="1367" height="2048" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 43%; transform:scale(1.35); transform-origin:50% 47%;">
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
        <span style="display:flex; align-items:center; font-family:'Cormorant Garamond'; font-style:italic; font-weight:300; font-size:clamp(30px,5vw,64px); color:var(--sage-deep); white-space:nowrap;">psicología integrativa&nbsp;<span style="color:var(--terra);">·</span>&nbsp;vínculos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;identidad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;ansiedad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;parejas&nbsp;<span style="color:var(--terra);">·</span>&nbsp;duelos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;autoestima&nbsp;<span style="color:var(--terra);">·</span>&nbsp;</span>
        <span aria-hidden="true" style="display:flex; align-items:center; font-family:'Cormorant Garamond'; font-style:italic; font-weight:300; font-size:clamp(30px,5vw,64px); color:var(--sage-deep); white-space:nowrap;">psicología integrativa&nbsp;<span style="color:var(--terra);">·</span>&nbsp;vínculos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;identidad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;ansiedad&nbsp;<span style="color:var(--terra);">·</span>&nbsp;parejas&nbsp;<span style="color:var(--terra);">·</span>&nbsp;duelos&nbsp;<span style="color:var(--terra);">·</span>&nbsp;autoestima&nbsp;<span style="color:var(--terra);">·</span>&nbsp;</span>
      </div>
    </div>

    <!-- ENFOQUE -->
    <section id="enfoque" data-m="two" style="display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,80px); padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px); align-items:start;">
      <div data-reveal="" data-m="sticky" style="position:sticky; top:120px;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:22px;"><span style="width:30px; height:1px; background:var(--muted);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">El enfoque</span></div>
        <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(38px,5vw,72px); line-height:1; letter-spacing:-.01em; margin:0; color:var(--ink);">Lo que <em style="color:var(--terra-deep);">angustia</em><br>también orienta.</h2>
      </div>
      <div style="max-width:52ch;">
        <p data-reveal="" style="font-size:clamp(17px,1.4vw,21px); line-height:1.62; color:var(--ink-soft); margin:0 0 22px;">Hay cosas que <strong style="font-weight:500; color:var(--ink);">entendés y, aun así, te siguen pasando</strong>. Maneras de vincularte, exigencias o conflictos que vuelven, aunque las situaciones y las personas cambien.</p>
        <p data-reveal="" style="font-size:clamp(15px,1.2vw,17px); line-height:1.68; color:var(--ink-soft); margin:0 0 22px;">Trabajo desde el <strong style="font-weight:500; color:var(--ink);">psicoanálisis</strong>, explorando con vos cómo tu historia se hace presente en lo que sentís, en tus vínculos y en tus decisiones. Me interesa escuchar también esas contradicciones que a veces cuesta decir: lo que querés y te da miedo, lo que sostenés aunque te duela, lo que sentís que deberías hacer y no sabés si elegís.</p>
        <p data-reveal="" style="font-size:clamp(15px,1.2vw,17px); line-height:1.68; color:var(--ink-soft); margin:0 0 22px;">Entiendo la terapia como un <strong style="font-weight:500; color:var(--ink);">trabajo compartido</strong>. Hago preguntas, retomamos algo que dijiste al pasar y nos detenemos en lo que todavía cuesta poner en palabras. Hay espacio para hablar de tu historia, de lo que pasó esta semana y de eso que hoy necesitás poder vivir de otra manera.</p>
        <p data-reveal="" style="font-size:clamp(15px,1.2vw,17px); line-height:1.68; color:var(--ink-soft); margin:0 0 22px;">Cada proceso se construye según la persona y el momento que está atravesando. Cuando aporta al trabajo en las sesiones, podemos incorporar recursos como la escritura o la respiración consciente.</p>
        <p data-reveal="" style="font-family:'Cormorant Garamond'; font-style:italic; font-size:clamp(22px,2.4vw,30px); line-height:1.3; color:var(--forest); margin:34px 0 40px;">Tu historia tiene lugar en este espacio. Lo que querés para tu vida, también.</p>
        <div data-reveal="" style="padding-top:26px; border-top:1px solid var(--line);">
          <div style="font-size:12.5px; color:var(--muted); letter-spacing:.02em;">Lic. Juliana Núñez Laya · Psicóloga clínica</div>
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
        <div data-reveal="" class="h-spec" style="display:grid; grid-template-columns:auto 1fr; gap:clamp(16px,4vw,56px); padding:clamp(30px,4.5vh,52px) clamp(4px,1.4vw,20px); border-top:1px solid var(--line-strong); border-bottom:1px solid var(--line-strong); transition:background .35s ease, padding-left .35s ease;">
          <span style="font-family:'Cormorant Garamond'; font-style:italic; font-size:clamp(24px,3vw,40px); color:var(--sage-deep); line-height:1;">04</span>
          <div data-m="two" style="display:grid; grid-template-columns:1.05fr 1fr; gap:clamp(12px,3vw,48px); align-items:baseline;">
            <div>
              <h3 style="font-family:'Cormorant Garamond'; font-size:clamp(30px,3.4vw,50px); font-weight:500; margin:0 0 12px; color:var(--ink); line-height:1;">Familias y orientación a padres</h3>
            </div>
            <p style="font-size:14px; line-height:1.62; color:var(--ink-soft); margin:0;">Un espacio para pensar los vínculos familiares, las dificultades en la crianza y aquello que cada etapa moviliza. Acompañamiento para construir nuevas formas de escucha y encuentro.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SUPERVISIÓN -->
    <section id="supervision" style="padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px); background:var(--bg-2); border-top:1px solid var(--line);">
      <div data-m="two" style="max-width:1160px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,80px); align-items:center;">
        <div data-reveal="">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:22px;"><span style="width:30px; height:1px; background:var(--muted);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">Para profesionales</span></div>
          <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(36px,4.6vw,64px); line-height:1.04; letter-spacing:-.01em; margin:0;">La clínica también se piensa <em style="color:var(--terra-deep);">acompañada</em>.</h2>
        </div>
        <div data-reveal="" style="max-width:50ch;">
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); margin:0 0 18px;">Si estás dando tus primeros pasos en la clínica y aparecen dudas, inseguridades o preguntas frente a la escucha de un paciente, te ofrezco un espacio para pensarlas en compañía.</p>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); margin:0 0 26px;">En las supervisiones trabajamos sobre casos clínicos, intervenciones, dificultades en la escucha y preguntas acerca de cómo orientar cada proceso. No se trata de encontrar respuestas cerradas, sino de construir una lectura posible y una posición clínica propia.</p>
          <div style="padding:clamp(20px,2.4vw,26px); border-radius:18px; background:var(--paper); border:1px solid var(--line); margin-bottom:24px;">
            <div style="font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:14px;">Modalidades</div>
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
              <span style="display:inline-flex; align-items:center; padding:9px 16px; border-radius:999px; background:var(--bg); border:1px solid var(--line); font-size:13.5px; color:var(--ink-soft);">Supervisión individual</span>
              <span style="display:inline-flex; align-items:center; padding:9px 16px; border-radius:999px; background:var(--bg); border:1px solid var(--line); font-size:13.5px; color:var(--ink-soft);">Supervisión grupal</span>
            </div>
          </div>
          <a href="#contacto" data-contact-service="supervision" class="h-dark" style="display:inline-flex; align-items:center; gap:9px; padding:14px 26px; border-radius:999px; background:var(--forest); color:var(--paper); font-size:14.5px;">Consultar por supervisión <span style="font-size:16px;">→</span></a>
        </div>
      </div>
    </section>

    <!-- ESCUELAS Y EMPRESAS -->
    <section id="charlas" class="organizations-section" aria-labelledby="organizations-heading">
      <div class="organizations-layout">
        <div data-reveal="" class="organizations-intro">
          <div class="organizations-kicker"><span></span>Fuera del consultorio</div>
          <h2 id="organizations-heading">Propuestas para <em>escuelas y empresas.</em></h2>
          <p>Charlas, talleres y evaluaciones psicolaborales. Cada propuesta se construye según las necesidades de la institución, el equipo y las personas que lo integran.</p>
          <a href="https://www.linkedin.com/in/juliana-nu%C3%B1ez-laya-8b7451181/" target="_blank" rel="noopener" class="h-charla-link organizations-linkedin">Conocé mi trayectoria en LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
        <div data-reveal="" class="organizations-offers">
          <article class="organizations-audience" aria-labelledby="schools-heading">
            <span class="organizations-number" aria-hidden="true">01</span>
            <div>
              <h3 id="schools-heading">Escuelas y comunidades educativas</h3>
              <p>Trabajé como <strong>acompañante terapéutica en el ámbito educativo</strong>, en articulación con equipos docentes y de orientación escolar.</p>
              <p>Brindé charlas sobre <strong>acceso temprano a redes sociales y amenazas en el contexto escolar</strong> para docentes, directivos, familias y estudiantes de primaria y secundaria, con contenidos adaptados a cada público.</p>
              <p>Las charlas sobre <strong>consumo problemático</strong> estuvieron dirigidas específicamente a adolescentes del último año de secundaria.</p>
              <a href="#contacto" data-contact-service="educacion" class="organizations-cta h-charla">Consultar por una propuesta educativa <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article class="organizations-audience" aria-labelledby="companies-heading">
            <span class="organizations-number" aria-hidden="true">02</span>
            <div>
              <h3 id="companies-heading">Empresas y organizaciones</h3>
              <div class="organizations-service">
                <h4>Charlas y talleres</h4>
                <p>Brindé charlas sobre <strong>salud mental y burnout</strong>, y coordiné <strong>dinámicas grupales</strong> para equipos, managers, líderes y alta dirección. Cada propuesta se adapta a las necesidades y al contexto de la organización.</p>
                <a href="#contacto" data-contact-service="empresas" class="organizations-cta h-charla">Consultar por charlas y talleres <span aria-hidden="true">→</span></a>
              </div>
              <div class="organizations-service">
                <h4>Evaluaciones psicotécnicas</h4>
                <p>Ofrezco <strong>evaluaciones psicolaborales</strong> para acompañar procesos de selección de personal. La propuesta contempla las características del puesto y las necesidades de la organización, con un informe que aporta elementos para la toma de decisiones.</p>
                <a href="#contacto" data-contact-service="psicotecnicos" class="organizations-cta h-charla">Consultar por una evaluación <span aria-hidden="true">→</span></a>
              </div>
              <p class="organizations-training"><span>Formación complementaria</span>Diplomatura en Gestión de Recursos Humanos · UCES, 2019.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- SESIONES -->
    <section id="sesiones" style="padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px);">
      <div data-m="two" style="display:grid; grid-template-columns:.9fr 1.1fr; gap:clamp(28px,5vw,72px); align-items:start;">
        <div data-reveal="">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:22px;"><span style="width:30px; height:1px; background:var(--muted);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">SESIONES</span></div>
          <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(36px,4.6vw,64px); line-height:1; letter-spacing:-.01em; margin:0 0 22px;">Un espacio para <i style="color: #A87655">vos o para ustedes</i>.</h2>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:48ch; margin:0 0 18px;">Podés consultar por algo que te preocupa, <strong style="font-weight:600; color:var(--ink);">un malestar que vuelve</strong> o una situación que te cuesta atravesar.</p>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:48ch; margin:0 0 18px;">También pueden llegar <strong style="font-weight:600; color:var(--ink);">como pareja</strong>: porque las discusiones se repiten, sienten una distancia que antes no estaba o les cuesta hablar de algo sin terminar enfrentados. La terapia ofrece un espacio para <strong style="font-weight:600; color:var(--ink);">escuchar a ambos</strong> y trabajar sobre lo que sucede entre ustedes.</p>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:48ch; margin:0 0 18px;">En el <strong style="font-weight:600; color:var(--ink);">primer encuentro</strong> conversamos sobre qué motiva la consulta y cómo podemos trabajar. Hay lugar para conocernos, hacer preguntas y pensar qué esperan de este espacio.</p>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:48ch; margin:0 0 18px;">Las <strong style="font-weight:600; color:var(--ink);">sesiones son virtuales</strong>, estén en Argentina o en otro país.</p>
        </div>
        <div data-reveal="">
          <div style="padding:clamp(24px,2.6vw,30px); border-radius:20px; background:var(--paper); border:1px solid var(--line); margin-bottom:24px;">
            <div style="font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:16px;">Espacios de atención</div>
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
              <span style="display:inline-flex; align-items:center; padding:9px 16px; border-radius:999px; background:var(--bg); border:1px solid var(--line); font-size:13.5px; color:var(--ink-soft);">Terapia individual</span>
              <span style="display:inline-flex; align-items:center; padding:9px 16px; border-radius:999px; background:var(--bg); border:1px solid var(--line); font-size:13.5px; color:var(--ink-soft);">Terapia de pareja</span>
              <span style="display:inline-flex; align-items:center; padding:9px 16px; border-radius:999px; background:var(--bg); border:1px solid var(--line); font-size:13.5px; color:var(--ink-soft);">Adolescentes</span>
              <span style="display:inline-flex; align-items:center; padding:9px 16px; border-radius:999px; background:var(--bg); border:1px solid var(--line); font-size:13.5px; color:var(--ink-soft);">Orientación a familias</span>
            </div>
          </div>
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:16px;">
            <a href="#contacto" data-contact-service="individual" class="h-dark" style="display:inline-flex; align-items:center; gap:9px; padding:14px 26px; border-radius:999px; background:var(--ink); color:var(--paper); font-size:14.5px;">Consultar por terapia individual <span style="font-size:16px;">→</span></a>
            <a href="#contacto" data-contact-service="pareja" class="h-dark" style="display:inline-flex; align-items:center; gap:9px; padding:14px 26px; border-radius:999px; background:var(--ink); color:var(--paper); font-size:14.5px;">Consultar por terapia de pareja <span style="font-size:16px;">→</span></a>
            <a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener" style="display:inline-flex; align-items:center; gap:8px; font-size:14px; color:var(--ink-soft);"><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"></rect><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"></circle><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"></circle></svg>Escribirme por Instagram</a>
          </div>
        </div>
      </div>
    </section>

    <!-- SOBRE MÍ -->
    <section id="sobre-mi" style="padding:clamp(64px,12vh,150px) clamp(18px,4vw,56px); background:var(--paper); border-top:1px solid var(--line);">
      <div data-m="two" style="display:grid; grid-template-columns:1.1fr .9fr; gap:clamp(28px,5vw,72px); align-items:center;">
        <div data-reveal="">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:22px;"><span style="width:30px; height:1px; background:var(--muted);"></span><span style="font-size:11px; letter-spacing:.24em; text-transform:uppercase; color:var(--muted);">Sobre mí</span></div>
          <h2 style="font-family:'Cormorant Garamond'; font-weight:400; font-size:clamp(36px,4.6vw,64px); line-height:1.04; letter-spacing:-.01em; margin:0 0 24px;">Quién está detrás de la <em style="color:var(--terra-deep);">escucha</em>.</h2>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:48ch; margin:0 0 18px;">Soy Juliana Núñez Laya, licenciada en Psicología. Trabajo desde una orientación psicoanalítica con una mirada integrativa y acompaño procesos individuales, de pareja y familiares.</p>
          <p style="font-size:15px; line-height:1.65; color:var(--ink-soft); max-width:48ch; margin:0;">Me especialicé en psicoanálisis de parejas y familias y continúo formándome en clínica psicoanalítica de adultos. Concibo la terapia como un espacio de escucha, elaboración y encuentro con aquello que muchas veces se repite sin que podamos comprender por qué.</p>
        </div>
        <div data-reveal="">
          <div id="sobreMiPhoto" style="position:relative; border-radius:24px; overflow:hidden; aspect-ratio:4/5; background:var(--bg-2); border:1px solid var(--line);">
            <img src="/assets/juliana-sobre-mi.jpg" alt="Juliana Núñez Laya, sentada con una libreta" loading="lazy" width="1366" height="2048" style="display:block; width:100%; height:100%; object-fit:cover; object-position:50% 44%;">
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <section id="contacto" class="contact-section">
      <div class="contact-layout">
        <div class="contact-copy" data-reveal="">
          <div class="contact-kicker"><span></span>Contacto</div>
          <h2>Cuando quieras,<br>estoy <em>del otro lado</em>.</h2>
          <p>Si algo de lo que leíste resonó con vos, podés dejarme tu consulta. No hace falta que tengas todo claro para dar el primer paso.</p>
          <div class="contact-paths">
            <a href="#contacto" data-contact-service="individual">Terapia individual y de pareja <span aria-hidden="true">↗</span></a>
            <a href="#contacto" data-contact-service="supervision">Supervisión clínica <span aria-hidden="true">↗</span></a>
            <a href="#contacto" data-contact-service="empresas">Empresas y organizaciones <span aria-hidden="true">↗</span></a>
            <a href="#contacto" data-contact-service="educacion">Escuelas e instituciones <span aria-hidden="true">↗</span></a>
          </div>
          <p class="contact-aside">Este formulario es para consultas iniciales y propuestas de trabajo. No es un canal de atención de urgencias.</p>
          <div class="contact-alternatives">
            <a href="mailto:lic.juliana.nl@gmail.com">También podés escribirme por email</a>
            <div><a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener">Instagram</a><span aria-hidden="true">·</span><a href="https://www.linkedin.com/in/juliana-nu%C3%B1ez-laya-8b7451181/" target="_blank" rel="noopener">LinkedIn</a></div>
          </div>
        </div>
        <div id="contactFormMount"><noscript><p>Para completar el formulario, activá JavaScript o <a href="mailto:lic.juliana.nl@gmail.com">escribime por email</a>.</p></noscript></div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer style="padding:clamp(48px,7vh,80px) clamp(18px,4vw,56px) 40px;">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:30px; flex-wrap:wrap; padding-bottom:36px; border-bottom:1px solid var(--line);">
        <div style="font-family:'Cormorant Garamond'; font-size:clamp(30px,4vw,52px); line-height:1; color:var(--ink);">Volver a la <em style="color:var(--terra-deep);">raíz</em>.</div>
        <div style="display:flex; gap:clamp(24px,4vw,56px); flex-wrap:wrap; font-size:13.5px;">
          <div style="display:flex; flex-direction:column; gap:9px;"><span style="font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);">Secciones</span><a href="#enfoque" style="color:var(--ink-soft);">Enfoque</a><a href="#especialidades" style="color:var(--ink-soft);">Especialidades</a><a href="#supervision" style="color:var(--ink-soft);">Supervisión</a><a href="#charlas" style="color:var(--ink-soft);">Escuelas y empresas</a><a href="#sesiones" style="color:var(--ink-soft);">Sesiones</a></div>
          <div style="display:flex; flex-direction:column; gap:9px;"><span style="font-size:10.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted);">Encontrame</span><a href="#contacto" style="color:var(--ink-soft);">Formulario de contacto</a><a href="https://instagram.com/psico.enraiz" target="_blank" rel="noopener" style="color:var(--ink-soft);">Instagram</a><a href="mailto:lic.juliana.nl@gmail.com" style="color:var(--ink-soft);">Email</a><a href="https://www.linkedin.com/in/juliana-nu%C3%B1ez-laya-8b7451181/" target="_blank" rel="noopener" style="color:var(--ink-soft);">LinkedIn</a></div>
        </div>
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; padding-top:22px; font-size:12px; color:var(--muted);">
        <span>© 2026 Lic. Juliana Núñez Laya · Modalidad online</span>
        <span>Psicología integrativa · CABA, Argentina</span>
      </div>
    </footer>
  </main>

</div>
`;

// Keep the markup object stable so state updates do not replace the portal target.
const SITE_HTML = { __html: MARKUP };

export default function PsicoEnraiz() {
  const [formMount, setFormMount] = useState(null);

  useEffect(() => {
    setFormMount(document.getElementById("contactFormMount"));
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = !reduced;

    const scope = document.getElementById("scope");
    const rootsLayer = document.getElementById("bgRoots");

    let bgRaf = null;
    let manRaf = null;
    let io = null;
    let navIo = null;
    let onPara = null;
    let paraEls = null;
    let mqTween = null;
    let bgResize = null;
    let bgScroll = null;
    let bgObserver = null;

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
      const cl = (v) => Math.max(0, Math.min(1, v));
      const seg = (p, a, b) => cl((p - a) / (b - a));
      const loop = () => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const total = rect.height - vh;
        const p = total > 0 ? cl(-rect.top / total) : 0;
        if (fill) fill.style.width = (p * 100).toFixed(1) + "%";
        if (!motion) {
          // Keep all three messages readable without movement or scaling.
          const active = p < 0.36 ? 0 : p < 0.65 ? 1 : 2;
          lines.forEach((line, index) => {
            line.style.opacity = index === active ? "1" : "0";
            line.style.transform = "none";
          });
          manRaf = requestAnimationFrame(loop);
          return;
        }
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

    // ---------- raíces estáticas: recorren el documento y quedan detrás del contenido ----------
    function setupBg() {
      const svg = rootsLayer;
      if (!svg || !scope) return;
      const ns = "http://www.w3.org/2000/svg";
      const make = (name, attributes) => {
        const node = document.createElementNS(ns, name);
        Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
        return node;
      };
      const defs = make("defs", {});
      const feather = make("filter", { id: "roots-content-softener", filterUnits: "userSpaceOnUse" });
      feather.append(make("feGaussianBlur", { stdDeviation: 10 }));
      defs.append(feather);
      const mask = make("mask", { id: "roots-content-mask", maskUnits: "userSpaceOnUse", "mask-type": "luminance" });
      const backdrop = make("rect", { x: 0, y: 0, fill: "white" });
      const protectedAreas = make("g", { fill: "black", filter: "url(#roots-content-softener)" });
      const protectedPhotos = make("g", { fill: "black" });
      mask.append(backdrop, protectedAreas, protectedPhotos);
      defs.append(mask);
      const drawing = make("g", { fill: "none", stroke: "#A87655", "stroke-opacity": ".12", "stroke-linecap": "round", "stroke-linejoin": "round", mask: "url(#roots-content-mask)" });
      svg.replaceChildren(defs, drawing);
      let width = 0, height = 0;
      const protectContent = () => {
        const origin = svg.parentElement.getBoundingClientRect();
        // Keep the mask raster within the visible area, even on very long pages.
        const visibleTop = Math.max(0, -origin.top - 50);
        const visibleHeight = window.innerHeight + 100;
        mask.setAttribute("y", visibleTop);
        mask.setAttribute("height", visibleHeight);
        feather.setAttribute("x", -20);
        feather.setAttribute("y", visibleTop);
        feather.setAttribute("width", width + 40);
        feather.setAttribute("height", visibleHeight);
        const nodes = scope.querySelectorAll("h1, h2, h3, h4, p, a, button, img, [data-mline], #marquee, #contactFormMount, footer span, footer > div > div:first-child");
        const fragment = document.createDocumentFragment();
        const photos = document.createDocumentFragment();
        nodes.forEach(node => {
          const target = node.tagName === "IMG" ? node.closest("#sobreMiPhoto, [data-parallax]") || node : node;
          const rect = target.getBoundingClientRect();
          if (!rect.width || !rect.height || rect.bottom < -50 || rect.top > window.innerHeight + 50) return;
          const collection = node.tagName === "IMG" || node.id === "contactFormMount" ? photos : fragment;
          collection.append(make("rect", {
            x: (rect.left - origin.left - 8).toFixed(1),
            y: (rect.top - origin.top - 10).toFixed(1),
            width: (rect.width + 16).toFixed(1),
            height: (rect.height + 20).toFixed(1),
            rx: 12,
          }));
        });
        protectedAreas.replaceChildren(fragment);
        protectedPhotos.replaceChildren(photos);
      };
      const generate = () => {
        const nextWidth = svg.parentElement.clientWidth;
        const nextHeight = Math.ceil(scope.getBoundingClientRect().height);
        if (!nextWidth || !nextHeight) return;
        if (width === nextWidth && height === nextHeight) {
          protectContent();
          return;
        }
        width = nextWidth;
        height = nextHeight;
        svg.setAttribute("viewBox", "0 0 " + width + " " + height);
        svg.style.height = height + "px";
        mask.setAttribute("width", width);
        backdrop.setAttribute("width", width);
        backdrop.setAttribute("height", height);
        let seed = 217604;
        const random = () => {
          seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
          return seed / 4294967296;
        };
        const mobile = width < 820;
        const count = mobile ? 2 : 4;
        const fragment = document.createDocumentFragment();
        const clampX = value => Math.max(5, Math.min(width - 5, value));
        const addPath = (d, thickness) => fragment.append(make("path", { d, "stroke-width": thickness.toFixed(2) }));
        const point = (x, y) => x.toFixed(1) + " " + y.toFixed(1);
        for (let i = 0; i < count; i++) {
          let x = width * (i === 0 ? .03 : i === count - 1 ? .97 : i / (count - 1));
          let y = -12;
          let d = "M" + point(x, y);
          let step = 0;
          while (y < height) {
            const span = 480 + random() * 360;
            const nextY = Math.min(height + 12, y + span);
            const nextX = clampX(x + (random() - .5) * width * .24);
            const sway = (random() - .5) * width * .18;
            d += " C" + point(clampX(x + sway), y + (nextY - y) * .32) + " " + point(clampX(nextX - sway * .4), y + (nextY - y) * .72) + " " + point(nextX, nextY);
            if (step++ % 2 === 0 && y > 0 && y < height - 120) {
              const direction = x < width * .3 ? 1 : x > width * .7 ? -1 : random() < .5 ? -1 : 1;
              const endX = clampX(x + direction * width * (.12 + random() * .12));
              const endY = Math.min(height + 12, y + 360 + random() * 440);
              const middleX = clampX(x + direction * width * .08);
              const middleY = y + (endY - y) * .45;
              addPath("M" + point(x,y) + " C" + point(x, y + 90) + " " + point(middleX,middleY - 60) + " " + point(middleX,middleY) + " S" + point(endX,endY - 110) + " " + point(endX,endY), .8);
              const forkX = clampX(middleX - direction * width * .08);
              const forkY = Math.min(height + 12, middleY + 240);
              addPath("M" + point(middleX,middleY) + " C" + point(middleX,middleY + 70) + " " + point(forkX,forkY - 70) + " " + point(forkX,forkY), .45);
            }
            x = nextX;
            y = nextY;
          }
          addPath(d, 1.45);
        }
        drawing.replaceChildren(fragment);
        protectContent();
      };
      const schedule = callback => {
        if (bgRaf) cancelAnimationFrame(bgRaf);
        bgRaf = requestAnimationFrame(() => {
          bgRaf = null;
          callback();
        });
      };
      bgResize = () => schedule(generate);
      bgScroll = () => schedule(protectContent);
      generate();
      window.addEventListener("resize", bgResize);
      window.addEventListener("scroll", bgScroll, { passive: true });
      if (window.ResizeObserver) {
        bgObserver = new ResizeObserver(bgResize);
        bgObserver.observe(scope);
      }
      document.fonts?.ready.then(bgResize);
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
      if (bgScroll) window.removeEventListener("scroll", bgScroll);
      if (bgObserver) bgObserver.disconnect();
      window.removeEventListener("resize", onResize);
      if (burger) burger.removeEventListener("click", openMenu);
      if (mClose) mClose.removeEventListener("click", closeMenu);
      mmLinks.forEach((a) => a.removeEventListener("click", closeMenu));
      if (window.ScrollTrigger)
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={SITE_HTML} />
      {formMount && createPortal(<ContactForm />, formMount)}
    </>
  );
}
