import React, { useContext } from 'react';
import { PortfolioContext } from '../App';

export default function Dashboard() {
  const { portfolio } = useContext(PortfolioContext);

  return (
    <div className="glass-panel p-10 rounded-3xl">
      <h2 className="text-4xl mb-8 premium-header">Private Portfolio</h2>
      
      {portfolio.length === 0 ? (
         <p className="text-gray-500 font-sans text-lg">Your portfolio is empty. Navigate to 'Add Asset' to begin curation.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          {portfolio.map(asset => (
            <div key={asset.id} className="bg-white/70 p-8 rounded-2xl border border-white shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold text-gray-800">{asset.name}</h3>
              <p className="text-3xl text-[#b8860b] mt-3 font-semibold">{asset.amount}</p>
              <p className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">Total Holdings</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}