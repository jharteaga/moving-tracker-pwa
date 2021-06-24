
class Item {
    constructor(idItem, name, description, cathegory, quantity, value){
        this.idItem = idItem,
        this.name= name,
        this.description = description,
        this.cathegory = cathegory,
        this.quantity = quantity,
        this.value = value 
    }

    add(idBox) {
        let box = db.collection("boxes").doc(idBox);

        db.collection("boxes").collection("items").doc(this.name).set({
            idItem: this.idItem,
            name: this.name,
            description: this.description,
            cathegory: this.cathegory,
            quantity: this.quantity,
            value: this.value
        })
        .then(() => {
            return "Document successfully written!";
        })
        .catch((error) => {
            return "Error writing document: ", error;
        });
    }

    delete(idBox,idItem){
        db.collection("boxes").doc(idBox).collection("items").doc(idItem).delete().then(() => {
            // console.log("Document successfully deleted!");
            return "Document successfully deleted!";
        }).catch((error) => {
            // console.error("Error removing document: ", error);
            return "Error removing document: ", error;
        });
    }

    update (idBox,idItem){
        let box = db.collection("boxes").doc(idBox).collection("items").doc(idItem);

        // Set the "capital" field of the city 'DC'
        return box.update({
            idItem: this.idItem,
            name: this.name,
            description: this.description,
            cathegory: this.cathegory,
            quantity: this.quantity,
            value: this.value
        })
        .then(() => {
            // console.log("Document successfully updated!");
            return "Document successfully updated!"
        })
        .catch((error) => {
            // The document probably doesn't exist.
            // console.error("Error updating document: ", error);
            return "Error updating document: ", error;
        });
    }
}