package com.example.todo_bk.service;

import com.example.todo_bk.dao.TodoDao;
import com.example.todo_bk.entity.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoDao todoDao;

    public List<Todo> getTodos(String createdDate) {
        return todoDao.findAllTodoByCreatedDate(createdDate);
    }

    public Todo saveTodo(Todo todo) {
        Todo savedTodo = todoDao.save(todo);
        return savedTodo;
    }

    public void deleteTodo(int id) {
        todoDao.deleteById(id);
    }

    public void updateTodo(int id) {

        Todo todo = todoDao.findById(id).get();
        todo.setComplete(!todo.isComplete());
        todoDao.save(todo);
    }
}
