import express from "express";
import { ObjectId } from "mongodb"; 

import { 
    client, 
    findAllUniversities, 
    findUniversitiesByParameter, 
    insertUniversities,
    updateOneUniversity, 
    deleteUniversity, 
} from "../services/db.js";

export const universitiesRouter = express.Router();

async function searchAllCourses (request, response){
    const { country } = request.query;
    let coursesByChoseCountries;
    await client.connect(); 
    if (country) {
        coursesByChoseCountries = await findAllUniversities("courses", { country: country });
    } else {
        coursesByChoseCountries = await findAllUniversities("courses");
    }  
    await client.close();  
    if (coursesByChoseCountries != ''){
        return response.status(200).json(coursesByChoseCountries);
    } else {
        return response.status(400).json("Error to get courses");
    }
}

async function searchById (request, response){
    const { _id } = request.params;
    await client.connect();
    const courseById = await findUniversitiesByParameter("courses",  {_id: ObjectId( _id )})
    await client.close();
    if (courseById != ''){
        return response.status(200).json(courseById);
    } else {
        return response.status(400).json("Error to get course")
    }   
}

async function insertOne (request, response){
    const university = [request.body];
    if(university){
        await client.connect();
        try{
            await insertUniversities("courses",university);
            response.status(201).json({message: "Dados inseridos com sucesso."});
        } catch(err){
            response.status(400).json({message: `Houve erro na inserção: ${err}`});            
        }
        await client.close();
        
    }
}

async function updateCourse (request, response){
    const university = request.body;
    const { _id } = request.params;
    console.log(_id, university)
    await client.connect();
    try{
        await updateOneUniversity("courses",
        { _id: ObjectId( _id ) },
        {
            "web_pages": university.web_pages,
            "name": university.name,
            "domains":university.domains
        } 
        );
        response.status(200).json({message:"Dados atualizados com sucesso"});
    } catch(err){
        response.status(400).json({message:`Houve erro na atualização: ${err}`})
    }
    await client.close();
    
}

async function deleteCourse (request, response){
    const { _id } = request.params;
    await client.connect();
    try{
        await deleteUniversity("courses", {_id: ObjectId( _id )});
        response.status(200).json({message: "Dados removidos com sucesso"});
    }catch(err){
        response.status(400).json({message: `Houve erro na remoção: ${err}`});
    }   
    await client.close();
}

universitiesRouter.get("/", searchAllCourses);
universitiesRouter.get("/:_id", searchById);
universitiesRouter.post("/", insertOne);
universitiesRouter.put("/:_id", updateCourse);
universitiesRouter.delete("/:_id", deleteCourse);