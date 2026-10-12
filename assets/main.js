(function () {
  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cookie banner
  var cookie = document.getElementById('cookie');
  var accepted = false;
  try { accepted = localStorage.getItem('cookie-ok') === '1'; } catch (err) {}
  if (!accepted) cookie.hidden = false;
  document.getElementById('cookie-accept').addEventListener('click', function () {
    cookie.hidden = true;
    try { localStorage.setItem('cookie-ok', '1'); } catch (err) {}
  });
})();
