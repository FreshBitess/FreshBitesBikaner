/* ============================================
   FRESH BITES — INTERACTIVE MAGIC ✨
   ============================================ */

// ---- Menu is loaded from menu.json (edit that file to update the weekly menu!) ----
let menuItems = [];   // populated from menu.json
let menuWeekLabel = "This Week's Menu";

// ---- Data: Testimonials ----
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fitness Enthusiast",
    initials: "PS",
    stars: 5,
    text: "I never thought I'd crave salad in Bikaner, but here we are! The Sprout Salad is my post-workout go-to. So much protein and flavour in one bowl! 🔥"
  },
  {
    name: "Rahul Joshi",
    role: "College Student",
    initials: "RJ",
    stars: 5,
    text: "Pocket-friendly and so filling! The Sweet Corn Salad with that spicy coriander sauce? Absolute fire combo. 10/10 would recommend."
  },
  {
    name: "Anjali Rathore",
    role: "Working Professional",
    initials: "AR",
    stars: 5,
    text: "Finally, a healthy food option in Bikaner that doesn't taste like cardboard. The beetroot sauce is addictive and the portions are generous! 💚"
  },
  {
    name: "Vikram Singh",
    role: "Food Blogger",
    initials: "VS",
    stars: 5,
    text: "Reviewed hundreds of places. Fresh Bites is doing something truly unique for Bikaner. Their sauces alone are worth the trip — sweet beetroot and spicy coriander. Mind = blown."
  },
  {
    name: "Meera Kanwar",
    role: "Yoga Instructor",
    initials: "MK",
    stars: 5,
    text: "My go-to post-practice meal! The Hibiscus Cooler is unlike anything I've had. So refreshing and beautiful. Love the positive energy of this place ✨"
  },
  {
    name: "Deepak Patel",
    role: "Regular Customer",
    initials: "DP",
    stars: 5,
    text: "Came for the curiosity, stayed for the taste. My whole family is hooked now. Even my 8-year-old asks for 'the salad place near Bhraman Path' every weekend! 😄"
  }
];

// ---- Data: FAQs ----
const faqs = [
  {
    question: "Wait, salads? In Bikaner? For real?",
    answer: "For real! We know Bikaner is famous for its namkeen and sweets, but we believe everyone deserves fresh, exciting, healthy food options too. And trust us — once you try our bowls, you'll understand why the city is going crazy for them. 🥗"
  },
  {
    question: "Are all your salads vegetarian?",
    answer: "Yes! All our bowls are 100% vegetarian. We focus on fresh veggies, paneer, legumes, nuts, and fruits to create protein-packed, flavour-rich salads that satisfy every craving."
  },
  {
    question: "How fresh are your ingredients?",
    answer: "Farm-to-bowl fresh! We source our vegetables and fruits daily from local markets. No cold storage, no week-old lettuce. Every ingredient you eat was probably still in the soil yesterday. 🌱"
  },
  {
    question: "Can I customize my bowl?",
    answer: "Absolutely! We love when customers get creative. Want extra paneer? More crunch? A different dressing? Just ask! Your bowl, your rules."
  },
  {
    question: "Do you offer delivery?",
    answer: "We're expanding! Currently, the best way to enjoy Fresh Bites is to visit us in person. But follow us on Instagram @freshbitesbikaner for delivery updates — it's coming soon!"
  },
  {
    question: "What's your most popular item?",
    answer: "The Sprout Salad is the crowd favourite — packed with protein and that chaat masala kick! The Sweet Corn Salad is a close second. And you HAVE to try both our sauces. The sweet beetroot and spicy coriander combo is legendary."
  },
  {
    question: "Are your salads filling enough for a meal?",
    answer: "Absolutely! Our bowls are generously portioned and loaded with fresh ingredients. Pair it with a Hibiscus Cooler and you've got yourself a complete, satisfying meal! 💪"
  }
];


// ============================================
//  INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initMenuSection();
  initTestimonials();
  initFAQ();
  initCountUp();
  initScrollToTop();
  initSmoothScrollLinks();
  initParallaxHero();
});


// ---- Preloader ----
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 800);
  });
  // Fallback: hide after 3s no matter what
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 3000);
}


// ---- Navbar ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Background on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    lastScroll = scrollY;
  }, { passive: true });
}


// ---- Mobile Menu ----
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}


// ---- Scroll Reveal ----
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// ---- Menu Section (loads from menu.json) ----
async function initMenuSection() {
  const grid = document.getElementById('menu-grid');
  const tabs = document.getElementById('menu-tabs');

  try {
    const response = await fetch('menu.json');
    const data = await response.json();

    // Store the week label
    menuWeekLabel = data.week_label || "This Week's Menu";

    // Merge all categories into a flat list with a 'category' field
    menuItems = [];
    const categoryMap = {
      salads: { label: '🥗 Salads', key: 'salad' },
      drinks: { label: '🥤 Drinks', key: 'drink' },
      sauces: { label: '🫙 Sauces', key: 'sauce' }
    };

    for (const [section, meta] of Object.entries(categoryMap)) {
      if (data[section] && data[section].length > 0) {
        data[section].forEach(item => {
          menuItems.push({ ...item, category: meta.key });
        });
      }
    }

    // Build tabs dynamically
    const activeCats = [];
    for (const [section, meta] of Object.entries(categoryMap)) {
      if (data[section] && data[section].length > 0) {
        activeCats.push(meta);
      }
    }

    let tabsHTML = `<button class="menu-tab active" data-filter="all">All Items</button>`;
    activeCats.forEach(cat => {
      tabsHTML += `<button class="menu-tab" data-filter="${cat.key}">${cat.label}</button>`;
    });
    tabs.innerHTML = tabsHTML;

    // Update the week label in the section header if present
    const weekLabel = document.getElementById('menu-week-label');
    if (weekLabel) weekLabel.textContent = menuWeekLabel;

  } catch (err) {
    console.warn('Could not load menu.json, using fallback:', err);
    // If fetch fails (e.g. file:// protocol), show a friendly message
    grid.innerHTML = `
      <div style="text-align:center; padding:3rem; grid-column: 1/-1;">
        <p style="font-size:1.2rem; color: var(--text-secondary);">🥗 Menu loads from <code>menu.json</code></p>
        <p style="margin-top:0.5rem; color: var(--text-secondary);">Serve this site via a web server or GitHub Pages to see the menu!</p>
      </div>
    `;
    return;
  }

  // Render all items
  renderMenuItems('all');

  // Tab click handlers
  tabs.addEventListener('click', (e) => {
    if (!e.target.classList.contains('menu-tab')) return;

    tabs.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');

    const filter = e.target.dataset.filter;
    renderMenuItems(filter);
  });
}

function renderMenuItems(filter) {
  const grid = document.getElementById('menu-grid');
  const filtered = filter === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === filter);

  // Fade out
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(20px)';

  setTimeout(() => {
    grid.innerHTML = filtered.map((item, i) => `
      <div class="menu-card" style="animation-delay: ${i * 100}ms">
        <div class="menu-card-image-wrapper">
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
          <img src="${item.image}" alt="${item.name}" class="menu-card-image" loading="lazy">
        </div>
        <div class="menu-card-body">
          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">${item.price}</span>
            <div class="menu-card-tags">
              ${item.tags.map(tag => `<span class="menu-tag ${tag}">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Fade in
    requestAnimationFrame(() => {
      grid.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    });
  }, 300);
}


// ---- Testimonials ----
function initTestimonials() {
  const carousel = document.getElementById('testimonials-carousel');

  carousel.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Auto-scroll
  let scrollInterval;
  const startAutoScroll = () => {
    scrollInterval = setInterval(() => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (carousel.scrollLeft >= maxScroll - 10) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: 380, behavior: 'smooth' });
      }
    }, 4000);
  };

  startAutoScroll();

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  carousel.addEventListener('mouseleave', startAutoScroll);
}


// ---- FAQ ----
function initFAQ() {
  const grid = document.getElementById('faq-grid');

  grid.innerHTML = faqs.map((faq, i) => `
    <div class="faq-item reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ''}" id="faq-item-${i}">
      <button class="faq-question" onclick="toggleFAQ(${i})" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${faq.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}" role="region">
        <div class="faq-answer-inner">${faq.answer}</div>
      </div>
    </div>
  `).join('');

  // Re-observe new reveal elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-item-${index}`);
  const answer = document.getElementById(`faq-answer-${index}`);
  const btn = item.querySelector('.faq-question');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-answer').style.maxHeight = null;
    el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });

  // Open clicked (if it wasn't already open)
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    btn.setAttribute('aria-expanded', 'true');
  }
}


// ---- Count Up Animation ----
function initCountUp() {
  const counters = document.querySelectorAll('.count-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, target) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


// ---- Scroll to Top ----
function initScrollToTop() {
  const btn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ---- Smooth Scroll for Anchor Links ----
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


// ---- Parallax Hero ----
function initParallaxHero() {
  const heroVisual = document.querySelector('.hero-visual');
  const floats = document.querySelectorAll('.hero-float');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          const parallaxAmount = scrollY * 0.15;
          if (heroVisual) {
            heroVisual.style.transform = `translateY(${parallaxAmount}px)`;
          }
          floats.forEach((float, i) => {
            const speed = 0.1 + (i * 0.05);
            float.style.transform = `translateY(${scrollY * speed}px)`;
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mouse move parallax on hero image (desktop only)
  if (window.innerWidth > 768) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const bowl = document.getElementById('hero-bowl');
      if (bowl) {
        bowl.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
      }

      floats.forEach((float, i) => {
        const intensity = 20 + (i * 10);
        float.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
      });
    });
  }
}


// ---- Newsletter Form ----
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email');
  const btn = e.target.querySelector('button');

  btn.textContent = '✓ Done!';
  btn.style.background = 'var(--green-500)';
  email.value = '';

  setTimeout(() => {
    btn.textContent = 'Join';
    btn.style.background = '';
  }, 3000);
}


// ---- Easter Egg: Konami Code for salad rain ----
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      saladRain();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function saladRain() {
  const emojis = ['🥗', '🥬', '🍅', '🥕', '🥒', '🫒', '🧀', '🥑', '🌽', '🫑'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * 100}vw;
        font-size: ${1.5 + Math.random() * 2}rem;
        z-index: 10001;
        pointer-events: none;
        animation: salad-fall ${3 + Math.random() * 3}s linear forwards;
      `;
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 6000);
    }, i * 80);
  }

  // Add keyframe if not exists
  if (!document.getElementById('salad-rain-style')) {
    const style = document.createElement('style');
    style.id = 'salad-rain-style';
    style.textContent = `
      @keyframes salad-fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}
