const signUpBtn = document.getElementById("signUpBtn");

signUpBtn.addEventListener('click', () => {
    console.log("signUpBtn Listening");

    const emailInput = document.getElementById("emailInput").value;
    const userNameInput = document.getElementById("userNameInput").value;
    const pwInput = document.getElementById("pwInput").value;
    const confirmPwInput = document.getElementById("confirmPwInput").value;

    const emailErrorMsg = document.getElementById("emailErrorMsg");
    const userNameErrorMsg = document.getElementById("userNameErrorMsg");
    const pwErrorMsg = document.getElementById("pwErrorMsg");
    const confirmPwErrorMsg = document.getElementById("confirmPwErrorMsg");

    emailErrorMsg .innerHTML = "";
    userNameErrorMsg.innerHTML = "";
    pwErrorMsg.innerHTML = "";
    confirmPwErrorMsg.innerHTML = "";

    //Blank check
    if(emailInput === ""){
        emailErrorMsg.innerHTML = "Please enter email address";
    } 
    if(userNameInput === ""){
        userNameErrorMsg.innerHTML = "Please enter user name";
    } 
    if(pwInput === ""){
        pwErrorMsg.innerHTML = "Please enter password";
    } 
    if(confirmPwInput === ""){
        confirmPwErrorMsg.innerHTML = "Please confirm password";
    }

    //Call userSignUp (code in user.js)
    if(emailInput !== "" && userNameInput !== "" && pwInput !== "" && confirmPwInput !== "") {
        userToPush.userSignUp(emailInput, userNameInput, pwInput, confirmPwInput);
    }
})

//Creat instance (code in user.js)
const userToPush = new User();



//Password show/hide
const pwHidden = document.querySelector(".sign-up-pw .fa-eye-slash");
const pwShown = document.querySelector(".sign-up-pw .fa-eye");
const pwInput = document.getElementById("pwInput");

pwHidden.addEventListener('click', ()=>{
    pwHidden.style.display = "none";
    pwShown.style.display = "block";
    pwInput.type = "text";
})

pwShown.addEventListener('click', ()=>{
    pwShown.style.display = "none";
    pwHidden.style.display = "block";
    pwInput.type = "password";
})

//Confirm Password show/hide
const pwConfHidden = document.querySelector(".sign-up-confirm-pw .fa-eye-slash");
const pwConfShown = document.querySelector(".sign-up-confirm-pw .fa-eye");
const confirmPwInput = document.getElementById("confirmPwInput");

pwConfHidden.addEventListener('click', ()=>{
    pwConfHidden.style.display = "none";
    pwConfShown.style.display = "block";
    confirmPwInput.type = "text";
})

pwConfShown.addEventListener('click', ()=>{
    pwConfShown.style.display = "none";
    pwConfHidden.style.display = "block";
    confirmPwInput.type = "password";
})