import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD4R7_J4b8fKVWI9liWVI4n8jYfaEjYr1U",
  authDomain: "notebook-c5ccc.firebaseapp.com",
  projectId: "notebook-c5ccc",
  storageBucket: "notebook-c5ccc.firebasestorage.app",
  messagingSenderId: "187803782232",
  appId: "1:187803782232:web:a0c14fbb2b5c42c5f6ce2d",
  measurementId: "G-RHJD69CTE8"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)