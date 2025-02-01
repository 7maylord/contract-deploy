import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";  

const CONTRACT_ADDRESS = "0xcb6ac7ca1766567e70951dfc2b9b18fc8a4067df";

function App() {
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  
   // Function to shorten the wallet address (e.g., 0x1234...5678)
   function shortenAddress(address) {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
  }

   // Check if wallet is already connected
   useEffect(() => {
    async function checkWalletConnection() {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    }
    checkWalletConnection();
  }, []);

  // Request accounts function
  async function requestAccounts() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        toast.success("Wallet connected successfully!");
      } catch (err) {
        toast.error(`Wallet connection failed: ${err.message}`);
      }
    } else {
      toast.warn("Please add wallet to use this app.");
    }
  }

  // Disconnect Wallet function
  function disconnectWallet() {
    setWalletAddress(null);
    setIsConnected(false);
    toast.info("Wallet disconnected.");
  }

  async function getContract(signer = false) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      return signer
        ? new ethers.Contract(CONTRACT_ADDRESS, abi, await provider.getSigner())
        : new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    } else {
      toast.error("Ethereum provider is not available.");
      return null;
    }
  }

  async function fetchBalance() {
    try {
      const contract = await getContract();
      const contractBalance = await contract.getBalance();
      setBalance(ethers.formatEther(contractBalance));
      toast.success("Balance fetched successfully!");
    } catch (err) {
      toast.error(`Failed to fetch balance: ${err.message}`);
    }
  }

  async function handleDeposit() {
    try {
      const myContract = await getContract(true);
      const tx = await myContract.deposit(ethers.parseEther(amount), {
        value: ethers.parseEther(amount),
      });
      await tx.wait();
      setAmount("");
      fetchBalance();
      toast.success("Deposit successful!");
    } catch (err) {
      toast.error(`Deposit failed: ${err.message}`);
    }
  }

  async function handleWithdraw() {
    try {
      const theContract = await getContract(true);
      const tx = await theContract.withdraw(ethers.parseEther(amount));
      await tx.wait();
      setAmount("");
      fetchBalance();
      toast.success("Withdrawal successful!");
    } catch (err) {
      toast.error(`Withdraw failed: ${err.message}`);
    }
  }

  return (
    <div className="dapp-container">
      <h1>Maylord Mini DApp</h1>
      {isConnected ? (
        <div>
          <p><strong>Connected Wallet:</strong> {shortenAddress(walletAddress)}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={requestAccounts}>Connect Wallet</button>
      )}
      <div className="balance-section">
        <h2>Balance: {balance} ETH</h2>
        <button onClick={fetchBalance}>Refresh Balance</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Enter amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
