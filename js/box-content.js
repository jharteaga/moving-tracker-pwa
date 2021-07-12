
// change this values for session variables
const idMoving= "7lI4hu7cuqmurPqSFa72";
const idBox = "xtV5zrXtZcuN33KHxF2l";  
// /movings/7lI4hu7cuqmurPqSFa72/boxes/xtV5zrXtZcuN33KHxF2l
/********************************/
/* Display Box Name */
/********************************/

let boxContent = new Box();
boxContent.getBox(idMoving,idBox).then(box => {
    // console.log("esta es la buena",box.name) 
    const boxNameDisplay = document.getElementById("boxNameDisplay");
    boxNameDisplay.innerHTML = box.name;
});

boxContent.getItems(idMoving,idBox).then(items => {
    printItems(items);
    // console.log("estos items latosos",items[0].name) 
});

// let items = boxContent.getItems(idMoving,idBox);

const printItems = (items)=>{
    items.forEach(item => {
        let qty=0;
        let itemNameLabel = "item";
        if (item.quantity!=undefined)
        {
            if(item.quantity==""){
                qty=0;
            }
            else{
                qty = item.quantity;
            }            
        }
        if (item.name!=""){
            itemNameLabel = item.name;
        }
        const itemListDisplay = document.getElementById("itemListDisplay");
        let newItem = document.createElement( "li" ) ;
    
        let itemImg = document.createElement("img");
        itemImg.setAttribute("src","../img/items/item-not-found.jpg")

        let newDiv = document.createElement("div");
        newDiv.setAttribute("class","itemMetaData");

        let itemName = document.createElement("h3");
        itemName.textContent = itemNameLabel;
        let itemQuantity = document.createElement("h4");
        itemQuantity.textContent="Quantity: " + qty;
      
        let newDivIcons = document.createElement("div");
        newDivIcons.setAttribute("class","divIcons");

        let btnEdit = document.createElement("button");
        btnEdit.setAttribute("id","btnEditItem");
        btnEdit.setAttribute("class","button");
        let iEdit = document.createElement("i");
        iEdit.setAttribute("class","fas fa-pencil-alt");
        btnEdit.appendChild(iEdit);

        let btnTrash = document.createElement("button");
        btnTrash.setAttribute("id","btnDeleteItem");
        btnTrash.setAttribute("class","button");
        let iTrash = document.createElement("i");
        iTrash.setAttribute("class","fas fa-trash");
        btnTrash.appendChild(iTrash);

        newItem.appendChild(itemImg);
        newItem.appendChild(newDiv);

        newDiv.appendChild(itemName);
        newDiv.appendChild(itemQuantity);
        // newDiv.appendChild(editBtn);
        newDiv.appendChild(newDivIcons);
        newDivIcons.appendChild(btnEdit);
        newDivIcons.appendChild(btnTrash);
    
        itemListDisplay.appendChild(newItem);   
    });
   
}


// const boxName = boxList.find(item => item.boxId === selectedBoxId).boxName;


/********************************/
/* Load Exisiting Item List */
/********************************/



// const itemList = boxList.find(item => item.boxId === selectedBoxId).items;


// let itemListToHtml;

// for(i=0; i<items.length; i++) {
//     let newItem = document.createElement( "li" ) ;

//     let itemImg = document.createElement("img");
//     itemImg.setAttribute("src", "");
//     // console.log(itemImg);

//     let itemName = document.createElement("p");
//     itemName.textContent = items[i].name;
//     console.log("ITEM NAME:" , itemName);

//     let editBtn = document.createElement("img");
//     editBtn.setAttribute("src", "../img/items/edit.png");
//     editBtn.setAttribute("id", `${itemList[i].itemId}`);
//     editBtn.setAttribute("class", `editBtn`);

//     newItem.appendChild(itemImg);
//     newItem.appendChild(itemName);
//     newItem.appendChild(editBtn);

//     itemListDisplay.appendChild(newItem);    
// }




/********************************/
/* Sample of Data display in Edit Screen */
/********************************/

// const demoArea = document.getElementById("demoArea");
// const editBtnOnScreen = document.querySelectorAll(".editBtn");
// console.log(editBtnOnScreen);



// for(i=0; i<editBtnOnScreen.length; i++){
//     editBtnOnScreen[i].addEventListener('click', ()=>{
//         demoArea.innerHTML = "";

//         let getId = parseInt(event.target.id);
//         console.log(getId);

//         let itemInfo = document.createElement("p");
//         itemInfo.textContent = itemList.find(item => item.itemId === getId).itemName;

//         let itemName = document.createElement("p");
//         itemName.textContent = itemList.find(item => item.itemId === getId).itemName;
//         demoArea.appendChild(itemName);

//         let itemCategory = document.createElement("p");
//         itemCategory.textContent = itemList.find(item => item.itemId === getId).itemCategory;
//         demoArea.appendChild(itemCategory);

//         let itemQuantity = document.createElement("p");
//         itemQuantity.textContent = itemList.find(item => item.itemId === getId).itemQuantity;
//         demoArea.appendChild(itemQuantity);

//         let itemValue = document.createElement("p");
//         itemValue.textContent = itemList.find(item => item.itemId === getId).itemValue;
//         demoArea.appendChild(itemValue);

//         let itemImg = document.createElement("img");
//         itemImg.setAttribute("src", itemList.find(item => item.itemId === getId).itemImage);
//         demoArea.appendChild(itemImg);
        
//     })    
// }



/*
// Elements for taking the snapshot
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);

document.getElementById("start").addEventListener("click", function () {
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		// Not adding `{ audio: true }` since we only want video now
		navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
			//video.src = window.URL.createObjectURL(stream);
			video.srcObject = stream;
			// video.play();  // or autplay
		});
	} else {
		console.log("media devices not available in this browser");
	}

});
*/