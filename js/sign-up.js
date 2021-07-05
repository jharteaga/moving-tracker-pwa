const signUpBtn = document.getElementById("signUpBtn");
const pwcredential = document.getElementById("pwcredential");

//User List
// let users = [
//     {
//         userId: 1,
//         userEmail: "mtakashima00@mylangara.ca",
//         userName: "Meg",
//         password: "Abcdefg1"
//     },
//     {
//         userId: 2,
//         userEmail: "ehernandezvega00@mylangara.ca",
//         userName: "Alejandra",
//         password: "Qwertyu1"
//     }
// ]; 

// class User {
//     constructor (userId, userEmail,userName, password) {
//         this.userId = userId;
//         this.Email = userEmail;
//         this.userName = userName;
//         this.password = password;
//     }
// }

pwcredential.addEventListener('click', () => {
    alert("Minimum 6 letters");
})

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


    // Input Varidation



    // let userExist = 0;
    // for(i=0; i < users.length; i++){
    //     if(userNameInput === users[i].userName){
    //         userExist = 1;
    //     }    
    // }

    // console.log(userExist);

    // if(emailInput === "" || emailInput.match(/@/) === null){
    //     emailErrorMsg.innerHTML = "Please enter Email Address"; 

    // } else if(userNameInput === ""){
    //     userNameErrorMsg.innerHTML = "Please enter User Name"; 

    // } else if (userExist === 1){
    //     userNameErrorMsg.innerHTML = `${userNameInput} is taken`; 

    // } else if(pwInput === ""){
    //     pwErrorMsg.innerHTML = "Please enter Password"; 

    // } else if (pwInput.length < 6){
    //     pwErrorMsg.innerHTML = "Shuold be at least 6 letters"; 

    // } else if(confirmPwInput === ""){
    //     confirmPwErrorMsg.innerHTML = "Please confirm password"; 

    // } else if (confirmPwInput !== pwInput){
    //     confirmPwErrorMsg.innerHTML = "Password doesn't match"; 

    // } else {
        
    //     const lastId = users[users.length -1].userId;
    //     const userId = lastId + 1;

    //     const userToPush = new User (userId, emailInput, userNameInput, pwInput);
    //     // console.log(userToPush);

    //     users.push(userToPush);
    //     console.log(users);

    //     window.location.href = "../pages/welcome.html";
    // }

    userToPush.userSignUp(emailInput, userNameInput, pwInput, confirmPwInput);
})

const userToPush = new User();


