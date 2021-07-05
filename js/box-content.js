console.log("connected");

/********************************/
/* Sample Object */
/********************************/

let boxList = [

    {
        boxId: 1,
        boxName: "Meg's Box",
        items: [

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
    }

]


/********************************/
/* Display Box Name */
/********************************/

let selectedBoxId = 1;  // 1 as sample now here

const boxNameDisplay = document.getElementById("boxNameDisplay");

const boxName = boxList.find(item => item.boxId === selectedBoxId).boxName;

// console.log(boxName);
boxNameDisplay.innerHTML = boxName;



/********************************/
/* Load Exisiting Item List */
/********************************/

const itemListDisplay = document.getElementById("itemListDisplay");

const itemList = boxList.find(item => item.boxId === selectedBoxId).items;
console.log(itemList);


let itemListToHtml;

for(i=0; i<itemList.length; i++) {
    let newItem = document.createElement( "li" ) ;

    let itemImg = document.createElement("img");
    itemImg.setAttribute("src", itemList[i].itemImage);
    console.log(itemImg);

    let itemName = document.createElement("p");
    itemName.textContent = itemList[i].itemName;
    console.log(itemName);

    let editBtn = document.createElement("img");
    editBtn.setAttribute("src", "../img/items/edit.png");
    editBtn.setAttribute("id", `${itemList[i].itemId}`);
    editBtn.setAttribute("class", `editBtn`);

    newItem.appendChild(itemImg);
    newItem.appendChild(itemName);
    newItem.appendChild(editBtn);

    itemListDisplay.appendChild(newItem);    
}




/********************************/
/* Sample of Data display in Edit Screen */
/********************************/

const demoArea = document.getElementById("demoArea");
const editBtnOnScreen = document.querySelectorAll(".editBtn");
console.log(editBtnOnScreen);



for(i=0; i<editBtnOnScreen.length; i++){
    editBtnOnScreen[i].addEventListener('click', ()=>{
        demoArea.innerHTML = "";

        let getId = parseInt(event.target.id);
        console.log(getId);

        // let itemInfo = document.createElement("p");
        // itemInfo.textContent = itemList.find(item => item.itemId === getId).itemName;

        let itemName = document.createElement("p");
        itemName.textContent = itemList.find(item => item.itemId === getId).itemName;
        demoArea.appendChild(itemName);

        let itemCategory = document.createElement("p");
        itemCategory.textContent = itemList.find(item => item.itemId === getId).itemCategory;
        demoArea.appendChild(itemCategory);

        let itemQuantity = document.createElement("p");
        itemQuantity.textContent = itemList.find(item => item.itemId === getId).itemQuantity;
        demoArea.appendChild(itemQuantity);

        let itemValue = document.createElement("p");
        itemValue.textContent = itemList.find(item => item.itemId === getId).itemValue;
        demoArea.appendChild(itemValue);

        let itemImg = document.createElement("img");
        itemImg.setAttribute("src", itemList.find(item => item.itemId === getId).itemImage);
        demoArea.appendChild(itemImg);
        
    })    
}

