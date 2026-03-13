const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let balance = 1000.00;

function displayMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function viewBalance() {
  console.log(`Current balance: ${balance.toFixed(2).padStart(8, '0')}`);
}

function creditAccount() {
  return new Promise((resolve) => {
    rl.question('Enter credit amount: ', (amount) => {
      const amt = parseFloat(amount);
      if (isNaN(amt) || amt <= 0) {
        console.log('Invalid amount.');
        resolve();
        return;
      }
      balance += amt;
      console.log(`Amount credited. New balance: ${balance.toFixed(2).padStart(8, '0')}`);
      resolve();
    });
  });
}

function debitAccount() {
  return new Promise((resolve) => {
    rl.question('Enter debit amount: ', (amount) => {
      const amt = parseFloat(amount);
      if (isNaN(amt) || amt <= 0) {
        console.log('Invalid amount.');
        resolve();
        return;
      }
      if (balance >= amt) {
        balance -= amt;
        console.log(`Amount debited. New balance: ${balance.toFixed(2).padStart(8, '0')}`);
      } else {
        console.log('Insufficient funds for this debit.');
      }
      resolve();
    });
  });
}

async function main() {
  let continueFlag = true;
  while (continueFlag) {
    displayMenu();
    const choice = await new Promise((resolve) => {
      rl.question('Enter your choice (1-4): ', resolve);
    });
    const userChoice = parseInt(choice);
    switch (userChoice) {
      case 1:
        viewBalance();
        break;
      case 2:
        await creditAccount();
        break;
      case 3:
        await debitAccount();
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

main();