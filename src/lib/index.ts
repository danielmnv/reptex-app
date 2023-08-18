// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
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

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

if (process.env.NEXT_PUBLIC_IS_DEV) {
  connectFirestoreEmulator(
    db,
    "localhost",
    process.env.NEXT_PUBLIC_DEV_EMULATOR
      ? parseInt(process.env.NEXT_PUBLIC_DEV_EMULATOR)
      : 8090
  );
}

export { db };
