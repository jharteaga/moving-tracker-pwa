const loginBtn = document.getElementById("loginBtn");


loginBtn.addEventListener('click', () => {
    console.log("loginBtn Listening");

    const userEmailInput = document.getElementById("userEmailInput").value;
    const pwInput = document.getElementById("pwInput").value;
    const userEmailErrorMsg = document.getElementById("userEmailErrorMsg");
    const pwErrorMsg = document.getElementById("pwErrorMsg");
    const signInEmailField = document.getElementById("signInEmailField");
    const signInPwField = document.getElementById("signInPwField");

    //Reset
    userEmailErrorMsg.innerHTML = "";
    pwErrorMsg.innerHTML = "";
    signInEmailField.classList.remove("error");
    signInPwField.classList.remove("error");

    //Blank Check
    if(userEmailInput === ""){
        userEmailErrorMsg.innerHTML = "Please enter User Email Address"; 
        signInEmailField.classList.add("error");
    } 
    if(pwInput === ""){
        pwErrorMsg.innerHTML = "Please enter Password"; 
        signInPwField.classList.add("error");
    } 

    //Call login function
    if(userEmailInput !== "" && pwInput !== "" ){
        userToLogin.userLogin(userEmailInput, pwInput);
    }
})

//Creat instance (code in user.js)
const userToLogin = new User();


//Password show/hide
const pwHidden = document.querySelector(".sign-in-pw .fa-eye-slash");
const pwShown = document.querySelector(".sign-in-pw .fa-eye");
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