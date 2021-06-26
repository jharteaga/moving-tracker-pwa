
class Item {
    constructor(idItem, name, description, cathegory, quantity, value){
        this.idItem = idItem,
        this.name= name,
        this.description = description,
        this.cathegory = cathegory,
        this.quantity = quantity,
        this.value = value 
    }

    add() {
        let box = db.collection("boxes").doc(idBox);

        db.collection(`/movings/${this.idMoving}/boxes/${this.idBox}/items`).doc(this.idItem).set({
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

    delete(idItem=this.idItem){
        db.collection(`/movings/${this.idMoving}/boxes/${this.idBox}/items`).doc(idItem).delete().then(() => {
            // console.log("Document successfully deleted!");
            return "Document successfully deleted!";
        }).catch((error) => {
            // console.error("Error removing document: ", error);
            return "Error removing document: ", error;
        });
    }

     update (idBox,idItem){
        let item = db.collection(`/movings/${this.idMoving}/boxes/${this.idBox}/items`).doc(idItem);

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

    getItem(){
        let boxDocument = db.collection(`/movings/${this.idMoving}/boxes/${idBox}/items/${idItem}`).doc(this.idBox);
        let box = [];
        boxDocument.get().then((doc) => {
            if (doc.exists) {
                box.push (
                    {
                        name: doc.data().name,
                        description: doc.data().description,
                        label: doc.data().label,
                        boxSize: doc.data().boxSize,
                        weight: doc.data().weight,
                        fragile: doc.data().fragile,
                        status: doc.data().status
                    }
                );
                return box;
                // console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                return "No such document!";
            }
        }).catch((error) => {
            return `Error getting document: ${error}`;
        });
    }
}