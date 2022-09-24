// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// import * as module from "./firebase-app.js";

import { getDatabase, ref, onValue } from "firebase/database";
// import * as module from "./firebase-database.js";

// importScripts("./util/firebase-app.js");
// try {
//   self.importScripts("util/firebase-app.js");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBByv5bWldM4HvaUpSLHXE7uhkqkP1CEcU",
  authDomain: "new-tab-f1.firebaseapp.com",
  databaseURL: "https://new-tab-f1-default-rtdb.firebaseio.com",
  projectId: "new-tab-f1",
  storageBucket: "new-tab-f1.appspot.com",
  messagingSenderId: "46672489420",
  appId: "1:46672489420:web:701e51409de2303cbe8b69",
  measurementId: "G-LBXVRG3QT6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const fs = getFirestore(app);
const circuitList = [];
try {
  const querySnapshot = await getDocs(collection(fs, "circuits"));
  querySnapshot.forEach((doc) => {
    circuitList.push({ id: doc.id, ...doc.data() });
  });
  // console.log(circuitList);
} catch (e) {
  console.log(e);
}
// const circuitRef = ref(db, "/circuits");

// onValue(circuitRef, (snapshot) => {
//   const circuit = snapshot.val();
//   const circuitList = [];

//   for (let id in circuit) {
//     circuitList.push({ id, ...circuit[id] });
//   }
//   setTrackListImgs(
//     circuitList.filter(
//       (circuits) => currentRace?.Circuit?.circuitId === circuits.id
//     )
//   );
// });

// const circuitRef = ref(db, "/circuits");
// const analytics = getAnalytics(app);
// } catch (error) {
//   console.log(error);
// }
export { app, db, circuitList };
