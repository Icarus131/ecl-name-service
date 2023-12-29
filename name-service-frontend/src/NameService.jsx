import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';

const NameService = ({ contractAddress, walletKeyPair }) => {
  const [name, setName] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [names, setNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const connection = new Connection('https://api.testnet.solana.com');

  const contract = new PublicKey(contractAddress);

  const getNames = async () => {
  };

  const mintName = async () => {
    try {
      // Creating a transaction per name minted and calling mint func from our smart contract
      const transaction = new Transaction().add(
        contract.mintName(name, walletKeyPair.publicKey, walletKeyPair.publicKey),
      );
      // Sign and send the transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [walletKeyPair]);
      console.log('Mint Transaction Signature:', signature);
      getNames(); 
    }

    // Bog standard error handling

    catch (error) {
      console.error('Error minting name:', error);
      setErrorMessage('Error minting name');
    }
  };



  const transferName = async () => {
    try {
      // Create a transaction per name transfer and calling the same func from the smart contract (again, using same method as I used for the minting process)
      const transaction = new Transaction().add(
        contract.transferName(name, newOwner, walletKeyPair.publicKey),
      );

      const signature = await sendAndConfirmTransaction(connection, transaction, [walletKeyPair]);
      console.log('Transfer Transaction Signature:', signature);
      getNames();
    
    } 

    catch (error) {
      console.error('Error transferring name:', error);
      setErrorMessage('Error transferring name');
    }
  };

  useEffect(() => {
    getNames();
  }, []);




// Im just returning the basic layout and referencing the buttons

  return (
    <div>
      <h1>Name Service</h1>
      <div>
        <label>Mint Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={mintName}>Mint</button>
      </div>
      <div>
        <label>Transfer Name:</label>
        <input type="text" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
        <button onClick={transferName}>Transfer</button>
      </div>
      <div>
        {errorMessage && <p>{errorMessage}</p>}
        <h2>Names:</h2>
        <ul>
          {names.map((n, index) => (
            <li key={index}>
              Name: {n.value}, Owner: {n.owner}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NameService;

