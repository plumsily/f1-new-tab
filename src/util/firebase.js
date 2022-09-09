// import { initializeApp } from 'firebase/app';
// // import { getAnalytics } from "firebase/analytics";
// import {getFirestore} from 'firebase/firestore';
// import {getStorage} from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyBByv5bWldM4HvaUpSLHXE7uhkqkP1CEcU",
//   authDomain: "new-tab-f1.firebaseapp.com",
//   projectId: "new-tab-f1",
//   storageBucket: "new-tab-f1.appspot.com",
//   messagingSenderId: "46672489420",
//   appId: "1:46672489420:web:701e51409de2303cbe8b69",
//   measurementId: "G-LBXVRG3QT6"
//   };

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// const storage = getStorage(firebaseApp);

// export {
//   storage, db as default
// }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBByv5bWldM4HvaUpSLHXE7uhkqkP1CEcU",
  authDomain: "new-tab-f1.firebaseapp.com",
  projectId: "new-tab-f1",
  storageBucket: "new-tab-f1.appspot.com",
  messagingSenderId: "46672489420",
  appId: "1:46672489420:web:701e51409de2303cbe8b69",
  measurementId: "G-LBXVRG3QT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
