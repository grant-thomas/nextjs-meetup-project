import MeetupList from '@/components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function HomePage(props) {
	return (
		<>
			<Head>
				<title>NextJS Meetups</title>
				<meta
					name='description'
					content='Browse a huge list of highly active React meetups!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://grant3192:zCCNdMOgKGyjp4Za@cluster0.biuxlkr.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0'
	);

	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
	};
}

export default HomePage;
