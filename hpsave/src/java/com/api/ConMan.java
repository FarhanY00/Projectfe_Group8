/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.api;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author user
 */
public class ConMan {
    static Connection con;
    static String url;
    
    public static Connection getConnection(){
        try{
            Class.forName("com.mysql.jdbc.Driver");
            try{
                url="jdbc:mysql://skimtech.my:3306/skimtech_group8";
                con=DriverManager.getConnection(url, "skimtech_group8", "_Skimtech_Group8@umt");
            }catch(SQLException e) {
                e.printStackTrace();
            }
        }catch(ClassNotFoundException e){
            e.printStackTrace();
        }
        return con;
    }
}
