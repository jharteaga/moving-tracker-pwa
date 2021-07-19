/********************************/
//this function is used to passed to the delete icon button to confirm delete
const deleteItemQuestion = (e)=>{
	// ***********************************************/
	//get item ID
	const idItem = e.parentNode.children[2].value
	// ***********************************************/

	//get hidden input to store id
	const iditemSelected = document.getElementById("iditemSelected")
	iditemSelected.value = idItem
}

/********************************/
// this funcion delete item
const deleteItem = ()=> {
	let msgRetrived=""
	//select hidden id
	const iditemSelected = document.getElementById("iditemSelected")
	//******************* */
	const itemTobeDeleted = iditemSelected.value

	const item = new Item()
	item.delete(idMoving,idBox,itemTobeDeleted).then((msg)=>
	{	
		cleanHiddenidInput()
		boxContent.getItems(idMoving,idBox).then(items => {
		printItems(items);
		});

        showModalMsg(msg)
	})
	
	
	
}