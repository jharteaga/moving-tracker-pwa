/** Class representing a Moving */
class Moving {
  /**
   * Creates a moving instance, to pull user's movings only need to pass
   * userId to the constructor
   * @param {String} userId        user id from firebase
   * @param {String=} movingTitle  moving title
   * @param {String=} description  moving description
   * @param {String=} from         where the moving is coming from
   * @param {String=} to           where the moving is going to
   * @param {Date=} date           when is the moving taking place
   */
  constructor(
    userId = '',
    movingTitle = '',
    description = '',
    from = '',
    to = '',
    date = ''
  ) {
    this.userId = userId;
    this.movingId = '';
    this.createdAt = '';
    this.movingTitle = movingTitle;
    this.movingDescription = description;
    this.from = from;
    this.to = to;
    this.date = date;
    this.boxes = [];
    this.collaborators = [];
    this.labels = [];
    this.sizes = {};
    this.movingError = '';
  }

  /**
   * Creates a new moving to firebase
   *
   * @param {Object} userInstance
   */
  async addMovingToDb(userInstance) {
    try {
      const data = {
        movingTitle: this.movingTitle,
        description: this.movingDescription,
        from: this.from,
        to: this.to,
        date: this.date,
        creatorId: userInstance.userId,
        boxes: [],
        collaborators: [],
        createdAt: firebase.firestore.Timestamp.now(),
        labels: ['Kitchen', 'Master Bedroom', 'Dinning Room', 'Bathroom'],
        sizes: {
          small: {
            length: 20,
            width: 30,
            height: 20,
          },
          medium: {
            length: 30,
            width: 40,
            height: 30,
          },
          large: {
            length: 40,
            width: 50,
            height: 40,
          },
          custom: {},
        },
      };

      if (
        !userInstance.movings.find((e) => e.movingTitle === this.movingTitle)
      ) {
        await db.collection('movings').doc().set(data);

        // gets moving created
        await this.getMovingByTitle(userInstance.userId, this.movingTitle);

        // updates movings on user instance
        await userInstance.updateUserMovings(await this.getMovings());
        this.movingError = '';
      } else {
        console.log(
          `There is already a moving with that title for ${userInstance.userName}.`
        );
        this.movingError = `There is already a moving with that title for ${userInstance.userName}.`;
      }
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
    }
  }

  /**
   *
   * @param {Object} userInstance
   * @param {String} movingId
   */
  async deleteMoving(userInstance, movingId) {
    try {
      if (userInstance.movings.find((e) => e.movingId === movingId)) {
        await db.collection('movings').doc(movingId).delete();
        await userInstance.updateUserMovings(await this.getMovings());
        this.userId = userInstance.userId;
        this.movingId = '';
        this.movingTitle = '';
        this.description = '';
        this.from = '';
        this.to = '';
        this.date = '';
        this.boxes = [];
        this.collaborators = {};
        this.createdAt = '';
        this.movingError = '';
      } else {
        console.log(`This moving does not exist.`);
        this.movingError = `This moving does not exist.`;
      }
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
    }
  }

  /**
   * Updates moving in firebase
   *
   * @param {Object} userInstance     instance of User Class
   * @param {String} newMovingTitle   New moving title
   * @param {String} newDescription   New description
   * @param {String} newFrom          New from
   * @param {String} newTo            New to
   * @param {Date} newDate          New date
   */
  async updateMoving(
    userInstance,
    newMovingTitle,
    newDescription,
    newFrom,
    newTo,
    newDate
  ) {
    try {
      const data = {
        movingTitle: newMovingTitle,
        description: newDescription,
        from: newFrom,
        to: newTo,
        date: newDate,
      };

      await db
        .collection('movings')
        .doc(this.movingId)
        .update(data, { merge: true });
      await userInstance.updateUserMovings(await this.getMovings());

      this.movingError = '';
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
    }
  }

  /**
   * Gets a moving by title
   *
   * @param {String} userId -         User Id
   * @param {String} movingTitle -    Moving Title
   */
  async getMovingByTitle(userId, movingTitle) {
    try {
      const getDoc = await db
        .collection('movings')
        .where('creatorId', '==', userId)
        .where('movingTitle', '==', movingTitle)
        .get();

      const doc = [];

      getDoc.forEach((d) => {
        doc.push(d);
      });

      this.userId = doc[0].data().creatorId;
      this.movingId = doc[0].id;
      this.movingTitle = doc[0].data().movingTitle;
      this.description = doc[0].data().description;
      this.from = doc[0].data().from;
      this.to = doc[0].data().to;
      this.date = doc[0].data().date;
      this.boxes = doc[0].data().boxes;
      this.collaborators = doc[0].data().collaborators;
      this.createdAt = doc[0].data().createdAt;
      this.movingError = '';
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets a moving by Id
   *
   * @param {String} movingId
   * @returns {Object} User Instance
   */
  async getMovingById(movingId) {
    try {
      const docDB = await db.collection('movings').doc(movingId).get();
      const doc = docDB.data();

      if (doc) {
        this.userId = doc.creatorId;
        this.movingId = docDB.id;
        this.movingTitle = doc.movingTitle;
        this.description = doc.description;
        this.from = doc.from;
        this.to = doc.to;
        this.date = doc.date;
        this.boxes = doc.boxes;
        this.collaborators = doc.collaborators;
        this.createdAt = doc.createdAt;
        this.movingError = '';
        this.labels = doc.labels;
      }
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Get boxes by moving Id
   *
   * @param {String} movingId
   * @returns array[boxes]
   */
  getBoxesByMovingId(movingId, callBack) {
    try {
      if (this.userId) {
        db.collection(`/movings/${movingId}/boxes`).onSnapshot(callBack);
      }
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets a moving snapshot by Id
   *
   * @param {String} movingId
   * @param {Function} callBack
   * @returns {Object} User Instance
   */
  async getMovingSnapshotById(movingId, callBack) {
    try {
      db.collection('movings')
        .doc(movingId)
        .onSnapshot((snapshot) => {
          const doc = snapshot.data();

          if (doc) {
            this.userId = doc.creatorId;
            this.movingId = snapshot.id;
            this.movingTitle = doc.movingTitle;
            this.description = doc.description;
            this.from = doc.from;
            this.to = doc.to;
            this.date = doc.date;
            this.boxes = doc.boxes;
            this.collaborators = doc.collaborators;
            this.sizes = doc.sizes;
            this.createdAt = doc.createdAt;
            this.movingError = '';
            this.labels = doc.labels;
          }

          if (callBack) {
            callBack();
          }
        });
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets a snapshot of movings for the current logged in user
   *
   * @param {Function} callBack   function that takes a snapshot as parameter
   */
  getMovingsList(callBack) {
    try {
      if (this.userId) {
        db.collection('movings')
          .where('creatorId', '==', this.userId)
          .onSnapshot(callBack);
      }
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets a snapshot of collaborator movings for the
   * current user
   *
   * @param {Function} callBack
   */
  getMovingsCollaboratorList(userEmail, callBack) {
    try {
      if (this.userId) {
        db.collection('movings')
          .where('collaborators', 'array-contains', userEmail)
          .onSnapshot(callBack);
      }
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets all the movings and return an array of movings
   *
   * @returns array of movings
   */
  async getMovings() {
    try {
      const getDoc = await db
        .collection('movings')
        .where('creatorId', '==', user.userId)
        .get();

      const doc = [];

      getDoc.forEach((move) => {
        doc.push({
          movingId: move.id,
          movingTitle: move.data().movingTitle,
          to: move.data().to,
          date: move.data().date,
        });
      });

      return doc;
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets collaborators from a specific moving
   *
   * @param {Function} callBack
   */
  getCollaborators(callBack) {
    try {
      db.collection('movings').doc(this.movingId).onSnapshot(callBack);
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Appends a new collaborator to moving collaborators array in firebase
   *
   * @param {String} collaboratorEmail
   */
  async addCollaborator(collaboratorEmail) {
    try {
      await db
        .collection('movings')
        .doc(this.movingId)
        .update({
          collaborators:
            firebase.firestore.FieldValue.arrayUnion(collaboratorEmail),
        });
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Deletes a collaborator from moving collaborators array in firebase
   *
   * @param {String} collaboratorEmail
   */
  async deleteCollaborator(collaboratorEmail) {
    try {
      await db
        .collection('movings')
        .doc(this.movingId)
        .update({
          collaborators:
            firebase.firestore.FieldValue.arrayRemove(collaboratorEmail),
        });
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Gets labels from moving instance
   *
   * @param {Function} callBack  this callback takes a snapshot as parameter
   */
  getLabels(callBack) {
    try {
      db.collection('movings').doc(this.movingId).onSnapshot(callBack);
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Appends a new label to moving labels array in firebase
   *
   * @param {String} newLabel New label to add
   */
  async addLabel(newLabel) {
    try {
      await db
        .collection('movings')
        .doc(this.movingId)
        .update({
          labels: firebase.firestore.FieldValue.arrayUnion(newLabel),
        });
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Deletes a label from moving labels array in firebase
   *
   * @param {String} labelToDelete    Label to delete
   */
  async deleteLabel(labelToDelete) {
    try {
      await db
        .collection('movings')
        .doc(this.movingId)
        .update({
          labels: firebase.firestore.FieldValue.arrayRemove(labelToDelete),
        });
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }

  /**
   * Update box size measures
   *
   * @param {String} size        Size objective to modify
   * @param {Object} newMeasures Object with keys length, width and height
   */
  async updateSizes(newMeasures) {
    try {
      const data = { sizes: newMeasures };
      await db.collection('movings').doc(this.movingId).update(data);
    } catch (error) {
      this.movingError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
      console.log(error);
    }
  }
}
