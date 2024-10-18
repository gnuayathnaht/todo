import axios from "axios";

const API = "http://localhost:8080"

export const setToken = (token) => {
    if (token !== null) {
        window.localStorage.setItem("token", token);
    }
}

export const getToken = () => {  
    return window.localStorage.getItem("token");
}

export const getHeader = () => {

    console.log("getHeader....")
    const token = getToken();

    if(token !== null) {
        return {'Authorization':`Bearer ${token}`};
    }
}

export async function saveTask(task) {
    return await axios.post(`${API}/save_todo`, task, {
        headers: getHeader()
    });
}

export async function updateTodo(id) {
    console.log('headers : ' + getHeader())
    return await axios.post(`${API}/update_todo/${id}`, null, {
        headers: getHeader()
    });
}

export async function getTasks(today) {
    return await axios.get(`${API}/todos/${today}`, {
        headers: getHeader()
    });
}

export async function deleteTodoById(id) {
    return await axios.delete(`${API}/delete_todo/${id}`);
}