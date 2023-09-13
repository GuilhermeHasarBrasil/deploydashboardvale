import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomHorizontalBarChart = ({ data, maxValue, menuBig }) => {
  return (
    <BarChart width={menuBig ? 1100 : 1300} height={data.length * 50 + 250} data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, maxValue]} /> {/* Defina o domínio do eixo X */}
      <YAxis dataKey="name" type="category" width={120} />
      <Tooltip />
      <Legend />
      <Bar dataKey="processed" fill="#008f83" name="Processados" />
      <Bar dataKey="total" fill="#ef3a25" name="Total" />
    </BarChart>
  );
};

export default CustomHorizontalBarChart;
