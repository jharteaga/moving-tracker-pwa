
class Box{
    constructor(idMoving, idBox, name, description, label, boxSize, weight, fragile, status){
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
        db.collection(this.idMoving).collection("boxes").doc(this.name).set({
            idBox: this.idBox,
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

    delete(idMoving,boxName){
        db.collection(idMoving).collection("boxes").doc(boxName).delete().then(() => {
            // console.log("Document successfully deleted!");
            return "Document successfully deleted!";
        }).catch((error) => {
            // console.error("Error removing document: ", error);
            return "Error removing document: ", error;
        });
    }
    update (idMoving,boxName){
        let box = db.collection(idMoving).collection("boxes").doc(boxName);

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
    
}