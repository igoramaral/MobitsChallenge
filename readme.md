# Welcome to Mobits Challenge!

Hi! My name is Igor and this is my project developed to the Mobits's internship selection process. In this file i'll explain a little about the challenge and the development of the application.

# About the Challenge

The challenge was to create a banking application using, prefarbly, Java or Objective-C. It's client interface could be mobile, desktop, cli or web.

## Application Requirements

The application should:
* Allow an user to login using account number (5 digits) and password (4 digits);
* Have at least 2 users signed up. One will have a Standard Account and the other a VIP Account;
* Allow users to make the following operations: **Withdraw, Deposit, Transfer , make an appointment with the manager and check account statement**.
* Allow users to switch accounts to check other accounts activity.

About the statement:
* The statement must show date, time, description and value of each operation of an account.

About the withdraw:
* Standard costumers cannot withdraw more money than their current balance;
* VIP costumers have no limitations to withdraw money but will 0,1% interest will occur per minute if balance is negative, until enough deposits are made to make balance positive again.

About the deposit:
* Both type of costumers have no limitations when depositing money.

About transfers:
* A costumer can make transfer informing the destination account and the value.
* A costumer cannot transfer to itself or to an unexisting account.
* Standard costumer can only transfer R$ 1000 at a time, VIP costumers have no limit
* Standard costumers will pay R$ 8 transfer fee. VIP costumers pay 0,8% of transfer value as fee.
* Transfers must appear on both the clients accounts statements.

About the appointments with a manager:
* Only VIP clients may schedule appointments;
* This operation must be confirmed by the costumer and, if confirmed, only debits R$ 50 from costumer's account.

# About my solution

For this challenge, i decided to take an web approach. The project will be versioned using github.

## Backend

For the backend, I used Spring Boot, a Java framework for creating web applications and api's quickly and reliably. I also used Flyway for migrations management, and PostgreSQL as database server.




