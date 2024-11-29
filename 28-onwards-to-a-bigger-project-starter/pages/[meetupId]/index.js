import { MongoClient } from 'mongodb';

import MeetupDetail from '@/components/meetups/MeetupDetail';

function MeetupDetails(props) {
   return (
        <MeetupDetail
            image={props.image}
            title={props.title}
            address={props.address}
            description={props.description}
        />
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({ 
            params: { meetupId: meetup._id.toString() } 
        }))
    };
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupData: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description
        }
    };
}

export default MeetupDetails;