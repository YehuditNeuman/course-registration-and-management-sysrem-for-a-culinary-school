import axios from "axios"

let baseUrl ="http://localhost:8080/api/reg"
// let baseurl = `${import.meta.env.VITE_API_BASE_URL}/api/reg`


export const addRegistrationToServer = (registration, token) => {
    
    return axios.post(baseUrl, registration, {
        headers: {
            "Content-Type": "application/json",
            token: token
        }
    })

}


