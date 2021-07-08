class User {
    constructor() {
        this.userId = '';
        this.userName = '';
        this.email = '';
        this.locations = [];
        this.sizes = [];
        this.movings = [];
        this.createdAt = '';
        this.userError = '';
    }

    /**
     * user Sign Up Method
     *
     * Signs up the user and creates the user in the database
     * @param {String} email            user email address
     * @param {String} userName         user name
     * @param {String} password         password
     * @param {String} passwordConfirm  password confirmation
     */
    async userSignUp(email, userName, password, passwordConfirm) {
        try {
            if (password === passwordConfirm) {
                const signup = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                if (signup.user.uid) {
                    console.log('User Signed up');
                    await this._addUserDb(email, userName, signup.user.uid);

                    //Move to Onboaring page
                    window.location.href = 'onboarding.html';
                }
            } else {
                this.userError =
                    'Confirmation password does not match password field';

                //Added to display error - Meg
                confirmPwErrorMsg.innerHTML = this.userError;
            }
        } catch (error) {
            this.userError = error.message;
            console.log(error.message);

            //Added to display error - Meg
            //Email
            if (this.userError == 'The email address is badly formatted.') {
                emailErrorMsg.innerHTML = 'Please enter a valid email address';
            } else if (
                this.userError ==
                'The email address is already in use by another account.'
            ) {
                emailErrorMsg.innerHTML = this.userError;
            }

            //PW
            if (this.userError == 'Password should be at least 6 characters') {
                pwErrorMsg.innerHTML = this.userError;
            }
        }
    }

    /**
     * user Login Method
     *
     * login method, fills the object with the user information
     * @param {String} email    user email
     * @param {String} password user password
     */
    async userLogin(email, password) {
        try {
            const login = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            if (login.user.uid) {
                console.log('User Logged in');
                await this._getUserDb(login.user.uid);

                //Move to existing Moving page
                window.location.href = 'existingMvs.html';
            } else {
                this.userError = 'Login Error';
            }
        } catch (error) {
            this.userError = error.message;
            console.log(error.message);

            //Added to display error - Meg
            //Email
            if (this.userError == 'The email address is badly formatted.') {
                userEmailErrorMsg.innerHTML =
                    'Please enter a valid email address';
            }

            //PW
            if (
                this.userError ==
                'The password is invalid or the user does not have a password.'
            ) {
                pwErrorMsg.innerHTML = 'Password is invalid';
            }
        }
    }

    /**
     * User Logout Method
     *
     * Logs Out the current user
     */
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

    /**
     * Verify Login Status
     *
     * Verifies if the current user is logged in, if it is logged in redirects
     * the user to movings page, otherwise redirects to login page.
     */
    isLoggedIn() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                if (
                    window.location.pathname === '/' ||
                    window.location.pathname === '/index.html'
                ) {
                    console.log('User Logged in');
                    console.log(window.location.pathname);
                    // window.location.href = 'pages/existingMvs.html';
                    console.log(user.uid);
                    await this._getUserDb(user.uid);
                } else {
                    await this._getUserDb(user.uid);
                    console.log(this);
                }
            } else {
                if (window.location.pathname === '/') {
                    return;
                } else if (window.location.pathname !== '/pages/sign-in.html') {
                    window.location.href = 'pages/sign-in.html';
                }
            }
        });
    }

    /**
     * Private method user by userSignUp to create the user in the database
     * @param {String} email    User email address
     * @param {String} userName User name
     * @param {String} userId   User Id
     */
    async _addUserDb(email, userName, userId) {
        try {
            const data = {
                userName: userName,
                email: email,
                locations: [],
                sizes: [],
                movings: [],
                createdAt: firebase.firestore.Timestamp.now(),
            };

            await db.collection('users').doc(userId).set(data);

            await this._getUserDb(userId);
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    /**
     *Gets the current user from database and populates the user instance
     * @param {String} userId
     */
    async _getUserDb(userId) {
        try {
            console.log(userId, 'get');
            const getDoc = await db.collection('users').doc(userId).get();

            const doc = getDoc.data();

            if (getDoc.id) {
                this.userId = getDoc.id;
                this.userName = doc.userName;
                this.email = doc.email;
                this.locations = doc.locations;
                this.sizes = doc.sizes;
                this.movings = doc.movings;
                this.createdAt = doc.createdAt;
            } else {
                console.log('Firestore error adding user to database');
                this.userError = 'Firestore error adding user to database';
            }
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    /**
     * Updates user's movings
     * @param {Array} userMovings array of updated movings for the current user
     */
    async updateUserMovings(userMovings) {
        try {
            console.log(userMovings);
            await db.collection('users').doc(this.userId).update({
                movings: userMovings,
            });

            await this._getUserDb(this.userId);
        } catch (error) {
            this.userError = error.message;
            console.log(`Error code: ${error.code}`);
            console.log(`Error message: ${error.message}`);
        }
    }

    /**
     * updated user name in the database
     * @param {String} newUserName New user name
     */
    async updateUserDb(newUserName) {
        try {
            const data = {
                userName: newUserName,
            };

            await db
                .collection('users')
                .doc(this.userId)
                .set(data, { merge: true });

            await this._getUserDb(this.userId);
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
//         user.userError ? user.userError : ' '
//     );
//     console.log(user.movings);
//     // user.updateUserDb('pepito updated2').then(() => {
//     //     console.log(
//     //         '\n',
//     //         user.userId + '\n',
//     //         user.userName + '\n',
//     //         user.email + '\n',
//     //         user.locations + '\n',
//     //         user.sizes + '\n',
//     //         user.movings + '\n',
//     //         user.userError ? user.userError : ' '
//     //     );
//     // });
// });

// user.userLogout();
// user.addLocation({ id: 11, location: 'living room' });

// user.addLocation({ id: 15, location: 'Dinning room' });

// console.log(user.locations);

// user.deleteLocation(15);

// console.log(user.locations);

// user.editLocation(11, { id: 11, location: 'Kitchen' });

// console.log(user.locations);
