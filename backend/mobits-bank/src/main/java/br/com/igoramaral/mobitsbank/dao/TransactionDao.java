/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.dao;

import br.com.igoramaral.mobitsbank.model.Transaction;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 *
 * @author Igor
 */
public interface TransactionDao {
    
    int insertTransaction(Transaction transaction);

    List<Transaction> getAllTransactions();
    
    List<Transaction> getTransactionsFromAcc(String accNumber);
}
