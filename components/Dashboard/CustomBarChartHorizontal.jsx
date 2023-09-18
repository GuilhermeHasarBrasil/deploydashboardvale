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
        <text style={{fontWeight:'bold', fontSize:20}} x={x + width / 2} y={y - radius} fill="#131212" textAnchor="middle" dominantBaseline="middle">
          {'Percentual concluído: '+Math.round(value)+'%'}
        </text>
      </g>
    );
  };

  return (
    <BarChart
      width={window.screen.width > 1900 ? (menuBig ? chartWidth - 850 : chartWidth - 610) : (menuBig ? chartWidth - 700 : chartWidth - 600)}
      height={window.screen.width > 1900 ? data.length * 50 + 250 : data.length * 50 + 250} 
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
            x={entry.processed > 0 ? entry.processed + 5 : 5} // Adjust the position of the value within the bar
            y={index * 50 + 25} // Adjust the vertical position of the value within the bar
            fill="#fff" // Text color
            textAnchor={entry.processed > 0 ? "start" : "middle"} // Text alignment
            dy={-5} // Adjust vertical position
            style={{color:'white'}}
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
