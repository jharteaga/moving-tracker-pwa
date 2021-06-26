
class Box{
    constructor(idMoving, idBox="", name="", description="", label="", boxSize="", weight="", fragile="", status=""){
        this.idMoving = idMoving;
        this.idBox=idBox;
        this.name = name;
        this.description = description;
        this.label = label;
        this.boxSize = boxSize;
        this.weight = weight;
        this.fragile = fragile;
        this.status = status;
    }

    add(){
        db.collection(`/movings/${this.idMoving}/boxes`).doc(this.idBox).set({
            idMoving: this.idMoving,
            name: this.name,
            description: this.description,
            label: this.label,
            boxSize: this.boxSize,
            weight: this.weight,
            fragile: this.fragile,
            status: this.status
        })
        .then(() => {
            // console.log("Document successfully written!");
            return "Document successfully written!";
        })
        .catch((error) => {
            // console.error("Error writing document: ", error);
            return "Error writing document: ", error;
        });
    }

 
    delete(idBox=this.idBox){
        db.collection(`/movings/${this.idMoving}/boxes`).doc(idBox).delete().then(() => {
            // console.log("Document successfully deleted!");
            return "Document successfully deleted!";
        }).catch((error) => {
            // console.error("Error removing document: ", error);
            return "Error removing document: ", error;
        });
    }
    update (){
        let box = db.collection(`/movings/${this.idMoving}/boxes`).doc(this.idBoxame);

        // Set the "capital" field of the city 'DC'
        return box.update({
            name: this.name,
            description: this.description,
            label: this.label,
            boxSize: this.boxSize,
            weight: this.weight,
            fragile: this.fragile,
            status: this.status
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

    getBox(){

        let boxDocument = db.collection(`/movings/${this.idMoving}/boxes`).doc(this.idBox);
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

    getItems(){
        
       
        let items = db.collection(`/movings/${this.idMoving}/boxes/${this.idBox}/items`);

        let itemsDocs= [];

        items.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                itemsDocs.push({idItem: doc.id, name:doc.data().name,
                    description: doc.data().description,
                    athegory: doc.data().cathegory,
                    quantity: doc.data().quantity,
                    value: doc.data().value 
                    })
                // console.log(doc.id, " => ", doc.data());
            });
        });

        return itemsDocs;
    }
    
}