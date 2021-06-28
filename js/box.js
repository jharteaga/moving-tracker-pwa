

class Box{

    constructor(){
        this.idMoving = "";
        this.idBox="";
        this.name = "";
        this.description = "";
        this.label = "";
        this.boxSize = "";
        this.weight = "";
        this.fragile = "";
        this.status = "";
    }

    add(idMoving, idBox="", name="", description="", label="", boxSize="", weight="", fragile=0, status="open"){
        db.collection(`/movings/${idMoving}/boxes`).add({
            idMoving: idMoving,
            name: name,
            description: description,
            label: label,
            boxSize: boxSize,
            weight: weight,
            fragile: fragile,
            status: status
        })
        .then((doc_ref ) => {
            return "Document successfully written!";
        })
        .catch((error) => {
            return "Error writing document: ", error;
        });
    }
 
    delete(idMoving,idBox){
        db.collection(`/movings/${idMoving}/boxes`).doc(idBox).delete().then(() => {
            return "Document successfully deleted!";
        }).catch((error) => {
            return "Error removing document: ", error;
        });
    }

    update (idMoving, idBox, name, description, label, boxSize, weight, fragile, status){
        let box = db.collection(`/movings/${idMoving}/boxes`).doc(idBox);

        return box.update({
            name: name,
            description: description,
            label: label,
            boxSize: boxSize,
            weight: weight,
            fragile: fragile,
            status: status
        })
        .then(() => {
            return "Document successfully updated!"
        })
        .catch((error) => {
            return "Error updating document: ", error;
        });
    }

    getBox(idMoving,idBox){
        let boxDocument = db.collection(`/movings/${idMoving}/boxes`).doc(idBox);
        let box = [];
        
        boxDocument.get().then((doc) => {
            if (doc.exists) {
                // console.log(`${doc. id} => ${doc. data()}`)              
                const id = `${doc. id}`
                box.push (
                    {
                        id: id,
                        name: doc.data().name,
                        description: doc.data().description,
                        label: doc.data().label,
                        boxSize: doc.data().boxSize,
                        weight: doc.data().weight,
                        fragile: doc.data().fragile,
                        status: doc.data().status
                    }
                );
                // console.log(box);
                return box;
                
            } else {
                // console.log("No such document!")
                return "Document not found!";
            }
        }).catch((error) => {
            return `Error getting document: ${error}`;
        });
    }

    getItems(idMoving,idBox){
        
        let items = db.collection(`/movings/${idMoving}/boxes/${idBox}/items`);

        let itemsDocs= [];

        items.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                    let id = `${doc. id}`
                    itemsDocs.push({
                    id:id,    
                    name:doc.data().name,
                    description: doc.data().description,
                    cathegory: doc.data().cathegory,
                    quantity: doc.data().quantity,
                    value: doc.data().value 
                    })
            });
        });
        return itemsDocs;
    }
    
}


