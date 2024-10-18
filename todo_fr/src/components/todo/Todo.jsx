import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../../assets/todo_icon.png';
import TodoItem from './TodoItem';
import { getTasks, saveTask, deleteTodoById, updateTodo } from '../service/TodoService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from '@heroicons/react/24/outline';

const Todo = () => {

    const userInput = useRef();
    const [todos, setTodos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formatDate, setFormatDate] = useState(null);

    const handleDateChange = date => {
        console.log('date :' + date);
        const formatDate = changeDateFormat(date);
        getTasks(formatDate)
        .then(resp => {
            setTodos(resp.data);
        })
        
        setSelectedDate(date);

    }

    const changeDateFormat = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = day + "" + month + "" + year;

        return formattedDate;
    }

    const getAllTodo = async (date) => {
        console.log("getAllTodo date =" + changeDateFormat(selectedDate));
        const { data } = await getTasks(changeDateFormat(selectedDate));
        setTodos(data);
    }

    const addTask = () => {

        const inputTask = userInput.current.value.trim();

        if (inputTask === null) {
            return null;
        }

        const newTask = {
            id: '',
            todoTask: inputTask,
            complete: false,
            createdDate: changeDateFormat(new Date())
        };

        
        saveTask(newTask)
        .then(resp => {
            console.log('resp :' + resp.data.id);
            newTask.id = resp.data.id;
        });
        console.log(newTask);
        setTodos((prev) => [
            ...prev, newTask
        ])
        userInput.current.value = '';
    }

    const deleteTodo = (id) => {
        deleteTodoById(id);
        setTodos(todos => {
            return todos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        updateTodo(id);
        setTodos(todos => {
            return todos.map(todo => {
                if(todo.id === id) {
                   return {...todo, complete : !todo.complete};
                }
                
                return todo;
            })
        })
    }

    useEffect(() => {
        getAllTodo();
    }, []);

    //JSON.stringify(todos)

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md
                        flex flex-col p-7 min-h-[500px] rounded-xl'>
            <div className='flex items-center mt-3 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
                <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat='dd/MM/yyyy'
                        customInput={<CalendarIcon className='w-8 h-8 ml-40'/>}
                    />
            </div>

            <div className='flex items-center my-7
             bg-gray-200 rounded-full'>
                <input ref={userInput}
                    className='bg-transparent border-0 outline-none
                               flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
                    type="text"
                    placeholder='Add your task'
                />
                <button onClick={addTask}
                    className='border-none rounded-full 
                             bg-orange-600 w-32 h-14 text-white text-lg 
                               font-medium cursor-pointer'>
                    ADD +
                </button>
            </div>

            <div>
                {
                    todos.map((todo) => {
                        console.log(todo);
                        return <TodoItem key={todo.id} todo={todo} toggle={toggle} deleteTodo={deleteTodo}/>
                    })
                }
            </div>
        </div>
    )
}

export default Todo