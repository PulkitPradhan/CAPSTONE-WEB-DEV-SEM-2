import React, { useState, useEffect, useContext } from 'react';
import { PortfolioContext } from '../App';

const FALLBACK_DATA = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 65000, price_change_percentage_24h: 2.5, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3500, price_change_percentage_24h: -1.2, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' }
];

export default function Market() {
  const [coins, setCoins] = useState([]);
  const { addAsset } = useContext(PortfolioContext);

  const handleAddCoin = (coin) => {
    const amount = window.prompt(`How many ${coin.symbol} would you like to add?`, '1');
    if (amount === null) return;

    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) return;

    addAsset(coin, parsedAmount);
  };

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(res => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then(data => {
        console.log("API Data received:", data); 
        setCoins(data);
      })
      .catch(err => {
        console.error("API Call failed, using fallback data:", err);
        setCoins(FALLBACK_DATA); 
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl">
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
            {coins.map((coin) => (
              <tr key={coin.id} className="group transition-all duration-300 border-b border-white/5 last:border-0">
                <td className="py-5 pl-6">
                  <div className="flex items-center gap-4 text-white">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    {coin.name} <span className="text-[#444444] text-[10px] uppercase">{coin.symbol}</span>
                  </div>
                </td>
                <td className="py-5 text-white">${coin.current_price.toLocaleString()}</td>
                <td className="py-5">
                  <div className="flex justify-center">
                    <span className={coin.price_change_percentage_24h > 0 ? 'price-change-badge price-change-badge--up' : 'price-change-badge price-change-badge--down'}>
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="py-5 pr-6 text-right">
                  <button 
                    type="button"
                    onClick={() => handleAddCoin(coin)}
                    className="text-[#666666] hover:text-white border border-[#333333] hover:border-white w-8 h-8 rounded-lg flex items-center justify-center ml-auto"
                  >+</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}