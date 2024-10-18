package com.example.todo_bk.dao;

import com.example.todo_bk.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoDao extends JpaRepository<Todo, Integer> {

    List<Todo> findAllTodoByCreatedDate(String createdDate);
}
