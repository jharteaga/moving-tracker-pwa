const signUpBtn = document.getElementById("signUpBtn");

signUpBtn.addEventListener('click', () => {
    console.log("signUpBtn Listening");

    //Define Input Value
    const userEmailInput = document.getElementById("userEmailInput").value;
    const userNameInput = document.getElementById("userNameInput").value;
    const pwInput = document.getElementById("pwInput").value;
    const confirmPwInput = document.getElementById("confirmPwInput").value;
    const termsAndConditionsInput = document.getElementById("termsAndConditionsInput");

    // Define Error Message Area
    const userEmailErrorMsg = document.getElementById("userEmailErrorMsg");
    const userNameErrorMsg = document.getElementById("userNameErrorMsg");
    const pwErrorMsg = document.getElementById("pwErrorMsg");
    const confirmPwErrorMsg = document.getElementById("confirmPwErrorMsg");
    const termsAndConditionsErrorMsg = document.getElementById("termsAndConditionsErrorMsg");

    // Define Fields
    const signUpEmailField = document.getElementById("signUpEmailField");
    const signUpUserNameField = document.getElementById("signUpUserNameField");
    const signUpPwField = document.getElementById("signUpPwField");
    const signUpConfirmPwField = document.getElementById("signUpConfirmPwField");
    const termsAndConditionsField = document.getElementById("termsAndConditionsField");


    //Clear Error Messages
    userEmailErrorMsg .innerHTML = "";
    userNameErrorMsg.innerHTML = "";
    pwErrorMsg.innerHTML = "";
    confirmPwErrorMsg.innerHTML = "";
    termsAndConditionsErrorMsg.innerHTML = "";
    signUpEmailField.classList.remove("error");
    signUpUserNameField.classList.remove("error");
    signUpPwField.classList.remove("error");
    signUpConfirmPwField.classList.remove("error");
    termsAndConditionsField.classList.remove("error");



    //Blank check
    if(userEmailInput === ""){
        userEmailErrorMsg.innerHTML = "Please enter email address";
        signUpEmailField.classList.add("error");
    } 
    if(userNameInput === ""){
        userNameErrorMsg.innerHTML = "Please enter user name";
        signUpUserNameField.classList.add("error");
    } 
    if(pwInput === ""){
        pwErrorMsg.innerHTML = "Please enter password";
        signUpPwField.classList.add("error");
    } 
    if(confirmPwInput === ""){
        confirmPwErrorMsg.innerHTML = "Please confirm password";
        signUpConfirmPwField.classList.add("error");
    }
    if(termsAndConditionsInput.checked === false){
        termsAndConditionsErrorMsg.innerHTML = "Please accept the terms & conditions";
        termsAndConditionsField.classList.add("error");
    }

    //Call userSignUp (code in user.js)
    if(userEmailInput !== "" && userNameInput !== "" && pwInput !== "" && confirmPwInput !== "" && termsAndConditionsInput.checked) {
        userToPush.userSignUp(userEmailInput, userNameInput, pwInput, confirmPwInput).then(errorCheck);

        //Added to display error 
        //Need to wait for catch part as well, so using then
        function errorCheck() {

            //Email
            if (userToPush.userError == "The email address is badly formatted.") {
                console.log("bad ofrmat")
                userEmailErrorMsg.innerHTML = "Please enter a valid email address";
                signUpEmailField.classList.add("error");
            } else if (
                userToPush.userError ==
                "The email address is already in use by another account."
            ) {
                userEmailErrorMsg.innerHTML = userToPush.userError;
                signUpEmailField.classList.add("error");
            }

            //PW
            if (userToPush.userError == "Password should be at least 6 characters") {
                pwErrorMsg.innerHTML = userToPush.userError;
                signUpPwField.classList.add("error");
            }

            //PW confirmation
            if(userToPush.userError == "Confirmation password does not match password field"){
                confirmPwErrorMsg.innerHTML = userToPush.userError;
                signUpConfirmPwField.classList.add("error");
            }

            //Nil error => Move to Welcome page
            if (!userToPush.userError){
                window.location.href = 'welcome.html';
            }

        }
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
    pwShown.style.display = "inline-flex";
    pwInput.type = "text";
})

pwShown.addEventListener('click', ()=>{
    pwShown.style.display = "none";
    pwHidden.style.display = "inline-flex";
    pwInput.type = "password";
})

//Confirm Password show/hide
const pwConfHidden = document.querySelector(".sign-up-confirm-pw .fa-eye-slash");
const pwConfShown = document.querySelector(".sign-up-confirm-pw .fa-eye");
const confirmPwInput = document.getElementById("confirmPwInput");

pwConfHidden.addEventListener('click', ()=>{
    pwConfHidden.style.display = "none";
    pwConfShown.style.display = "inline-flex";
    confirmPwInput.type = "text";
})

pwConfShown.addEventListener('click', ()=>{
    pwConfShown.style.display = "none";
    pwConfHidden.style.display = "inline-flex";
    confirmPwInput.type = "password";
})