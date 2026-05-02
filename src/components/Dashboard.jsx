import React, { useContext } from 'react';
import { PortfolioContext } from '../App';

export default function Dashboard() {
  const { portfolio } = useContext(PortfolioContext); 

  return (
    <div className="p-10">
      <h2 className="text-xll font-light text-white mb-8 tracking-tight">Your Portfolio</h2>
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolio.map(asset => (
           <div key={asset.id} className="border border-white/10 p-6 rounded-xl">
             <h3 className="text-white">{asset.name}</h3>
             <p className="text-cyan-400">{asset.amount}</p>
           </div>
        ))}
      </div>
    </div>
  );
}