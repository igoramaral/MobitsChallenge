/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.dao;

import br.com.igoramaral.mobitsbank.model.Account;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Igor
 */

@Repository("accDao")
public class AccountDataAccessService implements AccountDao{
    
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AccountDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    

    @Override
    public int insertAccount(Account account) {
        String name = account.getName();
        int accNum = Integer.parseInt(account.getAccNumber());
        String pass = account.getPassword();
        double bal = account.getBalance();
        String desc = account.getAccDesc();
        int descId;
        if(desc.equals("Standard")){
            descId = 1;
        }
        else if(desc.equals("VIP")){
            descId = 2;
        }
        else{
            return 0;
        }
        String sql = "INSERT INTO public.account (account_number, balance, acctype_id) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, accNum, bal, descId);
        sql = "SELECT acc_id FROM public.account WHERE account_number = ?";
        String newId = jdbcTemplate.queryForObject(sql, new Object[]{accNum} ,String.class);
        int id = Integer.parseInt(newId);
        sql = "INSERT INTO public.costumer (costumer_name, account_id, password) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, name, id, pass);
        return 1;
    }

    @Override
    public List<Account> selectAllAccounts() {
        String sql = "SELECT costumer.costumer_id, costumer.costumer_name, account.account_number, costumer.password, account.balance, acctype.accdesc "
                + "FROM costumer INNER JOIN account ON costumer.account_id = account.acc_id INNER JOIN acctype ON account.acctype_id = acctype.acctype_id";
        return jdbcTemplate.query(sql, new AccountRowMapper());
    }

    @Override
    public Account selectAccountByNumber(String accNumber) {
        String sql = "SELECT costumer.costumer_id, costumer.costumer_name, account.account_number, costumer.password, account.balance, acctype.accdesc "
                + "FROM costumer INNER JOIN account ON costumer.account_id = account.acc_id INNER JOIN acctype ON account.acctype_id = acctype.acctype_id "
                + "WHERE account_number = ?";
        try{
            Account acc;
            acc = (Account) jdbcTemplate.queryForObject(sql, new Object[]{Integer.parseInt(accNumber)} , new AccountRowMapper());
            return acc;
        } catch (EmptyResultDataAccessException e) {
		return null;
	}	
    }

    @Override
    public int updateBalance(String accNumber, double value) {
        String sql = "UPDATE public.account SET balance = ? WHERE account_number = ?";
        int acc = Integer.parseInt(accNumber);
        jdbcTemplate.update(sql, value, acc);
        return 1;
    }
    
    
    
    private static final class AccountRowMapper implements RowMapper{
    @Override
    public Account mapRow(ResultSet rs, int rowNum) throws SQLException {
            int id = Integer.parseInt(rs.getString("costumer_id"));
            String name = rs.getString("costumer_name");
            String accN = rs.getString("account_number");
            String pass = rs.getString("password");
            double bal = Double.parseDouble(rs.getString("balance"));
            String desc = rs.getString("accdesc");
            return new Account(id, name, accN, pass, bal, desc);
        }        
    }
    
}
