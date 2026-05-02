
import React, { useState, useEffect, useContext } from 'react';
import { PortfolioContext } from '../App';


export default function Market() {
  const [coins, setCoins] = useState([]);
  const { addAsset } = useContext(PortfolioContext);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1')
      .then(res => res.json())
      .then(data => setCoins(data));
  }, []);

  const handleAddClick = (coin) => {
    setSelectedCoin(coin);
    setAmount('');
  };

  const handleConfirm = () => {
    if (selectedCoin && amount) {
      addAsset(selectedCoin, amount);
      setSelectedCoin(null);
      setAmount('');
    }
  };

  return (
    <>
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-[#555555] text-[10px] uppercase tracking-widest">
            <th className="pb-2 font-medium pl-6">Asset</th>
            <th className="pb-2 font-medium">Price</th>
            <th className="pb-2 font-medium">24h Change</th>
            <th className="pb-2 font-medium pr-6 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(coin => (
            <tr key={coin.id} className="group cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-out">
              
              <td className="py-5 pl-6 rounded-l-2xl transition-all duration-300 group-hover:bg-white/[0.04] group-hover:backdrop-blur-md border border-transparent group-hover:border-white/5 border-r-0">
                <div className="flex items-center gap-4 font-sans font-medium text-[#777777] group-hover:text-[#FFFFFF] transition duration-300">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  {coin.name} 
                  <span className="text-[10px] text-[#444444] uppercase tracking-widest">{coin.symbol}</span>
                </div>
              </td>

              <td className="py-5 transition-all duration-300 group-hover:bg-white/[0.04] group-hover:backdrop-blur-md border border-transparent group-hover:border-white/5 border-x-0 font-sans text-[#EDEDED] tracking-wide">
                ${coin.current_price.toLocaleString()}
              </td>

              <td className={`py-5 transition-all duration-300 group-hover:bg-white/[0.04] group-hover:backdrop-blur-md border border-transparent group-hover:border-white/5 border-x-0 font-mono text-sm ${coin.price_change_percentage_24h > 0 ? 'text-[#34d399]' : 'text-[#f87171]'}`}>
                {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
              </td>

              <td className="py-5 pr-6 rounded-r-2xl text-right transition-all duration-300 group-hover:bg-white/[0.04] group-hover:backdrop-blur-md border border-transparent group-hover:border-white/5 border-l-0">
                <button 
                  onClick={() => handleAddClick(coin)} 
                  className="text-[#666666] hover:text-white border border-[#333333] hover:border-white w-8 h-8 rounded-lg transition-all duration-300 flex items-center justify-center ml-auto"
                >
                  +
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {selectedCoin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-black border border-white/10 rounded-xl p-8 max-w-sm w-full">
            <h3 className="text-white text-lg mb-6">Add {selectedCoin.name}</h3>
            
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-widest text-[#666666] mb-3">
                Amount
              </label>
              <input
                type="number"
                step="0.001"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#444444] focus:outline-none focus:border-white/30 transition"
                autoFocus
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedCoin(null)}
                className="flex-1 px-4 py-3 border border-white/10 text-white rounded-lg hover:border-white/30 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!amount}
                className="flex-1 px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}