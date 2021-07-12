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
        userId,
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
        this.labels = ['Kitchen', 'Master Bedroom', 'Dinning Room', 'Bathroom'];
        this.sizes = {
            small: {
                length: 20,
                width: 30,
                height: 20,
            },
            medium: {
                length: 30,
                width: 40,
                large: 30,
            },
            large: {
                length: 40,
                width: 50,
                large: 40,
            },
        };
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
                collaborators: {},
                createdAt: firebase.firestore.Timestamp.now(),
                labels: this.labels,
                sizes: this.sizes,
            };

            if (
                !userInstance.movings.find(
                    (e) => e.movingTitle === this.movingTitle
                )
            ) {
                await db.collection('movings').doc().set(data);

                // gets moving created
                await this.getMovingByTitle(
                    userInstance.userId,
                    this.movingTitle
                );

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

    // Needs testing update Moving

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
            this.movingSnaphsot = await db
                .collection('movings')
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
                        this.createdAt = doc.createdAt;
                        this.movingError = '';
                    }
                });
        } catch (error) {
            this.movingError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
            console.log(error);
        }
    }

    getMovingsList() {
        console.log(this.userId, 'userid');
        if (this.userId) {
            db.collection('movings')
                .where('creatorId', '==', this.userId)
                .onSnapshot(
                    (snapshot) => {
                        snapshot.forEach((doc) => {
                            console.log(doc.data(), 'asdfas');
                        });
                    },
                    (error) => {
                        this.movingError = error.message;
                        console.log(`Error code: ${error.code}`);
                        console.log(`Error message: ${error.message}`);
                        console.log(error);
                    }
                );
        }
    }

    async getMovings() {
        try {
            const getDoc = await db
                .collection('movings')
                .where('creatorId', '==', this.userId)
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

    async addCollaborator(collaboratorEmail) {
        try {
            await db
                .collection('movings')
                .doc(this.movingId)
                .update({
                    collaborators:
                        firebase.firestore.FieldValue.arrayUnion(
                            collaboratorEmail
                        ),
                });
        } catch (error) {
            this.movingError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
            console.log(error);
        }
    }

    async deleteCollaborator(collaboratorEmail) {
        try {
            await db
                .collection('movings')
                .doc(this.movingId)
                .update({
                    collaborators:
                        firebase.firestore.FieldValue.arrayRemove(
                            collaboratorEmail
                        ),
                });
        } catch (error) {
            this.movingError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
            console.log(error);
        }
    }

    addLabel(newLabel) {}

    deleteLabel(labelToDelete) {}

    addSize(newSize) {}

    deleteSize(sizeId) {}

    updateSize(sizeId, newEdition) {}
}
