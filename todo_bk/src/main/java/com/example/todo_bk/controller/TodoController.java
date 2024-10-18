package com.example.todo_bk.controller;

import com.example.todo_bk.entity.Todo;
import com.example.todo_bk.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello Todo";
    }

    @GetMapping("/todos/{createdDate}")
    public ResponseEntity<List<Todo>> getTodos(@PathVariable String createdDate) {
        return ResponseEntity.ok().body(todoService.getTodos(createdDate));
    }

    @PostMapping("/save_todo")
    public ResponseEntity<Todo> saveTodo(@RequestBody Todo todo) {
        Todo saveTodo = todoService.saveTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveTodo);
    }

    @PostMapping("/update_todo/{id}")
    public ResponseEntity updateTodo(@PathVariable int id) {
        todoService.updateTodo(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete_todo/{id}")
    public ResponseEntity deleteTodo(@PathVariable int id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok().build();
    }
}
