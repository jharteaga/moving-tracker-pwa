import { db, auth } from './firebase';

// DOM elements
const guideList = document.querySelector('.guides');

// setup guides
const setupGuides = (data) => {
	let html = '';
	data.forEach((doc) => {
		const guide = doc.data();
		const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
        <div class="collapsible-body white"> ${guide.content} </div>
      </li>
    `;
		html += li;
	});
	guideList.innerHTML = html;
};
/**
 * Get Data
 */

db.collection('guides')
	.get()
	.then((snapshot) => {
		setupGuides(snapshot.docs);
	});

/**
 * Listen for Auth Status Changes
 */
auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('User logged in: ', user);
	} else {
		console.log('User logged out');
	}
});

/**
 * Sign Up
 */

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Get user info
	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	// Sign up the user
	auth.createUserWithEmailAndPassword(email, password).then((credential) => {
		const modal = document.querySelector('#modal-signup');
		M.Modal.getInstance(modal).close();
		signupForm.reset();
	});
});

/**
 * Sign Out
 */
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
	e.preventDefault();
	auth.signOut();
});

/**
 * Login
 */
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// Get user info
	const email = loginForm['login-email'].value;
	const password = loginForm['login-password'].value;

	auth.signInWithEmailAndPassword(email, password).then((credential) => {
		// Close the login modal and reset the form
		const modal = document.querySelector('#modal-login');
		M.Modal.getInstance(modal).close();
		loginForm.reset();
	});
});
