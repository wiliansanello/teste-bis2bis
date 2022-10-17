import axios from 'axios';

export async function filterCoursesList(){
    const countries = ["argentina","brazil","chile","colombia","paraguay","peru","suriname","uruguay"];
    const result = await axios.get("http://universities.hipolabs.com/search");
    const allCourses = result.data;
    const coursesByChoseCountries = allCourses.filter(college => {
        let country = college.country.toLowerCase();
        return country === countries.find(item => item === country);
    })   

    return coursesByChoseCountries;
}

export async function insertAllCourses(){
    const coursesByChoseCountries = await filterCoursesList();
    console.log(coursesByChoseCountries);
};

export async function searchAllCourses (request, response){
    const coursesByChoseCountries = await filterCoursesList();

    if (coursesByChoseCountries){
        return response.status(200).json(coursesByChoseCountries);
    } else {
        return response.status(400).json("Error to get courses");
    }
}

insertAllCourses();

