import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Shop from './components/Shop';
import Login from './components/Login';
import Admin from './components/Admin';

const App = () => {
  const [currentPage, setCurrentPage] = useState('shop');

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <Shop setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <Admin setCurrentPage={setCurrentPage} />;
      default:
        return <Shop setCurrentPage={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
