document.addEventListener('DOMContentLoaded', () => {
  const images = {
    "sd-tab-1": [
      { src: "assets/img/OpVerse/OR/edu1.png", alt: "Immersive 3D VR Anatomy - 1" },
      { src: "assets/img/OpVerse/OR/edu3.png", alt: "Immersive 3D VR Anatomy - 2" }
    ],
    "sd-tab-2": [
      { src: "assets/img/OpVerse/OR/VAT_3.jpg", alt: "VATS Port Planning - 1" },
      { src: "assets/img/OpVerse/OR/VAT_2.jpg", alt: "VATS Port Planning - 2" }
    ],
    "sd-tab-3": [
      { src: "assets/img/OpVerse/OR/path_2.jpg", alt: "Needle Path Planning - 1" },
      { src: "assets/img/OpVerse/OR/path_1.jpg", alt: "Needle Path Planning - 2" }
    ]
  };

document.querySelectorAll('.services-list a').forEach(tab => {
    tab.addEventListener('shown.bs.tab', e => {
      const target = e.target.getAttribute('href').substring(1); // e.g. sd-tab-1
      const img1 = document.getElementById('expect-image1');
      const img2 = document.getElementById('expect-image2');

      if (images[target]) {
        img1.src = images[target][0].src;
        img1.alt = images[target][0].alt;

        img2.src = images[target][1].src;
        img2.alt = images[target][1].alt;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 解析網址 hash
  const hash = window.location.hash;
  if (hash.startsWith("#service?tab=")) {
    const tabId = hash.split("=")[1]; // 例如 sd-tab-2
    const tabTriggerEl = document.querySelector(`[href="#${tabId}"]`);

    if (tabTriggerEl) {
      // 等待 DOM ready 後觸發 Bootstrap tab
      const tab = new bootstrap.Tab(tabTriggerEl);
      tab.show();

      // 平滑滾動到 #service
      document.getElementById("service").scrollIntoView({ behavior: "smooth" });
    }
  }
});

(function () {
  // 安全使用 CSS.escape（舊瀏覽器給個 fallback）
  const esc = (window.CSS && CSS.escape) ? CSS.escape : (s) => s.replace(/[^a-zA-Z0-9_-]/g, '\\$&');

  function handleDeepLink() {
    const h = window.location.hash || "";
    if (!h) return;

    // 把 "#service?tab=sd-tab-2" 拆成 anchor="#service" 與 query="tab=sd-tab-2"
    const [anchor, query] = h.split("?");
    if (anchor !== "#service") return;

    // 解析 tab 參數
    const params = new URLSearchParams(query || "");
    const tabId = params.get("tab");              // e.g. "sd-tab-2"
    if (!tabId) return;

    // 1) 切換 Bootstrap tab（用 href="#sd-tab-2" 的觸發器）
    const trigger = document.querySelector(`.services-list a[href="#${esc(tabId)}"]`);
    if (trigger && window.bootstrap && bootstrap.Tab) {
      const tab = new bootstrap.Tab(trigger);
      tab.show();
    }

    // 2) 捲到 #service（不要用 '#service?tab=...' 當 selector）
    const section = document.getElementById("service");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  document.addEventListener("DOMContentLoaded", handleDeepLink);
  window.addEventListener("hashchange", handleDeepLink);
})();

(function () {
  const esc = (window.CSS && CSS.escape) ? CSS.escape : (s) => s.replace(/[^a-zA-Z0-9_-]/g, '\\$&');

  function handleDeepLink() {
    const h = window.location.hash || "";
    if (!h.includes("?")) return;

    // 例：#news?tab=tabs-tab-3  或  #service?tab=sd-tab-2
    const [anchor, query] = h.split("?");
    const sectionId = anchor.replace(/^#/, "");     // "news" 或 "service"
    const params = new URLSearchParams(query || "");
    const tabId = params.get("tab");                // tabs-tab-x / sd-tab-x
    if (!sectionId || !tabId) return;

    // 只在該 section 下找對應 tab 觸發器
    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl) return;

    const trigger = sectionEl.querySelector(`a[data-bs-toggle="tab"][href="#${esc(tabId)}"]`);
    if (trigger && window.bootstrap && bootstrap.Tab) {
      const tab = new bootstrap.Tab(trigger);
      tab.show();
    }

    // 平滑捲到 section
    sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("DOMContentLoaded", handleDeepLink);
  window.addEventListener("hashchange", handleDeepLink);
})();