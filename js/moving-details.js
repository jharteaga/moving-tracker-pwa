/**
 * Movings Options Menu
 */
const menuBtn = document.querySelector('.moving-details .options-btn');
const movingOptions = document.querySelector('.moving-details .moving-options');
const page = document.querySelector('main');

menuBtn.addEventListener('click', () => {
	movingOptions.classList.toggle('active');
});

page.addEventListener('click', () => {
	if (movingOptions.classList.contains('active')) {
		movingOptions.classList.remove('active');
	}
});

/**
 * Box Labels Modal
 */
const modalBodyBoxLabel = document.querySelector('#boxLabelsModal .modal-body');
const boxLabels = [{ id: 1, name: 'Bathroom' }];

const addInputLabel = () => {
	const labelContainer = document.createElement('div');
	labelContainer.className = 'label-container';

	const inputLabel = document.createElement('input');
	inputLabel.setAttribute('type', 'text');
	inputLabel.setAttribute('placeholder', 'Enter a label');
	inputLabel.className = 'form-control';

	const spanPlus = document.createElement('span');
	spanPlus.setAttribute('id', 'addBoxLabel');
	spanPlus.className = 'fas fa-plus';

	labelContainer.appendChild(inputLabel);
	labelContainer.appendChild(spanPlus);

	modalBodyBoxLabel.appendChild(labelContainer);

	spanPlus.addEventListener('click', function () {
		const newBoxLabelInput = document.querySelector(
			'.label-container:last-child > input'
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

const buildBoxLabels = (labelsList) => {
	modalBodyBoxLabel.innerHTML = '';

	if (labelsList.length) {
		labelsList.forEach((label) => {
			const labelContainer = document.createElement('div');
			labelContainer.className = 'label-container';

			const inputLabel = document.createElement('input');
			inputLabel.setAttribute('type', 'text');
			inputLabel.setAttribute('placeholder', 'Enter a label');
			inputLabel.setAttribute('value', label.name);
			inputLabel.className = 'form-control';

			const spanTrash = document.createElement('span');
			spanTrash.setAttribute('id', `removeBoxLabel${label.id}`);
			spanTrash.className = 'fas fa-trash';

			labelContainer.appendChild(inputLabel);
			labelContainer.appendChild(spanTrash);

			modalBodyBoxLabel.appendChild(labelContainer);

			spanTrash.addEventListener('click', function () {
				boxLabels.splice(label.id - 1, 1);
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

/**
 * Box Labels Modal
 */
const modalBodyCollaborator = document.querySelector(
	'#collaboratorModal .modal-body'
);
const collaborators = [{ id: 1, name: 'Jose Arteaga' }];

const addInputCollaborator = () => {
	const collaboratorContainer = document.createElement('div');
	collaboratorContainer.className = 'collaborator-container';

	const inputCollaborator = document.createElement('input');
	inputCollaborator.setAttribute('type', 'text');
	inputCollaborator.setAttribute('placeholder', 'Enter a collaborator');
	inputCollaborator.className = 'form-control';

	const spanPlus = document.createElement('span');
	spanPlus.setAttribute('id', 'addCollaborator');
	spanPlus.className = 'fas fa-plus';

	collaboratorContainer.appendChild(inputCollaborator);
	collaboratorContainer.appendChild(spanPlus);

	modalBodyCollaborator.appendChild(collaboratorContainer);

	spanPlus.addEventListener('click', function () {
		const newCollaboratorInput = document.querySelector(
			'.collaborator-container:last-child > input'
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

const buildCollaborators = (collaboratorsList) => {
	modalBodyCollaborator.innerHTML = '';

	if (collaboratorsList.length) {
		collaboratorsList.forEach((collaborator, index) => {
			const collaboratorContainer = document.createElement('div');
			collaboratorContainer.className = 'collaborator-container';

			const inputCollaborator = document.createElement('input');
			inputCollaborator.setAttribute('type', 'text');
			inputCollaborator.setAttribute(
				'placeholder',
				'Enter a collaborator'
			);
			inputCollaborator.setAttribute('value', collaborator.name);
			inputCollaborator.className = 'form-control';

			const spanTrash = document.createElement('span');
			spanTrash.setAttribute('id', `removeCollaborator${index}`);
			spanTrash.className = 'fas fa-trash';

			collaboratorContainer.appendChild(inputCollaborator);
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
