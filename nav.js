/* 向佛而行 — 全站共用頂欄 nav.js
 * 用法：每頁在 <head> 內宣告自己的層級，再引用本檔：
 *   <script>window.SITE_NAV = { crumbs: [{ label: "《功德之本頌》" }] };</script>
 *   <script src="nav.js" defer></script>
 *
 * 規則：
 *   - 首頁：window.SITE_NAV = { home: true };
 *   - 其他頁：crumbs 由上層到本頁依序排列；
 *       有 href 的會變成可點連結（上層），最後一筆不給 href＝目前所在頁（純文字）。
 *   例（第三層）：
 *     crumbs: [
 *       { label: "《功德之本頌》", href: "gongde.html" },
 *       { label: "第一堂　115/4/13" }
 *     ]
 *
 * 之後要改頂欄樣式或結構，只改這一個檔，全站立即生效。
 */
(function () {
  var cfg = window.SITE_NAV || {};
  var isHome = !!cfg.home;
  var crumbs = cfg.crumbs || [];

  if (!document.getElementById("bn-topbar-style")) {
    var css =
      ".bn-topbar{background:#2C2825;height:52px;display:flex;align-items:center;gap:.9rem;padding:0 2rem;}" +
      ".bn-topbar a{text-decoration:none;transition:color .2s;}" +
      ".bn-topbar .bn-logo{color:#C9A84C;font-family:'Noto Serif TC',serif;font-size:1.05rem;font-weight:500;}" +
      ".bn-topbar .bn-logo:hover{color:#E3C66A;}" +
      ".bn-topbar .bn-sep{color:#6E635A;font-size:.9rem;font-family:'Noto Sans TC',sans-serif;}" +
      ".bn-topbar .bn-crumb{color:#D5C9BA;font-family:'Noto Sans TC',sans-serif;font-size:.95rem;letter-spacing:.04em;}" +
      ".bn-topbar a.bn-crumb:hover{color:#C9A84C;}" +
      ".bn-topbar .bn-here{color:#EFE7DA;font-family:'Noto Sans TC',sans-serif;font-size:.95rem;letter-spacing:.04em;}" +
      ".bn-topbar .bn-home{color:#D5C9BA;font-family:'Noto Sans TC',sans-serif;font-size:.95rem;letter-spacing:.08em;margin-left:auto;}" +
      ".bn-topbar a.bn-home:hover{color:#C9A84C;}" +
      ".bn-topbar .bn-here.bn-home{color:#C9A84C;}" +
      "@media(max-width:480px){.bn-topbar{padding:0 1.1rem;gap:.6rem;}}";
    var st = document.createElement("style");
    st.id = "bn-topbar-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  var nav = document.createElement("nav");
  nav.className = "bn-topbar";

  var logo = document.createElement("a");
  logo.className = "bn-logo";
  logo.href = "index.html";
  logo.textContent = "向佛而行";
  nav.appendChild(logo);

  function makeSep() {
    var s = document.createElement("span");
    s.className = "bn-sep";
    s.textContent = "/";
    return s;
  }

  if (isHome) {
    var here = document.createElement("span");
    here.className = "bn-here bn-home";
    here.textContent = "首頁";
    nav.appendChild(here);
  } else {
    crumbs.forEach(function (c) {
      nav.appendChild(makeSep());
      if (c.href) {
        var a = document.createElement("a");
        a.className = "bn-crumb";
        a.href = c.href;
        a.textContent = c.label;
        nav.appendChild(a);
      } else {
        var sp = document.createElement("span");
        sp.className = "bn-here";
        sp.textContent = c.label;
        nav.appendChild(sp);
      }
    });
    var home = document.createElement("a");
    home.className = "bn-home";
    home.href = "index.html";
    home.textContent = "首頁";
    nav.appendChild(home);
  }

  document.body.insertBefore(nav, document.body.firstChild);
})();
