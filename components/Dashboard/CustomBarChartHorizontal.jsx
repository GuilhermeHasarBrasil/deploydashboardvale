import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend } from 'recharts';

const CustomHorizontalBarChart = ({ data, maxValue, menuBig }) => {

  console.log(data)
  const [chartWidth, setChartWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          style={
            {
              fontWeight: 'bold',
              fontSize: window.screen.width > 1900 ? 20 : window.screen.width > 1600 ? 18 : 0
            }
          }
          x={x + width / 2} y={y - radius} fill="#131212"
        >
          {value === 1 ? '100% concluído' : 'Percentual concluído: ' + Math.round(value.toFixed(2) * 100) + '%'}
        </text>
      </g>
    );
  };

  return (
    <BarChart
      width={window.screen.width > 1900 ? (menuBig ? chartWidth - 850 : chartWidth - 610) : window.screen.width > 1580 ? (menuBig ? chartWidth - 700 : chartWidth - 600) : (menuBig ? chartWidth - 650 : chartWidth - 500)}
      height={window.screen.width > 1900 ? data.length * 50 + 250 : window.screen.width > 1580 ? data.length * 50 + 250 : data.length * 50 + 100}
      data={data}
      layout="vertical"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" domain={[0, maxValue]} />
      <YAxis dataKey="name" type="category" width={140} fontSize={18} fontWeight={'bold'} />
      <Tooltip />
      <Bar barSize={50} dataKey="processed" fill="#008f83" name="Processados" background={{ fill: '#ef3a25' }}>
        {data.map((entry, index) => (
          <text
            key={index}
            x={entry.processed > 0 ? entry.processed + 5 : 5}
            y={index * 50 + 25}
            fill="#fff"
            textAnchor={entry.processed > 0 ? "start" : "middle"}
            dy={-5}
            style={{ color: 'white' }}
          >
            {entry.processed}
          </text>
        ))}
        <LabelList dataKey="totalteste" content={renderCustomizedLabel} />
      </Bar>
    </BarChart>
  );
};

export default CustomHorizontalBarChart;
