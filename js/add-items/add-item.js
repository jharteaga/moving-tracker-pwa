const addItemBtn = document.getElementById('addItemBtn');

addItemBtn.addEventListener('click', () => {
  let requiredValidation = true;

  const newItemNameInput = document.getElementById('newItemNameInput');
  const newItemDescriptionInput = document.getElementById(
    'newItemDescriptionInput'
  );
  const newItemCategoryInput = document.getElementById('newItemCategoryInput');
  const newItemQuantityInput = document.getElementById('newItemQuantityInput');
  const newItemValueInput = document.getElementById('newItemValueInput');
  const newItemImageInput = document.getElementById('newItemImageInput');

  const newItemNameErrorMsg = document.getElementById('newItemNameErrorMsg');
  const newItemCategoryErrorMsg = document.getElementById(
    'newItemCategoryErrorMsg'
  );
  const newItemQuantityErrorMsg = document.getElementById(
    'newItemQuantityErrorMsg'
  );

  const newItemNameField = document.getElementById('newItemNameField');
  const newItemCategoryField = document.getElementById('newItemCategoryField');
  const newItemQuantityField = document.getElementById('newItemQuantityField');

  //Reset
  newItemNameErrorMsg.innerText = '';
  newItemNameField.classList.remove('error');
  newItemCategoryErrorMsg.innerText = '';
  newItemCategoryField.classList.remove('error');
  newItemQuantityErrorMsg.innerText = '';
  newItemQuantityField.classList.remove('error');

  //Required fields
  if (newItemNameInput.value === '') {
    newItemNameErrorMsg.innerHTML = 'Please enter item name';
    newItemNameField.classList.add('error');
    requiredValidation = false;
  }
  if (newItemCategoryInput.value === '') {
    newItemCategoryErrorMsg.innerHTML = 'Please enter a category';
    newItemCategoryField.classList.add('error');
    requiredValidation = false;
  }
  if (newItemQuantityInput.value === '') {
    newItemQuantityErrorMsg.innerHTML = 'Please enter quantity';
    newItemQuantityField.classList.add('error');
    requiredValidation = false;
  }

  if (requiredValidation) {
    //look for element where idItem is stored
    const iditemSelected = document.getElementById('iditemSelected');
    const idItem = iditemSelected.value;

    //CHANGE THIS CONSTS WITH VALUES FROM SESSIONS
    const idMoving = window.sessionStorage.getItem('movingId');
    const idBox = window.sessionStorage.getItem('boxId');

    // if idItem is passed, it will update, otherwise, it will add a new item
    addUpdateItem(
      idMoving,
      idBox,
      idItem,
      newItemNameInput.value,
      newItemDescriptionInput.value,
      newItemCategoryInput.value,
      newItemQuantityInput.value,
      newItemValueInput.value,
      newItemImageInput
    );

    //Close modal
    $('#itemModal').modal('hide');
  }
});

//ADDED BY ALEJANDRA
/* function to send item data to firebase */
const addUpdateItem = (
  idMoving,
  idBox,
  idItem,
  name,
  description,
  category,
  qty,
  value,
  imageFile
) => {
  let item = new Item();
  let msgRetrived = '';
  if (idItem == '') {
    item
      .add(idMoving, idBox, name, description, category, qty, value, imageFile)
      .then((msg) => {
        msgRetrived = msg;
        print(idMoving, idBox);
        //clean inputs
        cleanHiddenidInput();
        cleanInputs();
      });
  } else {
    item
      .update(idMoving, idBox, idItem, name, description, category, qty, value)
      .then((msg) => {
        print(idMoving, idBox);
        //clean inputs
        cleanHiddenidInput();
        cleanInputs();

        showModalMsg(msg);
      });
  }
};

const print = (idMoving, idBox) => {
  /********************************/
  //Items need to be reprinted
  /********************************/
  let boxContent = new Box();
  boxContent.getItems(idMoving, idBox).then((items) => {
    printItems(items);
  });
};

/* ADDED BY ALEJANDRA*/
/* clean all inputs */
function cleanInputs() {
  newItemNameInput.value = '';
  newItemDescriptionInput.value = '';
  newItemCategoryInput.value = '';
  newItemQuantityInput.value = '';
  newItemValueInput.value = '';
  newItemImageInput.value = '';
  preview.innerHTML = '';
}

/* ADDED BY ALEJANDRA*/
/* event to display a preview of the picture*/
const filePicker = document.getElementById('newItemImageInput');
const imgPreview = document.getElementById('preview');

newItemImageInput.addEventListener('change', function () {
  imgPreview.innerHTML = '';

  if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
  } else {
    for (let i = 0; i < filePicker.files.length; i++) {
      const fileReader = new FileReader();
      const files = filePicker.files[i];
      fileReader.readAsDataURL(files);
      fileReader.addEventListener('load', function () {
        imgPreview.style.display = 'flex';
        imgPreview.innerHTML += '<img src="' + this.result + '" />';
      });
    }
  }
});
