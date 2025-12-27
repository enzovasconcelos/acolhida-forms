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

const getDisponibilidades = async (servidor, month) => {
    const disponibilidades = [];
    const servidorRef = doc(db, 'servidores', servidor);
    const q = query(collection(db, 'disponibilidades'), where('servidor', '==', servidorRef), 
                                                        where('mes', '==', month));
    const disponibilidadesBd = await getDocs(q);
    disponibilidadesBd.forEach(doc => {
        disponibilidades.push({
          id: doc.id,
          ...doc.data()
        });
    });
    return disponibilidades;
};

export const deleteOldDisponibilidades = async (servidor, month) => {
    const disponibilidades = await getDisponibilidades(servidor, month);
    console.log("disponibilidades antigas");
    console.log(disponibilidades);
    const promises = [];
    disponibilidades.forEach(disponibilidade => {
        promises.push(deleteDoc(doc(db, 'disponibilidades', disponibilidade.id)));
    });
    await Promise.all(promises);
};

export const addNewDisponibilidades = async disponibilidades => {
    const promises = [];
    disponibilidades.forEach(disponibilidade => 
        promises.push(addDoc(collection(db, 'disponibilidades'), disponibilidade)));
    return Promise.all(promises);
};

export const mapDaysToDisponibilidades = (days, name, monthSelected) => {
    const daysSelected = [];
    const servidoresCollection = collection(db, 'servidores');
    const diasDeMissaCollection = collection(db, 'diasDeMissa');
    for(let dayId in days) {
        if(days[dayId].length > 0) {
            daysSelected.push({
                mes: monthSelected,
                servidor: doc(servidoresCollection, name),
                diaDeMissa: doc(diasDeMissaCollection, dayId),
                dias: days[dayId]
            });
        }
    }
    return daysSelected;
};

export const getDaysOfMass = async () => {
    const days = {};
    const q = query(collection(db, 'diasDeMissa'), where("habilitado", "==", true));
    const daysBd = await getDocs(q);
    daysBd.forEach(doc => {
        days[doc.id] = doc.data();
    });
    return days;
};

export const setObs = (name, obs) => {
    return setDoc(doc(db, 'servidores', name), { obs });
};
