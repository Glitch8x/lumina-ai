import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase config is complete
const isFirebaseConfigured = Object.values(firebaseConfig).every(val => val !== undefined && val !== '');

let app, auth, googleProvider, db;

if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    db = getFirestore(app);
} else {
    console.warn('⚠️ Firebase configuration is incomplete. Running in demo mode without authentication.');
    // Create mock objects to prevent errors
    auth = null;
    googleProvider = null;
    db = null;
}

export { auth, googleProvider, db };
