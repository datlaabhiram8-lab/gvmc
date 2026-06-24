/* ============================================
   GVMC Smart Ward Portal - Shared Utilities
   js/main.js
   ============================================ */

// ---- Navbar Toggle & Global Handlers ----
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
      navbar.classList.toggle('scrolled', window.scrollY > 50);
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

  // Update header session UI
  updateHeaderAuth();
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

// ---- Citizen Sustainability label ----
function getCitizenSustainabilityLabel(score) {
  if (score >= 81) return { label: 'Highly Sustainable', emoji: '🌟', color: '#10b981', class: 'rating-excellent' };
  if (score >= 61) return { label: 'Sustainable', emoji: '🟢', color: '#3b82f6', class: 'rating-good' };
  if (score >= 41) return { label: 'Average', emoji: '🟡', color: '#f59e0b', class: 'rating-average' };
  if (score >= 21) return { label: 'Poor', emoji: '🟠', color: '#f97316', class: 'rating-poor' };
  return { label: 'Critical', emoji: '🔴', color: '#ef4444', class: 'rating-critical' };
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
  return Array.from({ length: count }, (_, i) => {
    const ward = Math.floor(Math.random() * 120) + 1;
    let colony = 'Local area';
    const wardKey = String(ward);
    if (typeof WARD_AREAS !== 'undefined' && WARD_AREAS[wardKey]?.length) {
      const areas = WARD_AREAS[wardKey];
      colony = areas[Math.floor(Math.random() * areas.length)];
    } else if (typeof WARD_DEMOGRAPHICS !== 'undefined' && WARD_DEMOGRAPHICS[ward]) {
      colony = WARD_DEMOGRAPHICS[ward].name || colony;
    }
    return {
      id: generateId(),
      category: COMPLAINT_CATEGORIES[i % COMPLAINT_CATEGORIES.length],
      ward,
      colony,
      date: new Date(Date.now() - Math.random() * 30 * 86400000).toLocaleDateString('en-IN'),
      status: COMPLAINT_STATUSES[Math.floor(Math.random() * 3)],
      desc: 'Reported issue requires immediate attention.'
    };
  });
}

function sampleProjects(count = 5) {
  return Array.from({ length: count }, (_, i) => ({
    title: PROJECT_TYPES[i % PROJECT_TYPES.length],
    ward: Math.floor(Math.random() * 120) + 1,
    progress: [0, 25, 50, 75, 100][Math.floor(Math.random() * 5)],
    status: ['Planning', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)]
  }));
}

// ---- Officer Auth Helpers ----
function requireOfficerAuth() {
  const isLoggedIn = localStorage.getItem('gvmc_officer_logged_in') === 'true';
  if (!isLoggedIn) {
    window.location.href = 'index.html?login=required';
    return null;
  }
  return {
    name: localStorage.getItem('gvmc_officer_name') || 'Admin',
    role: localStorage.getItem('gvmc_officer_role') || 'Ward Officer'
  };
}

function logoutOfficer() {
  localStorage.removeItem('gvmc_officer');
  localStorage.removeItem('gvmc_officer_logged_in');
  localStorage.removeItem('gvmc_officer_role');
  localStorage.removeItem('gvmc_officer_name');
  localStorage.removeItem('gvmc_officer_login_time');
  if (window.supabaseClient) {
    window.supabaseClient.auth.signOut().then(() => {
      window.location.reload();
    }).catch(err => {
      console.warn("Supabase signout failed, reloading anyway:", err);
      window.location.reload();
    });
  } else {
    window.location.reload();
  }
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

function initLoginModalUI() {
  const modal = document.getElementById('loginModal');
  if (!modal) return;

  // Add Register Toggle Option
  const form = document.getElementById('modalLoginForm');
  if (form && !document.getElementById('modalRegisterToggleWrap')) {
    const toggleWrap = document.createElement('div');
    toggleWrap.id = 'modalRegisterToggleWrap';
    toggleWrap.style.cssText = 'text-align:center; margin-top:1.25rem; font-size:0.83rem; color:var(--text-muted);';
    toggleWrap.innerHTML = `
      <span id="toggleModeText">Don't have an account?</span> 
      <a href="#" id="toggleModeBtn" style="color:var(--accent); font-weight:700; text-decoration:none; margin-left:4px;">Register Here</a>
    `;
    form.appendChild(toggleWrap);

    let isRegisterMode = false;
    const toggleBtn = toggleWrap.querySelector('#toggleModeBtn');
    const toggleText = toggleWrap.querySelector('#toggleModeText');
    const loginBtn = document.getElementById('modalLoginBtn');
    const titleEl = modal.querySelector('.login-title');

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isRegisterMode = !isRegisterMode;
      if (isRegisterMode) {
        titleEl.textContent = 'Officer Portal Registration';
        loginBtn.innerHTML = '<span>🚀 Register Account</span>';
        toggleText.textContent = 'Already have an account?';
        toggleBtn.textContent = 'Sign In';
        form.dataset.mode = 'register';
      } else {
        titleEl.textContent = 'Officer Portal Login';
        loginBtn.innerHTML = '<span>🚀 Sign In to Portal</span>';
        toggleText.textContent = "Don't have an account?";
        toggleBtn.textContent = 'Register Here';
        form.dataset.mode = 'login';
      }
      // Reset error message
      const errEl = document.getElementById('modalFormError');
      if (errEl) errEl.classList.remove('show');
    });
  }
}

function autofillModal() {
  const role = document.getElementById('modalRoleSelect');
  const user = document.getElementById('modalUsernameInput');
  const pass = document.getElementById('modalPasswordInput');
  if (role && user && pass) {
    user.value = 'admin@gmail.com';
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
  const form = document.getElementById('modalLoginForm');

  if (!role || !usernameInput || !passwordInput || !errEl || !errMsg || btn === null) return;

  const roleVal = role.value.trim();
  const user = usernameInput.value.trim();
  const pass = passwordInput.value;
  const isRegisterMode = form && form.dataset.mode === 'register';

  errEl.classList.remove('show');

  if (!roleVal) {
    errMsg.textContent = 'Please select a role before submitting.';
    errEl.classList.add('show');
    return;
  }
  if (!user || !pass) {
    errMsg.textContent = 'Email and password are required.';
    errEl.classList.add('show');
    return;
  }

  btn.innerHTML = isRegisterMode ? '<span>⏳ Creating Account…</span>' : '<span>⏳ Authenticating…</span>';
  btn.classList.add('loading');

  (async function() {
    try {
      if (!window.supabaseClient) {
        throw new Error("Supabase is not configured. Please use the settings widget at the bottom right.");
      }

      // Supabase requires an email address. Map to email format if needed.
      const email = user.includes('@') ? user : `${user}@gmail.com`;

      // If we are in register mode:
      if (isRegisterMode) {
        const signUpRes = await window.supabaseClient.auth.signUp({
          email: email,
          password: pass,
          options: {
            data: {
              username: email.split('@')[0],
              role: roleVal
            }
          }
        });
        if (signUpRes.error) throw signUpRes.error;
        
        showToast('Registration successful! Switch to Sign In to log in.', 'success');
        
        // Auto toggle back to login mode
        const toggleBtn = document.getElementById('toggleModeBtn');
        if (toggleBtn) toggleBtn.click();
        
        btn.innerHTML = '<span>🚀 Sign In to Portal</span>';
        btn.classList.remove('loading');
        return;
      }

      // 1. Attempt login
      let authData = null;
      let authError = null;

      try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
          email: email,
          password: pass
        });
        authData = data;
        authError = error;
      } catch (signInErr) {
        authError = signInErr;
      }

      // 2. Demo Auto-registration fallback for admin / admin123
      if (authError && (authError.message || '').includes("Invalid login credentials") && user.startsWith('admin') && pass === 'admin123') {
        console.log("Auto-registering demo admin account in Supabase...");
        const signUpRes = await window.supabaseClient.auth.signUp({
          email: 'admin@gmail.com',
          password: 'admin123',
          options: {
            data: {
              username: 'admin',
              role: 'Admin'
            }
          }
        });
        if (signUpRes.error) throw signUpRes.error;

        const retryRes = await window.supabaseClient.auth.signInWithPassword({
          email: 'admin@gmail.com',
          password: 'admin123'
        });
        if (retryRes.error) throw retryRes.error;
        authData = retryRes.data;
        authError = null;
      }

      if (authError) throw authError;

      // 3. Retrieve user profile role
      const userId = authData.user.id;
      const { data: profile } = await window.supabaseClient
         .from('profiles')
         .select('role, username')
         .eq('id', userId)
         .maybeSingle();

      const userRole = (profile && profile.role) ? profile.role : roleVal;
      const userName = (profile && profile.username) ? profile.username : user.split('@')[0];

      try {
        localStorage.setItem('gvmc_officer_logged_in', 'true');
        localStorage.setItem('gvmc_officer_role', userRole);
        localStorage.setItem('gvmc_officer_name', userName.charAt(0).toUpperCase() + userName.slice(1));
        localStorage.setItem('gvmc_officer_login_time', new Date().toISOString());
      } catch (storageErr) {
        console.warn('localStorage unavailable:', storageErr);
      }

      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const isCommunityPage  = currentPage === 'community.html';
      const isComplaintsPage = currentPage === 'complaints.html';

      if (isCommunityPage) {
        // Stay on community page, refresh officer UI
        showToast('Login successful!', 'success');
        setTimeout(() => {
          closeLoginModal();
          updateHeaderAuth();
          if (typeof window.checkOfficerAccess === 'function') {
            window.checkOfficerAccess();
          }
          btn.innerHTML = '<span>🚀 Sign In to Portal</span>';
          btn.classList.remove('loading');
        }, 900);
      } else if (isComplaintsPage) {
        // Reload complaints page — officer CMS will activate on reload
        showToast('Login successful! Loading Officer CMS…', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 900);
      } else {
        // Default: go to ward dashboard
        showToast('Login successful! Redirecting…', 'success');
        setTimeout(() => {
          try {
            const lastWard = sessionStorage.getItem('gvmc_last_ward');
            window.location.href = lastWard
              ? `ward-dashboard.html?ward=${lastWard}`
              : 'ward-dashboard.html?ward=17';
          } catch (navErr) {
            window.location.href = 'ward-dashboard.html?ward=17';
          }
        }, 900);
      }
    } catch (err) {
      console.error("Auth error:", err);
      errMsg.textContent = err.message || 'Error occurred during authentication.';
      errEl.classList.add('show');
      btn.innerHTML = isRegisterMode ? '<span>🚀 Register Account</span>' : '<span>🚀 Sign In to Portal</span>';
      btn.classList.remove('loading');
    }
  })();
}

document.addEventListener('click', e => {
  const target = e.target;
  if (target && target.classList.contains('login-modal')) {
    target.classList.remove('open');
  }
});

function updateHeaderAuth() {
  try {
    const isLoggedIn = localStorage.getItem('gvmc_officer_logged_in') === 'true';
    if (!isLoggedIn) return;

    const role = localStorage.getItem('gvmc_officer_role') || 'Officer';
    const name = localStorage.getItem('gvmc_officer_name') || 'Admin';

    // Find the login button in header
    const loginBtn = document.querySelector('.header-login-btn');
    if (loginBtn) {
      const container = document.createElement('div');
      container.className = 'header-session-wrap';
      container.style.cssText = 'display:flex;align-items:center;gap:0.75rem;margin-left:auto;';
      container.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:flex-end;font-family:'Inter',sans-serif;line-height:1.2;">
          <span style="font-size:0.75rem;font-weight:700;color:var(--text-primary);">${name}</span>
          <span style="font-size:0.65rem;color:var(--text-muted);font-weight:500;">${role}</span>
        </div>
        <button onclick="logoutOfficer()" class="btn-logout" style="
          background:rgba(239,68,68,0.1);
          border:1px solid rgba(239,68,68,0.2);
          color:var(--danger);
          padding:8px 12px;
          border-radius:6px;
          font-size:0.75rem;
          font-weight:700;
          cursor:pointer;
          transition:var(--transition);
          white-space:nowrap;
        ">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      `;
      loginBtn.parentNode.replaceChild(container, loginBtn);
    }
  } catch (e) {
    console.warn('Error updating header auth:', e);
  }
}

// ---- Get Dynamic Sustainability Data ----
async function getWardSustainabilityData(wardNum) {
  const n = parseInt(wardNum, 10);
  try {
    if (!window.supabaseClient) throw new Error("Supabase client not initialized");
    
    // Fetch all sustainability feedback for this ward from Supabase
    const { data: feedbacks, error } = await window.supabaseClient
      .from('sustainability_feedback')
      .select('*')
      .eq('ward_id', n);
      
    if (error) throw error;

    // Get base score from WARD_DEMOGRAPHICS or default to formula
    let baseScore = 70;
    if (typeof WARD_DEMOGRAPHICS !== 'undefined' && WARD_DEMOGRAPHICS[n]) {
      baseScore = WARD_DEMOGRAPHICS[n].sustainability || Math.floor(60 + ((n * 17) % 36));
    } else {
      baseScore = Math.floor(60 + ((n * 17) % 36));
    }

    // Seed base values
    const keys = ['cleanliness', 'water', 'transport', 'green', 'roads', 'pollution', 'disaster', 'governance'];
    const baseVal = baseScore / 10;
    const baseRatings = {};

    keys.forEach((key, idx) => {
      // Deterministic variation between -1.5 and +1.5 based on ward number
      const variation = Math.sin(n * (idx + 1)) * 1.5;
      baseRatings[key] = Math.max(1, Math.min(10, Math.round(baseVal + variation)));
    });

    // Adjust to exactly match baseScore
    const getWeightedSum = (r) => {
      return Math.round(
        r.cleanliness * 2.0 +
        r.water * 1.5 +
        r.transport * 1.5 +
        r.green * 1.0 +
        r.roads * 1.0 +
        r.pollution * 1.0 +
        r.disaster * 1.0 +
        r.governance * 1.0
      );
    };

    let loops = 0;
    while (getWeightedSum(baseRatings) !== baseScore && loops < 100) {
      loops++;
      const diff = baseScore - getWeightedSum(baseRatings);
      const key = keys[Math.floor(Math.abs(Math.sin(n + loops) * keys.length))];
      const step = diff > 0 ? 1 : -1;
      if (baseRatings[key] + step >= 1 && baseRatings[key] + step <= 10) {
        baseRatings[key] += step;
      }
    }

    let finalRatings = { ...baseRatings };
    let citizenAvgRatings = null;

    if (feedbacks && feedbacks.length > 0) {
      citizenAvgRatings = {};
      keys.forEach(key => {
        let sum = 0;
        feedbacks.forEach(rev => {
          sum += (rev[key] !== undefined) ? rev[key] : 5;
        });
        citizenAvgRatings[key] = sum / feedbacks.length;
        
        // Dynamic mix: 50% municipal, 50% citizen feedback
        finalRatings[key] = (baseRatings[key] + citizenAvgRatings[key]) / 2;
      });
    }

    // Calculate final score
    const finalScore = Math.round(
      finalRatings.cleanliness * 2.0 +
      finalRatings.water * 1.5 +
      finalRatings.transport * 1.5 +
      finalRatings.green * 1.0 +
      finalRatings.roads * 1.0 +
      finalRatings.pollution * 1.0 +
      finalRatings.disaster * 1.0 +
      finalRatings.governance * 1.0
    );

    const formatRatings = (r) => {
      if (!r) return null;
      const formatted = {};
      Object.keys(r).forEach(k => {
        formatted[k] = parseFloat(parseFloat(r[k]).toFixed(1));
      });
      return formatted;
    };

    return {
      baseScore,
      finalScore,
      baseRatings: formatRatings(baseRatings),
      citizenAvgRatings: formatRatings(citizenAvgRatings),
      finalRatings: formatRatings(finalRatings),
      reviewCount: feedbacks.length
    };
  } catch (err) {
    console.warn("Fallback to local sustainability calculation:", err);
    // Get base score from WARD_DEMOGRAPHICS or default to 70
    let baseScore = 70;
    if (typeof WARD_DEMOGRAPHICS !== 'undefined' && WARD_DEMOGRAPHICS[n]) {
      baseScore = WARD_DEMOGRAPHICS[n].sustainability || Math.floor(60 + ((n * 17) % 36));
    } else {
      baseScore = Math.floor(60 + ((n * 17) % 36));
    }

    // Seed base values
    const keys = ['cleanliness', 'water', 'transport', 'green', 'roads', 'pollution', 'disaster', 'governance'];
    const baseVal = baseScore / 10;
    const baseRatings = {};

    keys.forEach((key, idx) => {
      const variation = Math.sin(n * (idx + 1)) * 1.5;
      baseRatings[key] = Math.max(1, Math.min(10, Math.round(baseVal + variation)));
    });

    const getWeightedSum = (r) => {
      return Math.round(
        r.cleanliness * 2.0 +
        r.water * 1.5 +
        r.transport * 1.5 +
        r.green * 1.0 +
        r.roads * 1.0 +
        r.pollution * 1.0 +
        r.disaster * 1.0 +
        r.governance * 1.0
      );
    };

    let loops = 0;
    while (getWeightedSum(baseRatings) !== baseScore && loops < 100) {
      loops++;
      const diff = baseScore - getWeightedSum(baseRatings);
      const key = keys[Math.floor(Math.abs(Math.sin(n + loops) * keys.length))];
      const step = diff > 0 ? 1 : -1;
      if (baseRatings[key] + step >= 1 && baseRatings[key] + step <= 10) {
        baseRatings[key] += step;
      }
    }

    // Fetch citizen feedback from localStorage
    let submissions = [];
    try {
      submissions = JSON.parse(localStorage.getItem('gvmc_sustainability_feedback') || '[]');
    } catch (e) {
      console.error(e);
    }

    const wardReviews = submissions.filter(s => parseInt(s.ward) === n);

    let finalRatings = { ...baseRatings };
    let citizenAvgRatings = null;

    if (wardReviews.length > 0) {
      citizenAvgRatings = {};
      keys.forEach(key => {
        let sum = 0;
        wardReviews.forEach(rev => {
          sum += (rev.ratings && rev.ratings[key] !== undefined) ? rev.ratings[key] : 5;
        });
        citizenAvgRatings[key] = sum / wardReviews.length;
        finalRatings[key] = (baseRatings[key] + citizenAvgRatings[key]) / 2;
      });
    }

    const finalScore = getWeightedSum(finalRatings);

    const formatRatings = (r) => {
      if (!r) return null;
      const formatted = {};
      Object.keys(r).forEach(k => {
        formatted[k] = parseFloat(parseFloat(r[k]).toFixed(1));
      });
      return formatted;
    };

    return {
      baseScore,
      finalScore,
      baseRatings: formatRatings(baseRatings),
      citizenAvgRatings: formatRatings(citizenAvgRatings),
      finalRatings: formatRatings(finalRatings),
      reviewCount: wardReviews.length
    };
  }
}

// ---- Global API demographics loader ----
async function initApiDemographics() {
  try {
    if (!window.supabaseClient) throw new Error("Supabase client not initialized");

    // Fetch wards and sustainability feedbacks in parallel to calculate scores
    const [wardsRes, feedbackRes] = await Promise.all([
      window.supabaseClient.from('wards').select('*'),
      window.supabaseClient.from('sustainability_feedback').select('ward_id, score')
    ]);

    if (wardsRes.error) throw wardsRes.error;
    if (feedbackRes.error) throw feedbackRes.error;

    const wards = wardsRes.data;
    const feedbacks = feedbackRes.data || [];

    // Calculate averages per ward
    const wardScores = {};
    const wardFeedbackCounts = {};
    feedbacks.forEach(fb => {
      const wId = fb.ward_id;
      if (!wardScores[wId]) {
        wardScores[wId] = 0;
        wardFeedbackCounts[wId] = 0;
      }
      wardScores[wId] += fb.score;
      wardFeedbackCounts[wId]++;
    });

    const wardAverages = {};
    Object.keys(wardScores).forEach(wId => {
      wardAverages[wId] = Math.round(wardScores[wId] / wardFeedbackCounts[wId]);
    });

    wards.forEach(w => {
      const id = w.ward;
      if (typeof WARD_DEMOGRAPHICS !== 'undefined' && WARD_DEMOGRAPHICS[id]) {
        const target = WARD_DEMOGRAPHICS[id];
        target.name = w.name;
        target.population = w.population;
        target.male = w.male;
        target.female = w.female;
        target.sc = w.sc;
        target.st = w.st;
        target.secretariat = w.secretariat;
        target.womenPct = +((w.female / w.population) * 100).toFixed(2);
        target.scPct = +((w.sc / w.population) * 100).toFixed(2);
        target.stPct = +((w.st / w.population) * 100).toFixed(2);

        // Map sustainability score (avg from DB or fallback formula)
        const avgScore = wardAverages[id];
        target.sustainability = avgScore !== undefined ? avgScore : Math.floor(60 + ((id * 17) % 36));
      }
    });

    // Fire a custom event to notify pages that API demographics are loaded
    document.dispatchEvent(new CustomEvent('gvmc-demographics-loaded'));
  } catch (e) {
    console.warn("Failed to load demographics from Supabase. Fallback to static JS data:", e);
  }
}

// Auto-initializer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initApiDemographics();
    initLoginModalUI();
    updateHeaderAuth();
  });
} else {
  initApiDemographics();
  initLoginModalUI();
  updateHeaderAuth();
}
