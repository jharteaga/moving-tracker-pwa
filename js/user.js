function firebaseSignup(email, password) {
    function firebaseSignup(email, password) {
        return {
            uid: 'userid 32434',
            userName: 'Pepito',
            email: email,
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
            uid: 'userid 32434',
            userName: 'Pepito',
            email: email,
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

    // set userId(newUserId) {
    //     this._userId = newUserId;
    // }

    // get userId() {
    //     return this._userId;
    // }

    async userSignUp(email, password, passwordConfirm) {
        if (password === passwordConfirm) {
            const signup = await firebaseSignup(email, password);
            if (signup.uid) {
                console.log('User Signed up');
                this.userId = signup.uid;
                this.userName = signup.userName;
                this.email = signup.email;
            }
        } else {
            this.userError =
                'Confirmation password does not match password field';
        }
    }

    async userLogin(email, password) {
        const login = await firebaseLogin(email, password);
        if (login.uid) {
            console.log('User Logged in');
            this.userId = login.uid;
            this.userName = login.userName;
            this.email = login.email;
        } else {
            this.userError = 'Login Error';
        }
    }

    async userLogout() {
        const logout = await firebaseLogout();
        if (logout === 'user-logged-out') {
            console.log('User Logged Out');
            this.userId = '';
            this.userName = '';
            this.email = '';
        } else {
            this.userError = 'Logout Error';
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

// test

const user = new User();

user.userSignUp('pepito@gmail.com', '1232131', '1232131').then(() => {
    console.log(
        '\n',
        user.userId + '\n',
        user.userName + '\n',
        user.email + '\n',
        user.userError ? user.userError : ''
    );
});

user.userLogout().then(() => {
    console.log(
        '\n',
        user.userId + '\n',
        user.userName + '\n',
        user.email + '\n',
        user.userError ? user.userError : ''
    );
});

user.userLogin('pepito@gmail.com', '1232131').then(() => {
    console.log(
        '\n',
        user.userId + '\n',
        user.userName + '\n',
        user.email + '\n',
        user.userError ? user.userError : ''
    );
});

user.addLocation({ id: 11, location: 'living room' });

user.addLocation({ id: 15, location: 'Dinning room' });

console.log(user.locations);

user.deleteLocation(15);

console.log(user.locations);

user.editLocation(11, { id: 11, location: 'Kitchen' });

console.log(user.locations);
