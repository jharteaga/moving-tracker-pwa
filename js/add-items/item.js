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
    this.itemPictureUrl = '';
  }

  add(
    idMoving,
    idBox,
    name,
    description = '',
    category = '',
    quantity = '',
    value = 0,
    imageFile
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
        itemPictureUrl: '',
      })
      .then(async () => {
        await this.setItemPicture(imageFile.files[0], idMoving, idBox, name);
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
    value = 0,
    imageFile
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
      .then(async () => {
        await this.setItemPicture(imageFile.files[0], idMoving, idBox, name);
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
            itemPictureUrl: doc.data().itemPictureUrl,
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

  /**
   * Method that takes a file (picture) as input, uploads it to firebase storage,
   * and saves the url to current item.
   *
   * @param {File} file
   */
  async setItemPicture(file, idMoving, idBox, itemName) {
    const storage = firebase.storage().ref();
    try {
      const req = await storage
        .child(`${idBox}-${itemName}-${file.name}`)
        .put(file);
      await this._setItemPictureUrl(
        await req.ref.getDownloadURL(),
        idMoving,
        idBox,
        itemName
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Private function to set item picture url in item document in firestore
   *
   * @param {String} itemPictureUrl
   */
  async _setItemPictureUrl(itemPictureUrl, idMoving, idBox, itemName) {
    try {
      const data = {
        itemPictureUrl: itemPictureUrl,
      };

      const itemsList = await db
        .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
        .where('name', '==', itemName)
        .get();

      itemsList.forEach(async (item) => {
        await db
          .collection(`/movings/${idMoving}/boxes/${idBox}/items`)
          .doc(item.id)
          .set(data, { merge: true });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
