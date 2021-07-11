import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCCTV3Rw1TkhWEwbapfwzvi-uDwa-MB-x4",
  authDomain: "react-login-b63d4.firebaseapp.com",
  projectId: "react-login-b63d4",
  storageBucket: "react-login-b63d4.appspot.com",
  messagingSenderId: "210217920662",
  appId: "1:210217920662:web:6faaa32c4fd28e6fcfbab7",
  measurementId: "G-PNZ6GDNQZX",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
