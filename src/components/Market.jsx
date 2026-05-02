import React, { useState, useEffect } from 'react';

export default function Market() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1')
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setLoading(false);
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  if (loading) return <div className="text-center mt-20 text-gray-500">Curating market metrics...</div>;

  return (
    <div className="glass-panel p-10 rounded-3xl">
      <h2 className="text-4xl mb-8 premium-header">Market Overview</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="py-4 font-semibold text-gray-400 uppercase text-xs tracking-wider">Asset</th>
              <th className="py-4 font-semibold text-gray-400 uppercase text-xs tracking-wider">Price</th>
              <th className="py-4 font-semibold text-gray-400 uppercase text-xs tracking-wider">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {coins.map(coin => (
  <tr key={coin.id} className="border-b border-[#408A71]/30 hover:bg-[#285A48]/50 transition duration-200">
    
    
    <td className="py-5 flex items-center gap-4 font-sans text-[#B0E4CC] font-medium">
      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
      {coin.name} 
      <span className="text-xs text-gray-400 uppercase font-bold">{coin.symbol}</span>
    </td>
    
    <td className="py-5 font-sans text-white tracking-wide">
      ${coin.current_price.toLocaleString()}
    </td>
    
    <td className={`py-5 font-sans font-medium ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
      {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
    </td>
    
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
}