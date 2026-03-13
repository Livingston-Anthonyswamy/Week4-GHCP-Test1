const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Account {
  constructor(initialBalance = 1000.00) {
    this.balance = initialBalance;
  }

  viewBalance() {
    return `Current balance: ${this.balance.toFixed(2).padStart(8, '0')}`;
  }

  credit(amount) {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      return 'Invalid amount.';
    }
    this.balance += amt;
    return `Amount credited. New balance: ${this.balance.toFixed(2).padStart(8, '0')}`;
  }

  debit(amount) {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      return 'Invalid amount.';
    }
    if (this.balance >= amt) {
      this.balance -= amt;
      return `Amount debited. New balance: ${this.balance.toFixed(2).padStart(8, '0')}`;
    } else {
      return 'Insufficient funds for this debit.';
    }
  }
}

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

async function main() {
  const account = new Account();
  let continueFlag = true;
  while (continueFlag) {
    displayMenu();
    const choice = await new Promise((resolve) => {
      rl.question('Enter your choice (1-4): ', resolve);
    });
    const userChoice = parseInt(choice);
    switch (userChoice) {
      case 1:
        console.log(account.viewBalance());
        break;
      case 2:
        const creditAmount = await new Promise((resolve) => {
          rl.question('Enter credit amount: ', resolve);
        });
        console.log(account.credit(creditAmount));
        break;
      case 3:
        const debitAmount = await new Promise((resolve) => {
          rl.question('Enter debit amount: ', resolve);
        });
        console.log(account.debit(debitAmount));
        break;
      case 4:
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }
  console.log('Exiting the program. Goodbye!');
  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = { Account };