import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { deleteOldDisponibilidades, 
        mapDaysToDisponibilidades, 
        addNewDisponibilidades, setObs, getDaysOfMass,
        getMassGroups, addMassDisponibilidades } from './services/firebase.js'

const app = express();
const PORT = 8080;

app.use(express.json());

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getDaysOfMass', async (_, res) => {
    try {
        const days = await getDaysOfMass();
        console.log(`get request: getDaysOfMass:`);
        console.log(days);
        res.json({
            success: true,
            days
        });
    } catch(error) {
        console.error('An error ocurred when get days of mass:', error);
        res.status(500).json({
            success: false,
            message: 'An error ocurred when get days of mass',
            error
        });
    }
});

async function updateDisponibilidades(name, daysSelected, monthSelected) {
    return new Promise(async (resolve, reject) => {
        try {
            await deleteOldDisponibilidades(name, monthSelected); 
            const daysSelectedDb = mapDaysToDisponibilidades(daysSelected, name, monthSelected);
            addNewDisponibilidades(daysSelectedDb); 
            resolve(true);
        } catch(error) {
            reject(error);
        }
    });
}

app.post('/submit', async (req, res) => {
    const { name, obs, daysSelected, monthSelected, massSelecteds } = req.body;
    console.log('name:', name)
    console.log('obs', obs)
    console.log('daysSelected:', daysSelected)
    console.log('monthSelected:', monthSelected)
    console.log('massSelecteds:', massSelecteds)
    if(!name || !daysSelected || !monthSelected) {
        res.status(400).json({
            success: false,
            message: 'Name, days selected or month undefineds'
        });
        return;
    }
    try {
        const promises = [];
        promises.push(setObs(name, obs));
        promises.push(updateDisponibilidades(name, daysSelected, monthSelected));
        promises.push(addMassDisponibilidades(massSelecteds, name, monthSelected));
        await Promise.all(promises);
        res.status(201).json({
            success: true
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            messsage: 'An error ocurred when submit answer'
        });
    }
});

app.get('/getMassGroups', async (_, res) => {
    try {
        const groups = await getMassGroups();
        console.log(`get request: getMassGroups:`);
        console.log(groups);
        res.json({
            success: true,
            groups
        });
    } catch(error) {
        console.error('An error ocurred in getMassGroups', error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
