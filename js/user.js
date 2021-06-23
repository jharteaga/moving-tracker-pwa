function firebaseSignup(email, password) {
    function firebaseSignup(email, password) {
        return {
            user: {
                uid: 'userid 32434',
                userName: 'Pepito',
                email: email,
            },
        };
    }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(firebaseSignup(email, password));
        }, 3000);
    });
}

function firebaseLogin(email, password) {
    function firebaseLogin(email, password) {
        return {
            user: {
                uid: 'userid 32434',
                userName: 'Pepito',
                email: email,
            },
        };
    }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(firebaseLogin(email, password));
        }, 3000);
    });
}

function firebaseLogout() {
    function firebaseLogout() {
        return 'user-logged-out';
    }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(firebaseLogout());
        }, 3000);
    });
}

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

    async userSignUp(email, password, passwordConfirm) {
        try {
            if (password === passwordConfirm) {
                const signup = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                if (signup.user.uid) {
                    console.log('User Signed up');
                    // console.log(signup.user.uid);
                    // console.log(signup.user.email);
                    this.userId = signup.user.uid;
                    // this.userName = signup.userName;
                    this.email = signup.user.email;
                }
            } else {
                this.userError =
                    'Confirmation password does not match password field';
            }
        } catch (err) {
            this.userError = err.message;
            console.log(err.message);
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
                this.userId = login.user.uid;
                // this.userName = login.userName;
                this.email = login.user.email;
            } else {
                this.userError = 'Login Error';
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async userLogout() {
        const logout = await auth.signOut();
        console.log('User Logged Out');
        console.log(logout);
        this.userId = '';
        this.userName = '';
        this.email = '';
    }

    addUserDb() {}

    getUserDb() {}

    updateUserDb() {}

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

// test

const user = new User();

// user.userSignUp('pepito@gmail.com', '1232131', '1232131')
//     .then(() => {
//         console.log(
//             '\n',
//             user.userId + '\n',
//             // user.userName + '\n',
//             user.email + '\n'
//             // user.userError ? user.userError : ''
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
//         user.email + '\n',
//         user.userError ? user.userError : ''
//     );
// });

user.userLogin('pepito@gmail.com', '1232131').then(() => {
    console.log(
        '\n',
        user.userId + '\n',
        // user.userName + '\n',
        user.email + '\n'
        // user.userError ? user.userError : ''
    );
});

// user.addLocation({ id: 11, location: 'living room' });

// user.addLocation({ id: 15, location: 'Dinning room' });

// console.log(user.locations);

// user.deleteLocation(15);

// console.log(user.locations);

// user.editLocation(11, { id: 11, location: 'Kitchen' });

// console.log(user.locations);
