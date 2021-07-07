class Moving {
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
        this.movingTitle = movingTitle;
        this.movingDescription = description;
        this.from = from;
        this.to = to;
        this.date = date;
        this.boxes = [];
        this.collaborators = [];
        this.movingError = '';
        this.createdAt = '';
    }

    async addMovingToDb(userInstance) {
        try {
            const data = {
                movingTitle: this.movingTitle,
                description: this.movingDescription,
                from: this.from,
                to: this.to,
                date: this.date,
                creatorId: this.userId,
                boxes: [],
                collaborators: [],
                createdAt: firebase.firestore.Timestamp.now(),
            };
            console.log(
                '---->',
                !userInstance.movings.find(
                    (e) => e.movingTitle == this.movingTitle
                ),
                this.movingTitle,
                userInstance.movings
            );

            if (
                !userInstance.movings.find(
                    (e) => e.movingTitle === this.movingTitle
                )
            ) {
                await db.collection('movings').doc().set(data);

                await this.getMoving(this.userId, this.movingTitle);

                await userInstance.updateUserMovings(await this.getMovings());
                // await userInstance.getUserDb(userInstance.userId);
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
                this.collaborators = [];
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

    async getMoving(userId, movingTitle) {
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
            this.movingError = '';
        } catch (error) {
            this.movingError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
            console.log(error);
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
}

// user.userLogin('pepito@gmail.com', '1232131').then(() => {
//     console.log(
//         '\n',
//         user.userId + '\n',
//         user.userName + '\n',
//         user.email + '\n',
//         user.locations + '\n',
//         user.sizes + '\n',
//         user.movings[0]?.movingTitle + '\n',
//         user.userError ? user.userError : ' '
//     );

//     const moving = new Moving(
//         null,
//         'fouwewrth moving',
//         'Third moving description',
//         'Mexico',
//         'Toronto',
//         '03-04-2021',
//         user.userId
//     );
//     moving.addMovingToDb(user);
//     // const movingDelete = new Moving(user.userId);

//     // movingDelete.deleteMoving(user, 'b2SpzMKMCDjQmBlkkz8u');
//     console.log(user.movings);
// });
