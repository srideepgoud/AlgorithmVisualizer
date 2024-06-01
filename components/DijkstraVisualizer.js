import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Dimensions } from 'react-native';
import GraphDrawing from './GraphDrawing';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DijkstraVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [shortestPaths, setShortestPaths] = useState([]);

  const handleGraphDrawn = (nodes, edges) => {
    setNodes(nodes);
    setEdges(edges);
    visualizeDijkstra(nodes, edges);
  };

  const visualizeDijkstra = (nodes, edges) => {
    const distances = {};
    const previous = {};
    const pq = [];

    nodes.forEach(node => {
      distances[node.id] = Infinity;
      previous[node.id] = null;
    });

    distances[0] = 0;
    pq.push({ id: 0, distance: 0 });

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      const currentNode = pq.shift().id;

      edges.forEach(edge => {
        if (edge.from === currentNode) {
          const distance = distances[currentNode] + edge.weight;
          if (distance < distances[edge.to]) {
            distances[edge.to] = distance;
            previous[edge.to] = currentNode;
            pq.push({ id: edge.to, distance });
          }
        }
      });
    }

    const paths = [];
    nodes.forEach(node => {
      if (previous[node.id] !== null) {
        paths.push({
          from: previous[node.id],
          to: node.id,
          weight: distances[node.id] - distances[previous[node.id]],
        });
      }
    });

    setShortestPaths(paths);
  };

  return (
    <View style={styles.container}>
      <GraphDrawing onGraphDrawn={handleGraphDrawn} />
      <Svg height={screenHeight} width={screenWidth}>
        {shortestPaths.map((path, index) => {
          const fromNode = nodes.find((node) => node.id === path.from);
          const toNode = nodes.find((node) => node.id === path.to);
          return (
            <Line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="red"
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
          />
        ))}
        {nodes.map((node, index) => (
          <SvgText
            key={index}
            x={node.x}
            y={node.y}
            fill="white"
            fontSize="12"
            textAnchor="middle"
            dy=".3em"
          >
            {node.id}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DijkstraVisualizer;
