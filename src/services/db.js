import { MongoClient } from 'mongodb';

export const client = new MongoClient(process.env.DB_URL);

export async function connect () {
    await client.connect();
}

export async function insertCourses(collectionName, doc) {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);
    const result = await collection.insertMany(doc);
    return result;
}
