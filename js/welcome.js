const user = new User();
const userName = document.getElementById('userName');

user.isLoggedIn(() => {
  userName.innerHTML = user.userName;
});
