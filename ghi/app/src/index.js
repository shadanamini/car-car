import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadSales() {
  const response = await fetch('http://localhost:8090/api/sales/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App sales={data.sales} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}
loadSales();
reportWebVitals()