/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.service;

import br.com.igoramaral.mobitsbank.dao.AccountDao;
import br.com.igoramaral.mobitsbank.model.Account;
import java.util.ArrayList;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Igor
 */
@Service
public class MyUserDetailsService implements UserDetailsService{
    
    private final AccountDao accountDao;

    public MyUserDetailsService(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @Override
    public UserDetails loadUserByUsername(String account) throws UsernameNotFoundException {
        Account accountFromDb = accountDao.selectAccountByNumber(account);  //Gets account from DB based on the method on accountDao
        String username = accountFromDb.getAccNumber();
        String password = accountFromDb.getPassword();
        return new User(username, password, new ArrayList<>());
    }
    
    
}
