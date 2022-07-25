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

  // const priorObj_50: PrioriMemo = await prioritize(transactions, 50);
  // processTransactions(priorObj_50.transactions);
  // const priorObj_60: PrioriMemo = await prioritize(transactions, 60);
  // processTransactions(priorObj_60.transactions);
  // const priorObj_90: PrioriMemo = await prioritize(transactions, 90);
  // processTransactions(priorObj_90.transactions);
  const priorObj_1000: PrioriMemo = await prioritize(transactions);
  processTransactions(priorObj_1000.transactions);

  console.log("Total Time\tUSD Value");
  // console.log("50\t\t", priorObj_50.maxAmount);
  // console.log("60\t\t", priorObj_60.maxAmount);
  // console.log("90\t\t", priorObj_90.maxAmount);
  console.log("1000\t\t", priorObj_1000.maxAmount);
}

main();
