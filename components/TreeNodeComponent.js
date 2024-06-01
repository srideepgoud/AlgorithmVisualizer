import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TreeNodeComponent = ({ node }) => {
  if (!node) return null;

  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.treeNode}>
      <Text style={styles.nodeText}>{node.value.join(', ')}</Text>
      <View style={styles.childrenContainer}>
        <TreeNodeComponent node={node.left} />
        <TreeNodeComponent node={node.right} />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  treeNode: {
    alignItems: 'center',
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  nodeText: {
    fontSize: 16,
    margin: 5,
    color: '#333',
  },
  childrenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default TreeNodeComponent;
