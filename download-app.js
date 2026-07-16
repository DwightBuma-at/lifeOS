(function () {
  if (document.getElementById("downloadAppButton")) return;

  const styles = document.createElement("style");
  styles.textContent = `
    .download-app-button {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 70;
      min-height: 38px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.88);
      color: #086b75;
      padding: 0 14px;
      font: inherit;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Segoe UI", sans-serif;
      font-size: 12px;
      font-weight: 650;
      letter-spacing: -0.01em;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
      backdrop-filter: blur(18px) saturate(160%);
      -webkit-backdrop-filter: blur(18px) saturate(160%);
      cursor: pointer;
      transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
    }
    .download-app-button:hover {
      background: #ffffff;
      box-shadow: 0 16px 34px rgba(15, 23, 42, 0.16);
      transform: translateY(-1px);
    }
    .download-app-modal {
      position: fixed;
      inset: 0;
      z-index: 160;
      display: none;
      place-items: center;
      padding: 16px;
      background: rgba(15, 23, 42, 0.20);
      backdrop-filter: blur(8px) saturate(130%);
      -webkit-backdrop-filter: blur(8px) saturate(130%);
    }
    .download-app-modal.open {
      display: grid;
    }
    .download-app-dialog {
      width: min(100%, 430px);
      max-height: calc(100dvh - 32px);
      overflow: hidden;
      border: 1px solid rgba(15, 23, 42, 0.07);
      border-radius: 22px;
      background:
        radial-gradient(circle at 16% 0%, rgba(140, 207, 114, 0.13), transparent 34%),
        radial-gradient(circle at 92% 10%, rgba(117, 199, 223, 0.15), transparent 34%),
        rgba(255, 255, 255, 0.98);
      box-shadow: 0 28px 80px rgba(15, 23, 42, 0.18), 0 1px 2px rgba(15, 23, 42, 0.05);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Inter", "Segoe UI", sans-serif;
    }
    .download-app-header {
      display: flex;
      min-height: 62px;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border-bottom: 1px solid rgba(15, 23, 42, 0.07);
      padding: 0 18px;
    }
    .download-app-header h2 {
      margin: 0;
      color: #1f2937;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.026em;
    }
    .download-app-close {
      display: grid;
      width: 36px;
      height: 36px;
      flex: 0 0 auto;
      place-items: center;
      border: 0;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.68);
      color: #8a94a3;
      cursor: pointer;
    }
    .download-app-close:hover {
      background: #eef7f5;
      color: #086b75;
    }
    .download-app-list {
      display: grid;
      gap: 10px;
      max-height: calc(100dvh - 150px);
      overflow-y: auto;
      padding: 16px;
      scrollbar-width: none;
    }
    .download-app-list::-webkit-scrollbar {
      display: none;
    }
    .download-app-step {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      gap: 12px;
      align-items: start;
      border: 1px solid rgba(15, 23, 42, 0.06);
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.78);
      padding: 12px;
    }
    .download-app-number {
      display: grid;
      width: 34px;
      height: 34px;
      place-items: center;
      border-radius: 12px;
      background: linear-gradient(135deg, #8ccf72, #75c7df);
      color: #ffffff;
      font-size: 14px;
      font-weight: 750;
    }
    .download-app-step h3 {
      margin: 0;
      color: #111827;
      font-size: 14px;
      font-weight: 650;
      letter-spacing: -0.018em;
    }
    .download-app-step p {
      margin: 3px 0 0;
      color: #667085;
      font-size: 13px;
      line-height: 1.45;
    }
    @media (max-width: 520px) {
      .download-app-button {
        right: 14px;
        bottom: 14px;
        min-height: 36px;
        padding: 0 12px;
      }
      .download-app-modal {
        padding: 12px;
      }
    }
  `;
  document.head.appendChild(styles);

  const button = document.createElement("button");
  button.id = "downloadAppButton";
  button.type = "button";
  button.className = "download-app-button";
  button.textContent = "Download app";

  const modal = document.createElement("div");
  modal.id = "downloadAppModal";
  modal.className = "download-app-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <section class="download-app-dialog" role="dialog" aria-modal="true" aria-labelledby="downloadAppTitle">
      <div class="download-app-header">
        <h2 id="downloadAppTitle">Download app</h2>
        <button type="button" class="download-app-close" aria-label="Close download instructions">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="download-app-list">
        <article class="download-app-step">
          <span class="download-app-number">1</span>
          <div><h3>Open in Browser</h3><p>Open this page in Safari or Chrome.</p></div>
        </article>
        <article class="download-app-step">
          <span class="download-app-number">2</span>
          <div><h3>Click Share</h3><p>Tap the share button.</p></div>
        </article>
        <article class="download-app-step">
          <span class="download-app-number">3</span>
          <div><h3>Click View More</h3><p>Scroll down and tap "More".</p></div>
        </article>
        <article class="download-app-step">
          <span class="download-app-number">4</span>
          <div><h3>Add to Home Screen</h3><p>Tap "Add to Home Screen".</p></div>
        </article>
        <article class="download-app-step">
          <span class="download-app-number">5</span>
          <div><h3>Click Add</h3><p>Confirm by tapping "Add" in the top right.</p></div>
        </article>
      </div>
    </section>
  `;

  function openModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  button.addEventListener("click", openModal);
  modal.querySelector(".download-app-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  document.body.append(button, modal);
})();
