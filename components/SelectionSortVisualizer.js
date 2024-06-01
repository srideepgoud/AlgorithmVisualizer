import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';

const SelectionSortVisualizer = () => {
  const [inputArray, setInputArray] = useState('');
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleChange = (text) => {
    setInputArray(text);
  };

  const selectionSort = () => {
    const newArray = inputArray.split(',').map(item => parseInt(item.trim(), 10));
    setArray(newArray);
    setSortedArray([]);
    setSteps([]);
    setCurrentIndex(-1);

    let arr = [...newArray];
    let n = arr.length;
    let steps = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          arr: [...arr],
          currentIndex: [minIndex, j],
          swapInfo: `Compare ${arr[minIndex]} and ${arr[j]}. No swap: [${arr.join(', ')}]`,
        });

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        steps.push({
          arr: [...arr],
          currentIndex: [i, minIndex],
          swapInfo: `Swap ${arr[minIndex]} and ${arr[i]}: [${arr.join(', ')}]`,
        });
      }

      steps.push({
        arr: [...arr],
        currentIndex: [],
        swapInfo: `Pass ${i + 1} completed: [${arr.join(', ')}]`,
      });
    }

    setSteps(steps);
    setSortedArray(arr);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    setInputArray('');
    setArray([]);
    setSortedArray([]);
    setSteps([]);
    setCurrentIndex(-1);
  };

  const generateBarColor = (index) => {
    const colors = ['#2196F3', '#4CAF50', '#FF5722', '#9C27B0', '#00BCD4', '#8BC34A', '#E91E63'];
    return colors[index % colors.length];
  };

  const barWidth = 300 / Math.max(array.length, 1); // Dynamic bar width based on array length

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Selection Sort Visualizer</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputArray}
          onChangeText={handleChange}
          placeholder="Enter numbers separated by commas"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.controls}>
        <Button title="Sort" onPress={selectionSort} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      <View style={styles.controls}>
        <Button title="Previous" onPress={handlePrevious} disabled={currentIndex <= 0} />
        <Button title="Next" onPress={handleNext} disabled={currentIndex >= steps.length - 1} />
      </View>
      <View style={styles.visualization}>
        {steps.length > 0 && currentIndex >= 0 &&
          steps[currentIndex].arr.map((value, index) => (
            <View key={index} style={styles.barContainer}>
              <Text style={styles.barLabel}>{value}</Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(value / Math.max(...array)) * 100}%`,
                    width: barWidth,
                    backgroundColor: generateBarColor(index),
                    borderWidth: steps[currentIndex].currentIndex.includes(index) ? 2 : 0,
                    borderColor: steps[currentIndex].currentIndex.includes(index) ? 'black' : 'transparent',
                  },
                ]}
              />
            </View>
          ))}
      </View>
      <View>
        {steps.slice(0, currentIndex + 1).map((step, index) => (
          <Text key={index} style={styles.swapInfo}>{step.swapInfo}</Text>
        ))}
      </View>
      <Text style={styles.result}>{`Sorted Array: [${sortedArray.join(', ')}]`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  visualization: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
    height: 200, // Adjust height as needed
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  swapInfo: {
    fontSize: 16,
    color: 'red',
    marginVertical: 2,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default SelectionSortVisualizer;
