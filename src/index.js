import express from 'express';
import { dataHandler } from './services/dataHandler';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/search", async(request, response)=>{
    const countries = ["argentina","brazil","chile","colombia","paraguay","peru","suriname","uruguay"];
    const result = await axios.get("http://universities.hipolabs.com/search");
    const allCourses = result.data;
    const coursesByChoseCountries = allCourses.filter(college => {
        let country = college.country.toLowerCase();
        return country === countries.find(item => item === country);
    })      
      
    if (coursesByChoseCountries){
        return response.status(200).json(coursesByChoseCountries);
    } else {
        return response.status(400).json("Error to get courses");
    }
})

app.get("/search/:country", async(request, response)=>{
    const { country } = request.query;
        
    const allCourses = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
    
    if (allCourses){
        return response.json(allCourses.data);
    } else {
        return response.status(400).json("Error to get courses");
    }
})

app.post("/insertAll", dataHandler());

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});


