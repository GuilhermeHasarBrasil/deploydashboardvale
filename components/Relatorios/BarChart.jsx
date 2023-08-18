import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const CustomBarChart = ({ data }) => (
  <BarChart width={1500} height={650} data={data}> {/* Aumente o valor de width */}
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="id" />
    <YAxis>
      <Label value="Segundos" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontWeight:'bold', fontSize:20 }} />
    </YAxis>
    <Tooltip />
    <Legend />
    <Bar dataKey="Tempo (segundos)" fill="#008F83" />
  </BarChart>
);

export default CustomBarChart;
