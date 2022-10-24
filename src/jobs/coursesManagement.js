import axios from 'axios'; 

import { dataHandler } from '../services/dataHandler.js';
import {client} from '../services/db.js';

export async function filterUniversitiesList(){
   const countries = ["argentina","brazil","chile","colombia","paraguay","peru","suriname","uruguay"];
   const result = await axios.get("http://universities.hipolabs.com/search");
   const allCourses = result.data;
   const coursesByChoseCountries = allCourses.filter(college => {
       let country = college.country.toLowerCase();
       return country === countries.find(item => item === country);
   })   

   return coursesByChoseCountries;
}

export async function insertAllUniversities(){
    const coursesByChoseCountries = await filterUniversitiesList();
     try {
        await dataHandler(coursesByChoseCountries);
        console.log ("Registros inseridos com sucesso.");
     } catch(err){
        console.log("Houveram erros na inserção dos registros: "+err);
     }
     await client.close();
};