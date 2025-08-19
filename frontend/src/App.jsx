import { useState, useEffect } from 'react';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'https://expert-robot-g4596qvgpwg2wng-3000.app.github.dev/api/production';

  useEffect(( ) => {
    console.log("Tentando buscar dados da API...");
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`A resposta da rede não foi boa: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados recebidos com sucesso:", data);
        setOrders(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Falha ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Painel de Produção</h1>
      {loading ? (
        <p>Carregando dados do servidor...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ordem</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.ordem}>
                <td>{order.ordem}</td>
                <td>{order.produto}</td>
                <td>{order.quantidade}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
