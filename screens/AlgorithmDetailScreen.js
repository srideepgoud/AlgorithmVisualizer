import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import LCSVisualizer from '../components/LCSVisualizer';
import KnapsackVisualizer from '../components/KnapsackVisualizer';
import BubbleSortVisualizer from '../components/BubbleSortVisualizer';
import InsertionSortVisualizer from '../components/InsertionSortVisualizer';
import SelectionSortVisualizer from '../components/SelectionSortVisualizer';
import MergeSortVisualizer from '../components/MergeSortVisualizer';
import DijkstraVisualizer from '../components/DijkstraVisualizer';
const AlgorithmDetailScreen = ({ route }) => {
  const { screen } = route.params;
  const [activeSection, setActiveSection] = useState('visualizer');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const openExternalLink = (url) => {
    Linking.openURL(url);
  };

  const getDescription = (screen) => {
    switch (screen) {
      case 'LCSVisualizer':
        return {
          description: 'Longest Common Subsequence (LCS) is a classic algorithm problem in computer science. It involves finding the longest subsequence that appears in both given sequences (strings).',
          example: 'Example:\n\nInput:\nString 1: "ABCDGH"\nString 2: "AEDFHR"\n\nOutput:\nLength of LCS is 3. LCS are "ADH".',
          links: [{ title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Longest_common_subsequence_problem' }],
        };
      case 'KnapsackVisualizer':
        return {
          description: 'The Knapsack problem is a famous problem in combinatorial optimization. It involves a knapsack (or backpack) that has a maximum weight capacity. The goal is to determine which items to put into the knapsack so that the total weight is less than or equal to the capacity, and the total value is maximized.',
          example: 'Example:\n\nInput:\nCapacity: 50\nItem weights: [10, 20, 30]\nItem values: [60, 100, 120]\n\nOutput:\nMaximum value: 220\nItems included: [2, 3]',
          links: [{ title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Knapsack_problem' }],
        };
      case 'BubbleSortVisualizer':
        return {
          description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
          example: 'Example:\n\nInput:\nArray: [64, 34, 25, 12, 22, 11, 90]\n\nOutput:\nSorted Array: [11, 12, 22, 25, 34, 64, 90]',
          links: [],
        };
      default:
        return {
          description: '',
          example: '',
          links: [],
        };
    }
  };

  const { description, example, links } = getDescription(screen);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleSection('visualizer')}>
        <Text style={styles.sectionTitle}>Visualizer</Text>
      </TouchableOpacity>
      {activeSection === 'visualizer' && (
        <View style={styles.sectionContent}>
          {screen === 'LCSVisualizer' && <LCSVisualizer />}
          {screen === 'KnapsackVisualizer' && <KnapsackVisualizer />}
          {screen === 'BubbleSortVisualizer' && <BubbleSortVisualizer />}
          {screen === 'InsertionSortVisualizer' && <InsertionSortVisualizer />}
          {screen === 'SelectionSortVisualizer' && <SelectionSortVisualizer />}
          {screen === 'MergeSortVisualizer' && <MergeSortVisualizer />}
          {screen === 'QuickSortVisualizer' && <QuickSortVisualizer />}
          {screen === 'DijkstraVisualizer' && <DijkstraVisualizer />}
        </View>
      )}

      <TouchableOpacity onPress={() => toggleSection('description')}>
        <Text style={styles.sectionTitle}>Description</Text>
      </TouchableOpacity>
      {activeSection === 'description' && (
        <View style={styles.sectionContent}>
          <Text>{description}</Text>
        </View>
      )}

      <TouchableOpacity onPress={() => toggleSection('example')}>
        <Text style={styles.sectionTitle}>Example</Text>
      </TouchableOpacity>
      {activeSection === 'example' && (
        <View style={styles.sectionContent}>
          <Text>{example}</Text>
        </View>
      )}

      {links.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>External Links</Text>
          {links.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => openExternalLink(link.url)}>
              <Text style={styles.link}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AlgorithmDetailScreen;
