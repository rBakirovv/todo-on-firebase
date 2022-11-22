import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9hfRASBVxSDVyAACGuLjbzVack_wqAXg",
  authDomain: "todo-firebase-3afff.firebaseapp.com",
  projectId: "todo-firebase-3afff",
  storageBucket: "todo-firebase-3afff.appspot.com",
  messagingSenderId: "1092421095251",
  appId: "1:1092421095251:web:ee0111c83b8708fd7d1ba6"
};

const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const storage = getStorage(app);

export { dataBase, storage };