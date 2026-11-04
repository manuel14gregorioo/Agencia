// Índice de la columna izquierda: marca la sección que se está leyendo (clase «on» + aria-current).
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (!links.length) return;
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var actual = -1, pendiente = false;

  function marcar() {
    pendiente = false;
    var i = 0, linea = window.innerHeight * 0.4;
    secs.forEach(function (s, k) { if (s && s.getBoundingClientRect().top < linea) i = k; });
    // Al llegar al final de la página, la última sección… salvo que se haya llegado pulsando otra en el índice
    // y esa siga arriba (p. ej. «Formación», que no puede subir del todo porque detrás solo queda Habilidades).
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      i = secs.length - 1;
      var h = window.location.hash.slice(1);
      secs.forEach(function (s, k) {
        if (s && s.id === h) { var t = s.getBoundingClientRect().top; if (t > -40 && t < linea) i = k; }
      });
    }
    if (i === actual) return;
    actual = i;
    links.forEach(function (a, k) {
      var on = k === i;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }

  function pedir() { if (!pendiente) { pendiente = true; window.requestAnimationFrame(marcar); } }
  window.addEventListener('scroll', pedir, { passive: true });
  window.addEventListener('resize', pedir);
  marcar();
})();
