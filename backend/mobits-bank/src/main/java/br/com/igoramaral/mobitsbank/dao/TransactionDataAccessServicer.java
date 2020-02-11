/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.igoramaral.mobitsbank.dao;

import br.com.igoramaral.mobitsbank.model.Account;
import br.com.igoramaral.mobitsbank.model.Transaction;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Igor
 */
@Repository("transDao")
public class TransactionDataAccessServicer implements TransactionDao{
    
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public TransactionDataAccessServicer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Override
    public int insertTransaction(Transaction transaction) {
        int from = transaction.getAccFrom();
        int to = transaction.getAccTo();
        double val = transaction.getValue();
        String desc = transaction.getTransDesc();
        int transId = 0;
        switch(desc){
            case("Withdraw"):
                transId = 1;
                break;
            case("Deposit"):
                transId=2;
                break;
            case("Transfer"):
                transId=3;
                break;
            case("Manager Appointment"):
                transId=4;
                break;
            case("Transfer Fee"):
                transId=5;
                break;
            case("Interest"):
                transId=6;
                break;
        }
        String sql = "INSERT INTO public.transactions (accfrom, accto, transtype, transvalue) VALUES (?,?,?,?)";
        jdbcTemplate.update(sql, from, to, transId, val);
        return 1;
    }

    @Override
    public List<Transaction> getAllTransactions() {
        String sql = "SELECT * FROM transactions INNER JOIN transactiontype ON transactions.transtype = transactiontype.transtype_id";
        return jdbcTemplate.query(sql, new TransactionRowMapper());
    }

    @Override
    public List<Transaction> getTransactionsFromAcc(String accNumber) {
        int accNum = Integer.valueOf(accNumber);
        String sql = "SELECT * FROM transactions WHERE accto = ? OR accfrom = ?";
        List<Transaction> transList = jdbcTemplate.query(sql, new Object[]{accNum, accNum},new TransactionRowMapper());
        for (Transaction trans: transList){
            if ((Integer.toString(trans.getAccFrom()).equals(accNumber)) && (trans.getTransDesc().equals("Transfer"))){
                trans.correctValue();
            }
        }
        return transList;
    }
    
    private static final class TransactionRowMapper implements RowMapper{
    @Override
    public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
            int id = Integer.parseInt(rs.getString("transaction_id"));
            Timestamp ts = Timestamp.valueOf(rs.getString("transactiondate"));
            int accFrom = Integer.parseInt(rs.getString("accfrom"));
            int accTo = Integer.parseInt(rs.getString("accto"));
            String transDesc = rs.getString("transtype");
            double val = Double.parseDouble(rs.getString("transvalue"));
            switch (transDesc){
                case("1"):
                    transDesc = "Withdraw";
                    break;
                case("2"):
                    transDesc = "Deposit";
                    break;
                case("3"):
                    transDesc = "Transfer";
                    break;
                case("4"):
                    transDesc = "Manager Appointment";
                    break;
                case("5"):
                    transDesc = "Transfer Fee";
                case("6"):
                    transDesc = "Interest";
            }
            return new Transaction(id, ts, accFrom, accTo, val, transDesc);
        }        
    }
}
