/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author user
 */
public class DBApi {

    static Connection con;
    static ResultSet rs;

    public static JSONObject registerNewUser(String name, String email, String password) {
        JSONObject jo = new JSONObject();
        int ada = 0;

        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();

            while (rs.next()) {
                ada = 1;
            }
            if (ada == 1) { // useralready exists
                jo.put("status", 1);
            } else { // not exist
                sql = " insert into register(email,password,name) values(?,?,?)";
                PreparedStatement ps2 = con.prepareStatement(sql);
                ps2.setString(1, email);
                ps2.setString(2, password);
                ps2.setString(3, name);
                System.out.println(ps2.toString());
                ps2.executeUpdate();
                jo.put("status", 0);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONObject userAuthentication(String email, String pass) {
        JSONObject jo = new JSONObject();
        int ada = 0;

        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email=? and password=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, pass);
            rs = ps.executeQuery();

            while (rs.next()) {
                ada = 1;
            }
            if (ada == 1) { // useralready exists
                jo.put("status", 1);
            } else {
                jo.put("status", 0);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONArray getItemDataByOwner(String email) {
        JSONArray ja = new JSONArray();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from items where owneremail= ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
                JSONObject jo = new JSONObject();
                jo.put("id", rs.getString("id"));
                jo.put("title", rs.getString("title"));
                jo.put("username", rs.getString("username"));
                jo.put("password", rs.getString("password"));
                jo.put("descript", rs.getString("descript"));
                ja.add(index++, jo);
            }
            if (ada == 1) {//ada data contacts
                JSONObject jo = new JSONObject();
                jo.put("status", 1);
                ja.add(index++, jo);
            } else {//tiada data contacts
                JSONObject jo = new JSONObject();
                jo.put("status", 0);
                ja.add(index++, jo);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ja;
    }

    public static JSONObject addItemData(String title, String username,
            String password, String descript, String owneremail) {
        JSONObject jo = new JSONObject();

        try {
            con = ConMan.getConnection();
            String sql = "insert into items(title , username, password, descript, owneremail) value(?, ?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, title);
            ps.setString(2, username);
            ps.setString(3, password);
            ps.setString(4, descript);
            ps.setString(5, owneremail);
            ps.executeUpdate();
            jo.put("status", 1);

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return jo;
    }

    public static JSONObject getItemDataById(String id) {
        JSONObject jo = new JSONObject();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from items where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, id);
            rs = ps.executeQuery();
            //cara cek, lepas tu 
            while (rs.next()) {
                ada = 1;

                jo.put("id", rs.getString("id"));
                jo.put("title", rs.getString("title"));
                jo.put("username", rs.getString("username"));
                jo.put("password", rs.getString("password"));
                jo.put("descript", rs.getString("descript"));

            }
            if (ada == 1) {//user already exist

                jo.put("status", 1);//Kalau user exist = 1

            } else {// not exist, add user into table db

                jo.put("status", 0);//Wrong or X de user

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONObject updateItemById(String title, String username,
            String password, String descript ,String id) {
        JSONObject jo = new JSONObject();
        int ada = 0;
        try{
            con = ConMan.getConnection();
            String sql = "update items set title=?, username=?, password=?, descript=? where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
           
            ps.setString(1, title);
            ps.setString(2, username);
            ps.setString(3, password);
            ps.setString(4, descript);
            ps.setString(5, id);
            
            System.out.println(ps.toString());
            
            ps.executeUpdate();
            jo.put("status",1);
            //cara cek, lepas tu 
                       
        } catch(SQLException e){
            e.printStackTrace();
        }
        return jo;
    }
    
    public static JSONObject delItemDataById(String id){
        JSONObject jo = new JSONObject();
        
        try{
            con = ConMan.getConnection();
            String sql = "delete from items where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
           
            ps.setString(1, id);
  
            ps.executeUpdate();
            jo.put("status",1);
            //cara cek, lepas tu 
                       
        } catch(SQLException e){
            e.printStackTrace();
        }
        return jo;
        
    }

}
