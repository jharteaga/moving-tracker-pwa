class User {
    constructor() {
        this.userId = '';
        this.userName = '';
        this.email = '';
        this.locations = [];
        this.sizes = [];
        this.movings = [];
        this.userError = '';
    }

    async userSignUp(email, userName, password, passwordConfirm) {
        try {
            if (password === passwordConfirm) {
                const signup = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                if (signup.user.uid) {
                    console.log('User Signed up');
                    await this.addUserDb(email, userName, signup.user.uid);
                }
            } else {
                this.userError =
                    'Confirmation password does not match password field';
            }
        } catch (error) {
            this.userError = error.message;
            console.log(error.message);
        }
    }

    async userLogin(email, password) {
        try {
            const login = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            if (login.user.uid) {
                console.log('User Logged in');
                await this.getUserDb(login.user.uid);
            } else {
                this.userError = 'Login Error';
            }
        } catch (error) {
            this.userError = error.message;
            console.log(error.message);
        }
    }

    async userLogout() {
        try {
            await auth.signOut();
            console.log('User Logged Out');
            this.userId = '';
            this.userName = '';
            this.email = '';
        } catch (error) {
            this.userError = error.message;
            console.log(error.message);
        }
    }

    async addUserDb(email, userName, userId) {
        try {
            const data = {
                userName: userName,
                email: email,
                locations: [],
                sizes: [],
                movings: [],
            };

            await db.collection('users').doc(userId).set(data);

            await this.getUserDb(userId);
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    async getUserDb(userId) {
        try {
            const getDoc = await db.collection('users').doc(userId).get();

            const doc = getDoc.data();

            if (getDoc.id) {
                this.userId = getDoc.id;
                this.userName = doc.userName;
                this.email = doc.email;
                this.locations = doc.locations;
                this.sizes = doc.sizes;
                this.movings = doc.movings;
            } else {
                console.log('Firestore error adding user to database');
                this.userError = 'Firestore error adding user to database';
            }
            // console.log(this.movings);
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    async updateUserMovings(userMovings) {
        try {
            console.log(userMovings);
            await db.collection('users').doc(this.userId).update({
                movings: userMovings,
            });

            await this.getUserDb(this.userId);
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    async deleteMovingFromUser(movingId) {
        try {
            await db
                .collection('users')
                .doc(this.userId)
                .update({
                    movings:
                        firebase.firestore.FieldValue.arrayRemove(movingId),
                });
            await this.getUserDb(this.userId);
            console.log('deleted from array');
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error}`);
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    async updateUserDb(newUserName) {
        try {
            const data = {
                userName: newUserName,
            };

            await db
                .collection('users')
                .doc(this.userId)
                .set(data, { merge: true });

            await this.getUserDb(this.userId);
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    addLocation(newLocation) {
        this.locations.push(newLocation);
    }

    deleteLocation(locationId) {
        const index = this.locations.map((item) => item.id).indexOf(locationId);
        this.locations.splice(index, 1);
    }

    editLocation(locationId, newEdition) {
        const index = this.locations.map((item) => item.id).indexOf(locationId);
        this.locations[index] = newEdition;
    }

    addSize(newSize) {
        this.sizes.push(newSize);
    }

    deleteSize(sizeId) {
        const index = this.sizes.map((item) => item.id).indexOf(sizeId);
        this.sizes.splice(index, 1);
    }

    editSize(sizeId, newEdition) {
        const index = this.sizes.map((item) => item.id).indexOf(sizeId);
        this.sizes[index] = newEdition;
    }
}

// test (these are the test for User methods)

const user = new User();

// user.userSignUp('pepito@gmail.com', 'Pepito', '1232131', '1232131')
//     .then(() => {
//         console.log(
//             '\n',
//             user.userId + '\n',
//             user.userName + '\n',
//             user.email + '\n',
//             user.locations + '\n',
//             user.sizes + '\n',
//             user.movings + '\n',
//             user.userError ? user.userError : ' '
//         );
//         // console.log('Success ' + res);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

// user.userLogout().then(() => {
//     console.log(
//         '\n',
//         user.userId + '\n',
//         user.userName + '\n',
//         user.email + '\n'
//         // user.userError ? user.userError : ''
//     );
// });

// user.userLogin('pepito@gmail.com', '1232131').then(() => {
//     console.log(
//         '\n',
//         user.userId + '\n',
//         user.userName + '\n',
//         user.email + '\n',
//         user.locations + '\n',
//         user.sizes + '\n',
//         user.movings[0].movingTitle + '\n',
//         user.userError ? user.userError : ' '
//     );
//     user.updateUserDb('pepito updated2').then(() => {
//         console.log(
//             '\n',
//             user.userId + '\n',
//             user.userName + '\n',
//             user.email + '\n',
//             user.locations + '\n',
//             user.sizes + '\n',
//             user.movings + '\n',
//             user.userError ? user.userError : ' '
//         );
//     });
// });

// user.addLocation({ id: 11, location: 'living room' });

// user.addLocation({ id: 15, location: 'Dinning room' });

// console.log(user.locations);

// user.deleteLocation(15);

// console.log(user.locations);

// user.editLocation(11, { id: 11, location: 'Kitchen' });

// console.log(user.locations);
