import React from 'react';
import Todo from './components/todo/Todo';
import Login from './components/todo/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div className='bg-gray-900 grid py-4 min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App