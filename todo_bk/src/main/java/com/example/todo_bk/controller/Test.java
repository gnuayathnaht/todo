package com.example.todo_bk.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Test {

    public boolean isAnagram(String s, String t) {

        char[] sCharArr = s.toCharArray();
        char[] tCharArr = t.toCharArray();

        List<Character> sCharList = new ArrayList<>();
        for (char c : sCharArr) {
            sCharList.add(c);
        }

        boolean isAnagrams = false;

        for(int i = 0; i < tCharArr.length; i++) {
            isAnagrams = sCharList.contains(tCharArr[i]);
        }

        return isAnagrams;
    }
}
