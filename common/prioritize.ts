import { PrioriMemo, Transaction } from "./types";

export async function prioritize(
  transactions: Array<Transaction>,
  totalTime: number = 1000
): Promise<PrioriMemo> {
  totalTime = totalTime < 0 || totalTime > 1000 ? 1000 : totalTime;
  console.log("Total Time:", totalTime);
  console.log(
    "Time Complexity: O(transactions.length * totalTime) =",
    transactions.length * totalTime
  );
  console.log(
    "Space Complexity: O(transactions.length * totalTime) =",
    transactions.length * totalTime
  );

  // Variable 'memo' is a grid(2-dimentional array) to store optimal solution for sub-problems,
  // which will be later used as the code execution goes on.
  // This is called memoization in programming.
  // The cell will store best solution objects for different latencies and selectable transactions.
  const memo: Array<Array<PrioriMemo>> = [];

  function getSolution(row: number, latency: number) {
    const NO_SOLUTION: PrioriMemo = { maxAmount: 0, transactions: [] };
    // the column number starts from zero.
    const col = latency - 1;
    const lastTransaction = transactions[row];
    // The remaining latency for the sub-problem to solve.
    const remaining = latency - lastTransaction.latency;

    // Refer to the last solution for this totalTime,
    // which is in the cell of the previous row with the same column
    const lastSolution =
      row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
    // Refer to the last solution for the remaining totalTime,
    // which is in the cell of the previous row with the corresponding column
    const lastSubSolution =
      row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

    // If any one of the transactions weights greater than the 'latency', return the last solution
    if (remaining < 0) {
      return lastSolution;
    }

    // Compare the current best solution for the sub-problem with a specific totalTime
    // to a new solution trial with the lastTransaction added

    const newAmount = lastSubSolution.maxAmount + lastTransaction.amount;
    if (newAmount >= lastSolution.maxAmount) {
      // copy the transactions of the last sub-problem solution
      const lastTransactions = lastSubSolution.transactions.slice();
      lastTransactions.push(lastTransaction);
      return {
        maxAmount: parseFloat(newAmount.toFixed(2)),
        transactions: lastTransactions,
      };
    } else {
      return lastSolution;
    }
  }

  for (let i = 0; i < transactions.length; i++) {
    const row: Array<PrioriMemo> = [];
    for (let latency = 1; latency <= totalTime; latency++) {
      row.push(getSolution(i, latency));
    }
    memo.push(row);
  }

  // The right-bottom-corner cell of the grid contains the final solution for the whole problem.
  const lastRow: Array<PrioriMemo> = memo[memo.length - 1];
  return lastRow[lastRow.length - 1];
}
