/* eslint-disable */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

function roundUp(value) {
  const roundedValue = Math.ceil(value);
  return Math.max(roundedValue, 1); // Garante que o mínimo seja 1
}

const CustomBarChart = ({ data, menuBig }) => (
  <BarChart width={menuBig? 1100 : 1300} height={450} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="caixa">
    </XAxis>
    <YAxis domain={[0, dataMax => roundUp(dataMax)]}>
      <Label value="Tempo (minutos)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 20 }} />
    </YAxis>
    <Tooltip content={CustomTooltip} />
    {/* <Legend /> */}
    <Bar dataKey="Tempo (segundos)" fill="#008F83" />
  </BarChart>
);


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: 'white', border: '1px solid #ccc', padding: '10px', fontSize: '14px' }}>
        <p><strong>Furo:</strong> {data.id}</p>
        <p><strong>Tempo:</strong> {data['Tempo']}</p>
        <p><strong>Caixa:</strong> {data.caixa}</p>
        <p><strong>Usuário:</strong> {data.user}</p> {/* Exibir o nome do usuário */}
      </div>
    );
  }
  return null;
}

export default CustomBarChart;
