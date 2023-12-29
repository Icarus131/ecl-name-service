
import React from 'react';
import './App.css';
import NameService from './NameService';

function App() {
  return (
    <div className="App">
      <NameService contractAddress="<programID>" walletKeyPair="walletAddr" />
    </div>
  );
}

export default App;

