// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnMDlNQ9lidKdgYKEQYossnYz23IRAYRw",
    authDomain: "officeleasingportal.firebaseapp.com",
    projectId: "officeleasingportal",
    storageBucket: "officeleasingportal.appspot.com",
    messagingSenderId: "477174056622",
    appId: "1:477174056622:web:4c26e8c3d043b1e21c4f3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);