/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Igor
 */
public class Account {
    private final int id;
    private final String name;
    private final String accNumber;
    private final String password;
    private double balance;
    private final String accDesc;

    public Account(@JsonProperty("id") int id,
            @JsonProperty("name") String name, 
            @JsonProperty("account") String accNumber, 
            @JsonProperty("password") String password, 
            @JsonProperty("balance") double balance, 
            @JsonProperty("type") String accDesc) {
        this.id = id;
        this.name = name;
        this.accNumber = accNumber;
        this.password = password;
        this.balance = balance;
        this.accDesc = accDesc;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAccNumber() {
        return accNumber;
    }

    public String getPassword() {
        return password;
    }

    public double getBalance() {
        return balance;
    }

    public String getAccDesc() {
        return accDesc;
    }
    
    public void setBalance(double value){
        this.balance = value;
    }
    
}
