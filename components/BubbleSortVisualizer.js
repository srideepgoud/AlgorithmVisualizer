import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';

const BubbleSortVisualizer = () => {
  const [inputArray, setInputArray] = useState('');
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [swapInfo, setSwapInfo] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const handleChange = (text) => {
    setInputArray(text);
  };

  const validateInput = (input) => {
    const numbers = input.split(',').map(item => item.trim());
    for (let num of numbers) {
      if (isNaN(num) || num === '') {
        Alert.alert('Invalid Input', 'Please enter a valid comma-separated list of numbers.');
        return false;
      }
    }
    return true;
  };

  const bubbleSort = () => {
    if (!validateInput(inputArray)) return;

    const newArray = inputArray.split(',').map(item => parseInt(item.trim(), 10));
    setArray(newArray);
    setSortedArray([]);
    setSteps([]);
    setCurrentIndex(0);
    setSwapInfo('');
    setComparisons(0);
    setSwaps(0);

    let arr = [...newArray];
    let n = arr.length;
    let steps = [];
    let comparisonsCount = 0;
    let swapsCount = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisonsCount++;
        steps.push({
          arr: [...arr],
          currentIndex: [j, j + 1],
          swapInfo: `Comparing ${arr[j]} and ${arr[j + 1]}`,
          explanation: `Comparing elements at index ${j} and ${j + 1}.`,
          comparisons: comparisonsCount,
          swaps: swapsCount
        });

        if (arr[j] > arr[j + 1]) {
          swapsCount++;
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          steps.push({
            arr: [...arr],
            currentIndex: [j, j + 1],
            swapInfo: `Swapping ${arr[j]} and ${arr[j + 1]}: [${arr.join(', ')}]`,
            explanation: `Swapping elements ${arr[j]} and ${arr[j + 1]} because ${arr[j]} > ${arr[j + 1]}.`,
            comparisons: comparisonsCount,
            swaps: swapsCount
          });
        }
      }
      steps.push({
        arr: [...arr],
        currentIndex: [],
        swapInfo: `Pass ${i + 1} completed: [${arr.join(', ')}]`,
        explanation: `Pass ${i + 1} completed, largest element moved to its correct position.`,
        comparisons: comparisonsCount,
        swaps: swapsCount
      });
    }

    setSteps(steps);
    setSortedArray(arr);
    setCurrentIndex(0);
    setRunning(true);
  };

  useEffect(() => {
    if (running) {
      const id = setInterval(() => {
        if (currentIndex < steps.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setSwapInfo(steps[currentIndex + 1].swapInfo || '');
          setComparisons(steps[currentIndex + 1].comparisons);
          setSwaps(steps[currentIndex + 1].swaps);
        } else {
          clearInterval(id);
          setRunning(false);
          setSwapInfo('Sorting completed!');
        }
      }, speed);

      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [currentIndex, running, steps, speed]);

  const handlePlayPause = () => {
    if (running) {
      clearInterval(intervalId);
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSwapInfo(steps[currentIndex + 1].swapInfo || '');
      setComparisons(steps[currentIndex + 1].comparisons);
      setSwaps(steps[currentIndex + 1].swaps);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSwapInfo(steps[currentIndex - 1].swapInfo || '');
      setComparisons(steps[currentIndex - 1].comparisons);
      setSwaps(steps[currentIndex - 1].swaps);
    }
  };

  const handleReset = () => {
    setInputArray('');
    setArray([]);
    setSortedArray([]);
    setSteps([]);
    setCurrentIndex(0);
    setRunning(false);
    setSwapInfo('');
    setComparisons(0);
    setSwaps(0);
    clearInterval(intervalId);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (running) {
      clearInterval(intervalId);
      setRunning(true);
    }
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const randomArray = Array.from({ length }, () => Math.floor(Math.random() * 100));
    setInputArray(randomArray.join(', '));
  };

  const generateNearlySortedArray = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const sortedArray = Array.from({ length }, (_, i) => i + 1);
    const swaps = Math.floor(length / 4);
    for (let i = 0; i < swaps; i++) {
      const idx1 = Math.floor(Math.random() * length);
      let idx2 = Math.floor(Math.random() * length);
      while (idx1 === idx2) idx2 = Math.floor(Math.random() * length);
      [sortedArray[idx1], sortedArray[idx2]] = [sortedArray[idx2], sortedArray[idx1]];
    }
    setInputArray(sortedArray.join(', '));
  };

  const generateReverseSortedArray = () => {
    const length = Math.floor(Math.random() * 10) + 5;
    const reverseSortedArray = Array.from({ length }, (_, i) => length - i);
    setInputArray(reverseSortedArray.join(', '));
  };

  const generateBarColor = (index) => {
    const colors = ['#2196F3', '#4CAF50', '#FF5722', '#9C27B0', '#00BCD4', '#8BC34A', '#E91E63'];
    return colors[index % colors.length];
  };

  const barWidth = 300 / Math.max(array.length, 1); // Dynamic bar width based on array length

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Bubble Sort Visualizer</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputArray}
          onChangeText={handleChange}
          placeholder="Enter numbers separated by commas"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.arrayGeneration}>
        <Button title="Generate Random Array" onPress={generateRandomArray} />
      </View>
      <View style={styles.arrayGeneration}>
        <Button title="Generate Nearly Sorted Array" onPress={generateNearlySortedArray} />
      </View>
      <View style={styles.arrayGeneration}>
        <Button title="Generate Reverse Sorted Array" onPress={generateReverseSortedArray} />
      </View>
      <View style={styles.controls}>
        <Button title="Sort" onPress={bubbleSort} />
        <Button title={running ? "Pause" : "Play"} onPress={handlePlayPause} />
        <Button title="Next" onPress={handleNext} disabled={running} />
        <Button title="Previous" onPress={handlePrevious} disabled={running} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      <View style={styles.speedControls}>
        <Text>Speed:</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={100}
          maximumValue={2000}
          step={100}
          value={speed}
          onValueChange={handleSpeedChange}
        />
        <Text>{`${speed} ms`}</Text>
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
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.swapInfo}>{step.swapInfo}</Text>
            <Text style={styles.explanation}>{step.explanation}</Text>
            <Text style={styles.counters}>Comparisons: {step.comparisons}, Swaps: {step.swaps}</Text>
          </View>
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
  arrayGeneration: {
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  speedControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
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
  stepContainer: {
    marginBottom: 20,
  },
  swapInfo: {
    fontSize: 16,
    color: 'red',
    marginVertical: 2,
  },
  explanation: {
    fontSize: 14,
    fontStyle: 'italic',
    marginVertical: 2,
  },
  counters: {
    fontSize: 14,
    marginVertical: 2,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default BubbleSortVisualizer;
