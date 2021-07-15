
class Item {
    constructor(){
        this.idItem= "";
        this.idMoving="";
        this.idBox="";
        this.name= "",
        this.description = "",
        this.cathegory = "",
        this.quantity = "",
        this.value = "" 
    }

    add(idMoving, idBox, name, description="", cathegory="", quantity="",value="") {
        db.collection(`/movings/${idMoving}/boxes/${idBox}/items`).add({
            idBox: idBox,
            name: name,
            description: description,
            cathegory: cathegory,
            quantity: quantity,
            value: value,
            dateAdded: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            return "Item successfully saved!";
        })
        .catch((error) => {
            return "Error saving item: ", error;
        });
    }

    delete(idMoving,idBox,IdItem){
        db.collection(`/movings/${idMoving}/boxes/${idBox}/items`).doc(IdItem).delete().then(() => {
            return "Item successfully deleted!";
        }).catch((error) => {
            return "Error removing item: ", error;
        });
    }

     update (idMoving, idBox, IdItem, name, description="", cathegory="", quantity="",value=""){
        let item = db.collection(`/movings/${idMoving}/boxes/${idBox}/items`).doc(IdItem);

        return item.update({
            idBox: idBox,
            name: name,
            description: description,
            cathegory: cathegory,
            quantity: quantity,
            value: value
        })
        .then(() => {
            return "Item successfully updated!"
        })
        .catch((error) => {
            return "Error updating item: ", error;
        });
    }

    getItem(idMoving, idBox,idItem){
        let itemDocument = db.collection(`/movings/${idMoving}/boxes/${idBox}/items`).doc(idItem);
        let item = [];
        itemDocument.get().then((doc) => {
            if (doc.exists) {
                const id = `${doc. id}`
                item.push (
                    {
                        id:id,
                        idBox: doc.data().idBox,
                        name:doc.data(). name,
                        description: doc.data().description,
                        cathegory: doc.data().cathegory,
                        quantity: doc.data().quantity,
                        value: doc.data().value
                    }
                );
                console.log(item);
                return item;
            } else {
                return "No item found!";
            }
        }).catch((error) => {
            return `Error getting item: ${error}`;
        });
    }
}


