/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

/**
 *
 * @author Igor
 */
public class Transaction {
    private final int id;
    private final Timestamp date;
    private final int accFrom;
    private final int accTo;
    private double value;
    private final String transDesc;

    public Transaction(@JsonProperty("id") int id,
            @JsonProperty("date") Timestamp date,
            @JsonProperty("accFrom") int accFrom, 
            @JsonProperty("accTo") int accTo, 
            @JsonProperty("value") double value, 
            @JsonProperty("transDesc") String transDesc) {        
        this.id = id;
        this.date = date;
        this.accFrom = accFrom;
        this.accTo = accTo;
        this.value = value;
        this.transDesc = transDesc;
    }
    
    public int getId() {
        return id;
    }

    public Timestamp getDate() {
        return date;
    }

    public int getAccFrom() {
        return accFrom;
    }

    public int getAccTo() {
        return accTo;
    }

    public double getValue() {
        return value;
    }
    
    public void correctValue(){
        this.value *= -1;
    }

    public String getTransDesc() {
        return transDesc;
    }
    
    
    
    
}
