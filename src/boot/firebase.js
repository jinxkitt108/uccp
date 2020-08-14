import * as firebase from "firebase/app";

// // Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCCbolQr6yq7WzI1UV1g4jUTgyaucsXNhs",
  authDomain: "uccp-5ace1.firebaseapp.com",
  databaseURL: "https://uccp-5ace1.firebaseio.com",
  projectId: "uccp-5ace1",
  storageBucket: "uccp-5ace1.appspot.com",
  messagingSenderId: "1058424814442",
  appId: "1:1058424814442:web:a838930f4dc6c6aeb00313"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let auth = firebaseApp.auth();
let db = firebaseApp.firestore();

export { auth, db }
