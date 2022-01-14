// Import the functions you need from the SDKs you need
import * as firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmQrHbRWiinvS0dOCCGmB90ldo7GTBMhM",
    authDomain: "loads-5720f.firebaseapp.com",
    projectId: "loads-5720f",
    storageBucket: "loads-5720f.appspot.com",
    messagingSenderId: "783761792481",
    appId: "1:783761792481:web:1868612688e1f36d8186a0",
    measurementId: "G-2LEDLR4P06"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };