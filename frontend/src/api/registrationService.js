import axios from "axios"


let baseurl = `${process.env.VITE_API_BASE_URL}/api/reg`


export const addRegistrationToServer = (registration, token) => {
    
    return axios.post(baseurl, registration, {
        headers: {
            "Content-Type": "application/json",
            token: token
        }
    })

}


