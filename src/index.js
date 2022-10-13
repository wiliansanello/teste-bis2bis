const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/search", async(request, response)=>{
    const countries = ["argentina","brazil","chile","colombia","paraguay","peru","suriname","uruguay"];
    const result = await axios.get("http://universities.hipolabs.com/search");
    let coursesByChoseCountries = [];
    const allCourses = result.data;
        allCourses.map((college,index,collection) => {
            let collegesByCountry = collection.filter(college.country.toLowerCase() === countries)   
        coursesByChoseCountries.push(collegesByCountry)
        });
      
    if (allCourses){
        return response.status(200).json(allCourses);
    } else {
        return response.status(400).json("Error");
    }
})

app.get("/search/:country", async(request, response)=>{
    
    const allCourses = await axios.get(`http://universities.hipolabs.com/search?country=${'argentina'}`);
    console.log(typeof(allCourses.data))
    if (allCourses){
        return response.json(allCourses.data);
    } else {
        return response.status(400).json("Error");
    }
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});