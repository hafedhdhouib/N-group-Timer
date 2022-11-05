import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCS-TYhoFlesXbLo_zG1eiy_XGV9W7FKSc",
    authDomain: "ngroupe-timer.firebaseapp.com",
    databaseURL: "https://ngroupe-timer-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ngroupe-timer",
    storageBucket: "ngroupe-timer.appspot.com",
    messagingSenderId: "896537096229",
    appId: "1:896537096229:web:3535f32f57ff80cf854fcc",
    databaseURL:"https://ngroupe-timer-default-rtdb.europe-west1.firebasedatabase.app/"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  export const database = firebase.database();
