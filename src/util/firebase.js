import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
const fs = getFirestore(app);

const circuitList = [];
try {
  const querySnapshot = await getDocs(collection(fs, "circuits"));
  querySnapshot.forEach((doc) => {
    circuitList.push({ id: doc.id, ...doc.data() });
  });
} catch (e) {
  console.log(e);
}

export { app, circuitList };
