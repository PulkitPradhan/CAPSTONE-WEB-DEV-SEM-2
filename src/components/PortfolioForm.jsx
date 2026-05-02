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

    const newAsset = { 
      id: Date.now(), 
      name: selectedAsset, 
      amount: parseFloat(amount) 
    };
    
    setPortfolio([...portfolio, newAsset]);
    navigate('/'); 
  };

  return (
    <div className="max-w-3xl mx-auto glass-panel p-10 rounded-3xl mt-12 shadow-2xl">
      <h2 className="text-3xl mb-8 premium-header">Add Private Asset</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 font-sans">
        
        <div>
          <label className="block text-sm font-semibold text-[#B0E4CC] mb-4 tracking-wide uppercase">
            Select Asset to Curate
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {POPULAR_ASSETS.map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => setSelectedAsset(asset.name)}
                className={`p-5 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300
                  ${selectedAsset === asset.name 
                    ? 'border-[#408A71] bg-[#408A71]/20 shadow-inner scale-105' 
                    : 'border-[#408A71]/30 bg-[#091413]/50 text-[#408A71] hover:border-[#408A71] hover:text-[#B0E4CC] hover:-translate-y-1' 
                  }
                `}
              >
              
                <span className={`font-bold text-lg ${selectedAsset === asset.name ? 'text-[#B0E4CC]' : 'text-[#408A71]'}`}>
                  {asset.name}
                </span>
                <span className={`text-xs mt-1 ${selectedAsset === asset.name ? 'text-white/70' : 'text-[#408A71]/70'}`}>
                  {asset.symbol}
                </span>
              </button>
            ))}
          </div>
        </div>

     
        <div>
          <label className="block text-sm font-semibold text-[#B0E4CC] mb-3 tracking-wide uppercase">
            Amount Held
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            
            className="w-full p-5 rounded-xl border border-[#408A71]/30 bg-[#091413]/50 focus:outline-none focus:ring-2 focus:ring-[#B0E4CC] focus:border-transparent text-[#B0E4CC] placeholder:text-[#408A71]/50 transition-all shadow-inner hover:bg-[#091413]/70 hover:shadow-md"
            placeholder="e.g. 2.5"
            step="any"
          />
        </div>

      
        <button 
          type="submit" 
          disabled={!selectedAsset || !amount}
          className="mt-4 w-full bg-[#B0E4CC] text-[#091413] py-5 rounded-xl font-bold transition-all duration-300 shadow-md hover:bg-white hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none uppercase tracking-wider"
        >
          Curate Asset
        </button>
      </form>
    </div>
  );
}