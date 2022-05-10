// Import the functions you need from the SDKs you need
import firebase from "firebase";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBeAg5rJsl4K1FziD1o0BDRG28YLiqmMdc",
  authDomain: "chores-app-88dda.firebaseapp.com",
  projectId: "chores-app-88dda",
  storageBucket: "chores-app-88dda.appspot.com",
  messagingSenderId: "83793934638",
  appId: "1:83793934638:web:2ad8f61022c9ddc4eda2bf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();
const auth = firebase.auth();
const db = firebase.database();

export default {
  firebase,
  auth,
  storage,
  storageRef,
  db
}