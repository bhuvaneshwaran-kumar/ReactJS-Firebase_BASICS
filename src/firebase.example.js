import firebase from 'firebase/app'
// import admin from 'firebase-admin'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// import 'firebase/'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const projectStorage = firebase.storage()
// export const bucket = firebase.storage()
// export default firebaseApp
