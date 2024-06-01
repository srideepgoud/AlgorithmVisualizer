import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const KnapsackVisualizer = () => {
  const [capacity, setCapacity] = useState(0);
  const [items, setItems] = useState([]);
  const [solution, setSolution] = useState([]);

  const handleCapacityChange = (value) => {
    setCapacity(parseInt(value));
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = parseInt(value);
    setItems(newItems);
  };

  const handleAddItem = () => {
    const newItems = [...items, 0];
    setItems(newItems);
  };

  const solveKnapsack = () => {
    const n = items.length;
    if (n === 0 || capacity === 0) {
      console.log('No items or capacity provided.');
      return;
    }

    const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (items[i - 1] <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], items[i - 1] + dp[i - 1][w - items[i - 1]]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    let res = dp[n][capacity];
    const selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0 && res > 0; i--) {
      if (res !== dp[i - 1][w]) {
        selectedItems.push(items[i - 1]); // Push the weight of the selected item, not the index
        res -= items[i - 1];
        w -= items[i - 1];
      }
    }

    console.log('Selected items:', selectedItems);
    setSolution(selectedItems.reverse()); // Reverse the selected items array before setting it to state
  };

  return (
    <View>
      <Text>Knapsack Problem Visualizer</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        keyboardType="numeric"
        onChangeText={handleCapacityChange}
        value={capacity.toString()}
        placeholder="Knapsack Capacity"
      />
      {items.map((item, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            keyboardType="numeric"
            onChangeText={(value) => handleItemChange(index, value)}
            value={item ? item.toString() : ''}
            placeholder={`Item ${index + 1}`}
          />
        </View>
      ))}
      <Button onPress={handleAddItem} title="Add Item" />
      <Button onPress={solveKnapsack} title="Solve Knapsack" />
      {solution.length > 0 && (
        <View>
          <Text>Selected Items:</Text>
          <Text>{solution.join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

export default KnapsackVisualizer;
