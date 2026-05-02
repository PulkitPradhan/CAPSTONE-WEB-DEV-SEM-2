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

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAsset || !amount) return;

    const newAsset = { 
      id: Date.now(), 
      name: selectedAsset.name, 
      amount: parseFloat(amount) 
    };
    
    setPortfolio([...portfolio, newAsset]);
    navigate('/portfolio');
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl">
        <h2 className="text-sm font-medium text-white mb-8 tracking-widest uppercase">Add Asset</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#666666] mb-4">
              Select Asset
            </label>
            <div className="grid grid-cols-2 gap-3">
              {POPULAR_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => setSelectedAsset(asset)}
                  className={`p-4 border transition-all duration-300 ${
                    selectedAsset?.id === asset.id 
                    ? 'border-white bg-white/5' 
                    : 'border-white/5 hover:border-white/20 bg-transparent'
                  }`}
                >
                  <div className={`text-xs font-medium ${selectedAsset?.id === asset.id ? 'text-white' : 'text-[#666666]'}`}>
                    {asset.name}
                  </div>
                  <div className="text-[9px] text-[#444444] uppercase tracking-wider">{asset.symbol}</div>
                </button>
              ))}
            </div>
          </div>
]
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#666666] mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-white outline-none transition-all placeholder:text-[#333333] text-sm"
              placeholder="0.00"
              step="any"
            />
          </div>

          <button 
            type="submit" 
            disabled={!selectedAsset || !amount}
            className="w-full py-3 border border-white/10 text-[#666666] hover:text-white hover:border-white text-[10px] uppercase tracking-widest transition-all duration-300 disabled:opacity-20 disabled:hover:border-white/10"
          >
            Confirm Transaction
          </button>
        </form>
      </div>
    </div>
  );
}