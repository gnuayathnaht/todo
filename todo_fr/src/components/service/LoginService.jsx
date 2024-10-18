import axios from "axios"


const API = "http://localhost:8080"

export async function login(user) {
    return await axios.post(`${API}/login`, user);
}

export async function register(user) {
    return await axios.post(`${API}/register`, user);
}