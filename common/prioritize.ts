import { PrioriMemo, Transaction } from "./types";

export async function prioritize(
  transactions: Array<Transaction>,
  totalTime: number = 1000
): Promise<PrioriMemo> {
  totalTime = totalTime < 0 || totalTime > 1000 ? 1000 : totalTime;
  console.log("Total Time:", totalTime);

  const memo: Array<Array<PrioriMemo>> = [];

  function getSolution(row: number, cap: number) {
    const NO_SOLUTION: PrioriMemo = { maxAmount: 0, transactions: [] };
    // the column number starts from zero.
    const col = cap - 1;
    const lastItem = transactions[row];
    // The remaining totalTime for the sub-problem to solve.
    const remaining = cap - lastItem.latency;

    // Refer to the last solution for this totalTime,
    // which is in the cell of the previous row with the same column
    const lastSolution =
      row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
    // Refer to the last solution for the remaining totalTime,
    // which is in the cell of the previous row with the corresponding column
    const lastSubSolution =
      row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

    // If any one of the transactions weights greater than the 'cap', return the last solution
    if (remaining < 0) {
      return lastSolution;
    }

    // Compare the current best solution for the sub-problem with a specific totalTime
    // to a new solution trial with the lastItem(new item) added

    const newValue = lastSubSolution.maxAmount + lastItem.amount;
    if (newValue >= lastSolution.maxAmount) {
      // copy the transactions of the last sub-problem solution
      const lastTransactions = lastSubSolution.transactions.slice();
      lastTransactions.push(lastItem);
      return { maxAmount: newValue, transactions: lastTransactions };
    } else {
      return lastSolution;
    }
  }

  for (let i = 0; i < transactions.length; i++) {
    const row: Array<PrioriMemo> = [];
    for (let cap = 1; cap <= totalTime; cap++) {
      row.push(getSolution(i, cap));
    }
    memo.push(row);
  }

  const lastRow: Array<PrioriMemo> = memo[memo.length - 1];
  return lastRow[lastRow.length - 1];
}
