import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';

const InsertionSortVisualizer = () => {
  const [inputArray, setInputArray] = useState('');
  const [array, setArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleChange = (text) => {
    setInputArray(text);
  };

  const insertionSort = () => {
    const newArray = inputArray.split(',').map(item => parseInt(item.trim(), 10));
    setArray(newArray);
    setSortedArray([]);
    setSteps([]);
    setCurrentIndex(-1);

    let arr = [...newArray];
    let steps = [];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      steps.push({
        array: [...arr],
        info: `Pass ${i}: Start with key = ${key}`,
        highlight: [i]
      });

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        steps.push({
          array: [...arr],
          info: `Moved ${arr[j]} to the right`,
          highlight: [j, j + 1]
        });
        j = j - 1;
      }
      arr[j + 1] = key;
      steps.push({
        array: [...arr],
        info: `Inserted ${key} at position ${j + 1}`,
        highlight: [j + 1]
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
      <Text style={styles.title}>Insertion Sort Visualizer</Text>
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
        <Button title="Sort" onPress={insertionSort} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      <View style={styles.controls}>
        <Button title="Previous" onPress={handlePrevious} disabled={currentIndex <= 0} />
        <Button title="Next" onPress={handleNext} disabled={currentIndex >= steps.length - 1} />
      </View>
      <View style={styles.visualization}>
        {steps.length > 0 && currentIndex >= 0 &&
          steps[currentIndex].array.map((value, index) => (
            <View key={index} style={styles.barContainer}>
              <Text style={styles.barLabel}>{value}</Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(value / Math.max(...array)) * 100}%`,
                    width: barWidth,
                    backgroundColor: generateBarColor(index),
                    borderWidth: steps[currentIndex].highlight.includes(index) ? 2 : 0,
                    borderColor: steps[currentIndex].highlight.includes(index) ? 'black' : 'transparent',
                  },
                ]}
              />
            </View>
          ))}
      </View>
      <View>
        {steps.slice(0, currentIndex + 1).map((step, index) => (
          <Text key={index} style={styles.swapInfo}>{step.info}</Text>
        ))}
      </View>
      <Text style={styles.result}>{`Sorted Array: [${sortedArray.join(', ')}]`}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  visualization: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 20,
    height: 200,
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

export default InsertionSortVisualizer;
