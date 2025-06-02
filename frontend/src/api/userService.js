
import axios from "axios";

// let baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/student`
let baseUrl ="http://localhost:8080/api/student"

export const addStudent_SignUpToServer = (student) => {
    return axios.post(baseUrl, student)
}

export const loginUser = (student) => {
    return axios.post(baseUrl + "/login", {email:student.email, password:student.password})
}
export const sendGoogleTokenToServerLogin=(credentialResponse)=>{
    return axios.post(`${baseUrl}/login/google`,{
        credential: credentialResponse.credential,
    },
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
}
export const sendGoogleTokenToServerSignUp = (credentialResponse) => {
    return axios.post(`${baseUrl}/google`, {
        credential: credentialResponse.credential,
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    });
};