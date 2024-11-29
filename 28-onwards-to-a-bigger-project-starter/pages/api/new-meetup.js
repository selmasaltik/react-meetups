import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;
  
        try {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
            console.log(result);

        client.close();
            res.status(201).json({ message: 'Meetup inserted!' });
        } catch (error) {
            console.error('MongoDB connection error:', error);
            res.status(500).json({ message: 'Failed to connect to the database' });
        }
    }
}
  

export default handler;