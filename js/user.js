class User {
  /**
   * User class that stores logged in user information
   * with authentication methods and database methods for user.
   */
  constructor() {
    this.userId = '';
    this.userName = '';
    this.email = '';
    this.locations = [];
    this.sizes = [];
    this.movings = [];
    this.userProfilePictureUrl = '';
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
          // window.location.href = 'pages/onboarding.html';

          //Move to Welcome page
          if (
            window.location.pathname === '/index.html' ||
            window.location.pathname === '/'
          ) {
            window.location.href = 'pages/welcome.html';
          } else {
            window.location.href = 'welcome.html';
          }
        }
      } else {
        this.userError = 'Confirmation password does not match password field';
      }
    } catch (error) {
      this.userError = error.message;
      console.log(error.message);
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
      const login = await auth.signInWithEmailAndPassword(email, password);
      if (login.user.uid) {
        console.log('User Logged in');
        await this._getUserDb(login.user.uid);

        //Move to existing Moving page
        if (window.location.pathname !== '/pages/movings.html') {
          window.location.pathname = '/pages/movings.html';
        }
      } else {
        this.userError = 'Login Error';
      }
    } catch (error) {
      this.userError = error.message;
      console.log(error.message);
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
      this.userProfilePictureUrl = '';
    } catch (error) {
      this.userError = error.message;
      console.log(error.message);
    }
  }

  /**
   * Method that takes a file (picture) as input, uploads it to firebase storage,
   * and saves the url to current user.
   *
   * @param {File} file
   */
  async setProfilePicture(file) {
    try {
      const req = await storage.child(file.name).put(file);
      await this._setProfilePictureUrl(await req.ref.getDownloadURL());
    } catch (error) {
      this.userError = error.message;
      console.log(error.message);
    }
  }

  /**
   * Private function to set user profile picture url in user document in firestore
   *
   * @param {String} profilePictureUrl
   */
  async _setProfilePictureUrl(profilePictureUrl) {
    try {
      const data = {
        userProfilePictureUrl: profilePictureUrl,
      };
      await db.collection('users').doc(this.userId).set(data, { merge: true });
      await this._getUserDb(this.userId);
    } catch (error) {
      this.userError = error.message;
      console.log(error.message);
    }
  }

  /**
   * Verifies Login Status
   *
   * Verifies if the current user is logged in, if it is logged in redirects
   * the user to movings page, otherwise redirects to login page.
   *
   * @param {Function} callBack
   */
  isLoggedIn(callBack) {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (window.location.pathname === '/pages/sign-in.html') {
          console.log('User Logged in');
          window.location.href = 'movings.html';
        } else {
          await this._getUserDb(user.uid);
          if (callBack) {
            callBack();
          }
          console.log(this);
        }
      } else {
        if (window.location.pathname === '/pages/sign-in.html') {
          return;
        } else if (window.location.pathname !== '/pages/sign-in.html') {
          window.location.href = 'sign-in.html';
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
      const getDoc = await db.collection('users').doc(userId).get();

      const doc = getDoc.data();

      if (getDoc.id) {
        this.userId = getDoc.id;
        this.userName = doc.userName;
        this.email = doc.email;
        this.userProfilePictureUrl = doc.userProfilePictureUrl;
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
    console.log(userMovings);
    try {
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

      await db.collection('users').doc(this.userId).set(data, { merge: true });

      await this._getUserDb(this.userId);
    } catch (error) {
      this.userError = error.message;
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
    }
  }

  /***************************/
  //Password Reset (keeping this for later)
  /***************************/
  // async sendPasswordReset(userEmail) {
  //   try {
  //     const actionCodeSettings = { url: 'https://moving-trackker.surge.sh' };
  //     await auth.sendPasswordResetEmail(userEmail, actionCodeSettings);
  //   } catch (error) {
  //      this.userError = error.message;
  //      console.log(`Error code: ${error.code}`);
  //      console.log(`Error message: ${error.message}`);
  //   }
  // }
}
