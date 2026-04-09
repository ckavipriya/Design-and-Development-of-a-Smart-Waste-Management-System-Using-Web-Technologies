<div class="login-page" id="loginPage">
  <canvas class="login-bg-canvas" id="loginBgCanvas"></canvas>
  <div class="login-container">
    <div class="login-left">
      <div class="login-logo">
        <div class="login-logo-icon"><i class="fas fa-leaf"></i></div>
        <div>
          <div style="font-weight:700;font-size:18px;color:var(--text-primary)">EcoSense</div>
          <div style="font-size:12px;color:var(--text-muted)">Waste Intelligence Platform</div>
        </div>
      </div>
      <div style="font-size:22px;font-weight:700;line-height:1.3;margin-bottom:8px">Smarter waste management starts here</div>
      <div style="font-size:14px;color:var(--text-secondary);line-height:1.6;margin-bottom:28px">AI-powered monitoring, predictive analytics, and optimized route planning for modern cities.</div>

      <div class="login-feature">
        <div class="login-feature-icon"><i class="fas fa-brain"></i></div>
        <div>
          <div style="font-size:14px;font-weight:600;margin-bottom:2px">AI-Powered Insights</div>
          <div style="font-size:12px;color:var(--text-muted)">Predictive fill analysis and smart recommendations</div>
        </div>
      </div>
      <div class="login-feature">
        <div class="login-feature-icon"><i class="fas fa-satellite-dish"></i></div>
        <div>
          <div style="font-size:14px;font-weight:600;margin-bottom:2px">Real-Time Monitoring</div>
          <div style="font-size:12px;color:var(--text-muted)">247 IoT sensors across 6 city zones</div>
        </div>
      </div>
      <div class="login-feature">
        <div class="login-feature-icon"><i class="fas fa-route"></i></div>
        <div>
          <div style="font-size:14px;font-weight:600;margin-bottom:2px">Route Optimization</div>
          <div style="font-size:12px;color:var(--text-muted)">40% fuel reduction with intelligent routing</div>
        </div>
      </div>
    </div>

    <div class="login-right" id="loginFormContainer">
      <div style="font-size:20px;font-weight:700;margin-bottom:4px">Welcome back</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:28px">Sign in to your operations dashboard</div>

      <form id="loginForm" onsubmit="return Auth.handleLogin(event)" novalidate>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope"></i>
            <input type="email" class="form-input" id="loginEmail" placeholder="admin@ecosense.io" autocomplete="email" required>
          </div>
          <div class="form-error" id="emailError">Please enter a valid email address</div>
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="input-wrapper">
            <i class="fas fa-lock"></i>
            <input type="password" class="form-input" id="loginPassword" placeholder="Enter your password" autocomplete="current-password" required>
            <button type="button" class="toggle-pw" onclick="Auth.togglePassword()" aria-label="Toggle password visibility"><i class="fas fa-eye" id="pwIcon"></i></button>
          </div>
          <div class="form-error" id="passwordError">Password must be at least 6 characters</div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
          <label class="login-remember">
            <input type="checkbox" id="loginRemember"> Remember me
          </label>
          <a href="#" style="font-size:13px;color:var(--accent);text-decoration:none" onclick="Auth.showForgotPassword();return false">Forgot password?</a>
        </div>

        <button type="submit" class="btn btn-primary" id="loginBtn">
          <span class="btn-primary-text">Sign In</span>
          <span class="btn-primary-spinner"><span class="spinner"></span> Authenticating...</span>
        </button>
      </form>

      <div class="login-divider">or continue with</div>

      <div style="display:flex;gap:10px">
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="Auth.socialLogin('google')"><i class="fab fa-google"></i> Google</button>
        <button class="btn btn-secondary" style="flex:1;justify-content:center" onclick="Auth.socialLogin('microsoft')"><i class="fab fa-microsoft"></i> Microsoft</button>
      </div>

      <div class="demo-hint">
        <strong>Demo credentials:</strong> admin@ecosense.io / eco2024<br>
        <span style="color:var(--text-muted)">Or use any valid email with 6+ char password</span>
      </div>
    </div>
  </div>
</div>

<!-- ============================================ -->
<!-- AI Assistant Panel                           -->
<!-- ============================================ -->
<button class="ai-fab" id="aiFab" onclick="AI.togglePanel()" aria-label="Open AI Assistant" style="display:none">
  <span class="ai-fab-pulse"></span>
  <i class="fas fa-robot"></i>
</button>

<div class="ai-panel" id="aiPanel">
  <div class="ai-header">
    <div class="ai-header-icon"><i class="fas fa-robot"></i></div>
    <div style="flex:1">
      <div style="font-size:14px;font-weight:600">EcoSense AI</div>
      <div style="font-size:11px;color:var(--text-muted)">Waste intelligence assistant</div>
    </div>
    <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px" onclick="AI.togglePanel()" aria-label="Close"><i class="fas fa-times"></i></button>
  </div>

  <div class="ai-messages" id="aiMessages">
    <!-- Filled by JS -->
  </div>

  <div class="ai-suggestions" id="aiSuggestions">
    <!-- Filled by JS -->
  </div>

  <div class="ai-input-area">
    <input type="text" class="ai-input" id="aiInput" placeholder="Ask about bins, routes, predictions..." onkeydown="if(event.key==='Enter')AI.send()" aria-label="AI message input">
    <button class="ai-send" id="aiSendBtn" onclick="AI.send()" aria-label="Send"><i class="fas fa-paper-plane"></i></button>
  </div>
</div>

<!-- ============================================ -->
<!-- Sidebar                                      -->
<!-- ============================================ -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon"><i class="fas fa-leaf"></i></div>
    <div>
      <div style="font-weight:700;font-size:16px;color:var(--text-primary)">EcoSense</div>
      <div style="font-size:11px;color:var(--text-muted)">Waste Intelligence</div>
    </div>
  </div>
  <nav style="flex:1;padding:16px 0;overflow-y:auto">
    <div style="padding:0 20px 8px;font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em">Main</div>
    <div class="nav-item active" data-page="dashboard"><i class="fas fa-th-large"></i> Dashboard</div>
    <div class="nav-item" data-page="bins"><i class="fas fa-trash-alt"></i> Bin Monitoring <span class="badge">3</span></div>
    <div class="nav-item" data-page="routes"><i class="fas fa-route"></i> Route Planner</div>
    <div class="nav-item" data-page="analytics"><i class="fas fa-chart-area"></i> Analytics</div>
    <div style="padding:20px 20px 8px;font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em">Intelligence</div>
    <div class="nav-item" data-page="ai-hub" onclick="event.preventDefault();AI.togglePanel()"><i class="fas fa-robot"></i> AI Assistant <span class="ai-badge">AI</span></div>
    <div style="padding:20px 20px 8px;font-size:10px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em">Management</div>
    <div class="nav-item" data-page="alerts"><i class="fas fa-bell"></i> Alerts <span class="badge">7</span></div>
    <div class="nav-item" data-page="schedule"><i class="fas fa-calendar-alt"></i> Schedules</div>
    <div class="nav-item" data-page="drivers"><i class="fas fa-truck"></i> Fleet</div>
    <div class="nav-item" data-page="settings"><i class="fas fa-cog"></i> Settings</div>
  </nav>
  <div style="padding:16px 20px;border-top:1px solid var(--border)">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,var(--accent),#059669);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff" id="sidebarAvatar">AK</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600" id="sidebarUserName">Admin Kowalski</div>
        <div style="font-size:11px;color:var(--text-muted)">Operations Lead</div>
      </div>
      <button style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px" onclick="Auth.logout()" title="Sign out" aria-label="Sign out"><i class="fas fa-sign-out-alt"></i></button>
    </div>
  </div>
</aside>

<!-- ============================================ -->
<!-- Main Content                                 -->
<!-- ============================================ -->
<div class="main-content" id="mainContent" style="display:none">
  <header class="topbar">
    <div style="display:flex;align-items:center;gap:16px">
      <button id="menuToggle" style="display:none;background:none;border:none;color:var(--text-secondary);font-size:18px;cursor:pointer"><i class="fas fa-bars"></i></button>
      <div class="search-box">
        <i class="fas fa-search" style="color:var(--text-muted);font-size:13px"></i>
        <input type="text" placeholder="Search bins, routes, alerts..." id="globalSearch" aria-label="Search">
        <kbd style="font-size:10px;padding:2px 6px;background:var(--bg-elevated);border:1px solid var(--border);border-radius:4px;color:var(--text-muted);font-family:'JetBrains Mono',monospace">/</kbd>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:16px">
      <div style="font-size:12px;color:var(--text-muted)" class="mono" id="liveTime"></div>
      <div style="display:flex;align-items:center;gap:6px;padding:4px 10px;background:rgba(34,197,94,0.1);border-radius:6px">
        <div style="width:6px;height:6px;background:var(--success);border-radius:50%;animation:pulseDot 2s infinite"></div>
        <span style="font-size:11px;color:var(--success);font-weight:600">LIVE</span>
      </div>
      <button style="background:none;border:none;color:var(--text-secondary);font-size:16px;cursor:pointer;position:relative" aria-label="Notifications" onclick="App.navigate('alerts')">
        <i class="fas fa-bell"></i>
        <div style="position:absolute;top:-4px;right:-4px;width:8px;height:8px;background:var(--danger);border-radius:50%;border:2px solid var(--bg-base)"></div>
      </button>
    </div>
  </header>

  <main class="page-content" style="position:relative;z-index:1">

    <!-- Dashboard -->
    <section class="page-section active" id="page-dashboard">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div>
          <h1 style="font-size:24px;font-weight:700">Command Center</h1>
          <p style="font-size:13px;color:var(--text-muted);margin-top:4px">Real-time waste management overview</p>
        </div>
        <div class="tab-group">
          <button class="tab-btn active" onclick="Dashboard.setRange(this,'today')">Today</button>
          <button class="tab-btn" onclick="Dashboard.setRange(this,'week')">Week</button>
          <button class="tab-btn" onclick="Dashboard.setRange(this,'month')">Month</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px" id="statCards"></div>

      <!-- AI Insights strip -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px" id="aiInsightsStrip">
        <div class="ai-insight-card">
          <div class="ai-insight-icon"><i class="fas fa-lightbulb"></i></div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--accent);margin-bottom:3px">AI INSIGHT</div>
            <div style="font-size:13px;color:var(--text-secondary);line-height:1.5" id="aiInsight1">Analyzing sensor data...</div>
          </div>
        </div>
        <div class="ai-insight-card">
          <div class="ai-insight-icon"><i class="fas fa-chart-line"></i></div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--accent);margin-bottom:3px">PREDICTION</div>
            <div style="font-size:13px;color:var(--text-secondary);line-height:1.5" id="aiInsight2">Loading prediction...</div>
          </div>
        </div>
        <div class="ai-insight-card">
          <div class="ai-insight-icon"><i class="fas fa-exclamation-circle"></i></div>
          <div>
            <div style="font-size:12px;font-weight:600;color:var(--accent);margin-bottom:3px">RECOMMENDATION</div>
            <div style="font-size:13px;color:var(--text-secondary);line-height:1.5" id="aiInsight3">Generating recommendations...</div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:24px">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:600">Collection Trends</h3>
            <span style="font-size:11px;color:var(--text-muted)" class="mono">Last 7 days</span>
          </div>
          <canvas id="collectionChart" height="220"></canvas>
        </div>
        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Waste Composition</h3>
          <canvas id="compositionChart" height="220"></canvas>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:600">Recent Alerts</h3>
            <button class="btn btn-secondary btn-sm" onclick="App.navigate('alerts')">View All</button>
          </div>
          <div id="recentAlerts" style="display:flex;flex-direction:column;gap:8px"></div>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:600">Critical Bins</h3>
            <button class="btn btn-secondary btn-sm" onclick="App.navigate('bins')">View All</button>
          </div>
          <div id="criticalBins" style="display:flex;flex-direction:column;gap:8px"></div>
        </div>
      </div>
    </section>

    <!-- Bins -->
    <section class="page-section" id="page-bins">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div><h1 style="font-size:24px;font-weight:700">Bin Monitoring</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Track fill levels and sensor data across all smart bins</p></div>
        <button class="btn btn-primary" onclick="Bins.showAddModal()"><i class="fas fa-plus"></i> Register Bin</button>
      </div>
      <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap" id="binFilters"></div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:16px">
        <div class="map-container" style="height:500px"><canvas id="binMapCanvas" style="width:100%;height:100%"></canvas>
          <div class="map-legend">
            <div class="legend-item"><div class="legend-dot" style="background:var(--success)"></div>Normal</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--warning)"></div>Warning</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--danger)"></div>Critical</div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--info)"></div>Empty</div>
          </div>
        </div>
        <div style="max-height:500px;overflow-y:auto" id="binListContainer"></div>
      </div>
    </section>

    <!-- Routes -->
    <section class="page-section" id="page-routes">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div><h1 style="font-size:24px;font-weight:700">Route Planner</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Optimized collection routes for maximum efficiency</p></div>
        <button class="btn btn-primary" onclick="Routes.optimize()"><i class="fas fa-magic"></i> Optimize Routes</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px" id="routeStats"></div>
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:16px">
        <div class="map-container" style="height:420px"><canvas id="routeMapCanvas" style="width:100%;height:100%"></canvas></div>
        <div style="display:flex;flex-direction:column;gap:12px;max-height:420px;overflow-y:auto" id="routeList"></div>
      </div>
    </section>

    <!-- Analytics -->
    <section class="page-section" id="page-analytics">
      <div style="margin-bottom:24px"><h1 style="font-size:24px;font-weight:700">Analytics</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Deep insights into waste patterns and operations</p></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
        <div class="card"><h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Weekly Waste Volume (kg)</h3><canvas id="weeklyVolumeChart" height="240"></canvas></div>
        <div class="card"><h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Collection Efficiency</h3><canvas id="efficiencyChart" height="240"></canvas></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
        <div class="card"><h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Zone Performance</h3><canvas id="zoneChart" height="240"></canvas></div>
        <div class="card"><h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Prediction vs Actual</h3><canvas id="predictionChart" height="240"></canvas></div>
      </div>
      <div class="card">
        <h3 style="font-size:15px;font-weight:600;margin-bottom:16px">Monthly Summary Table</h3>
        <table class="data-table"><thead><tr><th>Month</th><th>Total Collected (kg)</th><th>Collections</th><th>Avg Fill Rate</th><th>Efficiency</th><th>Cost Saved</th></tr></thead><tbody id="monthlyTable"></tbody></table>
      </div>
    </section>

    <!-- Alerts -->
    <section class="page-section" id="page-alerts">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div><h1 style="font-size:24px;font-weight:700">Alert Center</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Manage and respond to system notifications</p></div>
        <button class="btn btn-secondary" onclick="Alerts.resolveAll()"><i class="fas fa-check-double"></i> Resolve All</button>
      </div>
      <div style="display:flex;gap:12px;margin-bottom:20px" id="alertFilters"></div>
      <div id="alertsList" style="display:flex;flex-direction:column;gap:10px"></div>
    </section>

    <!-- Schedule -->
    <section class="page-section" id="page-schedule">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <div><h1 style="font-size:24px;font-weight:700">Collection Schedules</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Manage pickup schedules and recurring tasks</p></div>
        <button class="btn btn-primary" onclick="Schedule.showAddModal()"><i class="fas fa-plus"></i> New Schedule</button>
      </div>
      <div class="card" style="overflow-x:auto">
        <table class="data-table"><thead><tr><th>Zone</th><th>Route</th><th>Frequency</th><th>Next Pickup</th><th>Assigned Driver</th><th>Status</th><th>Actions</th></tr></thead><tbody id="scheduleBody"></tbody></table>
      </div>
    </section>

    <!-- Drivers -->
    <section class="page-section" id="page-drivers">
      <div style="margin-bottom:24px"><h1 style="font-size:24px;font-weight:700">Fleet Management</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Track drivers and vehicle status in real-time</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px" id="driverCards"></div>
    </section>

    <!-- Settings -->
    <section class="page-section" id="page-settings">
      <div style="margin-bottom:24px"><h1 style="font-size:24px;font-weight:700">System Settings</h1><p style="font-size:13px;color:var(--text-muted);margin-top:4px">Configure thresholds, notifications, and system parameters</p></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:20px">Alert Thresholds</h3>
          <div class="form-group"><label class="form-label">Critical Fill Level (%)</label><input type="range" min="70" max="98" value="90" id="criticalThreshold" style="width:100%;accent-color:var(--danger)" oninput="Settings.updateThreshold('critical',this.value)"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:4px"><span>70%</span><span class="mono" id="criticalVal">90%</span><span>98%</span></div></div>
          <div class="form-group"><label class="form-label">Warning Fill Level (%)</label><input type="range" min="50" max="85" value="75" id="warningThreshold" style="width:100%;accent-color:var(--warning)" oninput="Settings.updateThreshold('warning',this.value)"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:4px"><span>50%</span><span class="mono" id="warningVal">75%</span><span>85%</span></div></div>
          <div class="form-group"><label class="form-label">Sensor Offline Timeout (min)</label><input type="number" class="form-input" value="30" id="offlineTimeout"></div>
          <button class="btn btn-primary" onclick="Settings.saveThresholds()"><i class="fas fa-save"></i> Save Thresholds</button>
        </div>
        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:20px">Notification Preferences</h3>
          <div style="display:flex;flex-direction:column;gap:14px">
            <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer"><span style="font-size:14px;color:var(--text-secondary)">Critical bin alerts</span><input type="checkbox" checked style="accent-color:var(--accent);width:18px;height:18px"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer"><span style="font-size:14px;color:var(--text-secondary)">Route deviation warnings</span><input type="checkbox" checked style="accent-color:var(--accent);width:18px;height:18px"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer"><span style="font-size:14px;color:var(--text-secondary)">Daily summary emails</span><input type="checkbox" style="accent-color:var(--accent);width:18px;height:18px"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer"><span style="font-size:14px;color:var(--text-secondary)">Sensor offline alerts</span><input type="checkbox" checked style="accent-color:var(--accent);width:18px;height:18px"></label>
            <label style="display:flex;justify-content:space-between;align-items:center;cursor:pointer"><span style="font-size:14px;color:var(--text-secondary)">AI recommendation alerts</span><input type="checkbox" checked style="accent-color:var(--accent);width:18px;height:18px"></label>
          </div>
          <div class="glow-line"></div>
          <div class="form-group"><label class="form-label">Notification Email</label><input type="email" class="form-input" value="ops@ecosense.io"></div>
          <button class="btn btn-primary" onclick="Settings.saveNotifications()"><i class="fas fa-save"></i> Save Preferences</button>
        </div>
        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:20px">System Information</h3>
          <div style="display:flex;flex-direction:column;gap:12px;font-size:13px">
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">Version</span><span class="mono" style="color:var(--text-secondary)">v2.4.1</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">AI Engine</span><span class="mono" style="color:var(--accent)">EcoAI v1.2</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">Active Sensors</span><span class="mono" style="color:var(--accent)">247</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">Uptime</span><span class="mono" style="color:var(--text-secondary)">99.7%</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">Last Sync</span><span class="mono" style="color:var(--text-secondary)">12 sec ago</span></div>
            <div style="display:flex;justify-content:space-between"><span style="color:var(--text-muted)">Database Size</span><span class="mono" style="color:var(--text-secondary)">2.4 GB</span></div>
          </div>
        </div>
        <div class="card">
          <h3 style="font-size:15px;font-weight:600;margin-bottom:20px">Zone Configuration</h3>
          <div id="zoneConfig" style="display:flex;flex-direction:column;gap:10px"></div>
          <div class="glow-line"></div>
          <button class="btn btn-secondary" onclick="Settings.addZone()"><i class="fas fa-plus"></i> Add Zone</button>
        </div>
      </div>
    </section>

  </main>
</div>
