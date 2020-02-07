CREATE TABLE accType(
    accType_id SERIAL PRIMARY KEY,
    accDesc VARCHAR(10) NOT NULL
);

CREATE TABLE account(
    acc_id SERIAL PRIMARY KEY,
    account_number NUMERIC(5,0) NOT NULL,
    balance NUMERIC(15,2) DEFAULT 0.00,
    accType_id INTEGER NOT NULL,
    FOREIGN KEY (accType_id) REFERENCES accType(accType_id)
);

CREATE TABLE costumer(
    costumer_id SERIAL PRIMARY KEY,
    costumer_name VARCHAR(50) NOT NULL,
    account_id INTEGER NOT NULL,
    password VARCHAR(4) NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(acc_id)
);

CREATE TABLE transactionType(
    transType_id SERIAL PRIMARY KEY,
    description VARCHAR(20) NOT NULL
);

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    transactionDate TIMESTAMP DEFAULT now(),
    accFrom NUMERIC(5,0),
    accTo NUMERIC(5,0) NOT NULL,
    transType INTEGER NOT NULL,
    transValue NUMERIC(15,2) NOT NULL,
    FOREIGN KEY (transType) REFERENCES transactionType(transType_id)
);
