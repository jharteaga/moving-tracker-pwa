const filter = document.querySelectorAll('feGaussianBlur');
const logo = document.querySelector('.logo-wrapper');

setTimeout(() => {
  logo.style.opacity = 1;
}, 2000);
setTimeout(() => {
  filter.forEach((e, ind) => {
    for (let j = 8; j >= 0; j--) {
      console.log(Math.floor(e.stdDeviationY.baseVal));
      setTimeout(() => {
        e.stdDeviationY.baseVal = j;
        e.stdDeviationX.baseVal = j;
      }, 50 * ind);
    }
  });
}, 3000);

setTimeout(() => {
  window.location.href = 'pages/sign-in.html';
}, 3700);
