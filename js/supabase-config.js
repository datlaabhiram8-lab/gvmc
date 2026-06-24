/* GVMC Portal – Supabase Client configuration
   Sets up the connection to the Supabase backend.
   Allows overrides via localStorage for easy testing/runtime configuration. */

const DEFAULT_SUPABASE_URL = 'https://uisaevebrsmztikolzed.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = ''; // Enter your anon key here if you want to hardcode it

// Retrieve saved values or use defaults
const SUPABASE_URL = localStorage.getItem('gvmc_supabase_url') || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = localStorage.getItem('gvmc_supabase_anon_key') || DEFAULT_SUPABASE_ANON_KEY;

let supabaseClient = null;

// Initialize Supabase Client if a key is provided and is not empty/placeholder
if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.trim() !== '') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabaseClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
  }
}

// Automatically inject Supabase Key Configuration Widget on page load
document.addEventListener('DOMContentLoaded', () => {
  injectConfigUI();
});

function injectConfigUI() {
  // Check if we already have the UI injected
  if (document.getElementById('supabase-config-trigger')) return;

  // Add styles for the widget
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .supabase-widget-trigger {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 30px;
      color: #fff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .supabase-widget-trigger:hover {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.25);
      background: rgba(15, 23, 42, 0.95);
    }
    .supabase-widget-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .supabase-status-connected {
      background: #10b981;
      box-shadow: 0 0 10px #10b981;
    }
    .supabase-status-disconnected {
      background: #f59e0b;
      box-shadow: 0 0 10px #f59e0b;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    
    /* Config Modal */
    .supabase-config-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      font-family: 'Inter', sans-serif;
    }
    .supabase-config-modal.open {
      opacity: 1;
      pointer-events: auto;
    }
    .supabase-config-modal-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 100%;
      max-width: 480px;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      transform: translateY(20px);
      transition: transform 0.3s ease;
      color: #f8fafc;
    }
    .supabase-config-modal.open .supabase-config-modal-card {
      transform: translateY(0);
    }
    .supabase-config-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #f8fafc;
    }
    .supabase-config-desc {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 20px;
    }
    .supabase-config-group {
      margin-bottom: 16px;
    }
    .supabase-config-group label {
      display: block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 6px;
    }
    .supabase-config-input {
      width: 100%;
      padding: 12px 14px;
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      color: #f8fafc;
      font-size: 13px;
      font-family: inherit;
      box-sizing: border-box;
    }
    .supabase-config-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
    .supabase-config-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 24px;
    }
    .supabase-config-btn {
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      border: none;
    }
    .supabase-config-btn-save {
      background: #2563eb;
      color: #fff;
    }
    .supabase-config-btn-save:hover {
      background: #1d4ed8;
    }
    .supabase-config-btn-cancel {
      background: transparent;
      color: #94a3b8;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .supabase-config-btn-cancel:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #f8fafc;
    }
    .supabase-config-btn-reset {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
      margin-right: auto;
    }
    .supabase-config-btn-reset:hover {
      background: rgba(239, 68, 68, 0.2);
    }
  `;
  document.head.appendChild(styleEl);

  // Determine connection status
  const isConnected = !!supabaseClient;
  const statusClass = isConnected ? 'supabase-status-connected' : 'supabase-status-disconnected';
  const statusText = isConnected ? 'Supabase Connected' : 'Supabase Config Required';

  // Create Trigger Button
  const trigger = document.createElement('div');
  trigger.id = 'supabase-config-trigger';
  trigger.className = 'supabase-widget-trigger';
  trigger.innerHTML = `
    <div class="supabase-widget-status-dot ${statusClass}"></div>
    <span>${statusText}</span>
    <i class="fa-solid fa-gear" style="margin-left: 4px;"></i>
  `;
  document.body.appendChild(trigger);

  // Create Modal
  const modal = document.createElement('div');
  modal.id = 'supabase-config-modal';
  modal.className = 'supabase-config-modal';
  modal.innerHTML = `
    <div class="supabase-config-modal-card">
      <div class="supabase-config-title">
        <i class="fa-solid fa-database" style="color: #3b82f6;"></i>
        <span>Supabase Integration Settings</span>
      </div>
      <div class="supabase-config-desc">
        Configure the database connection keys for the GVMC Smart Ward Connect. The keys are stored locally in your browser's <code>localStorage</code>.
      </div>
      
      <div class="supabase-config-group">
        <label>Supabase URL</label>
        <input type="text" id="supabase-config-url-input" class="supabase-config-input" placeholder="https://your-project.supabase.co" value="${SUPABASE_URL}">
      </div>
      
      <div class="supabase-config-group">
        <label>Supabase Anon Key</label>
        <input type="password" id="supabase-config-key-input" class="supabase-config-input" placeholder="eyJhbGciOi..." value="${SUPABASE_ANON_KEY}">
      </div>

      <div class="supabase-config-buttons">
        <button id="supabase-config-reset-btn" class="supabase-config-btn supabase-config-btn-reset">Reset</button>
        <button id="supabase-config-cancel-btn" class="supabase-config-btn supabase-config-btn-cancel">Cancel</button>
        <button id="supabase-config-save-btn" class="supabase-config-btn supabase-config-btn-save">Save & Reload</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Event Listeners
  trigger.addEventListener('click', () => {
    modal.classList.add('open');
  });

  const closeModal = () => {
    modal.classList.remove('open');
  };

  document.getElementById('supabase-config-cancel-btn').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.getElementById('supabase-config-reset-btn').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset to default keys?")) {
      localStorage.removeItem('gvmc_supabase_url');
      localStorage.removeItem('gvmc_supabase_anon_key');
      alert("Settings reset. Reloading page...");
      window.location.reload();
    }
  });

  document.getElementById('supabase-config-save-btn').addEventListener('click', () => {
    const urlVal = document.getElementById('supabase-config-url-input').value.trim();
    const keyVal = document.getElementById('supabase-config-key-input').value.trim();

    if (!urlVal) {
      alert("Supabase URL is required!");
      return;
    }
    if (!keyVal) {
      alert("Supabase Anon Key is required!");
      return;
    }

    localStorage.setItem('gvmc_supabase_url', urlVal);
    localStorage.setItem('gvmc_supabase_anon_key', keyVal);
    
    alert("Supabase credentials saved successfully! Reloading page to apply changes...");
    window.location.reload();
  });
}
