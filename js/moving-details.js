/**
 *  Connection to User and Moving Classes
 */

const user = new User();

const moving = new Moving();

const box = new Box();

const movingId = window.sessionStorage.getItem('movingId');

/**
 * Fetch labels snapshot from firebase to update ui, uses movingId from
 * session storage.
 */
function fetchMovingDetails() {
  moving.getMovingSnapshotById(movingId, () => {
    //moving title
    const movingTitle = document.getElementById('movingTitle');
    const movingTitleMobile = document.getElementById('movingTitleMobile');
    movingTitle.innerHTML = moving.movingTitle;
    movingTitleMobile.innerHTML = moving.movingTitle;
    /*********************************** */
    boxLabels.length = 0;
    moving.labels.forEach((label) => {
      boxLabels.push({ id: boxLabels.length + 1, name: label });
    });

    //fill dropdownlists (edit box and new box) with moving labels
    const idEditBoxLabelList = document.getElementById('idEditBoxLabelList');
    const newBoxLabelSelect = document.getElementById('newBoxLabelSelect');
    fillLabelDropDownList(idEditBoxLabelList, boxLabels);
    fillLabelDropDownList(newBoxLabelSelect, boxLabels);

    buildBoxLabels(boxLabels);
    collaborators.length = 0;
    moving.collaborators.forEach((collaborator) => {
      collaborators.push({
        id: collaborators.length + 1,
        name: collaborator,
      });
    });
    buildCollaborators(collaborators);
    // console.log(
    //   moving.sizes[Object.keys(moving.sizes)[1]].height,
    //   Object.keys(moving.sizes)[1]
    // );
    moving.getBoxesByMovingId(movingId, (snapshots) => {
      boxes.length = 0;
      snapshots.forEach((box) => {
        boxes.push({
          idMoving: box.data().idMoving,
          idBox: box.id,
          name: box.data().name,
          description: box.data().description,
          label: box.data().label,
          boxSize: box.data().boxSize,
          weight: box.data().weight,
          fragile: box.data().fragile,
          status: box.data().status,
          value: box.data().value,
        });
      });
      buildBoxesList(boxes);
    });

    /**
     * Populates sizes details on page load
     */
    if (moving.sizes) {
      Object.keys(moving.sizes).forEach((size) => {
        switch (size) {
          case 'small':
            smallInputs[0].value = moving.sizes[size].length;
            smallInputs[1].value = moving.sizes[size].width;
            smallInputs[2].value = moving.sizes[size].height;

            break;
          case 'medium':
            mediumInputs[0].value = moving.sizes[size].length;
            mediumInputs[1].value = moving.sizes[size].width;
            mediumInputs[2].value = moving.sizes[size].height;

            break;
          case 'large':
            largeInputs[0].value = moving.sizes[size].length;
            largeInputs[1].value = moving.sizes[size].width;
            largeInputs[2].value = moving.sizes[size].height;

            break;
          case 'custom':
            customInputs[0].value = moving.sizes[size].length
              ? moving.sizes[size].length
              : '0';
            customInputs[1].value = moving.sizes[size].width
              ? moving.sizes[size].width
              : '0';
            customInputs[2].value = moving.sizes[size].height
              ? moving.sizes[size].height
              : '0';

            break;

          default:
            break;
        }
      });
    }
  });
}

//this function fills label dropdown list, parameters:
//*****************************************labelDropdownList: select HTML element to add labels
//*****************************************boxLabelList:  array with labels from firebase
const fillLabelDropDownList = (labelDropdownList, boxLabelList) => {
  labelDropdownList.innerHTML = '';
  const option = document.createElement('option');
  option.setAttribute('value', 0);
  option.innerHTML = 'Select a label';
  labelDropdownList.appendChild(option);
  boxLabelList.forEach((e) => {
    const idLabel = e.id;
    const nameLabel = e.name;
    const option = document.createElement('option');
    option.setAttribute('value', idLabel);
    option.innerHTML = nameLabel;
    labelDropdownList.appendChild(option);
  });
};

user.isLoggedIn(() => {
  moving.userId = user.userId;
  fetchMovingDetails();

  //Load profile picture
  console.log(user.userProfilePictureUrl);
  const profilePhotoDesktop = document.querySelector('.profile-photo.desktop');
  const profilePhotoMobile = document.querySelector('.profile-photo.mobile');

  profilePhotoDesktop.src = user.userProfilePictureUrl;
  profilePhotoMobile.src = user.userProfilePictureUrl;

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
});

/**
 * Movings Options Menu (Toggle plus menu button)
 */
const menuBtn = document.querySelector('.moving-details .options-btn');
const movingOptions = document.querySelector('.moving-details .moving-options');
const menuOptions = document.querySelectorAll('.moving-options li');

menuBtn.addEventListener('click', () => {
  movingOptions.classList.toggle('active');
});

menuOptions.forEach((opt) => {
  opt.addEventListener('click', () => {
    movingOptions.classList.remove('active');
  });
});

/**
 * Box Labels Modal
 */
const modalBodyBoxLabel = document.querySelector('#boxLabelsModal .modal-body');

//Dummy Array to loop through every box labels for the moving
const boxLabels = [];

/**
 * Build the last input inside the box label modal
 * to add a new label for a specific moving
 */
const addInputLabel = () => {
  const labelContainer = document.createElement('div');
  labelContainer.className = 'label-input-container';

  const inputLabel = document.createElement('input');
  inputLabel.setAttribute('type', 'text');
  inputLabel.setAttribute('placeholder', 'Enter a label');

  const spanPlus = document.createElement('span');
  spanPlus.setAttribute('id', 'addBoxLabel');
  spanPlus.className = 'fas fa-plus';

  labelContainer.appendChild(inputLabel);
  labelContainer.appendChild(spanPlus);

  modalBodyBoxLabel.appendChild(labelContainer);

  spanPlus.addEventListener('click', function () {
    const newBoxLabelInput = document.querySelector(
      '.label-input-container:last-child > input'
    );

    if (newBoxLabelInput.value) {
      // boxLabels.push({
      //     id: boxLabels.length + 1,
      //     name: newBoxLabelInput.value,
      // });

      moving.addLabel(newBoxLabelInput.value);

      //refill dropdownlistlabels
      const idEditBoxLabelList = document.getElementById('idEditBoxLabelList');
      const newBoxLabelSelect = document.getElementById('newBoxLabelSelect');
      fillLabelDropDownList(idEditBoxLabelList, boxLabels);
      fillLabelDropDownList(newBoxLabelSelect, boxLabels);
      // fetchMovingDetails();
    }
  });
};

/**
 * Build the UI for the modal according to the list of
 * Box Labels coming from Firebase por a specific moving
 * @param {Array[BoxLabel]} labelsList
 */
const buildBoxLabels = (labelsList) => {
  modalBodyBoxLabel.innerHTML = '';

  if (labelsList.length) {
    labelsList.forEach((label, index) => {
      const labelContainer = document.createElement('div');
      labelContainer.className = 'label-container';

      const textElement = document.createElement('p');
      textElement.classList.add('label-item');
      textElement.innerText = label.name;

      const spanTrash = document.createElement('span');
      spanTrash.setAttribute('id', `removeBoxLabel${index}`);
      spanTrash.className = 'fas fa-trash';

      labelContainer.appendChild(textElement);
      labelContainer.appendChild(spanTrash);

      modalBodyBoxLabel.appendChild(labelContainer);

      spanTrash.addEventListener('click', async function (e) {
        // boxLabels.splice(index, 1);
        const labelToDelete = e.target.parentElement.children[0].textContent;
        console.log(labelToDelete);
        await moving.deleteLabel(labelToDelete);

        //delete deleted label from all boxes
        const boxesList = [];
        moving.getBoxesByMovingId(movingId, (snapshots) => {
          boxesList.length = 0;
          snapshots.forEach((box) => {
            boxesList.push({
              idBox: box.id,
              label: box.data().label,
            });
          });

          boxesList.forEach((e) => {
            if (e.label == labelToDelete) {
              //borrar el label del box
              let box = db
                .collection(`/movings/${movingId}/boxes`)
                .doc(e.idBox);
              box
                .update({
                  label: '',
                })
                .catch((error) => {
                  return 'Error updating box value: ', error;
                });
            }
          });

          // fetchMovingDetails();
          buildBoxesList(boxes);
        });
      });
    });
  }
  addInputLabel();
};

// buildBoxLabels(boxLabels);

/**
 *
 * Collaborators
 *
 */

/**
 * Collaborator Modal
 */
const modalBodyCollaborator = document.querySelector(
  '#collaboratorModal .modal-body'
);

//Dummy Array to loop through every collaborator for the moving
const collaborators = [];

/**
 * Build the last input inside the collaborator modal
 * to add a new collaborator for a specific moving
 */
const addInputCollaborator = () => {
  const collaboratorContainer = document.createElement('div');
  collaboratorContainer.className = 'collaborator-input-container';

  const inputCollaborator = document.createElement('input');
  inputCollaborator.setAttribute('type', 'text');
  inputCollaborator.setAttribute('placeholder', 'Enter a collaborator');

  const spanPlus = document.createElement('span');
  spanPlus.setAttribute('id', 'addCollaborator');
  spanPlus.className = 'fas fa-plus';

  collaboratorContainer.appendChild(inputCollaborator);
  collaboratorContainer.appendChild(spanPlus);

  modalBodyCollaborator.appendChild(collaboratorContainer);

  spanPlus.addEventListener('click', function () {
    const newCollaboratorInput = document.querySelector(
      '.collaborator-input-container:last-child > input'
    );

    if (newCollaboratorInput.value) {
      // collaborators.push({
      //     id: collaborators.length + 1,
      //     name: newCollaboratorInput.value,
      // });

      moving.addCollaborator(newCollaboratorInput.value);
      // fetchMovingDetails();
    }
  });
};

/**
 * Build the UI for the modal according to the list of
 * collaborators coming from Firebase for a specific moving
 * @param {Array[Collaborator]} collaboratorsList
 */
const buildCollaborators = (collaboratorsList) => {
  modalBodyCollaborator.innerHTML = '';

  if (collaboratorsList.length) {
    collaboratorsList.forEach((collaborator, index) => {
      const collaboratorContainer = document.createElement('div');
      collaboratorContainer.className = 'collaborator-container';

      const textElement = document.createElement('p');
      textElement.classList.add('label-item');
      textElement.innerText = collaborator.name;

      const spanTrash = document.createElement('span');
      spanTrash.setAttribute('id', `removeCollaborator${index}`);
      spanTrash.className = 'fas fa-trash';

      collaboratorContainer.appendChild(textElement);
      collaboratorContainer.appendChild(spanTrash);

      modalBodyCollaborator.appendChild(collaboratorContainer);

      spanTrash.addEventListener('click', async function (e) {
        // collaborators.splice(index, 1);
        const collaboratorToDelete =
          e.target.parentElement.children[0].textContent;
        console.log(collaboratorToDelete);
        await moving.deleteCollaborator(
          e.target.parentElement.children[0].textContent
        );
        // fetchMovingDetails();
      });
    });
  }
  addInputCollaborator();
};

/*Dimension buttons change color when selected*/
const idEditBoxbtnDimensione_Small = document.getElementById(
  'idEditBoxbtnDimensione_Small'
);
const idEditBoxbtnDimensione_Medium = document.getElementById(
  'idEditBoxbtnDimensione_Medium'
);
const idEditBoxbtnDimensione_Large = document.getElementById(
  'idEditBoxbtnDimensione_Large'
);
const idEditBoxbtnDimensione_Custom = document.getElementById(
  'idEditBoxbtnDimensione_Custom'
);

idEditBoxbtnDimensione_Small.addEventListener('click', () => {
  removeClassFromButtons();
  idEditBoxbtnDimensione_Small.classList.toggle(
    'editBoxContent__left_button_selected'
  );
});
idEditBoxbtnDimensione_Medium.addEventListener('click', () => {
  removeClassFromButtons();
  idEditBoxbtnDimensione_Medium.classList.toggle(
    'editBoxContent__left_button_selected'
  );
});
idEditBoxbtnDimensione_Large.addEventListener('click', () => {
  removeClassFromButtons();
  idEditBoxbtnDimensione_Large.classList.toggle(
    'editBoxContent__left_button_selected'
  );
});
idEditBoxbtnDimensione_Custom.addEventListener('click', () => {
  removeClassFromButtons();
  idEditBoxbtnDimensione_Custom.classList.toggle(
    'editBoxContent__left_button_selected'
  );
});

const removeClassFromButtons = () => {
  idEditBoxbtnDimensione_Small.classList.remove(
    'editBoxContent__left_button_selected'
  );
  idEditBoxbtnDimensione_Medium.classList.remove(
    'editBoxContent__left_button_selected'
  );
  idEditBoxbtnDimensione_Large.classList.remove(
    'editBoxContent__left_button_selected'
  );
  idEditBoxbtnDimensione_Custom.classList.remove(
    'editBoxContent__left_button_selected'
  );
};
// **************************************************************

/**
 * Box Sizes Modal
 */
const saveBoxSizesBtn = document.getElementById('saveBoxSizesBtn');

const resetBoxSizes = (fields) => {
  fields.forEach((field) => {
    field.classList.remove('error');
  });
};

const smallInputs = document.querySelectorAll('.small-box-size');
const mediumInputs = document.querySelectorAll('.medium-box-size');
const largeInputs = document.querySelectorAll('.large-box-size');
const customInputs = document.querySelectorAll('.custom-box-size');
saveBoxSizesBtn.addEventListener('click', () => {
  const boxSizeTitles = document.querySelectorAll('.boxSizeTitle');

  const smallFields = document.querySelectorAll('.small-field');
  const mediumFields = document.querySelectorAll('.medium-field');
  const largeFields = document.querySelectorAll('.large-field');
  const customFields = document.querySelectorAll('.custom-field');

  // Reset
  resetBoxSizes(boxSizeTitles);
  resetBoxSizes(smallFields);
  resetBoxSizes(mediumFields);
  resetBoxSizes(largeFields);
  resetBoxSizes(customFields);

  //Validate Required fields
  let requiredValidation = true;

  smallInputs.forEach((input, index) => {
    if (input.value === '') {
      smallFields[index].classList.add('error');
      boxSizeTitles[0].classList.add('error');
      requiredValidation = false;
    }
  });

  mediumInputs.forEach((input, index) => {
    if (input.value === '') {
      mediumFields[index].classList.add('error');
      boxSizeTitles[1].classList.add('error');
      requiredValidation = false;
    }
  });

  largeInputs.forEach((input, index) => {
    if (input.value === '') {
      largeFields[index].classList.add('error');
      boxSizeTitles[2].classList.add('error');
      requiredValidation = false;
    }
  });

  customInputs.forEach((input, index) => {
    if (input.value === '') {
      customFields[index].classList.add('error');
      boxSizeTitles[3].classList.add('error');
      requiredValidation = false;
    }
  });

  if (requiredValidation) {
    const data = {
      small: {
        length: smallInputs[0].value,
        width: smallInputs[1].value,
        height: smallInputs[2].value,
      },
      medium: {
        length: mediumInputs[0].value,
        width: mediumInputs[1].value,
        height: mediumInputs[2].value,
      },
      large: {
        length: largeInputs[0].value,
        width: largeInputs[1].value,
        height: largeInputs[2].value,
      },
      custom: {
        length: customInputs[0].value,
        width: customInputs[1].value,
        height: customInputs[2].value,
      },
    };
    moving.updateSizes(data);
    $('#boxSizesModal').modal('hide');
  }
});

/**
 * New Box Modal
 */
const boxSizesBtns = document.querySelectorAll('.size-buttons button');

boxSizesBtns.forEach((boxSizeBtn) => {
  boxSizeBtn.addEventListener('click', () => {
    const lastActive = document.querySelector('.size-buttons button.active');
    if (lastActive) lastActive.classList.remove('active');
    boxSizeBtn.classList.add('active');
  });
});

const saveNewBoxBtn = document.getElementById('saveNewBoxBtn');

//Save new box into moving
saveNewBoxBtn.addEventListener('click', () => {
  let requiredValidation = true;

  const newBoxNameInput = document.getElementById('newBoxNameInput');
  const newBoxLabelSelect = document.getElementById('newBoxLabelSelect');
  const newBoxDescInput = document.getElementById('newBoxDescInput');
  const sizeActive = document.querySelector('.size-buttons button.active');

  const newBoxNameErrorMsg = document.getElementById('newBoxNameErrorMsg');
  const newBoxLabelErrorMsg = document.getElementById('newBoxLabelErrorMsg');
  const newBoxSizeErrorMsg = document.getElementById('newBoxSizeErrorMsg');

  const newBoxNameField = document.getElementById('newBoxNameField');
  const newBoxLabelField = document.getElementById('newBoxLabelField');
  const newBoxSizeField = document.getElementById('newBoxSizeField');

  //Reset
  newBoxNameErrorMsg.innerText = '';
  newBoxNameField.classList.remove('error');
  newBoxLabelErrorMsg.innerText = '';
  newBoxLabelField.classList.remove('error');
  newBoxSizeErrorMsg.innerText = '';
  newBoxSizeField.classList.remove('error');

  //Required fields
  if (newBoxNameInput.value === '') {
    newBoxNameErrorMsg.innerHTML = 'Please enter new box name';
    newBoxNameField.classList.add('error');
    requiredValidation = false;
  }
  if (newBoxLabelSelect.value === '') {
    newBoxLabelErrorMsg.innerHTML = 'Please select a box label';
    newBoxLabelField.classList.add('error');
    requiredValidation = false;
  }
  if (!sizeActive) {
    newBoxSizeErrorMsg.innerHTML = 'Please select a box label';
    newBoxSizeField.classList.add('error');
    requiredValidation = false;
  }

  if (requiredValidation) {
    //Call add method from Box class to add to firebase
    box.add(
      window.sessionStorage.getItem('movingId'),
      null,
      newBoxNameInput.value,
      newBoxDescInput.value,
      newBoxLabelSelect.selectedOptions[0].text,
      sizeActive.innerText
    );

    //Reset fields
    newBoxNameInput.value = '';
    newBoxDescInput.value = '';
    newBoxLabelSelect.value = '';
    sizeActive.classList.remove('active');

    //Close modal
    $('#newBoxModal').modal('hide');
  }
});

/*detecting change in breakpoint to change edit box modal size*/
/************************************************************** */
let resizeNewBoxModal = new ResizeModal(900, idNewBoxModalDialog);

resizeNewBoxModal.onLoad();
resizeNewBoxModal.onScreenSizeChange();

/************************************************************** */

/*detecting change in breakpoint to change edit box modal size*/

let resizeEditBoxModal = new ResizeModal(900, idEditBoxModalDialog);

resizeEditBoxModal.onLoad();
resizeEditBoxModal.onScreenSizeChange();

/************************************************************** */

//pass item selected it to session variable
const sendItemId = (e) => {
  const boxId = e.parentElement.parentElement.id;
  // console.log(itemId)
  window.sessionStorage.setItem('boxId', boxId);
};
/********************************************** */

/**
 * Build the UI to list all the boxes according to a
 * specific moving
 */
const boxesWrapper = document.querySelector('.boxes-wrapper');

//Array to loop through every box related with moving id
const boxes = [];

const buildBoxesList = (boxes) => {
  boxesWrapper.innerHTML = '';
  boxes.forEach((box) => {
    const boxContainer = document.createElement('div');
    boxContainer.classList.add('box');
    boxContainer.setAttribute('id', box.idBox);

    const boxImage = document.createElement('div');
    boxImage.classList.add('box__image');
    const boxStatusIcon = document.createElement('span');

    if (box.status) {
      boxStatusIcon.className = `fak fa-close-box`;
      //Adding color change
      boxContainer.classList.add('closed');
    } else {
      boxStatusIcon.className = `fak fa-open-box`;
      //Adding color change
      boxContainer.classList.remove('closed');
    }

    const sizeWrapper = document.createElement('p');
    const sizeLabel = document.createElement('span');
    const sizeText = document.createTextNode(`${box.boxSize}`);
    sizeLabel.innerText = 'Size: ';
    sizeWrapper.appendChild(sizeLabel);
    sizeWrapper.appendChild(sizeText);
    boxImage.appendChild(boxStatusIcon);
    boxImage.appendChild(sizeWrapper);

    const boxInfo = document.createElement('div');
    boxInfo.classList.add('box__info');
    boxInfo.innerHTML = ` <p><span>Weight: </span>${box.weight} kg</p>
                          <p><span>Value: </span>$${box.value}</p>`;

    const boxMetadata = document.createElement('div');
    boxMetadata.classList.add('box__metadata');
    boxMetadata.innerHTML = `<a onclick="sendItemId(this)" href="box-content.html"><p>${
      box.name
    }</p></a>  
                             <p>${box.label}</p>
                             <p>${box.fragile ? 'Fragile' : ''}</p>
                             <p>${box.status ? 'Close' : ''}</p>`;

    const boxActions = document.createElement('div');
    boxActions.classList.add('box__actions');

    const pdfBoxModalBtn = document.createElement('button');
    pdfBoxModalBtn.classList.add('icon');
    pdfBoxModalBtn.setAttribute('data-bs-toggle', 'modal');
    pdfBoxModalBtn.setAttribute('data-bs-target', '#pdfBoxModal');
    const pdfIcon = document.createElement('span');
    pdfIcon.className = 'fas fa-file-pdf';
    pdfBoxModalBtn.appendChild(pdfIcon);
    pdfBoxModalBtn.addEventListener('click', () => {
      const boxSelectedId = document.getElementById('boxSelectedId');
      boxSelectedId.value = box.idBox;
      // console.log(boxSelectedId.value )
    });

    const editBoxModalBtn = document.createElement('button');
    editBoxModalBtn.classList.add('icon');
    editBoxModalBtn.setAttribute('data-bs-toggle', 'modal');
    editBoxModalBtn.setAttribute('data-bs-target', '#editBoxModal');
    const pencilIcon = document.createElement('span');
    pencilIcon.className = 'fas fa-pencil-alt';
    editBoxModalBtn.appendChild(pencilIcon);

    editBoxModalBtn.addEventListener('click', () => {
      const boxSelectedId = document.getElementById('boxSelectedId');
      boxSelectedId.value = box.idBox;
    });

    const removeBoxModalBtn = document.createElement('button');
    removeBoxModalBtn.classList.add('icon');
    removeBoxModalBtn.setAttribute('data-bs-toggle', 'modal');
    removeBoxModalBtn.setAttribute('data-bs-target', '#deleteBoxModal');
    const trashIcon = document.createElement('span');
    trashIcon.className = 'fas fa-trash';
    removeBoxModalBtn.appendChild(trashIcon);

    removeBoxModalBtn.addEventListener('click', () => {
      const boxSelectedId = document.getElementById('boxSelectedId');
      boxSelectedId.value = box.idBox;
    });

    boxActions.appendChild(pdfBoxModalBtn);
    boxActions.appendChild(editBoxModalBtn);
    boxActions.appendChild(removeBoxModalBtn);

    const boxProgress = document.createElement('div');
    boxProgress.classList.add('box__progress');
    boxProgress.innerHTML = `
      <p>Add box</p>
      <p>Add items</p>
      <p>Close box</p>
      <p>Download label</p>`;

    boxContainer.appendChild(boxImage);
    boxContainer.appendChild(boxInfo);
    boxContainer.appendChild(boxMetadata);
    boxContainer.appendChild(boxActions);
    boxContainer.appendChild(boxProgress);
    boxesWrapper.appendChild(boxContainer);
  });
};

/**
 * Delete a box from the modal
 */
const btnBoxDelete = document.getElementById('btnBoxDelete');
btnBoxDelete.addEventListener('click', () => {
  $('#deleteBoxModal').modal('hide');
  $('#questionModal').modal('show');
});

const removeBoxBtn = document.getElementById('removeBoxBtn');
removeBoxBtn.addEventListener('click', () => {
  const movingId = window.sessionStorage.getItem('movingId');
  const boxSelectedId = document.getElementById('boxSelectedId').value;
  try {
    box.delete(movingId, boxSelectedId);
    $('#questionModal').modal('hide');
  } catch (err) {
    console.log('Error deleting the selected box: ', err);
  }
});

/**
 * Populate Edit box from the modal with info from firebase
 */
const editBoxModal = document.getElementById('editBoxModal');
editBoxModal.addEventListener('shown.bs.modal', async () => {
  const idEditBoxNameInput = document.getElementById('idEditBoxNameInput');
  const idEditBoxDescriptionInput = document.getElementById(
    'idEditBoxDescriptionInput'
  );
  const idEditBoxLabelList = document.getElementById('idEditBoxLabelList');
  const BoxWeightInput = document.getElementById('BoxWeightInput');
  const idBoxFragileCheck = document.getElementById('idBoxFragileCheck');
  const idBoxCloseCheck = document.getElementById('idBoxCloseCheck');
  const boxSizesBtns = document.querySelectorAll(
    '.editBoxContent__boxDimensionsButtons button'
  );
  const msgWhenClose = document.getElementById('msgWhenClose');

  try {
    const movingId = window.sessionStorage.getItem('movingId');
    const boxSelectedId = document.getElementById('boxSelectedId').value;

    const boxInfo = await box.getBox(movingId, boxSelectedId);

    idEditBoxNameInput.value = boxInfo.name;
    idEditBoxDescriptionInput.value = boxInfo.description;

    // const totalLabelsinList = idEditBoxLabelList.options.length;
    // for(let i=0;i<=totalLabelsinList;i++){
    //   if (idEditBoxLabelList)
    // }

    Array.from(idEditBoxLabelList.options).forEach((e) => {
      if (e.text == boxInfo.label) {
        idEditBoxLabelList.value = e.value;
      }
    });

    // console.log(idEditBoxLabelList)
    // idEditBoxLabelList.value = 2

    BoxWeightInput.value = boxInfo.weight;
    idBoxFragileCheck.checked = boxInfo.fragile;
    idBoxCloseCheck.checked = boxInfo.status;

    boxSizesBtns.forEach((boxSize) => {
      if (boxSize.innerText === boxInfo.boxSize) {
        boxSize.classList.add('editBoxContent__left_button_selected');
      } else {
        boxSize.classList.remove('editBoxContent__left_button_selected');
      }
    });

    // Disable input area in edit box mode and change clore of box page, when the box is closed and when it's rendered
    if (idBoxCloseCheck.checked) {
      idEditBoxNameInput.disabled = true;
      idEditBoxDescriptionInput.disabled = true;
      idEditBoxLabelList.disabled = true;

      for (i = 0; i < boxSizesBtns.length; i++) {
        boxSizesBtns[i].disabled = true;
      }

      BoxWeightInput.disabled = true;
      idBoxFragileCheck.disabled = true;

      msgWhenClose.style.opacity = 1;
    } else {
      idEditBoxNameInput.disabled = false;
      idEditBoxDescriptionInput.disabled = false;
      idEditBoxLabelList.disabled = false;

      for (i = 0; i < boxSizesBtns.length; i++) {
        boxSizesBtns[i].disabled = false;
      }

      BoxWeightInput.disabled = false;
      idBoxFragileCheck.disabled = false;

      msgWhenClose.style.opacity = 0;
    }
  } catch (err) {
    console.log('Error getting the box: ', err);
  }
});

// When Switched box close/Open
const idBoxCloseCheck = document.getElementById('idBoxCloseCheck');

idBoxCloseCheck.addEventListener('change', () => {
  // Disable input area when the box is closed in edit modal
  const idEditBoxNameInput = document.getElementById('idEditBoxNameInput');
  const idEditBoxDescriptionInput = document.getElementById(
    'idEditBoxDescriptionInput'
  );
  const idEditBoxLabelList = document.getElementById('idEditBoxLabelList');
  const BoxWeightInput = document.getElementById('BoxWeightInput');
  const idBoxFragileCheck = document.getElementById('idBoxFragileCheck');
  const boxSizesBtns = document.querySelectorAll(
    '.editBoxContent__boxDimensionsButtons button'
  );
  const msgWhenClose = document.getElementById('msgWhenClose');

  if (idBoxCloseCheck.checked) {
    idEditBoxNameInput.disabled = true;
    idEditBoxDescriptionInput.disabled = true;
    idEditBoxLabelList.disabled = true;

    for (i = 0; i < boxSizesBtns.length; i++) {
      boxSizesBtns[i].disabled = true;
    }

    BoxWeightInput.disabled = true;
    idBoxFragileCheck.disabled = true;

    msgWhenClose.style.opacity = 1;
  } else {
    idEditBoxNameInput.disabled = false;
    idEditBoxDescriptionInput.disabled = false;
    idEditBoxLabelList.disabled = false;

    for (i = 0; i < boxSizesBtns.length; i++) {
      boxSizesBtns[i].disabled = false;
    }

    BoxWeightInput.disabled = false;
    idBoxFragileCheck.disabled = false;

    msgWhenClose.style.opacity = 0;
  }
});
/**
 * Edit a box according to a moving id
 */
const idbtnEditBoxSave = document.getElementById('idbtnEditBoxSave');
idbtnEditBoxSave.addEventListener('click', () => {
  let requiredValidation = true;

  const idEditBoxNameInput =
    document.getElementById('idEditBoxNameInput').value;
  const idEditBoxDescriptionInput = document.getElementById(
    'idEditBoxDescriptionInput'
  ).value;

  const idEditBoxLabelList = document.getElementById('idEditBoxLabelList');
  const BoxWeightInput = document.getElementById('BoxWeightInput').value;
  const idBoxFragileCheck = document.getElementById('idBoxFragileCheck');
  const idBoxCloseCheck = document.getElementById('idBoxCloseCheck');
  const boxSizeSelected = document.querySelector(
    '.editBoxContent__left_button_selected'
  ).innerText;

  const editBoxNameErrorMsg = document.getElementById('editBoxNameErrorMsg');
  const editBoxLabelErrorMsg = document.getElementById('editBoxLabelErrorMsg');
  const editBoxDimensionsErrorMsg = document.getElementById(
    'editBoxDimensionsErrorMsg'
  );

  const editBoxNameField = document.getElementById('editBoxNameField');
  const editBoxLabelField = document.getElementById('editBoxLabelField');
  const editBoxDimensionsField = document.getElementById(
    'editBoxDimensionsField'
  );

  //Reset
  editBoxNameErrorMsg.innerText = '';
  editBoxNameField.classList.remove('error');
  editBoxLabelErrorMsg.innerText = '';
  editBoxLabelField.classList.remove('error');
  editBoxDimensionsErrorMsg.innerText = '';
  editBoxDimensionsField.classList.remove('error');

  //Required fields
  if (idEditBoxNameInput === '') {
    editBoxNameErrorMsg.innerHTML = 'Please enter box name';
    editBoxNameField.classList.add('error');
    requiredValidation = false;
  }
  if (idEditBoxLabelList.value == 0) {
    editBoxLabelErrorMsg.innerHTML = 'Please select a box label';
    editBoxLabelField.classList.add('error');
    requiredValidation = false;
  }
  if (!boxSizeSelected) {
    editBoxDimensionsErrorMsg.innerHTML = 'Please select a box size';
    editBoxDimensionsField.classList.add('error');
    requiredValidation = false;
  }

  if (requiredValidation) {
    try {
      const movingId = window.sessionStorage.getItem('movingId');
      const boxSelectedId = document.getElementById('boxSelectedId').value;

      box.update(
        movingId,
        boxSelectedId,
        idEditBoxNameInput,
        idEditBoxDescriptionInput,
        idEditBoxLabelList.options[idEditBoxLabelList.value].text,
        boxSizeSelected,
        BoxWeightInput,
        idBoxFragileCheck.checked,
        idBoxCloseCheck.checked
      );

      $('#editBoxModal').modal('hide');
    } catch (err) {
      console.log('Error updating the box: ', err);
    }
  }
});

/************************************** */
//populate pdf modal
/************************************** */

const pdfBoxModal = document.getElementById('pdfBoxModal');
pdfBoxModal.addEventListener('shown.bs.modal', async () => {
  try {
    const boxSelectedId = document.getElementById('boxSelectedId');
    const movingId = window.sessionStorage.getItem('movingId');
    const boxInfo = await box.getBox(movingId, boxSelectedId.value);
    const movingInfo = await moving.getMovingById(movingId);
    const items = await box.getItems(movingId, boxSelectedId.value);

    pdfModalLabel.innerHTML = boxInfo.name;
    BoxName.innerHTML = boxInfo.name;
    idlblSize.innerHTML = boxInfo.boxSize;
    idlblDescription.innerHTML = boxInfo.description;
    idlblBoxLabel.innerHTML = boxInfo.label;
    idlblVolume.innerHTML = `${boxVolume(boxInfo.boxSize)} &#13221;`;
    let value = 0;
    items.forEach((element) => {
      value += Number(element.value);
    });

    idlblValue.innerHTML = `$ ${value}`;
    idlblWeight.innerHTML = boxInfo.weight + ' Kg';
    idlblAddressMove.innerHTML = moving.to;
    const lblFragile = document.getElementById('lblFragile');
    if (boxInfo.fragile) {
      lblFragile.classList.remove('pdfBoxContent__labelFragile_hidden');
    } else {
      lblFragile.classList.add('pdfBoxContent__labelFragile_hidden');
    }
  } catch (err) {
    console.log(err);
  }
});

const boxVolume = (boxSize) => {
  let volume = 0;
  switch (boxSize.toUpperCase()) {
    case 'SMALL':
      volume =
        smallInputs[0].value * smallInputs[1].value * smallInputs[2].value;
      break;
    case 'MEDIUM':
      volume =
        mediumInputs[0].value * mediumInputs[1].value * mediumInputs[2].value;
      break;
    case 'LARGE':
      volume =
        largeInputs[0].value * largeInputs[1].value * largeInputs[2].value;
      break;
    case 'CUSTOM':
      volume =
        customInputs[0].value * customInputs[1].value * customInputs[2].value;
      break;
  }
  //volume is in cubic cm, convert to cubic mts
  console.log(volume);
  volume = volume / 100;
  return volume;
};
