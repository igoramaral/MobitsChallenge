/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.api;

import br.com.igoramaral.mobitsbank.model.Transaction;
import br.com.igoramaral.mobitsbank.service.TransactionService;
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

@RequestMapping("api/v1/transaction")
@CrossOrigin(origins = {  "http://localhost:3000", "http://localhost:5000", "http://192.168.0.109:3000", "http://192.168.0.109:5000"   })
@RestController
public class TransactionController {
    
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }
    
    @PostMapping
    public void addTransaction(@RequestBody Transaction transaction){
        transactionService.addTransaction(transaction);
    }
    
    @GetMapping
    public List<Transaction> getAllTransactions(){
        return transactionService.getAllTransactions();
    }
    
    @GetMapping(path="{acc}")
    public List<Transaction> getStatement(@PathVariable("acc") String accNumber){
        return transactionService.getStatement(accNumber);
    }
}
