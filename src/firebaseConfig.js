// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKLdrOYh9on9ggiZVprgQ38eqAHcb2IkE", // keep your API key
  authDomain: "stayspacw.firebaseapp.com",
  projectId: "stayspacw",
  storageBucket: "stayspacw.appspot.com", // <-- FIXED
  messagingSenderId: "431184460122",
  appId: "1:431184460122:web:b70ae43a7d852f24809b63",
  measurementId: "G-BW2DGRNTZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Social providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
