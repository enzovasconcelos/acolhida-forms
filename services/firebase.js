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

export const deleteOldDisponibilidades = async (name, month) => {
    const disponibilidades = await getDisponibilidades(name, month);
    console.log(`disponibilidades antigas de ${name} e mês ${month}`);
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

const getMissasOfGroup = async (groupId) => {
    const groupRef = doc(db, 'grupos', groupId);
    console.log('groupref: ', groupRef);
    return new Promise(async (resolve, reject) => {
        try {
            const q = query(collection(db, 'missas'), where('grupo', '==', groupRef));
            const docs = await getDocs(q);
            const missas = [];
            docs.forEach(d => {
                missas.push({
                    id: d.id,
                    ...d.data()
                });
            });
            console.log('missas');
            console.log(missas);
            resolve(missas);
        } catch(error) {
            reject(error);
        }
    });
};

const mapGroupsDbToGroups = (groupsDb, groupsArray, missasPromises) => {
    groupsDb.forEach(doc => {
        groupsArray.push({
            id: doc.id,
            ...doc.data()
        });
        missasPromises.push(getMissasOfGroup(doc.id));
    });
};

const attachMissasToGruops = (groups, missasGroups) => {
    for(let i = 0; i < missasGroups.length; i++) {
        groups[i].missas = missasGroups[i];
    }
};

export const getMassGroups = async () => {    
    try {
        const groups = [];
        const q = query(collection(db, 'grupos'), where("habilitado", "==", true));
        const groupsDb = await getDocs(q);
        const missasPromises = [];
        mapGroupsDbToGroups(groupsDb, groups, missasPromises);
        const missasGroups = await Promise.all(missasPromises);
        attachMissasToGruops(groups, missasGroups);
        console.log('groups');
        console.log(groups);
        return groups;
    } catch(error) {
        console.error("error when get mass groups:", error);
        throw new Exception();
    }
};

const addNewMassDisponibilidades = async (massSelecteds, servidorName, monthSelected) => {
    const promises = [];
    console.log(massSelecteds);
    massSelecteds.forEach(mId => {
        const massSelectedRef = doc(db, "missas", mId);
        const disponibilidade = {
            servidorName,
            massSelectedRef,
            monthSelected
        }; 
        promises.push(addDoc(collection(db, 'disponibilidadesMissa'), disponibilidade));
    });

    return Promise.all(promises);
};

const deleteOldMassDisponibilidades = async (servidorName, monthSelected) => {
    const q = query(collection(db, 'disponibilidadesMissa'), where('servidorName', '==', servidorName),
                                                            where('monthSelected', '==', monthSelected));
    const docs = await getDocs(q);
    console.log(`mass disponibilidades antigas de ${servidorName} e mês ${monthSelected}`);
    console.log(docs);
    const promises = [];
    docs.forEach(disponibilidade => {
        promises.push(deleteDoc(doc(db, 'disponibilidadesMissa', ade.id)));
    });
    await Promise.all(promises);
};

export const addMassDisponibilidades = async (massSelecteds, servidorName, monthSelected) => {
    await deleteOldMassDisponibilidades(servidorName, monthSelected);
    return addNewMassDisponibilidades(massSelecteds, servidorName, monthSelected);
};
