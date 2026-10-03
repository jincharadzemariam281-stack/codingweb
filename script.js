/**
 * DevStart — Advanced Interactions & Studio Runtime (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. KINETIC WORDS PRELOADER WITH PERCENTAGE EASING
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const wordsContainer = document.getElementById('wordsContainer');
  const words = wordsContainer ? wordsContainer.querySelectorAll('.word') : [];
  const preloaderFill = document.getElementById('preloaderFill');
  const preloaderCount = document.getElementById('preloaderCount');
  const preloaderStatus = document.getElementById('preloaderStatus');
  const skipBtn = document.getElementById('skipPreloader');

  let wordIndex = 0;
  let wordTimer = null;
  let progress = 0;
  let progressTimer = null;

  const statusMessages = [
    "გარემოს ინიციალიზაცია...",
    "სასწავლო მოდულების ჩატვირთვა...",
    "ინტერაქტიული სტუდიის მომზადება...",
    "კოდის გარემო მზადაა!"
  ];

  function rotateWord() {
    if (!words.length) return;
    words[wordIndex].classList.remove('active');
    words[wordIndex].classList.add('exit');

    const prevIndex = wordIndex;
    setTimeout(() => {
      if (words[prevIndex]) words[prevIndex].classList.remove('exit');
    }, 450);

    wordIndex = (wordIndex + 1) % words.length;
    words[wordIndex].classList.add('active');
  }

  function terminatePreloader() {
    clearInterval(wordTimer);
    clearInterval(progressTimer);
    if (preloader) {
      preloader.classList.add('fade-out');
      preloader.setAttribute('aria-hidden', 'true');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }
  }

  if (words.length > 1) {
    wordTimer = setInterval(rotateWord, 650);
  }

  if (preloaderFill && preloaderCount) {
    progressTimer = setInterval(() => {
      // Smooth non-linear increment
      const increment = Math.max(1, Math.floor((100 - progress) / 8) + 1);
      progress = Math.min(100, progress + increment);

      preloaderFill.style.width = `${progress}%`;
      preloaderCount.textContent = `${progress < 10 ? '0' : ''}${progress}%`;

      if (progress > 25 && progress <= 60 && preloaderStatus) {
        preloaderStatus.textContent = statusMessages[1];
      } else if (progress > 60 && progress < 95 && preloaderStatus) {
        preloaderStatus.textContent = statusMessages[2];
      } else if (progress >= 95 && preloaderStatus) {
        preloaderStatus.textContent = statusMessages[3];
      }

      if (progress >= 100) {
        clearInterval(progressTimer);
        setTimeout(terminatePreloader, 350);
      }
    }, 55);
  } else {
    setTimeout(terminatePreloader, 1500);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', terminatePreloader);
  }


  /* ==========================================================================
     2. MOUSE SPOTLIGHT TRACKER ON CARDS (Awwwards / Linear Style)
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });


  /* ==========================================================================
     3. SVG SCROLL FOLLOWER TRAIL & RADIAL BACK-TO-TOP BUTTON
     ========================================================================== */
  const scrollTrail = document.getElementById('svgScrollTrail');
  const scrollBead = document.getElementById('scrollBead');
  const trackerBadge = document.getElementById('trackerBadge');
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTop');
  const ringProgress = document.getElementById('ringProgress');

  const trailLength = 400;
  const ringCircumference = 2 * Math.PI * 19; // ~119.38px

  if (scrollTrail) {
    scrollTrail.style.strokeDasharray = trailLength;
    scrollTrail.style.strokeDashoffset = trailLength;
  }

  if (ringProgress) {
    ringProgress.style.strokeDasharray = ringCircumference;
    ringProgress.style.strokeDashoffset = ringCircumference;
  }

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const ratio = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
    const percent = Math.round(ratio * 100);

    // Update SVG Scroll Trail HUD
    if (scrollTrail) {
      scrollTrail.style.strokeDashoffset = trailLength * (1 - ratio);
    }

    if (scrollBead) {
      // Path spans y:12 to y:348
      const beadY = 12 + (336 * ratio);
      scrollBead.setAttribute('cy', beadY);
    }

    if (trackerBadge) {
      trackerBadge.textContent = `${percent}%`;
    }

    // Header Blur Effect
    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Radial Back To Top Button
    if (backToTopBtn && ringProgress) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('show');
        const offset = ringCircumference - (ratio * ringCircumference);
        ringProgress.style.strokeDashoffset = offset;
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ==========================================================================
     4. HERO INTERACTIVE CODE STUDIO (MULTI-SNIPPET & RUNNER)
     ========================================================================== */
  const runStudioCode = document.getElementById('runStudioCode');
  const studioCodeBox = document.getElementById('studioCodeBox');
  const studioTerminal = document.getElementById('studioTerminal');
  const tabJs = document.getElementById('tabJs');
  const tabHtml = document.getElementById('tabHtml');

  const snippets = {
    js: `<span class="c-comment">// 1. შევქმნათ მოსწავლის ობიექტი</span>
<span class="c-keyword">const</span> <span class="c-var">learner</span> = {
  <span class="c-prop">name</span>: <span class="c-str">"დამწყები დეველოპერი"</span>,
  <span class="c-prop">isReady</span>: <span class="c-bool">true</span>,
  <span class="c-prop">goal</span>: <span class="c-str">"პირველი ვებსაიტი"</span>
};

<span class="c-keyword">function</span> <span class="c-fn">buildProject</span>(<span class="c-param">user</span>) {
  <span class="c-keyword">return</span> <span class="c-str">\`🎉 \${user.name}: პირველი კოდი წარმატებით გაეშვა!\`</span>;
}

<span class="c-fn">console</span>.<span class="c-fn">log</span>(<span class="c-fn">buildProject</span>(learner));`,

    html: `<span class="c-comment">&lt;!-- 1. თანამედროვე HTML5 ბარათი --&gt;</span>
<span class="c-keyword">&lt;div</span> <span class="c-prop">class</span>=<span class="c-str">"hero-card"</span><span class="c-keyword">&gt;</span>
  <span class="c-keyword">&lt;h2&gt;</span>გამარჯობა, სამყარო!<span class="c-keyword">&lt;/h2&gt;</span>
  <span class="c-keyword">&lt;p&gt;</span>მე ვქმნი ჩემს პირველ ვებსაიტს.<span class="c-keyword">&lt;/p&gt;</span>
  <span class="c-keyword">&lt;button</span> <span class="c-prop">class</span>=<span class="c-str">"btn-start"</span><span class="c-keyword">&gt;</span>შესვლა<span class="c-keyword">&lt;/button&gt;</span>
<span class="c-keyword">&lt;/div&gt;</span>`
  };

  let activeLang = 'js';

  if (tabJs && tabHtml && studioCodeBox) {
    tabJs.addEventListener('click', () => {
      activeLang = 'js';
      tabJs.classList.add('active');
      tabHtml.classList.remove('active');
      studioCodeBox.innerHTML = snippets.js;
      if (studioTerminal) {
        studioTerminal.innerHTML = `<div class="term-line prompt"><span class="term-arrow">&gt;</span> გადართულია JavaScript რეჟიმზე. დააჭირე „გაშვებას“...</div>`;
      }
    });

    tabHtml.addEventListener('click', () => {
      activeLang = 'html';
      tabHtml.classList.add('active');
      tabJs.classList.remove('active');
      studioCodeBox.innerHTML = snippets.html;
      if (studioTerminal) {
        studioTerminal.innerHTML = `<div class="term-line prompt"><span class="term-arrow">&gt;</span> გადართულია HTML5/CSS რეჟიმზე. დააჭირე „გაშვებას“...</div>`;
      }
    });
  }

  let isExecuting = false;

  if (runStudioCode && studioTerminal) {
    runStudioCode.addEventListener('click', () => {
      if (isExecuting) return;
      isExecuting = true;

      runStudioCode.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2 A10 10 0 0 1 22 12"></path>
        </svg>
        <span>მუშავდება...</span>
      `;

      studioTerminal.innerHTML = `
        <div class="term-line" style="color: #D8A2A2;"><span class="term-arrow">&gt;</span> კომპილაცია და გაშვება Cloud Sandbox-ში...</div>
      `;

      setTimeout(() => {
        if (activeLang === 'js') {
          studioTerminal.innerHTML = `
            <div class="term-line" style="color: #8EA66B; font-weight: 700;">&gt; [OK 200] Code evaluated successfully (0 errors):</div>
            <div class="term-line" style="color: #FFF9D6; padding-left: 12px; border-left: 2px solid #8EA66B; margin: 4px 0;">
              "🎉 დამწყები დეველოპერი: პირველი კოდი წარმატებით გაეშვა!"
            </div>
            <div class="term-line" style="color: #6C7D65; font-size: 0.72rem;">V8 Engine • Memory: 1.2 MB • Execution: 9ms</div>
          `;
        } else {
          studioTerminal.innerHTML = `
            <div class="term-line" style="color: #8EA66B; font-weight: 700;">&gt; [DOM RENDERED] HTML5 სტრუქტურა ვალიდურია:</div>
            <div class="term-line" style="color: #FFF9D6; padding-left: 12px; border-left: 2px solid #8EA66B; margin: 4px 0;">
              &lt;div.hero-card&gt; დახატულია ეკრანზე წარმატებით! ✨
            </div>
            <div class="term-line" style="color: #6C7D65; font-size: 0.72rem;">CSS Flexbox / Box Model OK • W3C Standard 100%</div>
          `;
        }

        runStudioCode.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>შესრულდა</span>
        `;

        setTimeout(() => {
          runStudioCode.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>თავიდან გაშვება</span>
          `;
          isExecuting = false;
        }, 1600);
      }, 550);
    });
  }


  /* ==========================================================================
     5. MOBILE DRAWER NAVIGATION
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    const drawerLinks = mobileDrawer.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ==========================================================================
     6. CONTACT FORM VALIDATION & CELEBRATION TOAST
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const fullName = document.getElementById('fullName');
  const emailAddr = document.getElementById('emailAddr');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const submitButton = document.getElementById('submitButton');
  const feedbackToast = document.getElementById('feedbackToast');

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Full Name Validation
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        fullName.classList.add('has-error');
        nameError.classList.add('show');
        hasError = true;
      } else {
        fullName.classList.remove('has-error');
        nameError.classList.remove('show');
      }

      // Email Validation
      if (!emailAddr.value.trim() || !isValidEmail(emailAddr.value.trim())) {
        emailAddr.classList.add('has-error');
        emailError.classList.add('show');
        hasError = true;
      } else {
        emailAddr.classList.remove('has-error');
        emailError.classList.remove('show');
      }

      if (hasError) return;

      // Animated Submission State
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = `<span>მუშავდება...</span>`;
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        contactForm.reset();

        if (feedbackToast) {
          feedbackToast.classList.add('show');
          feedbackToast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            feedbackToast.classList.remove('show');
          }, 6500);
        }
      }, 550);
    });

    fullName.addEventListener('input', () => {
      if (fullName.value.trim().length >= 2) {
        fullName.classList.remove('has-error');
        nameError.classList.remove('show');
      }
    });

    emailAddr.addEventListener('input', () => {
      if (isValidEmail(emailAddr.value.trim())) {
        emailAddr.classList.remove('has-error');
        emailError.classList.remove('show');
      }
    });
  }

});
