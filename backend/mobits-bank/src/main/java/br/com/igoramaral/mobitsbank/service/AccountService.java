/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.service;

import br.com.igoramaral.mobitsbank.dao.AccountDao;
import br.com.igoramaral.mobitsbank.model.Account;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Igor
 */

@Service
public class AccountService {
    
    private final AccountDao accountDao;

    @Autowired
    public AccountService(@Qualifier("accDao") AccountDao accountDao) {
        this.accountDao = accountDao;
    }
    
    public int addAccount(Account account){
        return accountDao.insertAccount(account);
    }
    
    public List<Account> getAllAccounts(){
        return accountDao.selectAllAccounts();
    }
    
    public Account getAccountByNumber(String accNumber){
        return accountDao.selectAccountByNumber(accNumber);
    }
}
