import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, 
  collection, 
  addDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  where, 
  doc, 
  getDocs } 
from 'firebase/firestore/lite';

const app = express();
const PORT = 3000;

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

app.use(express.json());

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getDaysOfMass', async (req, res) => {
    try {
        const days = {};
        const q = query(collection(db, 'diasDeMissa'), where("habilitado", "==", true));
        const daysBd = await getDocs(q);
        daysBd.forEach(doc => {
            days[doc.id] = doc.data();
        });
        res.json({
            success: true,
            days
        });
    } catch(error) {
        console.error('An error ocurred when get days of mass:', error);
        res.status(500).json({
            success: false,
            message: 'An error ocurred when get days of mass'
        });
    }
});

app.post('/submit', (req, res) => {
    console.log(req.body);
    res.json({
        success: true
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
