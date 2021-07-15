/**
 * Movings Options Menu (Toggle plus menu button)
 */
const menuBtn = document.querySelector('.moving-details .options-btn');
const movingOptions = document.querySelector('.moving-details .moving-options');

menuBtn.addEventListener('click', () => {
	movingOptions.classList.toggle('active');
});

/**
 * Box Labels Modal
 */
const modalBodyBoxLabel = document.querySelector('#boxLabelsModal .modal-body');

//Dummy Array to loop through every box labels for the moving
const boxLabels = [{ id: 1, name: 'Bathroom' }];

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
			boxLabels.push({
				id: boxLabels.length + 1,
				name: newBoxLabelInput.value
			});

			buildBoxLabels(boxLabels);
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

			spanTrash.addEventListener('click', function () {
				boxLabels.splice(index, 1);
				buildBoxLabels(boxLabels);
			});
		});
	}
	addInputLabel();
};

buildBoxLabels(boxLabels);

/**
 * Collaborator Modal
 */
const modalBodyCollaborator = document.querySelector(
	'#collaboratorModal .modal-body'
);

//Dummy Array to loop through every collaborator for the moving
const collaborators = [{ id: 1, name: 'Jose Arteaga' }];

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
			collaborators.push({
				id: collaborators.length + 1,
				name: newCollaboratorInput.value
			});

			buildCollaborators(collaborators);
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

			spanTrash.addEventListener('click', function () {
				collaborators.splice(index, 1);
				buildCollaborators(collaborators);
			});
		});
	}
	addInputCollaborator();
};

buildCollaborators(collaborators);


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

saveBoxSizesBtn.addEventListener('click', () => {
	const smallInputs = document.querySelectorAll('.small-box-size');
	const mediumInputs = document.querySelectorAll('.medium-box-size');
	const largeInputs = document.querySelectorAll('.large-box-size');
	const customInputs = document.querySelectorAll('.custom-box-size');
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
		console.log('Call function to save box sizes in firebase');
		$('#boxSizesModal').modal('hide');
	}
});

/**
 * New Box Modal
 */
const boxSizesBtns = document.querySelectorAll('.size-buttons button');

boxSizesBtns.forEach((boxSizeBtn) => {
	boxSizeBtn.addEventListener('click', () => {
		const lastActive = document.querySelector(
			'.size-buttons button.active'
		);
		if (lastActive) lastActive.classList.remove('active');
		boxSizeBtn.classList.add('active');
	});
});

const saveNewBoxBtn = document.getElementById('saveNewBoxBtn');

//Save new box into moving
saveNewBoxBtn.addEventListener('click', () => {
	let requiredValidation = true;

	const newBoxNameInput = document.getElementById('newBoxNameInput').value;
	const newBoxLabelSelect =
		document.getElementById('newBoxLabelSelect').value;
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
let resizeNewBoxModal = new ResizeModal(900,idNewBoxModalDialog);

resizeNewBoxModal.onLoad();
resizeNewBoxModal.onScreenSizeChange(); 

/************************************************************** */

/*detecting change in breakpoint to change edit box modal size*/

let resizeEditBoxModal = new ResizeModal(900,idEditBoxModalDialog)

resizeEditBoxModal.onLoad();
resizeEditBoxModal.onScreenSizeChange();

/************************************************************** */