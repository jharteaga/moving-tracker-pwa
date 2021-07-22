console.log('connected');

//Define
const user = new User();
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const newUserName = document.getElementById('newUserName');

const editUserPicBtn = document.getElementById('editUserPicBtn');
const closeBtn = document.getElementById('closeBtn');
const picEditMethod = document.querySelector('.picEditMethod');

const editUserNameBtn = document.getElementById('editUserNameBtn');
const closeEditUserNameBtn = document.getElementById('closeEditUserNameBtn');
const profileName = document.getElementById('profile-name');
const logoutBtn = document.getElementById('logoutBtn');

const nameSaveBtn = document.getElementById('nameSaveBtn');

const fromPc = document.getElementById('fromPc');
const fileSelector = document.getElementById('fileSelector');
const picSaveBtn = document.getElementById('picSaveBtn');
const fileSelctCloseBtn = document.getElementById('fileSelctCloseBtn');

//When loading the page
user.isLoggedIn(() => {
  userName.innerHTML = user.userName;
  userEmail.innerHTML = user.email;
  newUserName.value = user.userName;
});

//Edit Picture
editUserPicBtn.addEventListener('click', () => {
  picEditMethod.classList.remove('hidden');
  logoutBtn.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  picEditMethod.classList.add('hidden');
  logoutBtn.style.display = 'flex';
});

//Edit User Name
editUserNameBtn.addEventListener('click', () => {
  profileName.classList.add('edit-mode');
  logoutBtn.style.display = 'none';
});

closeEditUserNameBtn.addEventListener('click', () => {
  profileName.classList.remove('edit-mode');
  logoutBtn.style.display = 'flex';
});

//Save New User Name
nameSaveBtn.addEventListener('click', () => {
  //Update User Name
  user.updateUserDb(newUserName.value);

  //Close Edit Mode
  profileName.classList.remove('edit-mode');

  //Reflect New User Name
  user.isLoggedIn(() => {
    userName.innerHTML = user.userName;
    newUserName.value = user.userName;
  });
});

//Logout
logoutBtn.addEventListener('click', () => {
  //Logout
  user.userLogout();

  //Send to login page
  window.location.href = 'sign-in.html';
});

//Choose from PC
fromPc.addEventListener('click', () => {
  fileSelector.style.display = 'block';
});

//Choose from PC => Close
fileSelctCloseBtn.addEventListener('click', () => {
  fileSelector.style.display = 'none';
  picEditMethod.classList.add('hidden');
  logoutBtn.style.display = 'flex';
});

//Choose from PC => Save
picSaveBtn.addEventListener('click', () => {
  fileSelector.style.display = 'none';
  picEditMethod.classList.add('hidden');
  logoutBtn.style.display = 'flex';

  //Need to add the code to send the file to Firestore
});
