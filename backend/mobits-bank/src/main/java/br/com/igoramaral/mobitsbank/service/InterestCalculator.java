/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.service;

import br.com.igoramaral.mobitsbank.dao.AccountDao;
import br.com.igoramaral.mobitsbank.model.Account;
import br.com.igoramaral.mobitsbank.model.Transaction;
import java.util.List;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 *
 * @author Igor
 */
@Component
public class InterestCalculator {
    
    private final TransactionService transactionService;
    private final AccountDao accountDao;

    public InterestCalculator(TransactionService transactionService, AccountDao accountDao) {
        this.transactionService = transactionService;
        this.accountDao = accountDao;
    }
    
    @Scheduled(fixedRate = 60000)
    public void calculateInterest(){
        List<Account> accounts = this.accountDao.selectAllAccounts();
        for(int i = 0; i < accounts.size(); i++){
            Account acc = accounts.get(i);
            if(acc.getBalance() < 0){
                double value = acc.getBalance()*0.008;
                int accNum = Integer.parseInt(acc.getAccNumber());
                Transaction trans = new Transaction(0, null, accNum, accNum, value, "Interest");
                transactionService.addTransaction(trans);
            }
        }
    }
    
}
