class Box {
  constructor() {
    this.idMoving = '';
    this.idBox = '';
    this.name = '';
    this.description = '';
    this.label = '';
    this.boxSize = '';
    this.weight = '';
    this.fragile = false;
    this.status = false;
  }

  add(
    idMoving,
    idBox = '',
    name = '',
    description = '',
    label = '',
    boxSize = '',
    weight = '',
    fragile = false,
    status = false
  ) {
    return db
      .collection(`/movings/${idMoving}/boxes`)
      .add({
        idMoving: idMoving,
        name: name,
        description: description,
        label: label,
        boxSize: boxSize,
        weight: weight,
        fragile: fragile,
        status: status,
        dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc_ref) => {
        return 'Box successfully saved!';
      })
      .catch((error) => {
        return 'Error saving box', error;
      });
  }

  delete(idMoving, idBox) {
    return db
      .collection(`/movings/${idMoving}/boxes`)
      .doc(idBox)
      .delete()
      .then(() => {
        return 'Box successfully deleted!';
      })
      .catch((error) => {
        return 'Error removing box: ', error;
      });
  }

  update(
    idMoving,
    idBox,
    name,
    description,
    label,
    boxSize,
    weight,
    fragile,
    status
  ) {
    let box = db.collection(`/movings/${idMoving}/boxes`).doc(idBox);

    return box
      .update({
        name: name,
        description: description,
        label: label,
        boxSize: boxSize,
        weight: weight,
        fragile: fragile,
        status: status,
      })
      .then(() => {
        return 'Box successfully updated!';
      })
      .catch((error) => {
        return 'Error updating box: ', error;
      });
  }

  getBox(idMoving, idBox) {
    let boxDocument = db.collection(`/movings/${idMoving}/boxes`).doc(idBox);

    let box = boxDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          const id = `${doc.id}`;
          return {
            id: id,
            name: doc.data().name,
            description: doc.data().description,
            label: doc.data().label,
            boxSize: doc.data().boxSize,
            weight: doc.data().weight,
            fragile: doc.data().fragile,
            status: doc.data().status,
          };
        } else {
          return 'Box not found!';
        }
      })
      .catch((error) => {
        return `Error getting box: ${error}`;
      });

    return box;
  }

  getItems(idMoving, idBox) {
    let items = db
      .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
      .orderBy('dateAdded', 'desc');

    let itemsDocs = [];

    return items.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let id = `${doc.id}`;
        itemsDocs.push({
          id: id,
          name: doc.data().name,
          description: doc.data().description,
          cathegory: doc.data().cathegory,
          quantity: doc.data().quantity,
          value: doc.data().value,
        });
      });
      return itemsDocs;
    });
  }
}
