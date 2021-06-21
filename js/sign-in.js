const signInBtn = document.getElementById("signInBtn");

//User List
let users = [
    {
        userId: 1,
        userEmail: "mtakashima00@mylangara.ca",
        userName: "Meg",
        password: "Abcdefg1"
    },
    {
        userId: 2,
        userEmail: "ehernandezvega00@mylangara.ca",
        userName: "Alejandra",
        password: "Qwertyu1"
    }
];  

signInBtn.addEventListener('click', () => {
    console.log("signInBtn Listening");

    const userNameInput = document.getElementById("userNameInput").value;
    const pwInput = document.getElementById("pwInput").value;
    const userNameErrorMsg = document.getElementById("userNameErrorMsg");
    const pwErrorMsg = document.getElementById("pwErrorMsg");

    userNameErrorMsg.innerHTML = "";
    pwErrorMsg.innerHTML = "";


    // Input Varidation  
    let userExist = 0;
    let userIndex;

    for(i=0; i < users.length; i++){
        if(userNameInput === users[i].userName){
            userExist = 1;
            userIndex = i;
        }    
    }

    // console.log(userIndex);

    if(userNameInput === ""){
        userNameErrorMsg.innerHTML = "Please enter User Name"; 

    } else if (userExist === 0){
        userNameErrorMsg.innerHTML = "User Name not found"; 

    } else if(pwInput === ""){
        pwErrorMsg.innerHTML = "Please enter Password"; 

    } else if (pwInput !== users[userIndex].password){
        // console.log(users[userIndex].password);
        pwErrorMsg.innerHTML = "Password does not match"; 

    } else {
        window.location.href = "../pages/onboarding.html";
    }

})