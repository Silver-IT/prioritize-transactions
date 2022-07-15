import csv from "csvtojson";

import latencies from "./latencies.json";

const TRANSACTION_PATH = __dirname + "/transactions.csv";

interface Transaction {
  id: string;
  amount: number;
  bank_country_code: string;
}

async function prioritize(
  transactions: Array<Transaction>,
  totalTime: number = 1000
): Promise<Array<Transaction>> {
  totalTime = totalTime < 0 || totalTime > 1000 ? 1000 : totalTime;
  console.log('Total Time:', totalTime);

  return [];
}

async function main() {
  const transactions: Array<Transaction> = await csv().fromFile(
    TRANSACTION_PATH
  );
  
  const priorTransactions: Array<Transaction> = await prioritize(transactions);
  console.log(priorTransactions);
}

main();
