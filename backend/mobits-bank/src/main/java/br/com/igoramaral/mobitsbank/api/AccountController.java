/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.api;

import br.com.igoramaral.mobitsbank.model.Account;
import br.com.igoramaral.mobitsbank.service.AccountService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Igor
 */

@RequestMapping("api/v1/account")
@CrossOrigin(origins = {  "http://localhost:3000", "http://localhost:5000", "http://192.168.0.109:3000", "http://192.168.0.109:5000"   })
@RestController
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }
    
    @PostMapping
    public void addAccount(@RequestBody Account account){
        accountService.addAccount(account);
    }
    
    @GetMapping
    public List<Account> getAllAccounts(){
        return accountService.getAllAccounts();
    }
    
    @GetMapping(path="{acc}")
    public Account getAccountByNumber(@PathVariable("acc") String accNumber){
        return accountService.getAccountByNumber(accNumber);
    }
}
