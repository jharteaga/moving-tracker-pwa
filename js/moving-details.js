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
