import csv from "csvtojson";

import latencies from "./latencies.json";

const TRANSACTION_PATH = __dirname + "/transactions.csv";

interface Transaction {
  id: string;
  amount: number;
  bank_country_code: string;
}

interface FraudCheckedTransaction {
  id: string;
  fraudulent: boolean;
}

async function prioritize(
  transactions: Array<Transaction>,
  totalTime: number = 1000
): Promise<Array<Transaction>> {
  totalTime = totalTime < 0 || totalTime > 1000 ? 1000 : totalTime;
  console.log("Total Time:", totalTime);

  return [];
}

function processTransaction(transaction: Transaction): boolean {
  return true;
}

function processTransactions(
  transactions: Array<Transaction>
): Array<FraudCheckedTransaction> {
  const results: Array<FraudCheckedTransaction> = [];
  for (const transaction of transactions) {
    results.push({
      id: transaction.id,
      fraudulent: processTransaction(transaction),
    });
  }

  console.log("Result:", results);

  return results;
}

async function main() {
  const transactions: Array<Transaction> = await csv().fromFile(
    TRANSACTION_PATH
  );

  const priorTransactions: Array<Transaction> = await prioritize(transactions);

  processTransactions(priorTransactions);
}

main();
