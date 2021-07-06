// console.log("connected");

const addItemBtn = document.getElementById("addItemBtn");


//item info
let items = [
    {
        itemId: 1,
        itemName: "Books",
        itemDescription: "",
        itemCategory: "work",
        itemQuantity: 5,
        itemValue: 50,
        itemImage: "../img/items/books.png",
    },
    {
        itemId: 2,
        itemName: "Toy",
        itemDescription: "Figures",
        itemCategory: "hobby",
        itemQuantity: 1,
        itemValue: 100,
        itemImage: "../img/items/toy.png",
    }
]


class Item {
    constructor (itemId, itemName, itemDescription, itemCategory, itemQuantity, itemValue, itemImage) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemDescription = itemDescription;
        this.itemCategory = itemCategory;
        this.itemQuantity = itemQuantity;
        this.itemValue = itemValue;
        this.itemImage = itemImage;
    }
}


window.addEventListener('change', ()=> { 

    const itemNameInput = document.getElementById("itemNameInput").value;
    const itemCategoryInput = document.getElementById("itemCategoryInput").value;
    const itemQuantiryInput = document.getElementById("itemQuantiryInput").value;


    if(itemNameInput !== "" && itemCategoryInput !== "" && itemQuantiryInput !== "") {
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

    if(itemQuantiryInput === ""){
        itemQuantityErrorMsg.innerHTML = "Please enter Quantity"; 
    } else {
        itemQuantityErrorMsg.innerHTML = ""; 
    }

});


addItemBtn.addEventListener('click', ()=>{

    const itemNameInput = document.getElementById("itemNameInput").value;
    const itemDescriptionInput = document.getElementById("itemDescriptionInput").value;
    const itemCategoryInput = document.getElementById("itemCategoryInput").value;
    const itemQuantiryInput = document.getElementById("itemQuantiryInput").value;
    const itemValueInput = document.getElementById("itemValueInput").value;
    const itemImageInput = document.getElementById("itemImageInput").value;

    const lastId = items[items.length -1].itemId;
    const itemId = lastId + 1;

    const itemToPush = new Item (itemId, itemNameInput, itemDescriptionInput, itemCategoryInput, itemQuantiryInput, itemValueInput, itemImageInput);
    console.log(itemToPush);

    items.push(itemToPush);
    console.log(items);

    window.location.href = "../pages/box-content.html";
})


/* ADDED BY ALEJANDRA*/
const itemImageInput = document.getElementById("itemImageInput");
const preview = document.getElementById("preview");

itemImageInput.addEventListener("change", function () {
  getImgData(preview,itemImageInput);
});