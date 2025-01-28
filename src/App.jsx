import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";  

const CONTRACT_ADDRESS = "0xcb6ac7ca1766567e70951dfc2b9b18fc8a4067df";

function App() {
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");

  // Request accounts function
  async function requestAccounts() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        toast.success("Wallet connected successfully!");
      } catch (err) {
        toast.error(`Wallet connection failed: ${err.message}`);
      }
    } else {
      toast.warn("Please install MetaMask to use this app.");
    }
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

  async function deposit() {
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

  async function withdraw() {
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
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Maylord Payments DApp</h1>
      <button onClick={requestAccounts}>Connect Wallet</button>
      <div>
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
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
