// Once you fill the placeholders the app should render properly after that you have to fix the interfacing with the smart contract itself

import React from 'react';
import './App.css';
import NameService from './NameService';

function App() {
  return (
    <div className="App">
      <NameService contractAddress="<programID>" walletKeyPair="walletAddr (from what I understood in the docs)" />
    </div>
  );
}

export default App;

