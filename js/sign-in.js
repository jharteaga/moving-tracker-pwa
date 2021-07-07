const signInBtn = document.getElementById("signInBtn");


signInBtn.addEventListener('click', () => {
    console.log("signInBtn Listening");

    const userEmailInput = document.getElementById("userEmailInput").value;
    const pwInput = document.getElementById("pwInput").value;
    const userEmailErrorMsg = document.getElementById("userEmailErrorMsg");
    const pwErrorMsg = document.getElementById("pwErrorMsg");

    userEmailErrorMsg.innerHTML = "";
    pwErrorMsg.innerHTML = "";

    //Blank Check
    if(userEmailInput === ""){
        userEmailErrorMsg.innerHTML = "Please enter User Email Address"; 
    } 
    if(pwInput === ""){
        pwErrorMsg.innerHTML = "Please enter Password"; 
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
    pwShown.style.display = "block";
    pwInput.type = "text";
})

pwShown.addEventListener('click', ()=>{
    pwShown.style.display = "none";
    pwHidden.style.display = "block";
    pwInput.type = "password";
})