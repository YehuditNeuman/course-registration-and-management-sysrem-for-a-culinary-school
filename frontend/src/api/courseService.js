import axios from "axios"

let baseUrl = `${process.env.VITE_API_BASE_URL}/api/course`


export const numPagesFromServer = (limit = 2) => {
    return axios.get(baseUrl + "/total?limit=" + limit)
}

export const getAllCourses = (page, limit = 2, category = "") => {
    return axios.get(baseUrl + "?page=" + page + "&limit=" + limit + "&category=" + category)
}

export const getAllCategoriesFromServer = () => {
    return axios.get(`${baseUrl}/categories`)
}

export const deleteCuorse = (courseId, token) => {
    return axios.delete(`${baseUrl}/${courseId}`,
        {
            headers: {
                token: token
             }})
}

export const AddCourseToServer = (course, token) => {
    return axios.post(baseUrl, course,
        {
            headers: {
                token: token
            }
        })}

export const getCourseById = (courseId) => {
    return axios.get(`${baseUrl}/${courseId}`)
}

export const updateCourse = (course, token) => {

    return axios.put(`${baseUrl}/${course._id}`, course,
        {
            headers: {
                token: token
            }
        })}

export const getImageFromServer = (image) => {
    return axios.get(`${baseUrl}/image/${image}`, { responseType: "blob" });
}


