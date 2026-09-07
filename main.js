import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
    deleteOldDisponibilidades, 
    mapDaysToDisponibilidades, 
    addNewDisponibilidades, getDaysOfMass,
    getMassGroups, addMassDisponibilidades,
    getAvailabilityOfMember
} from './services/firebase.service.js'
import { schedule } from './services/scheduler.service.js';

const app = express();
const PORT = 8080;

app.use(express.json());

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/scheduler', (_, res) => {
    res.sendFile(path.join(__dirname, 'public/scheduler.html'))
});

app.get('/availability', (_, res) => {
    res.sendFile(path.join(__dirname, 'public/availability.html'))
});

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
    let { name, daysSelected, monthSelected, massSelecteds } = req.body;
    console.debug('name:', name)
    console.debug('daysSelected:', daysSelected)
    console.debug('monthSelected:', monthSelected)
    console.debug('massSelecteds:', massSelecteds)
    if(!name || !daysSelected || !monthSelected) {
        res.status(400).json({
            success: false,
            message: 'Name, days selected or month undefineds'
        });
        return;
    }
    try {
        name = name.trim();
        const promises = [];
        //promises.push(setObs(name, obs));
        promises.push(updateDisponibilidades(name, daysSelected, monthSelected));
        promises.push(addMassDisponibilidades(massSelecteds, name, monthSelected));
        await Promise.all(promises);
        res.status(201).json({
            success: true
        });
    } catch(error) {
        console.error("An error ocurred when submit answer: ", error);
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

app.get('/scheduleDisponibilidades', async (req, res) => {
    const monthSelected = parseInt(req.query.monthSelected);
    console.log("schedule with month: ", monthSelected);
    if(isNaN(monthSelected) || monthSelected < 0 || monthSelected > 11) {
        res.status(400).json({
            success: false,
            message: 'month selected invalid'
        });
    } else {
        const { lineup, count } = await schedule(monthSelected);
        res.status(200).json({
            success: true,
            lineup,
            count
        }); 
    }
});

app.get('/members/:memberId/availability', async (req, res) => {
    const memberId = req.params.memberId;
    const month = parseInt(req.query.month);
    try {
        const availability = await getAvailabilityOfMember(memberId, month);
        console.log('availability: ', availability);
        if(availability == null) {
            res.status(404).json({
                success: false,
                message: "memeber not found"
            });
        } else {
            res.status(200).json({
                success: true,
                availability
            });   
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
