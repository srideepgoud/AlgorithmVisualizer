const knapsack = (maxWeight, itemsList) => {
    const N = itemsList.length;
    // Initialize DP array
    const DP = new Array(N + 1);
    for (let i = 0; i <= N; i++) {
      DP[i] = new Array(maxWeight + 1).fill(0);
    }
  
    // Implement the 0/1 Knapsack algorithm
    for (let i = 1; i <= N; i++) {
      const weight = itemsList[i - 1].weight;
      const value = itemsList[i - 1].value;
      for (let j = 1; j <= maxWeight; j++) {
        if (weight <= j) {
          DP[i][j] = Math.max(DP[i - 1][j], value + DP[i - 1][j - weight]);
        } else {
          DP[i][j] = DP[i - 1][j];
        }
      }
    }
  
    // Return the maximum value that can be obtained
    return DP[N][maxWeight];
  };
  
  export default knapsack;
  