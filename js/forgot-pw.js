const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener('click', () => {
    console.log("sendBtn Listening");

    //Define Input Value
    const userEmailInput = document.getElementById("userEmailInput").value;

    // Define Error Message Area
    const userEmailErrorMsg = document.getElementById("userEmailErrorMsg");

    // Define top page
    const topPage = document.querySelector(".forgot-pw-top");

    // Define Success page
    const successPage = document.querySelector(".forgot-pw-success");

    // Define place to show address
    const emailSentTo = document.getElementById("emailSentTo");
    
    // Where to redirect after reset password
    const actionCodeSettings = {
        //temporal URL to see if it works
        url: 'https://moving-trackker.surge.sh/pages/sign-in.html?email=megumi@megsemail.com'
    };


    //Clear Error Messages
    userEmailErrorMsg .innerHTML = "";
    forgotPwInputField.classList.remove("error");;

    //Blank check
    if(userEmailInput === ""){
        userEmailErrorMsg.innerHTML = "Please enter email address";
      
    } else {
        firebase.auth().sendPasswordResetEmail(userEmailInput, actionCodeSettings)
        .then(function() {
            // successPage.style.zIndex = "1000";
            topPage.style.display = "none";
            successPage.style.display = "grid";
            emailSentTo.innerHTML = userEmailInput;

        }).catch(function(error) {
            console.log(error);
            
            if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                userEmailErrorMsg.innerHTML = "Account not found this address";
            } else {
                userEmailErrorMsg.innerHTML = error.message;
            }
        }); 
    }
})


// Login Btn on forgot-pw-success page
const loginBtn = document.querySelector('.forgot-pw-success #loginBtn');

loginBtn.addEventListener('click',()=>{
    console.log("listening")
    window.location.pathname = '/pages/sign-in.html';
})







