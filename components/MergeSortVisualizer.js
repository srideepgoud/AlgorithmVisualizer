import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import TreeNodeComponent from './TreeNodeComponent';

const TreeNode = (value, left = null, right = null) => ({
  value,
  left,
  right,
});

const MergeSortVisualizer = () => {
  const [inputArray, setInputArray] = useState('');
  const [root, setRoot] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const handleChange = (text) => {
    setInputArray(text);
  };

  const mergeSort = () => {
    const newArray = inputArray.split(',').map(item => parseInt(item.trim(), 10));
    const steps = [];
    const root = mergeSortHelper(newArray, 0, newArray.length - 1, steps);
    setRoot(root);
    setSteps(steps);
    setCurrentIndex(0);
    setRunning(true);
  };

  const mergeSortHelper = (arr, left, right, steps) => {
    if (left >= right) {
      const node = TreeNode([arr[left]]);
      steps.push(node);
      return node;
    }

    const mid = Math.floor((left + right) / 2);
    const leftNode = mergeSortHelper(arr, left, mid, steps);
    const rightNode = mergeSortHelper(arr, mid + 1, right, steps);
    const merged = merge(arr, left, mid, right, leftNode, rightNode, steps);

    const node = TreeNode(arr.slice(left, right + 1), leftNode, rightNode);
    steps.push(node);
    return node;
  };

  const merge = (arr, left, mid, right, leftNode, rightNode, steps) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }
    }

    while (i < leftArr.length) {
      arr[k++] = leftArr[i++];
    }

    while (j < rightArr.length) {
      arr[k++] = rightArr[j++];
    }
  };

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setRunning(false);
            return prev;
          }
        });
      }, speed);
    }
    return () => clearInterval(intervalId);
  }, [running, steps, speed]);

  const handlePlayPause = () => {
    setRunning((prev) => !prev);
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
    setRoot(null);
    setSteps([]);
    setCurrentIndex(0);
    setRunning(false);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Merge Sort Visualizer</Text>
      <TextInput
        style={styles.input}
        value={inputArray}
        onChangeText={handleChange}
        placeholder="Enter numbers separated by commas"
        keyboardType="numeric"
      />
      <View style={styles.controls}>
        <Button title="Sort" onPress={mergeSort} />
        <Button title={running ? "Pause" : "Play"} onPress={handlePlayPause} />
        <Button title="Next" onPress={handleNext} disabled={running || currentIndex >= steps.length - 1} />
        <Button title="Previous" onPress={handlePrevious} disabled={running || currentIndex <= 0} />
        <Button title="Reset" onPress={handleReset} />
      </View>
      <Text>Speed:</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={500}
        maximumValue={2000}
        step={500}
        value={speed}
        onValueChange={handleSpeedChange}
      />
      <Text>{`Current speed: ${speed} ms`}</Text>
      <View style={styles.treeContainer}>
        {root && <TreeNodeComponent node={steps[currentIndex]} />}
      </View>
      <View style={styles.pseudocodeContainer}>
        <Text style={styles.pseudocodeTitle}>Merge Sort Pseudocode</Text>
        <Text style={styles.pseudocodeText}>
          {`
          function mergeSort(arr):
            if length of arr <= 1:
              return arr
            mid = length of arr / 2
            left = mergeSort(arr[0:mid])
            right = mergeSort(arr[mid:end])
            return merge(left, right)

          function merge(left, right):
            result = []
            while left and right are not empty:
              if left[0] <= right[0]:
                append left[0] to result
                remove left[0] from left
              else:
                append right[0] to result
                remove right[0] from right
            append remaining elements of left and right to result
            return result
          `}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  treeContainer: {
    alignItems: 'center',
    width: '100%',
  },
  pseudocodeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  pseudocodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pseudocodeText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'monospace',
  },
});

export default MergeSortVisualizer;