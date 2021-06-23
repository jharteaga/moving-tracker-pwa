const menuBtn = document.querySelector('.moving-details .add-btn');
const movingOptions = document.querySelector('.moving-details .moving-options');
const page = document.querySelector('main');

menuBtn.addEventListener('click', () => {
	movingOptions.classList.toggle('active');
});

page.addEventListener('click', () => {
	if (movingOptions.classList.contains('active')) {
		movingOptions.classList.remove('active');
	}
});
