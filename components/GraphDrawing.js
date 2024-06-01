import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Button } from 'react-native';
import Svg, { Circle, Line, Text } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GraphDrawing = ({ onGraphDrawn }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [drawingEdge, setDrawingEdge] = useState(null);

  const handleTouch = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setNodes([...nodes, { x: locationX, y: locationY, id: nodes.length }]);
  };

  const handleDrawEdge = (node) => {
    if (drawingEdge) {
      setEdges([...edges, { from: drawingEdge.id, to: node.id, weight: Math.floor(Math.random() * 10) + 1 }]);
      setDrawingEdge(null);
    } else {
      setDrawingEdge(node);
    }
  };

  const handleVisualize = () => {
    onGraphDrawn(nodes, edges);
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setDrawingEdge(null);
  };

  return (
    <View style={styles.container}>
      <Svg height={screenHeight} width={screenWidth} onPress={handleTouch}>
        {edges.map((edge, index) => {
          const fromNode = nodes.find((node) => node.id === edge.from);
          const toNode = nodes.find((node) => node.id === edge.to);
          return (
            <Line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}
        {nodes.map((node, index) => (
          <Circle
            key={index}
            cx={node.x}
            cy={node.y}
            r="20"
            fill="blue"
            onPress={() => handleDrawEdge(node)}
          />
        ))}
        {nodes.map((node, index) => (
          <Text
            key={index}
            x={node.x}
            y={node.y}
            fill="white"
            fontSize="12"
            textAnchor="middle"
            dy=".3em"
          >
            {node.id}
          </Text>
        ))}
      </Svg>
      <Button title="Visualize Dijkstra's Algorithm" onPress={handleVisualize} />
      <Button title="Reset Graph" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GraphDrawing;
