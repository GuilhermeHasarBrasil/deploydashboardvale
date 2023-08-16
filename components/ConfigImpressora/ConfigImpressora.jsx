import { useEffect, useState } from 'react';

export default function PrinterSettings() {
  const [printer, setPrinter] = useState({
    ip: '',
    port: ''
  });

  // Carregar os dados do localStorage ao carregar o componente
  useEffect(() => {
    const storedPrinter = JSON.parse(localStorage.getItem('printer'));
    if (storedPrinter) {
      setPrinter(storedPrinter);
    }
  }, []);

  // Salvar os dados no localStorage quando o objeto 'printer' for alterado
  useEffect(() => {
    localStorage.setItem('printer', JSON.stringify(printer));
  }, [printer]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPrinter((prevPrinter) => ({
      ...prevPrinter,
      [name]: value
    }));
  };

  useEffect(() => {
    localStorage.setItem('printer', JSON.stringify(printer));
  }, [printer]);
  

  useEffect(() => {
    localStorage.getItem('printer', JSON.stringify(printer));
    console.log('Valores salvos no localStorage:', JSON.stringify(printer));
  }, [printer]);

  return (
    <div>
      <h1>Configurações da Impressora</h1>
      <label>
        IP:
        <input
          type="text"
          name="ip"
          value={printer.ip}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Porta:
        <input
          type="text"
          name="port"
          value={printer.port}
          onChange={handleInputChange}
        />
      </label>
      <br />
    </div>
  );
}
