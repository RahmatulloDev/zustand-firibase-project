// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// //TODO: Add SDKs for Firebase products that you want to use
//  `https://firebase.google.com/docs/web/setup#available-libraries`

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAq0BKv7JwtxeJaDr25uYUJYwCekZ41BZY",
//   authDomain: "shop-auth-52479.firebaseapp.com",
//   projectId: "shop-auth-52479",
//   storageBucket: "shop-auth-52479.appspot.com",
//   messagingSenderId: "692367077430",
//   appId: "1:692367077430:web:35a64b42edcaff646ca897",
// };

// // Initialize Firebase
// const app = !getApp().length
//   ? initializeApp(firebaseConfig)
//   : get.App();
// const db  = getFirestore()
// const auth = getAuth()

// export default app
// export {db ,auth}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyAq0BKv7JwtxeJaDr25uYUJYwCekZ41BZY",
  authDomain: "shop-auth-52479.firebaseapp.com",
  projectId: "shop-auth-52479",
  storageBucket: "shop-auth-52479.appspot.com",
  messagingSenderId: "692367077430",
  appId: "1:692367077430:web:35a64b42edcaff646ca897",
};

// Initialize Firebase (handle potential re-initialization)
let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// Initialize Firestore and Auth (assuming you'll use both)
const db = getFirestore(app);
const auth = getAuth(app);

// Usage examples (uncomment and replace placeholders as needed)
// Firestore
// const querySnapshot = await getDocs(collection(db, "yourCollectionName"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

// Auth (email/password)
// **Sign in**
// const userCredential = await signInWithEmailAndPassword(auth, "email@example.com", "password");
// const user = userCredential.user;

// **Sign up**
// const userCredential = await createUserWithEmailAndPassword(auth, "email@example.com", "password");

// Export the necessary objects
export { db, auth };
