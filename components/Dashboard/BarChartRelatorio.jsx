import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, Line, ComposedChart } from 'recharts';

function roundUp(value) {
  const roundedValue = Math.ceil(value);
  return Math.max(roundedValue, 1); // Garante que o mínimo seja 1
}

const CustomBarChart = ({ data, menuBig }) => {

  const [chartHeight, setChartHeight] = useState(450);
  const [chartWidth, setChartWidth] = useState(menuBig ? 1100 : 1300);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(menuBig ? window.screen.width - 820 : window.screen.width + 200); // Ajuste o tamanho conforme necessário
    };

    const handleResizeHeights = () => {
      setChartHeight(window.screen.height);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResizeHeights)

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResizeHeights)
    };
  }, [menuBig]);


  return (
    <ComposedChart
      width={window.screen.width > 1900 ?
        menuBig ? 1150 : 1400
        :
        window.screen.width > 1580 ?
        menuBig ? 800 : 1000
        :
        menuBig ? 650 : 800
      }
      height={window.screen.width > 1900 ?
        520
        :
        window.screen.width > 1580 ?
        480
        :
        340
      }
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="caixa">
        <Label
          value="Caixas "
          position="left"
          style={{
            textAnchor: 'middle',
            fontWeight: 'bold',
            fontSize: 20,
            marginLeft: 15 // Adicionando margem de 15 pixels à esquerda
          }}
          dy={20} // Ajustando a altura da legenda
        />
      </XAxis>

      <YAxis domain={[0, dataMax => roundUp(dataMax + 1)]}>
        <Label value="Tempo (minutos)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontWeight: 'bold', fontSize: 20 }} />
      </YAxis>
      <Legend width={100} wrapperStyle={{ top: 0, right: 0, backgroundColor: 'rgba(245, 245, 245, 0)', borderRadius: 3, lineHeight: '40px' }} />
      <Tooltip content={CustomTooltip} />
      <Bar dataKey="Tempo " fill="#008F83" >
      </Bar>
      <Line type="monotone" dataKey="Tempo " stroke="#ff7300" />

    </ComposedChart>
  );
};

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
};

export default CustomBarChart;
