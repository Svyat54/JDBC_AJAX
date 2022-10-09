package com.example.lesson5_ajax;

import java.util.LinkedList;

public class NotePadsList {
    private int[] id;
    public NotePadsList(LinkedList<Notepad> list) {
        id = new int[list.size()];
        int i = 0;
        while (!list.isEmpty()) {
            id[i] = list.removeFirst().getId();
            i++;
        }
    }
}
