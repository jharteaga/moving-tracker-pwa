const signInBtn = document.getElementById("signInBtn");

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

signInBtn.addEventListener('click', () => {
    console.log("signInBtn Listening");

    const userEmailInput = document.getElementById("userEmailInput").value;
    const pwInput = document.getElementById("pwInput").value;
    const userEmailErrorMsg = document.getElementById("userEmailErrorMsg");
    const pwErrorMsg = document.getElementById("pwErrorMsg");

    userEmailErrorMsg.innerHTML = "";
    pwErrorMsg.innerHTML = "";


    // Input Varidation  
    // let userExist = 0;
    // let userIndex;

    // for(i=0; i < users.length; i++){
    //     if(userEmailInput === users[i].userEmail){
    //         userExist = 1;
    //         userIndex = i;
    //     }    
    // }

    // console.log(userIndex);

    if(userEmailInput === ""){
        userEmailErrorMsg.innerHTML = "Please enter User Email Address"; 
    } 
    if(pwInput === ""){
        pwErrorMsg.innerHTML = "Please enter Password"; 
    } 

    if(userEmailInput !== "" && pwInput !== "" ){
        userToLogin.userLogin(userEmailInput, pwInput);
    }
})

//Creat instance (code in user.js)
const userToLogin = new User();