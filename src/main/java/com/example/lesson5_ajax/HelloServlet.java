package com.example.lesson5_ajax;

import java.io.*;
import java.sql.SQLException;
import java.util.LinkedList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    public void init() {}
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("****** doGet is working ******");
        PrintWriter writer = response.getWriter();
        System.out.println("Hello tvarb");

    }
    private String valueRequest(HttpServletRequest request) {
        DbNotepadAgent agent = new DbNotepadAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        try {
            LinkedList<Notepad> list = agent.valueRequest(request.getParameter("subtask"),
                    request.getParameter(request.getParameter("subtask")));
            agent.closeConnection();
            return getJson(list);
        } catch (SQLException e) {
            System.out.println("exception in value request");
            throw new RuntimeException(e);
        }
    }
    private String rangeRequest(HttpServletRequest request) {
        DbNotepadAgent agent = new DbNotepadAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        try {
            LinkedList<Notepad> list = agent.rangeRequest(request.getParameter("subtask"),
                    request.getParameter("minPages"), request.getParameter("maxPages"));
            agent.closeConnection();
            return getJson(list);
        } catch (SQLException e) {
            System.out.println("exception in range request");
            throw new RuntimeException(e);
        }
    }
    private String idsRequest() throws SQLException {
        DbNotepadAgent agent = new DbNotepadAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        LinkedList<Integer> list = agent.idsRequest();
        agent.closeConnection();
        return getJson(list);
    }
    private String editRequest(HttpServletRequest request) throws SQLException {
        DbNotepadAgent agent = new DbNotepadAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        agent.updateRequest(request);
        return getJson("Record " + request.getParameter("id") + " updated.");
    }
    private String deleteRequest(HttpServletRequest request) throws SQLException{
        DbNotepadAgent agent = new DbNotepadAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));
        agent.deleteRequest(Integer.parseInt(request.getParameter("id")));
        return getJson("Delete id" + " - " + request.getParameter("id"));
    }
    private String insertRequest(HttpServletRequest request) throws SQLException{
        DbNotepadAgent agent = new DbNotepadAgent(System.getenv("url"), System.getenv("userName"),
                System.getenv("password"));

        Notepad notepad = new Notepad(request.getParameter("brand"), request.getParameter("name"),
                Integer.parseInt(request.getParameter("pageAmount")), request.getParameter("cover"),
                request.getParameter("country"), request.getParameter("pageType"));
        agent.insertRequest(notepad);
        return getJson("New record inserted");
    }
    private String chooseRequest(HttpServletRequest request) throws SQLException {
        if (request.getParameter("subtask").equals("country") ||
                request.getParameter("subtask").equals("pageType") ||
                request.getParameter("subtask").equals("id"))
            return valueRequest(request);
        if (request.getParameter("subtask").equals("pageAmount"))
            return rangeRequest(request);
        if (request.getParameter("subtask").equals("edit"))
            return editRequest(request);
        if (request.getParameter("subtask").equals("requestIds"))
            return idsRequest();
        if (request.getParameter("subtask").equals("delete"))
            return deleteRequest(request);
        if (request.getParameter("subtask").equals("insert"))
            return insertRequest(request);
        else return null;
    }
    private String getJson(Object resp) {
        GsonBuilder builder = new GsonBuilder();
        Gson response = builder.create();
        return response.toJson(resp);
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        System.out.println("****** doPost is working ******");
        PrintWriter writer = resp.getWriter();
        try {
            writer.print(chooseRequest(req));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    public void destroy() {
    }
}