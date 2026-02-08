import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebase_config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJ_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
}

const app = initializeApp(firebase_config);
const db = getDatabase(app);

export { db }