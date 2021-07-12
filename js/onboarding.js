const next = document.querySelector('.onboarding .actions .next');
const myCarousel = document.querySelector('#myCarousel');
const carousel = new bootstrap.Carousel(myCarousel, {
	interval: false,
	wrap: false
});
let indicator = document.querySelector('.carousel-indicators .active');
let slide = indicator.getAttribute('data-bs-slide-to');

next.addEventListener('click', () => {
	if (slide <= 3) {
		carousel.next();

		indicator = document.querySelector('.carousel-indicators .active');
		slide = indicator.getAttribute('data-bs-slide-to');

		if (slide == 3) {
			next.classList.add('disabled');
		}
	}
});
