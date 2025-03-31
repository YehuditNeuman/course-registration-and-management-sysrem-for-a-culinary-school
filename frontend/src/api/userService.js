import axios from "axios";

let baseUrl = `${process.env.VITE_API_BASE_URL}/api/student`


export const addStudent_SignUpToServer = (student) => {
    return axios.post(baseUrl, student)
}

export const loginUser = (student) => {
    return axios.post(baseUrl + "/login", {userName:student.userName, password:student.password},
       
    )
}