const { Account } = require('./index');

describe('Account Management System Tests', () => {
  let account;

  beforeEach(() => {
    account = new Account();
  });

  test('TC001: View Current Balance', () => {
    const result = account.viewBalance();
    expect(result).toBe('Current balance: 001000.00');
    expect(account.balance).toBe(1000.00);
  });

  test('TC002: Credit Account with Valid Amount', () => {
    const result = account.credit('500.00');
    expect(result).toBe('Amount credited. New balance: 001500.00');
    expect(account.balance).toBe(1500.00);
  });

  test('TC003: Debit Account with Sufficient Funds', () => {
    const result = account.debit('200.00');
    expect(result).toBe('Amount debited. New balance: 000800.00');
    expect(account.balance).toBe(800.00);
  });

  test('TC004: Debit Account with Insufficient Funds', () => {
    const result = account.debit('1500.00');
    expect(result).toBe('Insufficient funds for this debit.');
    expect(account.balance).toBe(1000.00);
  });

  test('TC005: Invalid Menu Choice - Not applicable for unit test', () => {
    // This is tested in integration, not unit
    expect(true).toBe(true);
  });

  test('TC006: Exit Application - Not applicable for unit test', () => {
    // This is tested in integration, not unit
    expect(true).toBe(true);
  });

  test('TC007: Multiple Operations Sequence', () => {
    account.credit('300.00');
    expect(account.viewBalance()).toBe('Current balance: 001300.00');
    account.debit('500.00');
    expect(account.viewBalance()).toBe('Current balance: 000800.00');
    account.debit('1000.00');
    expect(account.viewBalance()).toBe('Current balance: 000800.00'); // No change due to insufficient
  });

  test('TC008: Boundary Test: Debit Exact Balance', () => {
    account = new Account(500.00); // Set initial to 500
    const result = account.debit('500.00');
    expect(result).toBe('Amount debited. New balance: 000000.00');
    expect(account.balance).toBe(0.00);
  });

  test('TC009: Input Validation for Amounts', () => {
    const invalidCredit = account.credit('-100');
    expect(invalidCredit).toBe('Invalid amount.');
    expect(account.balance).toBe(1000.00);

    const invalidDebit = account.debit('abc');
    expect(invalidDebit).toBe('Invalid amount.');
    expect(account.balance).toBe(1000.00);

    const zeroCredit = account.credit('0');
    expect(zeroCredit).toBe('Invalid amount.');
  });

  test('TC010: Balance Persistence Across Sessions', () => {
    account.credit('100.00');
    expect(account.balance).toBe(1100.00);
    // Simulate restart
    account = new Account();
    expect(account.balance).toBe(1000.00);
  });
});