// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_G_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_G_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_G_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_G_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_G_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_G_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_G_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (process.env.IS_DEV) {
  connectFirestoreEmulator(
    db,
    "localhost",
    process.env.DEV_EMULATOR ? parseInt(process.env.DEV_EMULATOR) : 8090
  );
}

export { db };
