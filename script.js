// ==========================================
// MENU MOBILE
// ==========================================

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-drawer');
const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 36);
  }, { passive: true });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-drawer a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// ==========================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ==========================================

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
  });
}


// ==========================================
// TROCA DE IDIOMA FR / EN
// ==========================================

const languageToggle = document.querySelector('.lang-toggle');

const languageContent = [
  ['.nav-drawer a:nth-child(1)', 'Le lieu', 'The place'],
  ['.nav-drawer a:nth-child(2)', 'Nos promesses', 'Our promises'],
  ['.nav-drawer a:nth-child(3)', 'Le midi', 'Lunch'],
  ['.nav-drawer a:nth-child(4)', 'Galerie', 'Gallery'],
  ['.nav-book', 'Nous appeler <span>↗</span>', 'Call us <span>↗</span>'],
  ['.hero .eyebrow', 'La cantine du rond-point', 'La Cantine du Rond-Point'],
  ['.hero h1', 'Le spectacle<br><em>continue</em><br>au comptoir.', 'The show<br><em>goes on</em><br>at the bar.'],
  ['.hero .button', 'Venir au comptoir <span>↗</span>', 'Come to the bar <span>↗</span>'],
  ['#lieu .eyebrow', 'Un lieu convivial', 'A welcoming place'],
  ['#lieu h2', 'Au coeur<br><em>du théâtre.</em>', 'At the heart<br><em>of theatre.</em>'],
  ['#reserver h2', 'Bienvenue<br><em>au comptoir.</em>', 'Welcome<br><em>at the bar.</em>'],
  ['#promesses h2', 'Trois bonnes<br><em>raisons de rester.</em>', 'Three good<br><em>reasons to stay.</em>'],
  ['#midi h2', 'À table<br><em>en vitesse.</em>', 'Quick<br><em>lunch.</em>'],
  ['#galerie .script-line', 'Le spectacle continue !', 'The show goes on!'],
  ['.footer-brand h2', 'La cantine<br><em>du rond point.</em>', 'La Cantine<br><em>at the roundabout.</em>']
];

let currentLanguage = 'fr';

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';

    languageContent.forEach(([selector, french, english]) => {
      const element = document.querySelector(selector);

      if (element) {
        element.innerHTML = currentLanguage === 'fr' ? french : english;
      }
    });

    languageToggle.textContent = currentLanguage === 'fr' ? 'EN' : 'FR';

    languageToggle.setAttribute(
      'aria-label',
      currentLanguage === 'fr'
        ? 'Passer en anglais'
        : 'Switch to French'
    );

    document.documentElement.lang = currentLanguage;
  });
}


// ==========================================
// CONNEXÃO COM A API FLASK - INSTAGRAM
// ==========================================

async function loadInstagram() {
  try {
    const response = await fetch(
      'http://127.0.0.1:5000/api/instagram'
    );

    if (!response.ok) {
      throw new Error('Erro ao conectar com a API Flask');
    }

    const publications = await response.json();

    console.log('Publicações recebidas da API:', publications);

    const container = document.getElementById('instagram-posts');

    if (!container) {
      console.warn(
        'A API funcionou, mas não encontrei #instagram-posts no HTML.'
      );
      return;
    }

    container.innerHTML = '';

    publications.forEach((post) => {
      const article = document.createElement('article');
      article.classList.add('instagram-post');

      const title = document.createElement('h3');
      title.textContent = post.type;

      const caption = document.createElement('p');
      caption.textContent = post.caption;

      article.appendChild(title);
      article.appendChild(caption);

      container.appendChild(article);
    });

    console.log('Publicações exibidas no site!');

  } catch (error) {
    console.error('Erro ao carregar Instagram:', error);
  }
}

loadInstagram();
// ==========================================
// NEWSLETTER - FLASK
// ==========================================


// NEWSLETTER - DEMONSTRAÇÃO

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('newsletter-email').value.trim();
        const message = document.getElementById('newsletter-message');
        const button = newsletterForm.querySelector('button');

        button.disabled = true;
        message.textContent = "Inscription en cours...";

        try {
            const response = await fetch('http://127.0.0.1:5000/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Une erreur est survenue.");
            }

            message.textContent = "Merci ! Votre inscription a bien été prise en compte.";
            newsletterForm.reset();

        } catch (error) {
            console.error("Erreur newsletter :", error);
            message.textContent = "Inscription de démonstration indisponible. Réessayez.";

        } finally {
            button.disabled = false;
            
        }
    });
}
