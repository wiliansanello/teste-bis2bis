import express from 'express'; 

import { client, findAllUniversities } from '../services/db.js';
import { insertAllUniversities } from '../jobs/coursesManagement.js'

export const indexRouter = express.Router();

async function checkIfExistRegisters(request, response) { 
    const result = await findAllUniversities('courses');
    if(result == ''){
        insertAllUniversities();
        return response.status(201).json(({message: "Registros inseridos com sucesso"}));
    } else {
        await client.close();
        return response.status(200).json({registers: result});        
    }    
       
}

indexRouter.get('/', checkIfExistRegisters);