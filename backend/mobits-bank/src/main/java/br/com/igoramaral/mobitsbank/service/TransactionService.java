/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.service;

import br.com.igoramaral.mobitsbank.dao.AccountDao;
import br.com.igoramaral.mobitsbank.dao.TransactionDao;
import br.com.igoramaral.mobitsbank.model.Account;
import br.com.igoramaral.mobitsbank.model.Transaction;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Igor
 */

@Service
public class TransactionService {
    
    private final TransactionDao transactionDao;
    private final AccountDao accountDao;

    @Autowired
    public TransactionService(@Qualifier("transDao") TransactionDao transactionDao,
            @Qualifier("accDao") AccountDao accountDao) {
        this.transactionDao = transactionDao;
        this.accountDao = accountDao;
    }
    
    public int addTransaction(Transaction transaction){
        String to = String.valueOf(transaction.getAccTo());
        String from = String.valueOf(transaction.getAccFrom());

        //loads accounts with the given numbers
        Account accFrom = accountDao.selectAccountByNumber(from);;
        Account accTo = accountDao.selectAccountByNumber(to);
        double newBal;
        //Check if accounts were loaded
        if(accTo != null){
            if(accFrom != null){
                System.out.println("Checking Transaction Type");
                //Withdraw, Deposit, Manager Appointment and Transfer Tax Transactions have the same account number
                if(accTo.getAccNumber().equals(accFrom.getAccNumber())){
                    switch(transaction.getTransDesc()){
                        case "Deposit":
                            System.out.println("Making deposit on account " + accTo.getAccNumber());
                            //Deposit Operation does not need to check balance
                            newBal = accTo.getBalance() + transaction.getValue();
                            accountDao.updateBalance(accTo.getAccNumber(), newBal);
                            transactionDao.insertTransaction(transaction);
                            break;
                        case "Withdraw":
                            //Standard costumers cannot make withdraw if the value is greater than their current balance
                            //VIP costumers have no withdraw limits but negative balance will generate interest fees
                      
                            switch(accTo.getAccDesc()){
                                case "Standard":
                                    System.out.println("Withdraw on Standard Account");
                                    System.out.println("Value: " + transaction.getValue());
                                    if(transaction.getValue() > accTo.getBalance()){
                                        return 0;
                                    }
                                    else{
                                        System.out.println("Making withdraw on account " + accTo.getAccNumber());
                                        transaction.correctValue();
                                        newBal = accTo.getBalance() + transaction.getValue();
                                        accountDao.updateBalance(accTo.getAccNumber(), newBal);
                                        transactionDao.insertTransaction(transaction);
                                        break;
                                    }
                                case "VIP":
                                    System.out.println("Making withdraw on account " + accTo.getAccNumber());
                                    transaction.correctValue();
                                    newBal = accTo.getBalance() + transaction.getValue();
                                    accountDao.updateBalance(accTo.getAccNumber(), newBal);
                                    transactionDao.insertTransaction(transaction);
                                    break;
                            }
                            break;
                        case "Manager Appointment":
                            //Standard clients cannot schedule appointments. 
                            switch(accTo.getAccDesc()){
                                case "Stardard":
                                    return 0;
                                case "VIP":
                                    System.out.println("Making manager appointment on account " + accTo.getAccNumber());
                                    transaction.correctValue();
                                    newBal = accTo.getBalance() + transaction.getValue();
                                    accountDao.updateBalance(accTo.getAccNumber(), newBal);
                                    transactionDao.insertTransaction(transaction);
                                    break;
                            }
                            break;
                        case "Interest":
                            newBal = accTo.getBalance() + transaction.getValue();
                            accountDao.updateBalance(accTo.getAccNumber(), newBal);
                            transactionDao.insertTransaction(transaction);
                            break;
                    }
                }
                //Transfer transaction have different account Numbers
                else{
                    switch(accFrom.getAccDesc()){
                        //Standard clients can only transfer R$1000 at a time
                        //Standard clients cannot have negative balances and will pay R$8 Transfer tax
                        case "Standard":
                            
                            if(transaction.getValue() > 1000){
                                return 0;
                            }
                            else{
                                if(transaction.getValue()+8 > accFrom.getBalance()){
                                    return 0;
                                }
                                else{
                                    System.out.println("Making transfer from account " + accFrom.getAccNumber() + " to account " + accTo.getAccNumber());
                                    double fromNewBal = accFrom.getBalance() - transaction.getValue() - 8;
                                    double toNewBal = accTo.getBalance() + transaction.getValue();
                                    accountDao.updateBalance(accFrom.getAccNumber(), fromNewBal);
                                    accountDao.updateBalance(accTo.getAccNumber(), toNewBal);
                                    transactionDao.insertTransaction(transaction);
                                    Transaction tax = new Transaction(
                                            1,
                                            new Timestamp(System.currentTimeMillis()),
                                            Integer.parseInt(accFrom.getAccNumber()),
                                            Integer.parseInt(accFrom.getAccNumber()),
                                            -8.00,
                                            "Transfer Fee"
                                    );
                                    transactionDao.insertTransaction(tax);
                                }
                            }
                            break;
                        //VIP costumers have no transfer limit
                        //VIP transfers will generate 0,8% of transfer value as transfer fee    
                        case "VIP":
                            System.out.println("Making transfer from account " + accFrom.getAccNumber() + " to account " + accTo.getAccNumber());
                            double transValue = transaction.getValue();
                            double fee = 0.008 * transValue;
                            double fromNewBal = accFrom.getBalance() - transaction.getValue() - fee;
                            double toNewBal = accTo.getBalance() + transaction.getValue();
                            accountDao.updateBalance(accFrom.getAccNumber(), fromNewBal);
                            accountDao.updateBalance(accTo.getAccNumber(), toNewBal);
                            transactionDao.insertTransaction(transaction);
                            Transaction tax = new Transaction(
                                    1,
                                    new Timestamp(System.currentTimeMillis()),
                                    Integer.parseInt(accFrom.getAccNumber()),
                                    Integer.parseInt(accFrom.getAccNumber()),
                                    - fee,
                                    "Transfer Fee"
                            );
                            transactionDao.insertTransaction(tax);
                            break;
                    }
                }
            }
        }
        
        return 1;
    }
    
    public List<Transaction> getAllTransactions(){
        return transactionDao.getAllTransactions();
    }
    
    public List<Transaction> getStatement(String accNumber){
        return transactionDao.getTransactionsFromAcc(accNumber);
    }
}
