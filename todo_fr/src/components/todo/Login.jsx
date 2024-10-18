import { useRef, useState } from 'react';
import React from 'react'
import { login, register } from '../service/LoginService';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../service/TodoService';

const Login = () => {

    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();

    const [formAction, setFormAction] = useState("login");
    const [title, setTitle] = useState('Login');

    const user = {
        username: '',
        password: '',
        email: ''
    }

    const loginUser = () => {
        console.log("loginUser...")
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            console.log("username or password incorrect.")
            setTitle("Login")
            setFormAction('login');
            return false;
        }

        user.username = username;
        user.password = password;

        login(user)
            .then(resp => {
                console.log("token : " + resp.data)
                setToken(resp.data)
                navigate("/todo");
            }
            )
            .catch(err => {
                console.log("something wrong...")
            })

    }

    const changeFormAction = () => {
        setTitle("Register")

        if (formAction === 'register') {

            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            const email = emailRef.current.value;

            user.username = username;
            user.password = password;
            user.email = email;

            register(user)
                .then(resp => {
                    console.log('register success');
                    setFormAction('login');
                    usernameRef.current.value = '';
                    passwordRef.current.value = '';
                    emailRef.current.value = '';
                })
                .catch(err => {
                    console.log('register fail');
                })
        } else {
            setFormAction('register');
        }
        console.log('formAction :' + formAction);

    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-700">{title} to your account</h2>
                <form className="space-y-6"
                    onSubmit={e => {
                        e.preventDefault();
                        loginUser();
                    }}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="text"
                            ref={usernameRef}
                            id="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            ref={passwordRef}
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                            placeholder="Enter your password"
                        />
                    </div>
                    {
                        formAction === 'register' &&
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email Address</label>
                            <input
                                type="email"
                                ref={emailRef}
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="you@example.com"
                            />
                        </div>
                    }
                    {
                        formAction !== 'register' &&
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-purple-900 text-white font-bold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
                            >
                                Sign In
                            </button>
                        </div>
                    }


                </form>
                <div>
                    <button onClick={() => changeFormAction()}
                        className="w-full py-2 px-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        {(formAction !== 'register') ? 'Don\'t have an account? Sign Up' : 'register'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login