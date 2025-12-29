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

app.get('/getDaysOfMass', async (req, res) => {
    try {
        const days = await getDaysOfMass();
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

app.post('/submit', async (req, res) => {
    const { name, obs, daysSelected, monthSelected, massSelecteds } = req.body;
    console.log('name:', name)
    console.log('obs', obs)
    console.log('daysSelected:', daysSelected)
    console.log('monthSelected:', monthSelected)
    console.log('massSelecteds:', massSelecteds)
    // TODO: validações + try catch
    await setObs(name, obs);
    await deleteOldDisponibilidades(name, monthSelected); 
    const daysSelectedDb = mapDaysToDisponibilidades(daysSelected, name, monthSelected);
    await addNewDisponibilidades(daysSelectedDb); 
    await addMassDisponibilidades(massSelecteds, name, monthSelected);
    res.json({
        success: true
    });
});

app.get('/getMassGroups', async (_, res) => {
    try {
        const groups = await getMassGroups();
        res.json({
            success: true,
            groups
        });
    } catch(error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
