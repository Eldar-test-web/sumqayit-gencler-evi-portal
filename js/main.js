/* Əsas funksionallıq: naviqasiya, filtr, forma, qalereya, dil, reveal */
(function(){
  "use strict";
  const $ = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

  // Aktiv naviqasiya
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$("[data-nav]").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === page || (page==="" && href==="index.html")){a.classList.add("active");a.setAttribute("aria-current","page");}
  });

  // Mobil menyu
  const burger = $("#hamburger"), mnav = $("#mobileNav");
  if(burger && mnav){
    burger.addEventListener("click", ()=>{
      const open = mnav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true":"false");
    });
    mnav.addEventListener("click", e=>{ if(e.target.tagName==="A") mnav.classList.remove("open"); });
  }

  // İl
  $$("[data-year]").forEach(el=>el.textContent = new Date().getFullYear());

  // Kontakt yer tutucularını konfiqdən doldur
  try{
    if(typeof SITE_CONFIG!=="undefined"){
      $$("[data-contact-phone]").forEach(el=>el.textContent = SITE_CONFIG.institution.phone);
      $$("[data-contact-email]").forEach(el=>el.textContent = SITE_CONFIG.institution.email);
      $$("[data-contact-address]").forEach(el=>el.textContent = SITE_CONFIG.institution.address);
      $$("[data-contact-hours]").forEach(el=>el.textContent = SITE_CONFIG.institution.hours);
      $$("[data-instagram-link]").forEach(el=>el.href = SITE_CONFIG.institution.instagram);
    }
  }catch(e){}

  // Dil seçimi (AZ/EN) - yalnız hero və əsas düymələr üçün nümunə
  const langBtns = $$("[data-lang]");
  function setLang(l){
    try{ localStorage.setItem("sge-lang", l); }catch(e){}
    langBtns.forEach(b=>b.setAttribute("aria-pressed", b.dataset.lang===l ? "true":"false"));
    if(typeof I18N!=="undefined" && I18N[l]){
      const d = I18N[l];
      $$("[data-i18n-register]").forEach(el=>el.textContent=d.register);
      const ht=$("[data-i18n-hero-title]"); if(ht) ht.textContent=d.heroTitle;
      const hs=$("[data-i18n-hero-sub]"); if(hs) hs.textContent=d.heroSub;
      const va=$("[data-i18n-view]"); if(va) va.textContent=d.viewActivities;
    }
    document.documentElement.lang = l==="en" ? "en" : "az";
  }
  langBtns.forEach(b=>b.addEventListener("click", ()=>setLang(b.dataset.lang)));
  try{ setLang(localStorage.getItem("sge-lang")||"az"); }catch(e){ setLang("az"); }

  // Kateqoriya filtri (data-filter-buttons + data-category)
  $$("[data-filter-group]").forEach(group=>{
    const btns = $$("button", group);
    const targetSel = group.getAttribute("data-filter-group");
    const items = $$(targetSel);
    btns.forEach(btn=>btn.addEventListener("click", ()=>{
      btns.forEach(b=>b.setAttribute("aria-pressed","false"));
      btn.setAttribute("aria-pressed","true");
      const f = btn.dataset.filter;
      items.forEach(it=>{
        const cat = (it.dataset.category||"").toLowerCase();
        const show = f==="all" || cat.includes(f.toLowerCase());
        it.style.display = show ? "" : "none";
      });
    }));
  });

  // Axtarış (data-search-input -> data-search-target)
  $$("[data-search-input]").forEach(input=>{
    input.addEventListener("input", ()=>{
      const q = input.value.toLowerCase().trim();
      const items = $$(input.getAttribute("data-search-input"));
      items.forEach(it=>{
        const text = it.textContent.toLowerCase();
        it.style.display = !q || text.includes(q) ? "" : "none";
      });
    });
  });

  // Scroll reveal
  const io = ("IntersectionObserver" in window) ? new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("visible"); io.unobserve(en.target);} });
  },{threshold:.12}) : null;
  $$(".reveal").forEach(el=>{ if(io) io.observe(el); else el.classList.add("visible"); });

  // Qalereya modal
  const modal = $("#lightbox");
  if(modal){
    const mImg = $("#lightboxImg"), mCap = $("#lightboxCap");
    document.addEventListener("click", e=>{
      const fig = e.target.closest("[data-lightbox]");
      if(fig){
        const img = $("img", fig);
        if(img){ mImg.src = img.src; mImg.alt = img.alt; }
        mCap.textContent = $("figcaption", fig)?.textContent || img?.alt || "";
        modal.classList.add("open");
        modal.setAttribute("aria-hidden","false");
      }
      if(e.target.closest("[data-close-modal]") || e.target===modal){
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden","true");
      }
    });
    document.addEventListener("keydown", e=>{
      if(e.key==="Escape"){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }
    });
  }

  // Formalar: validasiya + uğur vəziyyəti (şəxsi məlumat localStorage-da saxlanılmır)
  $$("form[data-validate]").forEach(form=>{
    form.addEventListener("submit", e=>{
      e.preventDefault();
      let valid = true;
      $$("[required]", form).forEach(inp=>{
        const wrap = inp.closest(".field");
        let ok = true;
        if(inp.type==="checkbox"){ ok = inp.checked; }
        else if(inp.type==="email"){ ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim()); }
        else { ok = inp.value.trim().length > 1; if(inp.name==="phone"){ ok = inp.value.replace(/\D/g,"").length >= 9; } }
        if(wrap) wrap.classList.toggle("invalid", !ok);
        inp.setAttribute("aria-invalid", !ok ? "true":"false");
        if(!ok) valid = false;
      });
      const consent = $("[data-consent]", form);
      if(consent && !consent.checked){
        valid = false;
        consent.closest(".field")?.classList.add("invalid");
      }
      if(!valid){
        $(".notice", form)?.focus?.();
        return;
      }
      // Uğur: formanı gizlət, təsdiq qutusunu göstər, məlumatı ifşa etmə
      form.style.display = "none";
      const succId = form.getAttribute("data-success");
      const succ = succId ? document.getElementById(succId) : $(".success-box");
      if(succ){ succ.classList.add("show"); succ.setAttribute("tabindex","-1"); succ.focus?.(); succ.scrollIntoView({behavior:"smooth",block:"center"}); }
    });
    // Canlı xəta təmizləmə
    form.addEventListener("input", e=>{
      const f = e.target.closest(".field");
      if(f) f.classList.remove("invalid");
    });
  });

  // Admin demo cədvəl axtarışı
  const adminSearch = $("#adminSearch");
  if(adminSearch){
    adminSearch.addEventListener("input", ()=>{
      const q = adminSearch.value.toLowerCase();
      $$("#adminTable tbody tr").forEach(tr=>{
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }
})();

