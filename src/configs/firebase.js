import firebase from "firebase/app";
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBbQTuqu5qPsp1kwuF92IP2bioYRXnlZLI",
    authDomain: "itrans-upload.firebaseapp.com",
    projectId: "itrans-upload",
    storageBucket: "itrans-upload.appspot.com",
    messagingSenderId: "78851208099",
    appId: "1:78851208099:web:3615eb350e30a7bce76016",
    measurementId: "G-NYEP4L926K"
  };
   firebase.initializeApp(firebaseConfig);
   const storage = firebase.storage();
   export {storage,firebase as default};
