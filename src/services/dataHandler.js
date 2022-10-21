import { insertCourses, client, connect } from './db.js';

export async function dataHandler (courses) {
    await connect();
    console.log(courses)
    return Promise.all(
        courses.map(current => {
            return insertCourses("courses", [{
                "state-province": current["state-province"],
                "alpha_two_code": current.alpha_two_code,
                "web_pages": current.web_pages,
                "country": current.country,
                "name": current.name,
                "domains": current.domains,
            }])
        })
    )
}

