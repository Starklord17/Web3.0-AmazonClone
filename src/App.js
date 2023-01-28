import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

// ABIs
import Dappazon from "./abis/Dappazon.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  
  const loadBlockchainData = async () => {
    // Connect to blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    // Connect to smart contracts (Create JS Versions)
    
    // Load products
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}/>

      <h2>Dappazon Best Sellers</h2>

    </div>
  );
}

export default App;
