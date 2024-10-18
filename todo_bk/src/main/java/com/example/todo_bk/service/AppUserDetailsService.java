package com.example.todo_bk.service;

import com.example.todo_bk.dao.UserDao;
import com.example.todo_bk.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findUserByUsername(username);
        System.out.println("loadUserByUsername: " + user);

        if(user == null) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return user;
    }
}
