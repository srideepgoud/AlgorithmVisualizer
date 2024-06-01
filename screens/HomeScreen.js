// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AlgorithmCard from '../components/AlgorithmCard'; // Import the AlgorithmCard component

const algorithms = [
  { name: 'Longest Common Subsequence', screen: 'LCSVisualizer' },
  { name: 'Knapsack Problem', screen: 'KnapsackVisualizer' },
  { name: 'Bubble Sort', screen: 'BubbleSortVisualizer' },
  { name: 'Insertion Sort', screen: 'InsertionSortVisualizer' },
  { name: 'Selection Sort', screen: 'SelectionSortVisualizer' },
  { name: 'Merge Sort', screen: 'MergeSortVisualizer' },
  { name: 'Dijkstra Algorithm', screen: 'DijkstraVisualizer' },
  // Add other algorithms here
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Algorithm Visualizer</Text>
      <FlatList
        data={algorithms}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <AlgorithmCard
            algorithm={item}
            onPress={() => navigation.navigate('AlgorithmDetail', { screen: item.screen })}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
