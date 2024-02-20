import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [frequency, setFrequency] = useState('');
  const [keywords, setKeywords] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('segundos'); // Unidade de frequência padrão

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/search', {
        location,
        frequency,
        keywords,
        frequencyUnit // Enviando a unidade de frequência junto com os outros dados
      });
      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Configurações de Busca no Google</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left' }}>
        <label style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>Localização:</span><br />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ fontSize: '16px' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>Palavras-chave:</span><br />
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} style={{ fontSize: '16px' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          <span style={{ fontSize: '18px' }}>Frequência:</span><br />
          <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} style={{ fontSize: '16px' }} />
          <select value={frequencyUnit} onChange={(e) => setFrequencyUnit(e.target.value)} style={{ fontSize: '16px', marginLeft: '10px' }}>
            <option value="segundos">Segundos</option>
            <option value="minutos">Minutos</option>
            <option value="horas">Horas</option>
            <option value="dias">Dias</option>
          </select>
        </label>
        <button type="submit" style={{ fontSize: '18px', marginTop: '20px' }}>Pesquisar</button>
      </form>
    </div>
  );
}

export default App;



