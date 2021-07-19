/**
 *  Connection to User and Moving Classes
 */

const user = new User();

const moving = new Moving();

/**
 * Fetch labels snapshot from firebase to update ui, uses movingId from
 * session storage.
 */
function fetchMovingDetails() {
  moving.getMovingSnapshotById(
    window.sessionStorage.getItem('movingId'),
    () => {
      boxLabels.length = 0;
      moving.labels.forEach((label) => {
        boxLabels.push({ id: boxLabels.length + 1, name: label });
      });
      buildBoxLabels(boxLabels);
      collaborators.length = 0;
      moving.collaborators.forEach((collaborator) => {
        collaborators.push({
          id: collaborators.length + 1,
          name: collaborator,
        });
      });
      buildCollaborators(collaborators);
      console.log(
        moving.sizes[Object.keys(moving.sizes)[1]].height,
        Object.keys(moving.sizes)[1]
      );

      /**
       * Populates sizes details on page load
       */
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
  );
}

user.isLoggedIn(async () => {
  moving.userId = user.userId;
  fetchMovingDetails();
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
      fetchMovingDetails();
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

        fetchMovingDetails();
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
      fetchMovingDetails();
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
        fetchMovingDetails();
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

  const newBoxNameInput = document.getElementById('newBoxNameInput').value;
  const newBoxLabelSelect = document.getElementById('newBoxLabelSelect').value;
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
  if (newBoxNameInput === '') {
    newBoxNameErrorMsg.innerHTML = 'Please enter new box name';
    newBoxNameField.classList.add('error');
    requiredValidation = false;
  }
  if (newBoxLabelSelect === '') {
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
    console.log('call function to save new box');
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
