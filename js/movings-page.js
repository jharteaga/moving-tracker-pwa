/**
 *
 * User and Moving instance declarations
 *
 */

const user = new User();
const moving = new Moving();

user.isLoggedIn(() => {
  const moving = new Moving(user.userId);
  moving.getMovingsList((snapshot) => {
    moving.getMovingsCollaboratorList(user.email, (snapshotCollab) => {
      movingsArr.length = 0;
      snapshot.forEach((doc) => {
        movingsArr.push(doc);
      });
      snapshotCollab.forEach((docCollab) => {
        movingsArr.push(docCollab);
      });
      renderMovings();
    });
  });

  //Load profile picture
  console.log(user.userProfilePictureUrl);
  const profilePhotoDesktop = document.querySelector('.profile-photo.desktop');
  const profilePhotoMobile = document.querySelector('.profile-photo.mobile');

  profilePhotoDesktop.src = user.userProfilePictureUrl;
  profilePhotoMobile.src = user.userProfilePictureUrl;

  if (user.userProfilePictureUrl === null || user.userProfilePictureUrl === undefined) {
    profilePhotoDesktop.src = '../img/profile/user-default.svg';
    profilePhotoMobile.src = '../img/profile/user-default.svg';
  } else {
    fetch(user.userProfilePictureUrl)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          profilePhotoDesktop.src = user.userProfilePictureUrl;
          profilePhotoMobile.src = user.userProfilePictureUrl;
        } else {
          profilePhotoDesktop.src = '../img/profile/user-default.svg';
          profilePhotoMobile.src = '../img/profile/user-default.svg';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
/**
 * Movings Options Menu (Toggle plus menu button)
 */

const movingsOutput = document.querySelector('.movings-wrapper');
const movingsArr = [];
const movingsCollabArr = [];

function renderMovings() {
  movingsOutput.innerHTML = '';
  movingsArr.forEach((moving) => {
    const movingWrapper = document.createElement('div');
    movingWrapper.classList.add('moving-wrapper');
    movingWrapper.id = moving.id;
    const movingTitleDiv = document.createElement('div');
    movingTitleDiv.classList.add('moving__title');
    movingTitleDiv.innerHTML = `<h3>Moving To</h3><h4><a href="#" class="moving-link" id="link-${
      moving.id
    }">${moving.data().movingTitle}</a></h4>`;
    const movingAddressDiv = document.createElement('div');
    movingAddressDiv.classList.add('moving__address');
    movingAddressDiv.innerHTML = `<p>${moving.data().to}</p>`;
    const movingDateDiv = document.createElement('div');
    movingDateDiv.classList.add('moving__date');
    let formattedDate = '';
    if (moving.data().date != '') {
      let movingDate = new Date(moving.data().date);
      let longMonth = movingDate.toLocaleString('en-us', { month: 'long' });
      formattedDate = `${longMonth} ${movingDate.getDate()}, ${movingDate.getFullYear()}`;
    } else {
      formattedDate = '';
    }

    movingDateDiv.innerHTML = `${formattedDate}`;

    const movingActions = document.createElement('div');
    movingActions.classList.add('moving__actions');

    console.log(user.userId, moving.data().creatorId);
    if (user.userId === moving.data().creatorId) {
      movingActions.innerHTML = `<button class="icon button-edit" data-bs-toggle="modal" data-bs-target="#editMovingModal" id="edit-${moving.id}">
        <span class="fas fa-pencil-alt"></span>
        </button>
        <button class="icon button-delete" 
        data-bs-toggle="modal" data-bs-target="#deleteMovingModal"
        id="delete-${moving.id}"
        >
        <span class="fas fa-trash"></span>
        </button>
      `;
    }
    movingWrapper.appendChild(movingTitleDiv);
    movingWrapper.appendChild(movingAddressDiv);
    movingWrapper.appendChild(movingDateDiv);
    movingWrapper.appendChild(movingActions);
    movingsOutput.appendChild(movingWrapper);
    addEventListersEdit();
    addEventListersRedirects();
    addEventListenersDelete();
  });
}

// Save Moving Section
// const saveMovingBtn = document.querySelector('#createMovingForm');

const saveMovingBtn = document.querySelector('#saveMovingBtn');

// saveMovingBtn.addEventListener('submit', async (event) => {
saveMovingBtn.addEventListener('click', async (event) => {
  //event.preventDefault();
  const movingTitle = document.querySelector('#movingTitle');
  const movingDescription = document.querySelector('#movingDescription');
  const movingFrom = document.querySelector('#movingFrom');
  const movingTo = document.querySelector('#movingTo');
  const movingDate = document.querySelector('#movingDate');

  const newMovingNameErrorMsg = document.querySelector(
    '#newMovingNameErrorMsg'
  );
  const newMovingFromErrorMsg = document.querySelector(
    '#newMovingFromErrorMsg'
  );
  const newMovingToErrorMsg = document.querySelector('#newMovingToErrorMsg');

  const newMovingNameField = document.querySelector('#newMovingNameField');
  const newMovingFromField = document.querySelector('#newMovingFromField');
  const newMovingToField = document.querySelector('#newMovingToField');

  let requiredValidation = true;

  //Reset
  newMovingNameErrorMsg.innerHTML = '';
  newMovingNameField.classList.remove('error');
  newMovingFromErrorMsg.innerHTML = '';
  newMovingFromField.classList.remove('error');

  newMovingToErrorMsg.innerHTML = '';
  newMovingToField.classList.remove('error');

  //Required Fields
  if (movingTitle.value === '') {
    newMovingNameErrorMsg.innerHTML = "Please enter new moving's name";
    newMovingNameField.classList.add('error');
    requiredValidation = false;
  }
  if (movingFrom.value === '') {
    newMovingFromErrorMsg.innerHTML = 'Please enter from address';
    newMovingFromField.classList.add('error');
    requiredValidation = false;
  }
  if (movingTo.value === '') {
    newMovingToErrorMsg.innerHTML = 'Please enter destination address';
    newMovingToField.classList.add('error');
    requiredValidation = false;
  }

  if (requiredValidation) {
    const moving = new Moving(
      user.userId,
      movingTitle.value,
      movingDescription.value,
      movingFrom.value,
      movingTo.value,
      movingDate.value
    );
    await moving.addMovingToDb(user);
    movingTitle.value = '';
    movingDescription.value = '';
    movingFrom.value = '';
    movingTo.value = '';
    movingDate.value = '';

    $('#addMovingModal').modal('hide');
  }
});

// End Save Moving Section

// const saveEditMovingBtn = document.querySelector('#saveEditMovingBtn');
const saveEditMovingBtn = document.querySelector('#saveEditMovingBtn');

saveEditMovingBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  // Edit Moving Section

  const editMovingTitle = document.querySelector('#editMovingTitle');
  const editMovingDescription = document.querySelector(
    '#editMovingDescription'
  );
  const editMovingFrom = document.querySelector('#editMovingFrom');
  const editMovingTo = document.querySelector('#editMovingTo');
  const editMovingDate = document.querySelector('#editMovingDate');

  const editMovingNameErrorMsg = document.querySelector(
    '#editMovingNameErrorMsg'
  );
  const editMovingFromErrorMsg = document.querySelector(
    '#editMovingFromErrorMsg'
  );
  const editMovingToErrorMsg = document.querySelector('#editMovingToErrorMsg');

  const editMovingNameField = document.querySelector('#editMovingNameField');
  const editMovingFromField = document.querySelector('#editMovingFromField');
  const editMovingToField = document.querySelector('#editMovingToField');

  let requiredValidation = true;

  //Reset
  editMovingNameErrorMsg.innerHTML = '';
  editMovingNameField.classList.remove('error');

  editMovingFromErrorMsg.innerHTML = '';
  editMovingFromField.classList.remove('error');

  editMovingToErrorMsg.innerHTML = '';
  editMovingToField.classList.remove('error');

  //Required Fields
  if (editMovingTitle.value === '') {
    editMovingNameErrorMsg.innerHTML = "Please enter moving's name";
    editMovingNameField.classList.add('error');
    requiredValidation = false;
  }
  if (editMovingFrom.value === '') {
    editMovingFromErrorMsg.innerHTML = 'Please enter from address';
    editMovingFromField.classList.add('error');
    requiredValidation = false;
  }
  if (editMovingTo.value === '') {
    editMovingToErrorMsg.innerHTML = 'Please enter destination address';
    editMovingToField.classList.add('error');
    requiredValidation = false;
  }

  if (requiredValidation) {
    await moving.updateMoving(
      user,
      editMovingTitle.value,
      editMovingDescription.value,
      editMovingFrom.value,
      editMovingTo.value,
      editMovingDate.value
    );
    $('#editMovingModal').modal('hide');
  }
});

function addEventListersEdit() {
  const editButtons = document.querySelectorAll('.button-edit');
  editButtons.forEach((button) => {
    const movingId = button.id.split('-')[1];
    const elem = document.querySelector(`#${button.id}`);
    elem.addEventListener('click', async (event) => {
      editMovingTitle.value = '';
      editMovingDescription.value = '';
      editMovingFrom.value = '';
      editMovingTo.value = '';
      editMovingDate.value = '';
      event.preventDefault();
      await moving.getMovingById(movingId);
      editMovingTitle.value = moving.movingTitle;
      editMovingDescription.value = moving.description;
      editMovingFrom.value = moving.from;
      editMovingTo.value = moving.to;
      editMovingDate.value = moving.date;
    });
  });
}
// End Edit Moving Section

function addEventListersRedirects() {
  const editButtons = document.querySelectorAll('.moving-link');
  editButtons.forEach((button) => {
    const movingId = button.id.split('-')[1];
    const elem = document.querySelector(`#${button.id}`);
    elem.addEventListener('click', async (event) => {
      event.preventDefault();

      window.sessionStorage.setItem('movingId', movingId);

      window.location.href = 'moving-details.html';
    });
  });
}

let movingIdDelete = '';
const deleteBtn = document.querySelector('#btnDelete');
const cancelBtn = document.querySelector('#btnCancel');

function addEventListenersDelete() {
  const deleteButtons = document.querySelectorAll('.button-delete');
  deleteButtons.forEach((button) => {
    const movingId = button.id.split('-')[1];
    const elem = document.querySelector(`#${button.id}`);

    elem.addEventListener('click', (e) => {
      e.preventDefault();
      movingIdDelete = movingId;
    });
  });
}

deleteBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (movingIdDelete.length > 0) {
    await moving.deleteMoving(user, movingIdDelete);
  }
});

cancelBtn.addEventListener('click', () => {
  movingIdDelete = '';
});
