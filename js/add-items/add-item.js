

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
 
    //look for element where idItem is stored
    const iditemSelected = document.getElementById("iditemSelected")
    const idItem = iditemSelected.value;

        //CHANGE THIS CONSTS WITH VALUES FROM SESSIONS
        const idMoving = window.sessionStorage.getItem('movingId');
        const idBox =  window.sessionStorage.getItem('itemId') 

        // const idMoving="mPkQ3bczO9EHyBQ2LVSt";
        // const idBox = "0L4BgcxzedWLa60wi5e7";  
        
        // if idItem is passed, it will update, otherwise, it will add a new item
    addUpdateItem(idMoving,idBox,idItem,itemNameInput.value,itemDescriptionInput.value, itemCategoryInput.value, itemQuantityInput.value, itemValueInput.value);
    // ******************************************

})

 //ADDED BY ALEJANDRA
 /* function to send item data to firebase */

const addUpdateItem = (idMoving,idBox,idItem,name,description,category,qty,value)=>{
      
 
    let item = new Item();
    let msgRetrived = ""
    if (idItem=="")
        {
            item.add(idMoving,idBox,name,description, category, qty, value).then((msg)=>{ msgRetrived=msg;
                print(idMoving, idBox)
                //clean inputs
                cleanHiddenidInput()
                cleanInputs()
            });
        }
    else
        {            
            item.update(idMoving,idBox,idItem,name,description, category, qty, value).then((msg)=>{
                print(idMoving, idBox)
                //clean inputs
                cleanHiddenidInput()
                cleanInputs();

                showModalMsg(msg)});
        }

    let modal = new bootstrap.Modal(document.getElementById('itemModal'),{keyboard:false});
        modal.hide();
   
}

const print =(idMoving,idBox)=>{
    /********************************/
    //Items need to be reprinted
    /********************************/
    let boxContent = new Box();
    boxContent.getItems(idMoving,idBox).then(items => {
        printItems(items);
    });
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