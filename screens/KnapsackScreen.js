import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const KnapsackScreen = ({ navigation }) => {
  const [maxWeight, setMaxWeight] = useState('');
  const [items, setItems] = useState('');
  const [itemsList, setItemsList] = useState([]);

  const handleAddItem = () => {
    const newItem = items.split(',').map(item => parseInt(item.trim()));
    setItemsList([...itemsList, newItem]);
    setItems('');
  };

  const handleSubmit = () => {
    // Navigate to the visualization screen with maxWeight and itemsList
    navigation.navigate('KnapsackVisualizer', { maxWeight, itemsList });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Max Weight"
        value={maxWeight}
        onChangeText={setMaxWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Items (weight, value, ...)"
        value={items}
        onChangeText={setItems}
      />
      <Button title="Add Item" onPress={handleAddItem} />
      <Button title="Visualize Knapsack" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
});

export default KnapsackScreen;
