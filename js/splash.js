document.addEventListener('DOMContentLoaded', () => {
  // Referencias al splash y al logo para controlar la intro de carga.
  const splash = document.querySelector('#splash');
  const logo = document.querySelector('.splash__logo');
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!splash || !logo) {
    return;
  }

  // Bloquea el scroll mientras el splash está visible.
  body.classList.add('splash-active');

  // Oculta el splash cuando termina la transición de opacidad.
  const hideSplash = () => {
    splash.classList.add('splash--hidden');
    body.classList.remove('splash-active');

    if (reduceMotion) {
      splash.hidden = true;
    }
  };

  splash.addEventListener('transitionend', (event) => {
    if (!reduceMotion && event.propertyName === 'opacity' && splash.classList.contains('splash--hidden')) {
      splash.hidden = true;
    }
  });

  // Muestra el logo con una pequeña demora para permitir el primer paint.
  const showLogo = () => {
    logo.classList.add('splash__logo--visible');
  };

  setTimeout(showLogo, 50);

  // Si el usuario prefiere menos animación, acorta el flujo casi por completo.
  const totalDelay = reduceMotion ? 300 : 1500;
  setTimeout(hideSplash, totalDelay);
});
