/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.dao;

import br.com.igoramaral.mobitsbank.model.Account;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Igor
 */
public interface AccountDao {
    
    int insertAccount(Account account);
    
    List<Account> selectAllAccounts();
    
    public Account selectAccountByNumber(String accNumber);
    
    int updateBalance(String accNumber, double value);
}
