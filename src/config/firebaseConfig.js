import firebase from 'firebase'
import * as admin from 'firebase-admin'

const firebaseConfig = {
    apiKey: "AIzaSyCJnobw7gQaxV45xgWMWHvGFzLeagyJ97M",
    authDomain: "hitcount-ecc5b.firebaseapp.com",
    databaseURL: "https://hitcount-ecc5b-default-rtdb.firebaseio.com",
    projectId: "hitcount-ecc5b",
    storageBucket: "hitcount-ecc5b.appspot.com",
    messagingSenderId: "430695655952",
    appId: "1:430695655952:web:7836448dca1ca0d84a3895",
    measurementId: "G-YN1R5XCDPC"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.database()
export const fs = firebase.firestore()
export const store = firebase.storage()