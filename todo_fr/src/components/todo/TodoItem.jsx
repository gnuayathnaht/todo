import React, { useEffect } from 'react';
import tick_icon from '../../assets/tick.png';
import untick_icon from '../../assets/not_tick.png';
import delete_icon from '../../assets/delete.png';

const TodoItem = ({todo, toggle, deleteTodo}) => {

  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={() => toggle(todo.id)} className='flex flex-1 items-center cursor-pointer'>
            <img src={todo.complete ? tick_icon : untick_icon} alt="" className='w-7' />
            <p className={`text-slate-700 ml-4 text-[17px] ${todo.complete ? 'line-through' : ''}`}>
                {todo.todoTask}
            </p>
        </div>
        <img onClick={() => deleteTodo(todo.id)} src={delete_icon} alt="" className='w-4 cursor-pointer'/>
    </div>
  )
}

export default TodoItem