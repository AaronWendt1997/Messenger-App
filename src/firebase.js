import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATB2ljNOrqKoP4HWzimeQ3aL8y4XDVmcw",
  authDomain: "messenger-app-e726c.firebaseapp.com",
  projectId: "messenger-app-e726c",
  storageBucket: "messenger-app-e726c.appspot.com",
  messagingSenderId: "591127710957",
  appId: "1:591127710957:web:0a9d37cf89d58b729650e4"
});

const db = firebaseApp.firestore();

export default db;