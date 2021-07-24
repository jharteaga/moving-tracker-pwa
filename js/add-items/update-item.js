/********************************/
//this function is used to passed info to iteml modal to show info to be updated
const updateItemOpenModal = (e) => {
  const idMoving = window.sessionStorage.getItem('movingId');
  const idBox = window.sessionStorage.getItem('boxId');

  // ***********************************************/
  //get item ID
  const idItem = e.parentNode.children[2].value;
  // ***********************************************/

  //get hidden input to store id
  const iditemSelected = document.getElementById('iditemSelected');
  iditemSelected.value = idItem;

  changeAddItemModalTitle('Update item');

  const item = new Item();
  item.getItem(idMoving, idBox, idItem).then((data) => {
    const itemNameInput = document.getElementById('newItemNameInput');
    const itemDescriptionInput = document.getElementById(
      'newItemDescriptionInput'
    );
    const itemCategoryInput = document.getElementById('newItemCategoryInput');
    const itemQuantityInput = document.getElementById('newItemQuantityInput');
    const itemValueInput = document.getElementById('newItemValueInput');
    // const itemImageInput = document.getElementById("itemImageInput");

    itemNameInput.value = data[0].name;
    itemDescriptionInput.value = data[0].description;
    itemCategoryInput.value = data[0].category;
    itemQuantityInput.value = data[0].quantity;
    itemValueInput.value = data[0].value;
  });
};
