
import axios from "axios";
import { LOGIN_USER } from './types';
import { REGISTER_USER } from './types';


export function loginUser(dataTosubmit) {
    console.log(dataTosubmit)
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data)
    console.log(request)
    
    return {
        type: LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataTosubmit) {
    console.log(dataTosubmit)
    const request = axios.post('/api/users/register', dataTosubmit)
    .then(response => response.data)
    console.log(request)
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}