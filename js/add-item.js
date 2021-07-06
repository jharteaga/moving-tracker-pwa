

const addItemBtn = document.getElementById("addItemBtn");

window.addEventListener('change', ()=> { 

    const itemNameInput = document.getElementById("itemNameInput").value;
    const itemCategoryInput = document.getElementById("itemCategoryInput").value;
    const itemQuantityInput = document.getElementById("itemQuantityInput").value;


    if(itemNameInput !== "" && itemCategoryInput !== "" && itemQuantityInput !== "") {
        addItemBtn.disabled = false;
    }

    if(itemNameInput === ""){
        itemNameErrorMsg.innerHTML = "Please enter Item Name"; 
    } else {
        itemNameErrorMsg.innerHTML = "";
    }

    if(itemCategoryInput === ""){
        itemCategoryErrorMsg.innerHTML = "Please enter Category"; 
    } else {
        itemCategoryErrorMsg.innerHTML = ""; 
    }

    if(itemQuantityInput === ""){
        itemQuantityErrorMsg.innerHTML = "Please enter Quantity"; 
    } else {
        itemQuantityErrorMsg.innerHTML = ""; 
    }

});


addItemBtn.addEventListener('click', ()=>{

    const itemNameInput = document.getElementById("itemNameInput");
    const itemDescriptionInput = document.getElementById("itemDescriptionInput");
    const itemCategoryInput = document.getElementById("itemCategoryInput");
    const itemQuantityInput = document.getElementById("itemQuantityInput");
    const itemValueInput = document.getElementById("itemValueInput");
    const itemImageInput = document.getElementById("itemImageInput");

    

    // const lastId = items[items.length -1].itemId;
    // const itemId = lastId + 1;

    // const itemToPush = new Item (itemId, itemNameInput, itemDescriptionInput, itemCategoryInput, itemQuantiryInput, itemValueInput, itemImageInput);
    // console.log(itemToPush);

    // items.push(itemToPush);
    // console.log(items);
   
    
    //ADDED BY ALEJANDRA
        //CHANGE THIS CONSTS WITH VALUES FROM SESSIONS
        const idMoving= "wWKmQIZ54ukSiX8HKWMQ";
        const idBox = "WSR3Avb3Ajv0Z8kiCV48";  
        const idItem = "H41kTArGunI7csJfp5wu";

        // if idItem is passed, it will update, otherwise, it will add a new item
    addUpdateItem(idMoving,idBox,idItem,itemNameInput.value,itemDescriptionInput.value, itemCategoryInput.value, itemQuantityInput.value, itemValueInput.value);
    // ******************************************

    // window.location.href = "../pages/box-content.html";
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
}

/* ADDED BY ALEJANDRA*/
/* clean all inputs */
const cleanInputs = () =>{
    itemNameInput.value="";
    itemDescriptionInput.value="";
    itemCategoryInput.value="";
    itemQuantityInput.value="";
    itemValueInput.value="";
    preview.innerHTML = "";
}

/* ADDED BY ALEJANDRA*/
/* event to display a preview of the picture*/ 
const itemImageInput = document.getElementById("itemImageInput");
const preview = document.getElementById("preview");

itemImageInput.addEventListener("change", function () {
  getImgData(preview,itemImageInput);
});