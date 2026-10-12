(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Count numbers up from 0 when they enter view
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (reduced) { el.textContent = target; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Reveal on scroll; also starts counters, rings and bars inside the revealed block
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  document.querySelectorAll('.sleep__bars i').forEach(function (bar, i) { bar.style.setProperty('--i', i); });

  // Hero entrance + scroll parallax
  var hero = document.querySelector('.hero');
  var stage = document.querySelector('.hero__stage');
  requestAnimationFrame(function () { hero.classList.add('is-in'); });

  // Scrubbed display story
  var scrub = document.querySelector('.scrub');
  var captions = scrub.querySelectorAll('.scrub__caption');

  var lnav = document.querySelector('.lnav');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;

    if (!reduced && y < vh * 1.2) {
      stage.style.transform = 'translateY(' + (y * 0.25) + 'px) scale(' + (1 - Math.min(y / vh, 1) * 0.08) + ')';
    }

    lnav.classList.toggle('is-stuck', lnav.getBoundingClientRect().top <= 0 && y > 44);

    var r = scrub.getBoundingClientRect();
    var p = Math.min(Math.max(-r.top / (r.height - vh), 0), 1);
    scrub.style.setProperty('--p', reduced ? 1 : p.toFixed(4));
    captions.forEach(function (c) {
      var on = p >= parseFloat(c.dataset.from) && p < parseFloat(c.dataset.to);
      c.classList.toggle('is-active', on);
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Live clock on every watch face
  var clocks = document.querySelectorAll('[data-clock]');
  function tick() {
    var d = new Date();
    var txt = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
    clocks.forEach(function (c) { c.textContent = txt; });
  }
  tick();
  setInterval(tick, 10000);

  // Pause / play every looping animation
  var pause = document.querySelector('.pause');
  pause.addEventListener('click', function () {
    var paused = document.body.classList.toggle('is-paused');
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Reanudar animaciones' : 'Pausar animaciones');
  });

  // Finish picker recolors the case (colors transition via @property)
  var finishWatch = document.querySelector('.watch--finish');
  var finishName = document.querySelector('.finish__name');
  document.querySelectorAll('.swatch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      document.querySelectorAll('.swatch').forEach(function (o) {
        o.classList.toggle('is-active', o === sw);
        o.setAttribute('aria-checked', String(o === sw));
      });
      finishWatch.setAttribute('data-finish', sw.dataset.finish);
      finishName.textContent = sw.dataset.name;
    });
  });

  // Comparison selector swaps tile values
  var DATA = {
    s9: { screen: 'Hasta 9%', bright: '2x', charge: '80% en 30 min', chip: 'Hasta 30%', sensor: 'Apnea del sueño', battery: 'Hasta 24 h' },
    s7: { screen: 'Hasta 14%', bright: '2x', charge: '80% en 30 min', chip: 'Hasta 2x', sensor: 'Temperatura', battery: 'Hasta 24 h' },
    s5: { screen: 'Hasta 30%', bright: '2x', charge: '80% en 30 min', chip: 'Hasta 3x', sensor: 'Oxígeno en sangre', battery: 'Hasta 24 h' },
    se: { screen: 'Hasta 40%', bright: 'Siempre activa', charge: '80% en 30 min', chip: 'Hasta 3x', sensor: 'ECG', battery: 'Hasta 38 h' }
  };
  var tiles = document.querySelectorAll('.tile__value');
  document.getElementById('compare-model').addEventListener('change', function (e) {
    var d = DATA[e.target.value];
    tiles.forEach(function (t, i) {
      t.classList.add('is-swapping');
      setTimeout(function () {
        t.textContent = d[t.dataset.key];
        t.classList.remove('is-swapping');
      }, 200 + i * 40);
    });
  });
})();
