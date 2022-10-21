import express from 'express';

import { client, findAllCourses } from '../services/db.js';
import { insertAllCourses } from '../jobs/coursesManagement.js'

export const indexRouter = express.Router();

async function checkIfExistRegisters(request, response) { 
    const result = await findAllCourses('courses');
    if(result == ''){
        insertAllCourses();
        return response.status(201).json(({message: "Registros inseridos com sucesso"}));
    } else {
        await client.close();
        return response.status(200).json({registers: result});        
    }    
       
}

indexRouter.get('/', checkIfExistRegisters);