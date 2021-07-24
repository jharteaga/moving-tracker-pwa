class Item {
  constructor() {
    this.idItem = '';
    this.idMoving = '';
    this.idBox = '';
    this.name = '';
    this.description = '';
    this.category = '';
    this.quantity = '';
    this.value = 0;
  }

  add(
    idMoving,
    idBox,
    name,
    description = '',
    category = '',
    quantity = '',
    value = 0
  ) {
    return db
      .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
      .add({
        idBox: idBox,
        name: name,
        description: description,
        category: category,
        quantity: quantity,
        value: value,
        dateAdded: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        const box = new Box();
        box.setTotalValueBox(idMoving, idBox);
        return 'Item successfully saved!';
      })
      .catch((error) => {
        return 'Error saving item: ', error;
      });
  }

  delete(idMoving, idBox, IdItem) {
    return db
      .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
      .doc(IdItem)
      .delete()
      .then(() => {
        return 'Item successfully deleted!';
      })
      .catch((error) => {
        return 'Error removing item: ', error;
      });
  }

  update(
    idMoving,
    idBox,
    IdItem,
    name,
    description = '',
    category = '',
    quantity = '',
    value = 0
  ) {
    let item = db
      .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
      .doc(IdItem);

    return item
      .update({
        idBox: idBox,
        name: name,
        description: description,
        category: category,
        quantity: quantity,
        value: value,
      })
      .then(() => {
        const box = new Box();
        box.setTotalValueBox(idMoving, idBox);
        return 'Item successfully updated!';
      })
      .catch((error) => {
        return 'Error updating item: ', error;
      });
  }

  getItem(idMoving, idBox, idItem) {
    let itemDocument = db
      .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
      .doc(idItem);
    let item = [];
    return itemDocument
      .get()
      .then((doc) => {
        if (doc.exists) {
          const id = `${doc.id}`;
          item.push({
            id: id,
            idBox: doc.data().idBox,
            name: doc.data().name,
            description: doc.data().description,
            category: doc.data().category,
            quantity: doc.data().quantity,
            value: doc.data().value,
          });
          return item;
        } else {
          return 'No item found!';
        }
      })
      .catch((error) => {
        return `Error getting item: ${error}`;
      });
  }
}
