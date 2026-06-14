/* ============================================
   GVMC Smart Ward Portal - Shared Utilities
   js/main.js
   ============================================ */

// ---- Navbar Toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => navLinks?.classList.remove('open'))
  );

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.background = window.scrollY > 50
        ? 'rgba(11,15,30,0.97)'
        : 'rgba(11,15,30,0.85)';
    }
  });

  // Mark active nav link
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Animate counters on scroll
  initCounterAnimation();

  // Init tabs if present
  initTabs();
});

// ---- Counter Animation ----
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = '1';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = el.dataset.decimal === 'true';
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = target * ease;
    el.textContent = prefix + (isDecimal ? value.toFixed(2) : Math.floor(value).toLocaleString('en-IN')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ---- Tabs ----
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group  = btn.dataset.tab;
      const target = btn.dataset.target;

      // Deactivate all in group
      document.querySelectorAll(`.tab-btn[data-tab="${group}"]`).forEach(b => b.classList.remove('active'));
      document.querySelectorAll(`.tab-pane[data-tab="${group}"]`).forEach(p => p.classList.remove('active'));

      // Activate clicked
      btn.classList.add('active');
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
    });
  });
}

// ---- Toast Notifications ----
function showToast(message, type = 'info', duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span style="flex:1;font-size:0.87rem">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ---- Modal ----
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ---- Get URL Param ----
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---- Format numbers Indian style ----
function formatIndian(n) {
  if (!n) return '0';
  return parseInt(n).toLocaleString('en-IN');
}

// ---- Sustainability label ----
function getSustainabilityLabel(score) {
  if (score >= 85) return { label: 'Excellent', color: '#10b981' };
  if (score >= 70) return { label: 'Good', color: '#3b82f6' };
  if (score >= 55) return { label: 'Average', color: '#f59e0b' };
  return { label: 'Needs Improvement', color: '#ef4444' };
}

// ---- Chart default options (dark theme) ----
const CHART_DEFAULTS = {
  color: '#94a3b8',
  borderColor: 'rgba(255,255,255,0.08)',
  font: { family: 'Inter', size: 11 }
};

function darkChartOptions(extras = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
      },
      tooltip: {
        backgroundColor: 'rgba(19,24,41,0.95)',
        borderColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        ...((extras.tooltip) || {})
      }
    },
    scales: {
      x: {
        ticks: { color: '#64748b', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#64748b', font: { size: 10 } },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      ...((extras.scales) || {})
    },
    ...extras
  };
}

// ---- Generate complaint ID ----
function generateId(prefix = 'GVMC') {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
}

// ---- Sample data generators ----
const COMPLAINT_CATEGORIES = ['Garbage Issue', 'Water Leakage', 'Road Damage', 'Streetlight Failure', 'Drainage Issue'];
const COMPLAINT_STATUSES   = ['Pending', 'In Progress', 'Resolved'];
const PROJECT_TYPES        = ['Road Construction', 'Drainage Repair', 'Park Development', 'Water Pipeline', 'Street Lighting'];

function sampleComplaints(count = 5) {
  return Array.from({ length: count }, (_, i) => ({
    id: generateId(),
    category: COMPLAINT_CATEGORIES[i % COMPLAINT_CATEGORIES.length],
    ward: Math.floor(Math.random() * 72) + 1,
    date: new Date(Date.now() - Math.random() * 30 * 86400000).toLocaleDateString('en-IN'),
    status: COMPLAINT_STATUSES[Math.floor(Math.random() * 3)],
    desc: 'Reported issue requires immediate attention.'
  }));
}

function sampleProjects(count = 5) {
  return Array.from({ length: count }, (_, i) => ({
    title: PROJECT_TYPES[i % PROJECT_TYPES.length],
    ward: Math.floor(Math.random() * 72) + 1,
    progress: [0, 25, 50, 75, 100][Math.floor(Math.random() * 5)],
    status: ['Planning', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)]
  }));
}

// ---- Officer Auth ----
function requireOfficerAuth() {
  const officer = localStorage.getItem('gvmc_officer');
  if (!officer) {
    window.location.href = 'officer-login.html';
    return null;
  }
  return JSON.parse(officer);
}

function logoutOfficer() {
  localStorage.removeItem('gvmc_officer');
  localStorage.removeItem('gvmc_officer_logged_in');
  localStorage.removeItem('gvmc_officer_role');
  localStorage.removeItem('gvmc_officer_name');
  localStorage.removeItem('gvmc_officer_login_time');
  window.location.href = 'index.html';
}

// ---- Login Modal Handlers ----
function openLoginModal() {
  const m = document.getElementById('loginModal');
  if (m) m.classList.add('open');
}

function closeLoginModal() {
  const m = document.getElementById('loginModal');
  if (m) m.classList.remove('open');
}

function toggleModalPwd() {
  const inp = document.getElementById('modalPasswordInput');
  const tog = document.getElementById('modalPwdToggle');
  if (inp && tog) {
    if (inp.type === 'password') {
      inp.type = 'text';
      tog.textContent = '🙈';
    } else {
      inp.type = 'password';
      tog.textContent = '👁️';
    }
  }
}

function autofillModal() {
  const role = document.getElementById('modalRoleSelect');
  const user = document.getElementById('modalUsernameInput');
  const pass = document.getElementById('modalPasswordInput');
  if (role && user && pass) {
    user.value = 'admin';
    pass.value = 'admin123';
    role.value = 'Admin';
    showToast('Demo credentials filled!', 'info');
  }
}

function handleModalLogin(e) {
  e.preventDefault();
  const role = document.getElementById('modalRoleSelect');
  const usernameInput = document.getElementById('modalUsernameInput');
  const passwordInput = document.getElementById('modalPasswordInput');
  const errEl = document.getElementById('modalFormError');
  const errMsg = document.getElementById('modalErrorMsg');
  const btn = document.getElementById('modalLoginBtn');

  if (!role || !usernameInput || !passwordInput || !errEl || !errMsg || !btn) return;

  const roleVal = role.value.trim();
  const user = usernameInput.value.trim();
  const pass = passwordInput.value;

  errEl.classList.remove('show');

  if (!roleVal) {
    errMsg.textContent = 'Please select a role before logging in.';
    errEl.classList.add('show');
    return;
  }
  if (!user || !pass) {
    errMsg.textContent = 'Username and password are required.';
    errEl.classList.add('show');
    return;
  }

  const VALID_USER = 'admin';
  const VALID_PASS = 'admin123';

  if (user !== VALID_USER || pass !== VALID_PASS) {
    errMsg.textContent = 'Invalid credentials. Use admin / admin123.';
    errEl.classList.add('show');
    return;
  }

  btn.innerHTML = '<span>⏳ Authenticating…</span>';
  btn.classList.add('loading');

  localStorage.setItem('gvmc_officer_logged_in', 'true');
  localStorage.setItem('gvmc_officer_role', roleVal);
  localStorage.setItem('gvmc_officer_name', user.charAt(0).toUpperCase() + user.slice(1));
  localStorage.setItem('gvmc_officer_login_time', new Date().toISOString());

  showToast('Login successful! Redirecting…', 'success');

  setTimeout(() => {
    window.location.href = 'ward-dashboard.html';
  }, 900);
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('login-modal')) {
    e.target.classList.remove('open');
  }
});
