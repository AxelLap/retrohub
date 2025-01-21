// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.PUBLIC_API_KEY,
  authDomain: "retrohub-626b7.firebaseapp.com",
  projectId: "retrohub-626b7",
  storageBucket: "retrohub-626b7.firebasestorage.app",
  messagingSenderId: "315267879843",
  appId: "1:315267879843:web:77d5571009d21041a2c016",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getItems(db) {
  const itemsCollection = collection(db, items);
  const itemsDoc = await getDocs(itemsCollection);
  const itemList = itemsDoc.docs.map(() => doc.data());
  return itemList;
}
