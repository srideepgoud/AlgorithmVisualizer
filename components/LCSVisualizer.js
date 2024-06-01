import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';

const LCSVisualizer = () => {
  const [seq1, setSeq1] = useState('');
  const [seq2, setSeq2] = useState('');
  const [dpTable, setDpTable] = useState([]);

  const calculateLCS = () => {
    const m = seq1.length;
    const n = seq2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (seq1[i - 1] === seq2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    setDpTable(dp);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter first sequence"
        value={seq1}
        onChangeText={setSeq1}
        style={{ marginBottom: 10, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        placeholder="Enter second sequence"
        value={seq2}
        onChangeText={setSeq2}
        style={{ marginBottom: 20, padding: 10, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button title="Calculate LCS" onPress={calculateLCS} />
      <Svg height="500" width="500">
        {dpTable.map((row, i) =>
          row.map((cell, j) => (
            <React.Fragment key={`${i}-${j}`}>
              <Rect
                x={j * 40}
                y={i * 40}
                width="40"
                height="40"
                stroke="black"
                fill={cell > 0 ? 'lightgreen' : 'white'}
              />
              <SvgText x={j * 40 + 20} y={i * 40 + 25} fontSize="16" fill="black" textAnchor="middle">
                {cell}
              </SvgText>
            </React.Fragment>
          ))
        )}
      </Svg>
    </ScrollView>
  );
};

export default LCSVisualizer;
