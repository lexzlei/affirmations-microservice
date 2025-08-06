import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import generateAffirmations from './geminiService.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/affirmations', async (req, res) => { 
    console.log('Received request');
    try {
        const affirmations = await generateAffirmations();
        res.json(affirmations);
    } catch (error) {
        console.error('Error generating affirmations:', error);
        res.status(500).json({ error: 'Failed to generate affirmations' });
    }
});

app.get('/', (req, res) => res.send("Server is running"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});