package com.example.todo_bk.dao;

import com.example.todo_bk.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {

    User findUserByUsername(String username);
}
