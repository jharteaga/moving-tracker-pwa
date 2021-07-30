const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  console.log('loginBtn Listening');

  const userEmailInput = document.getElementById('userEmailInput').value;
  const pwInput = document.getElementById('pwInput').value;
  const userEmailErrorMsg = document.getElementById('userEmailErrorMsg');
  const pwErrorMsg = document.getElementById('pwErrorMsg');
  const signInEmailField = document.getElementById('signInEmailField');
  const signInPwField = document.getElementById('signInPwField');

  //Reset
  userEmailErrorMsg.innerHTML = '';
  pwErrorMsg.innerHTML = '';
  signInEmailField.classList.remove('error');
  signInPwField.classList.remove('error');

  //Blank Check
  if (userEmailInput === '') {
    userEmailErrorMsg.innerHTML = 'Please enter User Email Address';
    signInEmailField.classList.add('error');
  }
  if (pwInput === '') {
    pwErrorMsg.innerHTML = 'Please enter Password';
    signInPwField.classList.add('error');
  }

  //Call login function
  if (userEmailInput !== '' && pwInput !== '') {
    userToLogin.userLogin(userEmailInput, pwInput).then(errorCheck);

    function errorCheck() {
      //Added to display error - Meg
      //Email
      if (userToLogin.userError == 'The email address is badly formatted.') {
        userEmailErrorMsg.innerHTML = 'Please enter a valid email address';
        signInEmailField.classList.add('error');

        //Added for accent color - Meg Jul 10
      } else if (
        userToLogin.userError ==
        'There is no user record corresponding to this identifier. The user may have been deleted.'
      ) {
        userEmailErrorMsg.innerHTML = 'This E-mail does not have account';
        signInEmailField.classList.add('error');
      }

      //PW
      if (
        userToLogin.userError ==
        'The password is invalid or the user does not have a password.'
      ) {
        pwErrorMsg.innerHTML = 'Password is invalid';
        //Added for accent color - Meg Jul 10
        signInPwField.classList.add('error');
      } else if (
        userToLogin.userError ==
        'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
      ) {
        pwErrorMsg.innerHTML = userToLogin.userError;
        signInPwField.classList.add('error');
      }

      //Nil error => Move to Welcome page
      if (!userToLogin.userError) {
        // window.location.href = 'existingMvs.html';
      }
    }
  }
});

//Creat instance (code in user.js)
const userToLogin = new User();

//Password show/hide
const pwHidden = document.querySelector('.sign-in-pw .fa-eye-slash');
const pwShown = document.querySelector('.sign-in-pw .fa-eye');
const pwInput = document.getElementById('pwInput');

pwHidden.addEventListener('click', () => {
  pwHidden.style.display = 'none';
  pwShown.style.display = 'inline-flex';
  pwInput.type = 'text';
});

pwShown.addEventListener('click', () => {
  pwShown.style.display = 'none';
  pwHidden.style.display = 'inline-flex';
  pwInput.type = 'password';
});
