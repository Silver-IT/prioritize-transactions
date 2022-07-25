import csv from "csvtojson";

import latencies from "./latencies.json";
import { CountryCode, Transaction, FraudCheckedTransaction, PrioriMemo } from "./common/types";
import { prioritize } from "./common/prioritize";
const TRANSACTION_PATH = __dirname + "/transactions.csv";

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

  return results;
}

async function main() {
  const transactions: Array<Transaction> = (
    await csv().fromFile(TRANSACTION_PATH)
  ).map((t) => ({
    ...t,
    amount: parseFloat(t.amount),
    latency: latencies[t.bank_country_code as CountryCode] as number,
  }));

  const startedAt = Date.now();
  const priorObj: PrioriMemo = await prioritize(transactions);
  console.log('Elapsted time:', Math.ceil(Date.now() - startedAt), 'ms');

  processTransactions(priorObj.transactions);
}

main();
