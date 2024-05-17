// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCBi8P8oNgslxcCiw6ZKfs_yvwZkpb6KY",
  authDomain: "cinemafinal.firebaseapp.com",
  projectId: "cinemafinal",
  storageBucket: "cinemafinal.appspot.com",
  messagingSenderId: "324570227920",
  appId: "1:324570227920:web:edb82e01886e8ae0846ad5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);