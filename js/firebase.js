const firebaseConfig = {
    apiKey: 'AIzaSyCwac9_2O7Xnsroyi_FAmSQQTjdk7Y2vrI',
    authDomain: 'moving-tracker-pwa.firebaseapp.com',
    projectId: 'moving-tracker-pwa',
    storageBucket: 'moving-tracker-pwa.appspot.com',
    messagingSenderId: '680571252158',
    appId: '1:680571252158:web:0f2938caa0d5d1ff5e1def',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
