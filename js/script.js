// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: fundo ao rolar
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

// Menu mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Seção ativa no menu
const sections = ['top', 'sobre', 'stack', 'projetos', 'experiencia', 'github', 'contato']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navByHref = new Map();
navLinks.querySelectorAll('a').forEach(a => navByHref.set(a.getAttribute('href'), a));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const link = navByHref.get(`#${entry.target.id}`);
    if (!link) return;
    navLinks.querySelectorAll('.nav__link').forEach(l => l.classList.remove('is-active'));
    link.classList.add('is-active');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// Contador animado
const counters = document.querySelectorAll('.stats__num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1000;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => countObserver.observe(el));

// Projetos em destaque (os mesmos da seção Projetos)
const FEATURED_PROJECTS = [
  { name: 'Conciliador de Estoque', url: 'https://github.com/matheus-marques-dev/Action-Conciliador-De-Estoque' },
  { name: 'QuickBill', url: 'https://github.com/matheus-marques-dev/QuickBill' },
  { name: 'Sistema Bancário Java', url: 'https://github.com/matheus-marques-dev/SistemaBancarioJava' },
  { name: 'Catálogo de Filmes', url: 'https://github.com/matheus-marques-dev/CatalogoFilmes' },
];

const featuredBlock = `
  <div class="github__block">
    <span class="github__block-title">Projetos em destaque</span>
    <ul class="github__recent">${FEATURED_PROJECTS.map(p => `<li><a href="${p.url}" target="_blank" rel="noopener">${p.name}</a></li>`).join('')}</ul>
  </div>`;

// GitHub: dados públicos com fallback gracioso
async function loadGithubStats() {
  const panel = document.getElementById('githubPanel');
  const username = 'matheus-marques-dev';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { signal: controller.signal }),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API indisponível');

    const user = await userRes.json();
    const repos = await reposRes.json();

    const langCount = new Map();
    repos.filter(r => !r.fork && r.language).forEach(r => {
      langCount.set(r.language, (langCount.get(r.language) || 0) + 1);
    });
    const topLanguages = [...langCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([l]) => l);

    panel.innerHTML = `
      <div class="github__stat-row">
        <div><span class="github__stat-value">${user.public_repos}</span><span class="github__stat-label">Repositórios públicos</span></div>
        <div><span class="github__stat-value">${user.followers}</span><span class="github__stat-label">Seguidores</span></div>
      </div>
      ${topLanguages.length ? `
      <div class="github__block">
        <span class="github__block-title">Linguagens mais usadas</span>
        <ul class="github__chips">${topLanguages.map(l => `<li>${l}</li>`).join('')}</ul>
      </div>` : ''}
      ${featuredBlock}
    `;
  } catch (err) {
    panel.innerHTML = `
      <p class="github__fallback">Não consegui carregar os dados em tempo real agora — mas os repositórios estão todos lá.</p>
      ${featuredBlock}
    `;
  } finally {
    clearTimeout(timeout);
  }
}
loadGithubStats();
