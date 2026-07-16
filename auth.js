(function () {
  const ACCOUNTS_KEY = "lifeOS_accounts_v1";
  const SESSION_KEY = "lifeOS_current_user_v1";
  const REMEMBER_KEY = "lifeOS_remembered_accounts_v1";
  const LAST_PAGE_KEY = "lifeOS_last_page_v1";
  const PASSWORD_MASK = "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
  const APP_PAGES = new Set([
    "dashboard.html",
    "to-do-list.html",
    "special-task.html",
    "expense.html",
    "workout.html"
  ]);

  const modalMarkup = `
    <div id="authOverlay" class="auth-overlay" aria-hidden="true">
      <section class="auth-card auth-welcome-mode" role="dialog" aria-modal="true" aria-labelledby="authTitle">
        <div class="auth-welcome">
          <span class="auth-brand-mark welcome-mark" aria-hidden="true"></span>
          <h1><span>Life</span><strong>OS</strong></h1>
          <h2>Welcome back!</h2>
          <p>Let's make today productive.</p>
          <img class="welcome-character" src="lifi-character.png" alt="" />
          <div class="welcome-actions">
            <button type="button" class="welcome-primary" id="welcomeGetStarted">Get Started</button>
            <button type="button" class="welcome-secondary" id="welcomeLogin">Login</button>
          </div>
        </div>

        <div class="auth-brand form-brand">
          <button type="button" class="auth-back" id="authBackButton" aria-label="Close sign in form"><i data-lucide="chevron-left"></i></button>
          <span class="auth-brand-mark" aria-hidden="true"></span>
          <div>
            <h2 id="authTitle">lifeOS</h2>
            <p>Your private workspace, softly locked.</p>
          </div>
        </div>

        <div class="auth-tabs" role="tablist" aria-label="Authentication">
          <button type="button" class="auth-tab active" data-auth-tab="signin">Sign In</button>
          <button type="button" class="auth-tab" data-auth-tab="signup">Create Account</button>
        </div>

        <div id="rememberedAccounts" class="remembered-list"></div>

        <form id="signinForm" class="auth-form" autocomplete="on" novalidate>
          <label>Username<input name="username" type="text" autocomplete="username" required /></label>
          <label>Password<input name="password" type="password" autocomplete="current-password" required /></label>
          <button type="submit" class="auth-primary">Sign In</button>
        </form>

        <form id="signupForm" class="auth-form hidden" autocomplete="on" novalidate>
          <div class="auth-grid">
            <label>Full name<input name="fullName" type="text" autocomplete="name" required /></label>
            <label>Age<input name="age" type="number" min="1" max="120" required /></label>
          </div>
          <div class="auth-grid">
            <label>Birthday<input name="birthday" type="date" required /></label>
            <label>Gender
              <select name="gender" required>
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </label>
          </div>
          <label>Username<input name="username" type="text" autocomplete="username" required /></label>
          <label>Password<input name="password" type="password" autocomplete="new-password" minlength="6" required /></label>
          <label>Confirm password<input name="confirmPassword" type="password" autocomplete="new-password" minlength="6" required /></label>
          <button type="submit" class="auth-primary">Create Account</button>
        </form>
      </section>
    </div>

    <div id="statusModal" class="life-modal" aria-hidden="true">
      <section class="life-dialog status-dialog" role="dialog" aria-modal="true" aria-labelledby="statusTitle">
        <div class="dialog-header">
          <h2 id="statusTitle"></h2>
          <button type="button" class="dialog-close" data-close-modal aria-label="Close modal"><i data-lucide="x"></i></button>
        </div>
        <div class="dialog-body">
          <p id="statusMessage"></p>
        </div>
        <div class="dialog-actions">
          <button type="button" class="dialog-primary" id="statusOkButton">OK</button>
        </div>
      </section>
    </div>

    <div id="loginLoading" class="login-loading" aria-hidden="true">
      <section class="login-loading-card" role="status" aria-live="polite">
        <span class="login-loader" aria-hidden="true"></span>
        <div>
          <h2>Opening lifeOS</h2>
          <p>Preparing your workspace.</p>
        </div>
      </section>
    </div>

    <div id="logoutConfirmModal" class="life-modal" aria-hidden="true">
      <section class="life-dialog" role="dialog" aria-modal="true" aria-labelledby="logoutTitle">
        <div class="dialog-header">
          <h2 id="logoutTitle">Please confirm</h2>
          <button type="button" class="dialog-close" data-close-modal aria-label="Close modal"><i data-lucide="x"></i></button>
        </div>
        <div class="dialog-body">
          <p>Are you sure you want to log out of lifeOS?</p>
        </div>
        <div class="dialog-actions">
          <button type="button" class="dialog-secondary" data-close-dialog>Cancel</button>
          <button type="button" class="dialog-primary" id="confirmLogoutButton">Logout</button>
        </div>
      </section>
    </div>

    <div id="rememberModal" class="life-modal" aria-hidden="true">
      <section class="life-dialog" role="dialog" aria-modal="true" aria-labelledby="rememberTitle">
        <div class="dialog-header">
          <h2 id="rememberTitle">Remember account?</h2>
          <button type="button" class="dialog-close" data-close-modal aria-label="Close modal"><i data-lucide="x"></i></button>
        </div>
        <div class="dialog-body">
          <p>Show this account on the login screen so you can sign in without typing your username and password.</p>
        </div>
        <div class="dialog-actions">
          <button type="button" class="dialog-secondary" id="dontRememberButton">No thanks</button>
          <button type="button" class="dialog-primary" id="rememberAccountButton">Remember Account</button>
        </div>
      </section>
    </div>

    <div id="profileModal" class="life-modal" aria-hidden="true">
      <section class="life-dialog profile-dialog" role="dialog" aria-modal="true" aria-labelledby="profileTitle">
        <div class="dialog-header">
          <h2 id="profileTitle">Account details</h2>
          <button type="button" class="dialog-close" data-close-modal aria-label="Close modal"><i data-lucide="x"></i></button>
        </div>
        <form id="profileForm" class="profile-form" novalidate>
          <div class="profile-form-body">
            <label>Full name<input name="fullName" type="text" autocomplete="name" required /></label>
            <div class="profile-grid">
              <label>Age<input name="age" type="number" min="1" max="120" required /></label>
              <label>Birthday<input name="birthday" type="date" required /></label>
            </div>
            <label>Gender
              <select name="gender" required>
                <option value="">Select</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </label>
            <label>Username<input name="username" type="text" autocomplete="username" required /></label>
            <div class="password-row">
              <div>
                <span class="password-label">My password</span>
                <span class="password-value" id="profilePasswordValue">${PASSWORD_MASK}</span>
              </div>
              <div class="password-row-actions">
                <button type="button" id="toggleProfilePasswordButton" class="password-change-button" aria-label="Show password">
                  <i data-lucide="eye"></i>
                </button>
                <button type="button" id="changePasswordButton" class="password-change-button" aria-label="Change password">
                  <i data-lucide="key-round"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="dialog-actions">
            <button type="button" class="dialog-secondary" data-close-modal>Close</button>
            <button type="button" class="dialog-primary" id="profileEditButton">Edit</button>
          </div>
        </form>
      </section>
    </div>

    <div id="changePasswordModal" class="life-modal" aria-hidden="true">
      <section class="life-dialog profile-dialog" role="dialog" aria-modal="true" aria-labelledby="changePasswordTitle">
        <div class="dialog-header">
          <h2 id="changePasswordTitle">Change password</h2>
          <button type="button" class="dialog-close" data-close-modal aria-label="Close modal"><i data-lucide="x"></i></button>
        </div>
        <form id="changePasswordForm" class="profile-form" novalidate>
          <div class="profile-form-body">
            <label>Old password
              <span class="password-input-wrap">
                <input name="oldPassword" type="password" autocomplete="current-password" required />
                <button type="button" class="password-visibility" data-toggle-password aria-label="Show old password"><i data-lucide="eye"></i></button>
              </span>
            </label>
            <label>New password
              <span class="password-input-wrap">
                <input name="newPassword" type="password" autocomplete="new-password" minlength="6" required />
                <button type="button" class="password-visibility" data-toggle-password aria-label="Show new password"><i data-lucide="eye"></i></button>
              </span>
            </label>
            <label>Confirm new password
              <span class="password-input-wrap">
                <input name="confirmNewPassword" type="password" autocomplete="new-password" minlength="6" required />
                <button type="button" class="password-visibility" data-toggle-password aria-label="Show confirm password"><i data-lucide="eye"></i></button>
              </span>
            </label>
          </div>
          <div class="dialog-actions">
            <button type="button" class="dialog-secondary" data-close-modal>Close</button>
            <button type="button" class="dialog-primary" id="changePasswordSubmitButton">Update</button>
          </div>
        </form>
      </section>
    </div>
  `;

  const styles = `
    body.auth-locked .app-bg {
      filter: blur(4px);
      pointer-events: none;
      user-select: none;
    }
    .auth-overlay,
    .life-modal {
      position: fixed;
      inset: 0;
      z-index: 80;
      display: none;
      place-items: center;
      padding: 16px;
      background: rgba(248, 250, 252, 0.16);
      backdrop-filter: blur(3px) saturate(118%);
      -webkit-backdrop-filter: blur(3px) saturate(118%);
      overflow-y: auto;
      scrollbar-width: none;
    }
    .auth-overlay::-webkit-scrollbar,
    .life-modal::-webkit-scrollbar {
      display: none;
    }
    body.auth-locked .auth-overlay,
    .life-modal.open {
      display: grid;
    }
    #statusModal.open {
      z-index: 120;
    }
    .login-loading {
      position: fixed;
      inset: 0;
      z-index: 140;
      display: none;
      place-items: center;
      padding: 18px;
      background: rgba(248, 250, 252, 0.32);
      backdrop-filter: blur(7px) saturate(130%);
      -webkit-backdrop-filter: blur(7px) saturate(130%);
    }
    .login-loading.open {
      display: grid;
    }
    .login-loading-card {
      display: flex;
      align-items: center;
      gap: 16px;
      width: min(100%, 360px);
      border: 1px solid rgba(15, 23, 42, 0.07);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.94);
      padding: 18px;
      box-shadow: 0 22px 60px rgba(15, 23, 42, 0.14);
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Segoe UI", sans-serif;
      animation: modalRise 180ms ease-out both;
    }
    .login-loader {
      width: 42px;
      height: 42px;
      flex: 0 0 auto;
      border-radius: 999px;
      background: conic-gradient(from 0deg, #086b75, #75c7df, #8ccf72, transparent 78%);
      animation: loginSpin 850ms linear infinite;
      box-shadow: inset 0 0 0 9px rgba(255, 255, 255, 0.86);
    }
    .login-loading-card h2 {
      margin: 0;
      color: #111827;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.026em;
    }
    .login-loading-card p {
      margin: 4px 0 0;
      color: #7b8190;
      font-size: 13px;
      font-weight: 400;
      letter-spacing: -0.01em;
    }
    @keyframes loginSpin {
      to {
        transform: rotate(360deg);
      }
    }
    body.auth-locked .auth-card,
    .life-modal.open .life-dialog {
      animation: modalRise 180ms ease-out both;
    }
    @keyframes modalRise {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.985);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    .auth-card,
    .life-dialog {
      position: relative;
      width: min(100%, 560px);
      border: 1px solid rgba(17, 24, 39, 0.06);
      border-radius: 32px;
      background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(252,253,255,0.92));
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 26px 70px rgba(15, 23, 42, 0.13);
      backdrop-filter: blur(30px) saturate(180%);
      -webkit-backdrop-filter: blur(30px) saturate(180%);
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Segoe UI", sans-serif;
    }
    .auth-card {
      display: flex;
      flex-direction: column;
      overflow: visible;
      padding: 24px;
    }
    .auth-card.auth-welcome-mode {
      width: min(100%, 420px);
      min-height: auto;
      overflow: visible;
      border: 1px solid rgba(15, 23, 42, 0.06);
      border-radius: 30px;
      background: rgba(255,255,255,0.96);
      padding: 24px;
      box-shadow: 0 24px 70px rgba(15, 23, 42, 0.14);
    }
    .auth-card.auth-welcome-mode .form-brand,
    .auth-card.auth-welcome-mode .auth-tabs,
    .auth-card.auth-welcome-mode .remembered-list,
    .auth-card.auth-welcome-mode .auth-form {
      display: none !important;
    }
    .auth-card.auth-form-mode .auth-welcome {
      display: none;
    }
    .auth-card.auth-form-mode .form-brand {
      display: flex;
    }
    .auth-welcome {
      position: relative;
      display: flex;
      min-height: auto;
      flex-direction: column;
      align-items: center;
      padding: 8px 0 0;
      background:
        radial-gradient(circle at 30% 80%, rgba(140, 207, 114, 0.16), transparent 30%),
        radial-gradient(circle at 76% 72%, rgba(117, 199, 223, 0.14), transparent 32%),
        #ffffff;
      text-align: center;
    }
    .welcome-mark {
      width: 70px;
      height: 70px;
      border-radius: 22px;
      box-shadow: none;
    }
    .welcome-mark::before,
    .welcome-mark::after {
      left: 15px;
      width: 38px;
      height: 66px;
    }
    .welcome-mark::before {
      top: -15px;
    }
    .welcome-mark::after {
      bottom: -17px;
    }
    .auth-welcome h1 {
      margin: 12px 0 0;
      font-size: 34px;
      font-weight: 400;
      letter-spacing: -0.05em;
      line-height: 1;
    }
    .auth-welcome h1 span {
      color: #7bc86c;
      font-weight: 400;
    }
    .auth-welcome h1 strong {
      color: #62bbe0;
      font-weight: 500;
    }
    .auth-welcome h2 {
      margin: 24px 0 0;
      color: #111827;
      font-size: 19px;
      font-weight: 650;
      letter-spacing: -0.03em;
    }
    .auth-welcome p {
      margin: 5px 0 0;
      color: #6b7280;
      font-size: 12px;
      font-weight: 500;
    }
    .welcome-character {
      width: 205px;
      height: 205px;
      margin-top: 16px;
      object-fit: contain;
      object-position: center;
      border-radius: 0;
      filter: drop-shadow(0 16px 24px rgba(15, 23, 42, 0.13));
    }
    .welcome-actions {
      display: grid;
      width: 100%;
      gap: 10px;
      margin-top: auto;
      padding-top: 18px;
    }
    .welcome-primary,
    .welcome-secondary {
      min-height: 36px;
      border: 0;
      border-radius: 9px;
      font: inherit;
      font-size: 12px;
      font-weight: 650;
      cursor: pointer;
      transition: transform 160ms ease, filter 160ms ease;
    }
    .welcome-primary {
      background: #7bc86c;
      color: #ffffff;
      box-shadow: 0 10px 18px rgba(123, 200, 108, 0.20);
    }
    .welcome-secondary {
      background: #cceefd;
      color: #111827;
    }
    .welcome-primary:active,
    .welcome-secondary:active {
      transform: translateY(1px) scale(0.99);
    }
    .auth-back {
      display: grid;
      width: 36px;
      height: 36px;
      flex: 0 0 auto;
      place-items: center;
      border: 0;
      border-radius: 999px;
      background: #f4f7fb;
      color: #334155;
      cursor: pointer;
    }
    .auth-back svg {
      width: 18px;
      height: 18px;
    }
    .auth-brand {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-bottom: 24px;
    }
    .auth-brand h2,
    .life-dialog h2 {
      margin: 0;
      color: #111827;
      font-size: 25px;
      font-weight: 650;
      letter-spacing: -0.032em;
    }
    .auth-brand p,
    .life-dialog p {
      margin: 5px 0 0;
      color: #6f7682;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.48;
    }
    .auth-brand-mark {
      position: relative;
      width: 72px;
      height: 72px;
      flex: 0 0 auto;
      overflow: hidden;
      border-radius: 0;
      background: url("lifeos_icon.png") center / contain no-repeat;
      box-shadow: none;
      mix-blend-mode: multiply;
    }
    .auth-brand h2 {
      font-size: 34px;
      font-weight: 650;
    }
    .auth-brand-mark::before,
    .auth-brand-mark::after {
      display: none;
    }
    .auth-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      margin-bottom: 16px;
      flex: 0 0 auto;
      padding: 4px;
      border-radius: 16px;
      background: #f4f5f7;
    }
    .auth-tab {
      height: 42px;
      min-width: 0;
      border: 0;
      border-radius: 13px;
      background: transparent;
      color: #6b7280;
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .auth-tab.active {
      background: #ffffff;
      color: #111827;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05), 0 8px 22px rgba(15, 23, 42, 0.06);
    }
    .auth-form {
      display: grid;
      gap: 13px;
      min-height: 0;
    }
    .auth-form.hidden,
    .remembered-list:empty {
      display: none;
    }
    .auth-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    body.auth-mode-signup .remembered-list {
      display: none;
    }
    #signupForm {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 12px;
    }
    #signupForm .auth-grid {
      display: contents;
    }
    #signupForm > label,
    #signupForm .auth-primary {
      min-width: 0;
    }
    #signupForm .auth-primary {
      grid-column: 1 / -1;
    }
    .auth-form label {
      display: grid;
      gap: 6px;
      color: #6b7280;
      font-size: 12px;
      font-weight: 550;
      letter-spacing: 0.01em;
    }
    .auth-form input,
    .auth-form select {
      width: 100%;
      min-height: 42px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.88);
      padding: 0 14px;
      color: #111827;
      font: inherit;
      font-size: 15px;
      outline: none;
    }
    .auth-form input:focus,
    .auth-form select:focus {
      border-color: rgba(10, 132, 255, 0.48);
      box-shadow: 0 0 0 4px rgba(10, 132, 255, 0.13);
    }
    .auth-primary,
    .dialog-primary {
      min-height: 46px;
      border: 0;
      border-radius: 17px;
      background: #0a84ff;
      color: #ffffff;
      font: inherit;
      font-size: 14px;
      font-weight: 650;
      cursor: pointer;
      box-shadow: 0 14px 30px rgba(10, 132, 255, 0.22);
      transition: background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }
    .auth-primary:hover,
    .dialog-primary:hover {
      background: #0071e3;
      box-shadow: 0 16px 34px rgba(10, 132, 255, 0.26);
    }
    .auth-primary:active,
    .dialog-primary:active {
      transform: translateY(1px) scale(0.99);
    }
    .remembered-list {
      display: grid;
      gap: 8px;
      margin-bottom: 12px;
    }
    .remembered-account {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      border: 1px solid rgba(10, 132, 255, 0.13);
      border-radius: 17px;
      background: rgba(10, 132, 255, 0.07);
      padding: 8px 10px;
      color: #0a4f95;
      font: inherit;
      font-size: 14px;
      font-weight: 550;
      cursor: pointer;
      text-align: left;
      line-height: 1.25;
      white-space: normal;
      transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }
    .remembered-account:hover {
      border-color: rgba(10, 132, 255, 0.24);
      background: rgba(10, 132, 255, 0.10);
      transform: translateY(-1px);
    }
    .remembered-avatar {
      display: grid;
      width: 30px;
      height: 30px;
      place-items: center;
      border-radius: 999px;
      background: #0a84ff;
      color: white;
      font-size: 12px;
    }
    .life-dialog {
      width: min(100%, 520px);
      max-height: calc(100dvh - 32px);
      overflow: hidden;
      padding: 0;
      border: 1px solid rgba(15, 23, 42, 0.07);
      border-radius: 22px;
      background:
        radial-gradient(circle at 16% 0%, rgba(140, 207, 114, 0.12), transparent 34%),
        radial-gradient(circle at 92% 12%, rgba(117, 199, 223, 0.14), transparent 34%),
        rgba(255, 255, 255, 0.97);
      box-shadow: 0 28px 80px rgba(15, 23, 42, 0.18), 0 1px 2px rgba(15, 23, 42, 0.05);
      text-align: left;
    }
    .dialog-header {
      display: flex;
      min-height: 70px;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 1px solid rgba(15, 23, 42, 0.07);
      padding: 0 20px;
    }
    .dialog-header h2 {
      min-width: 0;
      color: #1f2937;
      font-size: 22px;
      font-weight: 560;
      letter-spacing: -0.026em;
      line-height: 1.15;
      overflow-wrap: anywhere;
    }
    .dialog-close {
      display: grid;
      width: 38px;
      height: 38px;
      flex: 0 0 auto;
      place-items: center;
      border: 0;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.68);
      color: #8a94a3;
      cursor: pointer;
      transition: background-color 160ms ease, color 160ms ease;
    }
    .dialog-close:hover {
      background: #eef7f5;
      color: #086b75;
    }
    .dialog-close svg {
      width: 17px;
      height: 17px;
      stroke-width: 2;
    }
    .dialog-body {
      display: flex;
      min-height: 86px;
      align-items: center;
      padding: 22px 20px;
    }
    .dialog-body p {
      margin: 0;
      max-width: 100%;
      color: #667085;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.6;
      overflow-wrap: anywhere;
    }
    .status-dialog {
      width: min(100%, 520px);
      padding: 0;
      text-align: left;
    }
    .status-dialog .dialog-actions {
      justify-content: flex-end;
    }
    .status-dialog #statusMessage {
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
    }
    .dialog-actions {
      display: flex;
      min-height: 82px;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      border-top: 1px solid rgba(15, 23, 42, 0.07);
      background: rgba(248, 251, 252, 0.84);
      margin-top: 0;
      padding: 16px 20px;
      flex-wrap: wrap;
    }
    .dialog-secondary {
      min-width: 104px;
      min-height: 44px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 14px;
      background: #ffffff;
      color: #475569;
      padding: 0 22px;
      font: inherit;
      font-size: 13px;
      font-weight: 650;
      text-transform: none;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
      transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }
    .dialog-secondary:hover {
      background: #f8fafc;
      color: #1f2937;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
    }
    .dialog-secondary:active {
      transform: translateY(1px);
    }
    .dialog-primary {
      min-width: 112px;
      min-height: 44px;
      border-radius: 14px;
      background: linear-gradient(135deg, #7bc86c, #55b3dc);
      padding: 0 22px;
      font-size: 13px;
      font-weight: 700;
      text-transform: none;
      box-shadow: 0 14px 30px rgba(85, 179, 220, 0.22);
    }
    .dialog-primary:hover {
      background: linear-gradient(135deg, #70bf62, #45a8d2);
      box-shadow: 0 16px 34px rgba(85, 179, 220, 0.28);
    }
    .profile-dialog {
      width: min(100%, 560px);
      max-height: calc(100dvh - 32px);
      overflow-y: auto;
      scrollbar-width: none;
    }
    .profile-dialog::-webkit-scrollbar {
      display: none;
    }
    .profile-form {
      display: block;
      margin: 0;
    }
    .profile-form-body {
      display: grid;
      gap: 12px;
      padding: 18px 14px;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .profile-form label {
      display: grid;
      gap: 6px;
      color: #6b7280;
      font-size: 12px;
      font-weight: 550;
      letter-spacing: 0.01em;
    }
    .profile-form input,
    .profile-form select {
      width: 100%;
      min-height: 42px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 10px;
      background: #ffffff;
      padding: 0 12px;
      color: #111827;
      font: inherit;
      font-size: 14px;
      outline: none;
    }
    .profile-form input:focus,
    .profile-form select:focus {
      border-color: rgba(10, 132, 255, 0.42);
      box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.11);
    }
    .profile-form input:disabled,
    .profile-form select:disabled {
      border-color: rgba(15, 23, 42, 0.06);
      background: #f8fafc;
      color: #374151;
      cursor: default;
      opacity: 1;
    }
    .password-row {
      display: flex;
      min-height: 58px;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border: 1px solid rgba(10, 132, 255, 0.13);
      border-radius: 10px;
      background: #f8fbff;
      padding: 10px 10px 10px 12px;
    }
    .password-label {
      display: block;
      color: #334155;
      font-size: 13px;
      font-weight: 650;
      letter-spacing: 0.01em;
    }
    .password-value {
      display: block;
      padding-top: 5px;
      color: #475569;
      font-size: 15px;
      letter-spacing: 0.08em;
    }
    .password-row-actions {
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
    }
    .password-change-button {
      display: grid;
      width: 36px;
      height: 36px;
      flex: 0 0 auto;
      place-items: center;
      border: 0;
      border-radius: 10px;
      background: #eef7f5;
      color: #086b75;
      cursor: pointer;
      transition: background-color 160ms ease, transform 160ms ease;
    }
    .password-change-button:hover {
      background: #e2f1ee;
    }
    .password-change-button:active {
      transform: translateY(1px);
    }
    .password-change-button svg {
      width: 18px;
      height: 18px;
      stroke-width: 2;
    }
    .password-input-wrap {
      position: relative;
      display: block;
    }
    .password-input-wrap input {
      padding-right: 46px;
    }
    .password-input-wrap input::-ms-reveal,
    .password-input-wrap input::-ms-clear {
      display: none;
    }
    .password-input-wrap input::-webkit-credentials-auto-fill-button,
    .password-input-wrap input::-webkit-caps-lock-indicator {
      visibility: hidden;
      display: none !important;
      pointer-events: none;
    }
    .password-visibility {
      position: absolute;
      right: 6px;
      top: 50%;
      display: grid;
      width: 32px;
      height: 32px;
      place-items: center;
      border: 0;
      border-radius: 9px;
      background: transparent;
      color: #8a94a3;
      cursor: pointer;
      transform: translateY(-50%);
      transition: background-color 160ms ease, color 160ms ease;
    }
    .password-visibility:hover,
    .password-visibility.active {
      background: #eef7f5;
      color: #086b75;
    }
    .password-visibility svg {
      width: 17px;
      height: 17px;
      stroke-width: 2;
    }
    @media (max-width: 520px) {
      body.auth-locked .app-bg {
        filter: blur(3px);
      }
      .auth-overlay,
      .life-modal {
        align-items: center;
        padding: 8px;
        backdrop-filter: blur(2px) saturate(112%);
        -webkit-backdrop-filter: blur(2px) saturate(112%);
      }
      .auth-card,
      .life-dialog {
        width: min(100%, 414px);
        border-radius: 26px;
      }
      .auth-welcome {
        min-height: auto;
        padding: 8px 0 0;
      }
      .welcome-character {
        width: 196px;
        height: 196px;
      }
      .auth-card {
        padding: 16px;
      }
      .auth-card.auth-welcome-mode {
        padding: 16px;
        border-radius: 26px;
      }
      .auth-brand {
        gap: 14px;
        margin-bottom: 18px;
      }
      .auth-brand h2,
      .life-dialog h2 {
        font-size: 22px;
      }
      .auth-brand p,
      .life-dialog p {
        font-size: 13px;
      }
      .auth-brand-mark {
        width: 66px;
        height: 66px;
        border-radius: 16px;
      }
      .auth-brand h2 {
        font-size: 30px;
      }
      .auth-brand-mark::before,
      .auth-brand-mark::after {
        left: 8px;
        width: 27px;
        height: 45px;
      }
      .auth-tabs {
        margin-bottom: 10px;
        border-radius: 15px;
      }
      .auth-tab {
        height: 38px;
        border-radius: 12px;
        font-size: 12px;
        letter-spacing: -0.01em;
      }
      .auth-grid {
        grid-template-columns: 1fr;
        gap: 11px;
      }
      .auth-form {
        gap: 10px;
      }
      #signupForm {
        grid-template-columns: 1fr;
      }
      .auth-form input,
      .auth-form select {
        min-height: 41px;
        border-radius: 15px;
        font-size: 14px;
      }
      .auth-primary,
      .dialog-primary {
        min-height: 46px;
        border-radius: 16px;
      }
      .dialog-actions {
        flex-direction: column-reverse;
        gap: 8px;
      }
      .dialog-actions button {
        width: 100%;
      }
      .profile-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-height: 680px) {
      .auth-card {
        padding: 14px;
      }
      .auth-brand {
        margin-bottom: 10px;
      }
      .auth-tabs {
        margin-bottom: 8px;
      }
      .auth-form {
        gap: 9px;
      }
      .auth-form input,
      .auth-form select {
        min-height: 42px;
      }
    }
    @media (max-width: 360px) {
      .auth-card {
        padding: 14px;
      }
      .auth-brand {
        align-items: flex-start;
      }
      .auth-brand-mark {
        width: 60px;
        height: 60px;
      }
      .auth-brand h2 {
        font-size: 28px;
      }
      .auth-tab {
        font-size: 11px;
      }
      .auth-form {
        gap: 8px;
      }
    }
  `;

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function currentPageName() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  function rememberCurrentPage() {
    const page = currentPageName();
    if (APP_PAGES.has(page)) {
      localStorage.setItem(LAST_PAGE_KEY, page);
    }
  }

  function getLastAppPage() {
    const saved = localStorage.getItem(LAST_PAGE_KEY);
    return APP_PAGES.has(saved) ? saved : "dashboard.html";
  }

  function getAccounts() {
    return readJson(ACCOUNTS_KEY, []);
  }

  function setSession(account) {
    localStorage.setItem(SESSION_KEY, account.username);
    updateUserDisplay(account);
    document.body.classList.remove("auth-locked");
  }

  function getCurrentAccount() {
    const username = localStorage.getItem(SESSION_KEY);
    return getAccounts().find((account) => account.username === username) || null;
  }

  function initials(name) {
    return (name || "User").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }

  function updateUserDisplay(account) {
    document.querySelectorAll("[data-user-display]").forEach((node) => {
      node.textContent = account ? account.username : "Guest";
    });
    document.querySelectorAll("[data-user-avatar]").forEach((node) => {
      node.textContent = account ? initials(account.fullName) : "GU";
    });
  }

  function fillProfileForm(account) {
    const form = document.getElementById("profileForm");
    form.elements.fullName.value = account.fullName || "";
    form.elements.age.value = account.age || "";
    form.elements.birthday.value = account.birthday || "";
    form.elements.gender.value = account.gender || "";
    form.elements.username.value = account.username || "";
    const passwordValue = document.getElementById("profilePasswordValue");
    passwordValue.textContent = PASSWORD_MASK;
    passwordValue.dataset.visible = "false";
    passwordValue.style.letterSpacing = "0.08em";
    const toggleButton = document.getElementById("toggleProfilePasswordButton");
    toggleButton.classList.remove("active");
    toggleButton.setAttribute("aria-label", "Show password");
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function setProfileEditMode(isEditing) {
    const form = document.getElementById("profileForm");
    const editButton = document.getElementById("profileEditButton");
    const changePasswordButton = document.getElementById("changePasswordButton");
    const toggleProfilePasswordButton = document.getElementById("toggleProfilePasswordButton");

    Array.from(form.elements).forEach((element) => {
      if (element.id === "profileEditButton" || element.id === "changePasswordButton" || element.id === "toggleProfilePasswordButton" || element.matches("[data-close-modal]")) return;
      element.disabled = !isEditing;
    });

    changePasswordButton.disabled = false;
    toggleProfilePasswordButton.disabled = false;

    editButton.type = isEditing ? "submit" : "button";
    editButton.textContent = isEditing ? "Update" : "Edit";
    form.dataset.mode = isEditing ? "edit" : "view";
  }

  function openProfileModal() {
    const account = getCurrentAccount();
    if (!account) {
      showStatusModal("error", "Unable to open account", "Please sign in before editing your account details.");
      return;
    }

    fillProfileForm(account);
    setProfileEditMode(false);
    showDialog("profileModal");
  }

  function showDialog(id) {
    const dialog = document.getElementById(id);
    dialog.classList.add("open");
    dialog.setAttribute("aria-hidden", "false");
  }

  function closeDialog(id) {
    const dialog = document.getElementById(id);
    dialog.classList.remove("open");
    dialog.setAttribute("aria-hidden", "true");
  }

  function renderRememberedAccounts() {
    const container = document.getElementById("rememberedAccounts");
    const remembered = readJson(REMEMBER_KEY, []);
    const accounts = getAccounts();
    const rememberedAccounts = remembered
      .map((username) => accounts.find((account) => account.username === username))
      .filter(Boolean);

    container.innerHTML = rememberedAccounts.map((account) => `
      <button type="button" class="remembered-account" data-remember-login="${account.username}">
        <span class="remembered-avatar">${initials(account.fullName)}</span>
        Continue as ${account.fullName}
      </button>
    `).join("");
  }

  function showAuth(tab = "signin") {
    renderRememberedAccounts();
    setAuthTab(tab);
    document.body.classList.add("auth-locked");
    document.getElementById("authOverlay").setAttribute("aria-hidden", "false");
  }

  function hideAuth() {
    document.body.classList.remove("auth-locked");
    document.getElementById("authOverlay").setAttribute("aria-hidden", "true");
  }

  function setAuthTab(tab) {
    document.querySelector(".auth-card").classList.remove("auth-welcome-mode");
    document.querySelector(".auth-card").classList.add("auth-form-mode");
    document.body.classList.toggle("auth-mode-signup", tab === "signup");
    document.body.classList.toggle("auth-mode-signin", tab === "signin");
    document.querySelectorAll("[data-auth-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.authTab === tab);
    });
    document.getElementById("signinForm").classList.toggle("hidden", tab !== "signin");
    document.getElementById("signupForm").classList.toggle("hidden", tab !== "signup");
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeAuthForm() {
    const isLandingPage = document.body.dataset.authPage === "landing";
    if (isLandingPage) {
      hideAuth();
      return;
    }
    setAuthTab("signin");
  }

  function goToLoginPage() {
    if (document.body.dataset.authPage === "landing") {
      hideAuth();
      return;
    }
    window.location.href = "index.html";
  }

  function showStatusModal(type, title, message) {
    document.getElementById("statusTitle").textContent = title;
    document.getElementById("statusMessage").textContent = message;
    showDialog("statusModal");
  }

  function completeAuthWithLoading(account, title, message, form) {
    const loading = document.getElementById("loginLoading");
    const isLandingPage = document.body.dataset.authPage === "landing";
    setSession(account);
    if (form) form.reset();
    hideAuth();
    loading.classList.add("open");
    loading.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      loading.classList.remove("open");
      loading.setAttribute("aria-hidden", "true");
      if (isLandingPage) {
        window.location.href = getLastAppPage();
        return;
      }
      showStatusModal("success", title, message);
    }, 900);
  }

  function isValidAge(value) {
    const age = Number(value);
    return Number.isInteger(age) && age >= 1 && age <= 120;
  }

  function handlePasswordUpdate() {
    const current = getCurrentAccount();
    if (!current) {
      showStatusModal("error", "Unable to update", "Please sign in before changing your password.");
      return;
    }

    const form = document.getElementById("changePasswordForm");
    const formData = new FormData(form);
    const oldPassword = String(formData.get("oldPassword") || "");
    const newPassword = String(formData.get("newPassword") || "");
    const confirmNewPassword = String(formData.get("confirmNewPassword") || "");

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      showStatusModal("error", "Missing password details", "Please complete the old password, new password, and confirm password fields.");
      return;
    }
    if (oldPassword !== current.password) {
      showStatusModal("error", "Incorrect password", "The old password you entered does not match your current password.");
      return;
    }
    if (newPassword.length < 6) {
      showStatusModal("error", "Password is too short", "Your new password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showStatusModal("error", "Passwords do not match", "Please make sure your new password and confirmation are exactly the same.");
      return;
    }
    if (newPassword === current.password) {
      showStatusModal("error", "Choose a new password", "Your new password must be different from your old password.");
      return;
    }

    const updated = { ...current, password: newPassword };
    const nextAccounts = getAccounts().map((account) => account.username === current.username ? updated : account);
    writeJson(ACCOUNTS_KEY, nextAccounts);
    updateUserDisplay(updated);

    const profilePasswordValue = document.getElementById("profilePasswordValue");
    const profilePasswordToggle = document.getElementById("toggleProfilePasswordButton");
    if (profilePasswordValue && profilePasswordToggle) {
      const isVisible = profilePasswordToggle.classList.contains("active");
      profilePasswordValue.textContent = isVisible ? newPassword : PASSWORD_MASK;
      profilePasswordValue.dataset.visible = isVisible ? "true" : "false";
      profilePasswordValue.style.letterSpacing = isVisible ? "0" : "0.08em";
    }

    form.reset();
    closeDialog("changePasswordModal");
    showStatusModal("success", "Password updated", "Your password was updated successfully.");
  }

  function setupAuth() {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML("beforeend", modalMarkup);
    if (window.lucide) {
      window.lucide.createIcons();
    }

    document.querySelectorAll("[data-auth-tab]").forEach((button) => {
      button.addEventListener("click", () => setAuthTab(button.dataset.authTab));
    });
    document.getElementById("welcomeGetStarted").addEventListener("click", () => setAuthTab("signup"));
    document.getElementById("welcomeLogin").addEventListener("click", () => setAuthTab("signin"));
    document.getElementById("authBackButton").addEventListener("click", closeAuthForm);
    setAuthTab("signin");
    window.lifeOSOpenAuth = (tab) => {
      showAuth(tab);
    };

    document.getElementById("signupForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const account = {
        fullName: String(formData.get("fullName") || "").trim(),
        age: String(formData.get("age") || "").trim(),
        birthday: String(formData.get("birthday") || "").trim(),
        gender: String(formData.get("gender") || "").trim(),
        username: String(formData.get("username") || "").trim(),
        password: String(formData.get("password") || "")
      };
      const confirmPassword = String(formData.get("confirmPassword") || "");
      const accounts = getAccounts();

      if (!account.fullName || !account.age || !account.birthday || !account.gender || !account.username || !account.password || !confirmPassword) {
        showStatusModal("error", "Missing details", "Please complete all account fields before creating your account.");
        return;
      }
      if (!isValidAge(account.age)) {
        showStatusModal("error", "Invalid age", "Please enter an age between 1 and 120.");
        return;
      }
      if (account.password.length < 6) {
        showStatusModal("error", "Password is too short", "Your password must be at least 6 characters long.");
        return;
      }
      if (account.password !== confirmPassword) {
        showStatusModal("error", "Passwords do not match", "Please make sure your password and confirm password are exactly the same.");
        return;
      }
      if (accounts.some((item) => item.username.toLowerCase() === account.username.toLowerCase())) {
        showStatusModal("error", "Username already exists", "Choose a different username or sign in with the account you already created.");
        return;
      }

      accounts.push(account);
      writeJson(ACCOUNTS_KEY, accounts);
      completeAuthWithLoading(account, "Account created", "Your lifeOS account was created successfully. You are now signed in.", form);
    });

    document.getElementById("signinForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const username = String(formData.get("username") || "").trim();
      const password = String(formData.get("password") || "");
      const account = getAccounts().find((item) => item.username === username && item.password === password);

      if (!username || !password) {
        showStatusModal("error", "Missing sign in details", "Please enter both your username and password.");
        return;
      }
      if (!account) {
        showStatusModal("error", "Unable to sign in", "The username or password you entered is incorrect.");
        return;
      }

      completeAuthWithLoading(account, "Signed in", `Welcome back, ${account.username}.`, event.currentTarget);
    });

    document.getElementById("rememberedAccounts").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remember-login]");
      if (!button) return;
      const account = getAccounts().find((item) => item.username === button.dataset.rememberLogin);
      if (account) {
        completeAuthWithLoading(account, "Signed in", `Welcome back, ${account.username}.`);
      }
    });

    document.querySelectorAll("[data-profile-button]").forEach((button) => {
      button.addEventListener("click", openProfileModal);
    });

    document.getElementById("profileEditButton").addEventListener("click", (event) => {
      const form = document.getElementById("profileForm");
      if (form.dataset.mode !== "edit") {
        event.preventDefault();
        setProfileEditMode(true);
        form.elements.fullName.focus();
      }
    });

    document.getElementById("toggleProfilePasswordButton").addEventListener("click", () => {
      const account = getCurrentAccount();
      if (!account) {
        showStatusModal("error", "Unable to show password", "Please sign in before viewing your password.");
        return;
      }

      const value = document.getElementById("profilePasswordValue");
      const button = document.getElementById("toggleProfilePasswordButton");
      const shouldShow = value.dataset.visible !== "true";
      value.textContent = shouldShow ? account.password : PASSWORD_MASK;
      value.dataset.visible = shouldShow ? "true" : "false";
      value.style.letterSpacing = shouldShow ? "0" : "0.08em";
      button.classList.toggle("active", shouldShow);
      button.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");
    });

    document.getElementById("profileForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.currentTarget.dataset.mode !== "edit") return;

      const current = getCurrentAccount();
      if (!current) {
        showStatusModal("error", "Unable to update", "Please sign in before updating your account details.");
        return;
      }

      const form = event.currentTarget;
      const formData = new FormData(form);
      const updated = {
        ...current,
        fullName: String(formData.get("fullName") || "").trim(),
        age: String(formData.get("age") || "").trim(),
        birthday: String(formData.get("birthday") || "").trim(),
        gender: String(formData.get("gender") || "").trim(),
        username: String(formData.get("username") || "").trim()
      };
      const accounts = getAccounts();

      if (!updated.fullName || !updated.age || !updated.birthday || !updated.gender || !updated.username) {
        showStatusModal("error", "Missing details", "Please complete all required account fields before updating.");
        return;
      }
      if (!isValidAge(updated.age)) {
        showStatusModal("error", "Invalid age", "Please enter an age between 1 and 120.");
        return;
      }
      if (accounts.some((account) => account.username.toLowerCase() === updated.username.toLowerCase() && account.username !== current.username)) {
        showStatusModal("error", "Username already exists", "Choose a different username before updating your account.");
        return;
      }
      if (
        updated.fullName === current.fullName &&
        updated.age === current.age &&
        updated.birthday === current.birthday &&
        updated.gender === current.gender &&
        updated.username === current.username
      ) {
        showStatusModal("error", "No changes to update", "Edit at least one account detail before clicking Update.");
        return;
      }

      const nextAccounts = accounts.map((account) => account.username === current.username ? updated : account);
      writeJson(ACCOUNTS_KEY, nextAccounts);
      localStorage.setItem(SESSION_KEY, updated.username);

      const remembered = readJson(REMEMBER_KEY, []);
      if (remembered.includes(current.username)) {
        writeJson(REMEMBER_KEY, remembered.map((username) => username === current.username ? updated.username : username));
      }

      updateUserDisplay(updated);
      closeDialog("profileModal");
      showStatusModal("success", "Account updated", "Your account details were updated successfully.");
    });

    document.getElementById("changePasswordButton").addEventListener("click", () => {
      document.getElementById("changePasswordForm").reset();
      document.querySelectorAll("[data-toggle-password]").forEach((button) => {
        const input = button.closest(".password-input-wrap").querySelector("input");
        input.type = "password";
        button.classList.remove("active");
        button.setAttribute("aria-label", button.getAttribute("aria-label").replace("Hide", "Show"));
      });
      if (window.lucide) {
        window.lucide.createIcons();
      }
      showDialog("changePasswordModal");
    });

    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = button.closest(".password-input-wrap").querySelector("input");
        const shouldShow = input.type === "password";
        input.type = shouldShow ? "text" : "password";
        button.classList.toggle("active", shouldShow);
        button.setAttribute("aria-label", `${shouldShow ? "Hide" : "Show"} password`);
      });
    });

    document.getElementById("changePasswordSubmitButton").addEventListener("click", () => {
      handlePasswordUpdate();
    });

    document.getElementById("changePasswordForm").addEventListener("submit", (event) => {
      event.preventDefault();
      handlePasswordUpdate();
    });

    document.getElementById("statusOkButton").addEventListener("click", () => {
      closeDialog("statusModal");
    });

    document.querySelectorAll("[data-logout-button]").forEach((button) => {
      button.addEventListener("click", () => showDialog("logoutConfirmModal"));
    });

    document.querySelectorAll("[data-close-dialog], [data-close-modal]").forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".life-modal");
        if (modal) {
          closeDialog(modal.id);
        }
      });
    });

    document.getElementById("confirmLogoutButton").addEventListener("click", () => {
      closeDialog("logoutConfirmModal");
      showDialog("rememberModal");
    });

    document.getElementById("rememberAccountButton").addEventListener("click", () => {
      const account = getCurrentAccount();
      if (account) {
        const remembered = new Set(readJson(REMEMBER_KEY, []));
        remembered.add(account.username);
        writeJson(REMEMBER_KEY, Array.from(remembered));
      }
      localStorage.removeItem(SESSION_KEY);
      closeDialog("rememberModal");
      goToLoginPage();
    });

    document.getElementById("dontRememberButton").addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      closeDialog("rememberModal");
      goToLoginPage();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDialog("logoutConfirmModal");
        closeDialog("rememberModal");
        closeDialog("statusModal");
      }
    });

    const account = getCurrentAccount();
    const isLandingPage = document.body.dataset.authPage === "landing";
    if (account) {
      updateUserDisplay(account);
      hideAuth();
      if (isLandingPage) {
        window.location.href = getLastAppPage();
        return;
      }
      rememberCurrentPage();
    } else if (isLandingPage) {
      updateUserDisplay(null);
      hideAuth();
    } else {
      updateUserDisplay(null);
      showAuth();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAuth);
  } else {
    setupAuth();
  }
})();
