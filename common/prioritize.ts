import { Transaction } from "./types";

export async function prioritize(
  transactions: Array<Transaction>,
  totalTime: number = 1000
): Promise<Array<Transaction>> {
  totalTime = totalTime < 0 || totalTime > 1000 ? 1000 : totalTime;
  console.log("Total Time:", totalTime);

  return [];
}
