
//************************************* */
//function to print items list
//************************************* */

const printItems = (items)=>{
    const itemListDisplay = document.getElementById("itemListDisplay");   
        //clean ul 
        itemListDisplay.innerHTML=""
        //****************************** */

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
    
        //************************************* */
        //item image
        let itemImg = document.createElement("img");
        itemImg.setAttribute("src","../img/items/item-not-found.jpg")
        //************************************* */

        //************************************* */
        //item name
        let itemName = document.createElement("h3");
        itemName.textContent = itemNameLabel;
        //************************************* */

        //************************************* */
        //item quantity
        let itemQuantity = document.createElement("h4");
        itemQuantity.textContent="Quantity: " + qty;
        //************************************* */

        //************************************* */
        //button to edit an item
        let btnEdit = document.createElement("button");
        btnEdit.setAttribute("id","btnEditItem");
        btnEdit.setAttribute("class","button");
        btnEdit.setAttribute("data-bs-toggle","modal");
        btnEdit.setAttribute("data-bs-target","#itemModal");
        btnEdit.setAttribute('onclick','updateItemOpenModal(this)'); //function to pass item selected info to modal
        let iEdit = document.createElement("i");
        iEdit.setAttribute("class","fas fa-pencil-alt");
        btnEdit.appendChild(iEdit);
        //************************************* */

        //************************************* */
        //button to delete an item
        let btnTrash = document.createElement("button");
        btnTrash.setAttribute("id","btnDeleteItem");
        btnTrash.setAttribute("class","button");
        btnTrash.setAttribute("data-bs-toggle","modal");
        btnTrash.setAttribute("data-bs-target","#deleteItemModal");
        btnTrash.setAttribute('onclick','deleteItemQuestion(this)'); // function to pass item id selected to hidden input
        let iTrash = document.createElement("i");
        iTrash.setAttribute("class","fas fa-trash");
        btnTrash.appendChild(iTrash);
        //************************************* */

        //************************************* */
        //label to keep id item hidden
        //*id label/
        let lblidItem = document.createElement("input")
        lblidItem.setAttribute("type","hidden")
        lblidItem.setAttribute("id","lblidItem")
        // lblidItem.setAttribute('class','.itemMetaData.divIcons.hideIdLabel')
        lblidItem.value = item.id
        //************************************* */

        //****************************** */
        //UL where items will be displayed
        const itemListDisplay = document.getElementById("itemListDisplay");   
        //****************************** */

        //****************************** */
        //new li 
        let newItem_li = document.createElement( "li" ) ;
        //****************************** */
       
        //************************************* */
        //div to put edit and delete buttons and id label
        let newDivIcons = document.createElement("div");
        newDivIcons.setAttribute("class","divIcons");
        //************************************* */

        //************************************* */
        //div to put item name, quantity and div containing buttons)edit and delete)
        let newDiv_metaData = document.createElement("div");
        newDiv_metaData.setAttribute("class","itemMetaData");
        //************************************* */

        
        //************************************************************************* */      
        //ADD ALL ELEMENTS***********************************************************/

        //************************************* */
        //add edit and delete buttons to div container ----- and id label
        newDivIcons.appendChild(btnEdit);
        newDivIcons.appendChild(btnTrash);
        newDivIcons.appendChild(lblidItem);
        //************************************* */

        //************************************* */
        //add to div metadata item name, quantity and div containing - edit and delete buttons -
        //************************************* */
        newDiv_metaData.appendChild(itemName);
        newDiv_metaData.appendChild(itemQuantity);
        newDiv_metaData.appendChild(newDivIcons);

        //************************************* */
        //add to li ----- image and div ( containing item name, quantity and another div containing edit and delete buttons )
        newItem_li.appendChild(itemImg);
        newItem_li.appendChild(newDiv_metaData);
        //************************************* */

        

        //************************************* */
        //add li to ul
        itemListDisplay.appendChild(newItem_li);   
        //************************************* */
    });
   
}
