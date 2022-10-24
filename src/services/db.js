import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv'; 

dotenv.config();

export const client = new MongoClient(process.env.DB_URL)

export async function connect () {
    await client.connect();
}

export async function insertUniversities(collectionName, doc) {
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection(collectionName).insertMany(doc);
    return result;
}

export async function findUniversitiesByParameter(collectionName, info){
    const db = client.db(process.env.DB_NAME);
    const query = await db.collection(collectionName).find(info).toArray();
    const result = query.map(current => {
        return {"_id":current._id,
                "name":current.name,
                "state-province": current["state-province"],
                "country": current.country}})
        return result;
    
}

export async function findAllUniversities(collectionName, info){
    const db = client.db(process.env.DB_NAME);
    const query = await db.collection(collectionName).find({...info}).toArray();
    const result = query.map(current => {
                    return {"_id":current._id,
                            "name":current.name,
                            "state-province": current["state-province"],
                            "country": current.country}})
    return result; 
}

export async function updateOneUniversity(collectionName, searchFor, updateTo){
    console.log(searchFor, updateTo)
    const db = client.db(process.env.DB_NAME);
    const result = await db.collection(collectionName).updateOne(
        searchFor, 
        { 
            $set: updateTo 
        }
    );
}

export async function deleteUniversity(collectionName, info){
    const db = client.db(process.env.DB_NAME);
    await db.collection(collectionName).deleteOne({...info});
}
