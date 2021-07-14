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
        btnEdit.setAttribute("data-bs-toggle","modal");
        btnEdit.setAttribute("data-bs-target","#itemModal");
        let iEdit = document.createElement("i");
        iEdit.setAttribute("class","fas fa-pencil-alt");
        btnEdit.appendChild(iEdit);

        let btnTrash = document.createElement("button");
        btnTrash.setAttribute("id","btnDeleteItem");
        btnTrash.setAttribute("class","button");
        btnTrash.setAttribute("data-bs-toggle","modal");
        btnTrash.setAttribute("data-bs-target","#deleteItemModal");
        let iTrash = document.createElement("i");
        iTrash.setAttribute("class","fas fa-trash");
        btnTrash.appendChild(iTrash);

        //*id label/
        let lblid = document.createElement("label")
        lblid.setAttribute("id","lblId")
        lblid.innerHTML = item.id
        // newItem.appendChild(lblid)


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
