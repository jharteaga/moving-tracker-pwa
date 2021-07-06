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


