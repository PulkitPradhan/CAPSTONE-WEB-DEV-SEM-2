import React, { useState, useContext } from 'react';
import { PortfolioContext } from '../App';
import { useNavigate } from 'react-router-dom';

const POPULAR_ASSETS = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
  { id: 'sol', name: 'Solana', symbol: 'SOL' },
  { id: 'xrp', name: 'XRP', symbol: 'XRP' },
  { id: 'usdc', name: 'USDC', symbol: 'USDC' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB' },
];

export default function PortfolioForm() {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const navigate = useNavigate();

  const [selectedAsset, setSelectedAsset] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!selectedAsset || !amount) return;
    const newAsset = { id: Date.now(), name: selectedAsset, amount: parseFloat(amount) };
    setPortfolio([...portfolio, newAsset]);
    navigate('/portfolio'); 
  };

  return (
    <div className="max-w-xl mx-auto p-12 mt-12 bg-black border border-white/10 rounded-xl">
      <h2 className="text-xl font-light text-white mb-10 tracking-tight">Add Asset</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#666666] mb-4">
            Select Asset
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {POPULAR_ASSETS.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectedAsset(asset.name)}
                className={`p-4 text-left border transition-all duration-300
                  ${selectedAsset === asset.name 
                    ? 'border-white bg-white/5' 
                    : 'border-white/10 hover:border-white/30 bg-transparent'
                  }
                `}
              >
                <div className={`text-sm font-medium ${selectedAsset === asset.name ? 'text-white' : 'text-[#666666]'}`}>
                  {asset.name}
                </div>
                <div className="text-[10px] text-[#444444] uppercase">{asset.symbol}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-[#666666] mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none text-white transition-all placeholder:text-[#333333]"
            placeholder="0.00"
            step="any"
          />
        </div>

        <button 
          type="submit" 
          disabled={!selectedAsset || !amount}
          className="mt-6 w-full py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}