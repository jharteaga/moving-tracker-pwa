


/********************************/
//this function is used to passed info to iteml modal to show info to be updated
const updateItemOpenModal = (e)=>{

     //CHANGE THIS CONSTS WITH VALUES FROM SESSIONS
    const idMoving="7lI4hu7cuqmurPqSFa72";
    const idBox = "xtV5zrXtZcuN33KHxF2l"; 


	// ***********************************************/
	//get item ID
	const idItem = e.parentNode.children[2].value
	// ***********************************************/

	//get hidden input to store id
	const iditemSelected = document.getElementById("iditemSelected")
	iditemSelected.value = idItem

    changeAddItemModalTitle("Update item")

    const item = new Item()
    item.getItem(idMoving,idBox,idItem).then((data)=>{
        const itemNameInput = document.getElementById("itemNameInput");
        const itemDescriptionInput = document.getElementById("itemDescriptionInput");
        const itemCategoryInput = document.getElementById("itemCategoryInput");
        const itemQuantityInput = document.getElementById("itemQuantityInput");
        const itemValueInput = document.getElementById("itemValueInput");
        // const itemImageInput = document.getElementById("itemImageInput");

        itemNameInput.value = data[0].name;
        itemDescriptionInput.value = data[0].description;
        itemCategoryInput.value = data[0].category;
        itemQuantityInput.value = data[0].quantity;
        itemValueInput.value = data[0].value;
        
    })
}