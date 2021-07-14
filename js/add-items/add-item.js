

const addItemBtn = document.getElementById("addItemBtn");

// window.addEventListener('change', ()=> { 

//     const itemNameInput = document.getElementById("itemNameInput").value;
//     const itemCategoryInput = document.getElementById("itemCategoryInput").value;
//     const itemQuantityInput = document.getElementById("itemQuantityInput").value;


//     if(itemNameInput !== "" && itemCategoryInput !== "" && itemQuantityInput !== "") {
//         addItemBtn.disabled = false;
//     }

//     if(itemNameInput === ""){
//         itemNameErrorMsg.innerHTML = "Please enter Item Name"; 
//     } else {
//         itemNameErrorMsg.innerHTML = "";
//     }

//     if(itemCategoryInput === ""){
//         itemCategoryErrorMsg.innerHTML = "Please enter Category"; 
//     } else {
//         itemCategoryErrorMsg.innerHTML = ""; 
//     }

//     if(itemQuantityInput === ""){
//         itemQuantityErrorMsg.innerHTML = "Please enter Quantity"; 
//     } else {
//         itemQuantityErrorMsg.innerHTML = ""; 
//     }

// });


addItemBtn.addEventListener('click', ()=>{
    // console.log("Add")
    const itemNameInput = document.getElementById("itemNameInput");
    const itemDescriptionInput = document.getElementById("itemDescriptionInput");
    const itemCategoryInput = document.getElementById("itemCategoryInput");
    const itemQuantityInput = document.getElementById("itemQuantityInput");
    const itemValueInput = document.getElementById("itemValueInput");
    const itemImageInput = document.getElementById("itemImageInput");
 
    
    //ADDED BY ALEJANDRA
        //CHANGE THIS CONSTS WITH VALUES FROM SESSIONS
        const idMoving="7lI4hu7cuqmurPqSFa72";
        const idBox = "xtV5zrXtZcuN33KHxF2l";  
        const idItem = "";

        // if idItem is passed, it will update, otherwise, it will add a new item
    addUpdateItem(idMoving,idBox,idItem,itemNameInput.value,itemDescriptionInput.value, itemCategoryInput.value, itemQuantityInput.value, itemValueInput.value);
    // ******************************************

    /********************************/
    //Items need to be reprinted
    /********************************/
    let boxContent = new Box();
    boxContent.getItems(idMoving,idBox).then(items => {
        printItems(items);
    });
})

 //ADDED BY ALEJANDRA
 /* function to send item data to firebase */
const addUpdateItem = (idMoving,idBox,idItem,name,description,category,qty,value)=>{
      
 
    let item = new Item();
  
    if (idItem=="")
        {
            let msg = item.add(idMoving,idBox,name,description, category, qty, value);
        }
    else
        {
            let msg = item.update(idMoving,idBox,idItem,name,description, category, qty, value);
        }
    // msg needs to be displayed to user

    //clean inputs
    cleanInputs();

    let modal = new bootstrap.Modal(document.getElementById('itemModal'),{keyboard:false});
    console.log(modal)
        modal.hide();

}

/* ADDED BY ALEJANDRA*/
/* clean all inputs */
const cleanInputs = () =>{
    itemNameInput.value="";
    itemDescriptionInput.value="";
    itemCategoryInput.value="";
    itemQuantityInput.value="";
    itemValueInput.value="";
    // preview.innerHTML = "";
}

/* ADDED BY ALEJANDRA*/
/* event to display a preview of the picture*/ 
const itemImageInput = document.getElementById("itemImageInput");
const preview = document.getElementById("preview");

itemImageInput.addEventListener("change", function () {
  getImgData(preview,itemImageInput);
});