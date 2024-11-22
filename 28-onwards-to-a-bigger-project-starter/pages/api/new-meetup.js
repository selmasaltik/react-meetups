import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://selmasaltiik:wQnmmmCEhIGhjRzE@cluster0.tijqh.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db();

        const meetupsCollection = db.connect('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;