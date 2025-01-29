## Contract Address: 0xcb6ac7ca1766567e70951dfc2b9b18fc8a4067df
## DO NOT SEND ETH TO THIS ADDRESS 
## THIS IS A SIMULATED TESTNET CONTRACT, FUNDS SENT CANNOT BE WITHDRAWN

# Maylord Mini DApp

## Overview
The **Maylord Mini DApp** is a decentralized application built on the Ethereum blockchain. It allows users to simulate **depositing and withdrawing Ether** from a smart contract deployed on the Sepolia Testnet while keeping track of their balance. The application is built using **React with Vite** for the frontend and **Ethers.js** for blockchain interactions. It leverages wallets like **MetaMask** for user authentication and transaction execution.

## Features
- **Connect Wallet:** Users can connect their MetaMask wallet to interact with the DApp.
- **View Balance:** Displays the user's balance stored in the smart contract.
- **Deposit Ether:** Allows users to deposit a specified amount of Ether into the smart contract.
- **Withdraw Ether:** Enables users to withdraw a specified amount of Ether from the smart contract.
- **Transaction Notifications:** Provides real-time feedback using **React Toastify** for success and error messages.

## Requirements
To run this DApp, ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **MetaMask** browser extension or mobile wallet
- **Ethereum testnet (e.g., Sepolia, Goerli) funds**
- **Vite** (for frontend development)
- **Ethers.js** (for blockchain interaction)

## Installation
Follow these steps to set up and run the DApp:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/7maylord/contract-deploy.git
   cd contract-deploy
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```
   This will start the Vite development server.

## Usage
1. **Open the application** in your browser at `http://localhost:5173/`.
2. **Connect wallet** by clicking the "Connect Wallet" button.
3. **Check balance** by clicking the "Refresh Balance" button.
4. **Deposit Ether**:
   - Enter the amount in the input field.
   - Click "Deposit" and confirm the transaction in MetaMask.
   - Wait for the transaction confirmation.
5. **Withdraw Ether**:
   - Enter the amount to withdraw.
   - Click "Withdraw" and confirm the transaction in MetaMask.
   - Wait for confirmation and check the updated balance.

## Smart Contract
The backend is powered by an Ethereum **smart contract** written in **Solidity**. Key functionalities include:
- **deposit(uint256 _amount):** Deposits Ether into the contract.
- **withdraw(uint256 _withdrawAmount):** Withdraws Ether from the contract.
- **getBalance():** Returns the current contract balance.

### Contract Address
```
0xcb6ac7ca1766567e70951dfc2b9b18fc8a4067df
```

## Technologies Used
- **React.js (Vite)** – Frontend framework
- **Ethers.js** – Blockchain interaction
- **Solidity** – Smart contract development
- **MetaMask** – Wallet authentication
- **React Toastify** – Notifications


## License
This project is open-source under the **MIT License**.

## Author
Developed by **[MayLord](https://github.com/7maylord)**. Feel free to contribute and improve the project!


