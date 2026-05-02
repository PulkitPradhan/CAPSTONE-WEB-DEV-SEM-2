import React, { useContext } from 'react';
import { PortfolioContext } from '../App';
import { NavLink } from 'react-router-dom';

export default function Dashboard() {
  const { portfolio } = useContext(PortfolioContext);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-xl font-light text-white tracking-tight">Your Portfolio</h2>
        <span className="text-[10px] text-[#444444] uppercase tracking-widest">
          {portfolio.length} Assets Tracked
        </span>
      </div>

      {portfolio.length === 0 ? (
        <div className="border border-white/5 rounded-3xl p-20 text-center bg-[#0a0a0a]">
          <p className="text-[#666666] mb-6 font-light">Your portfolio is currently empty.</p>
          <NavLink 
            to="/market" 
            className="text-white border-b border-white/20 hover:border-white transition-all pb-1 text-sm tracking-wide"
          >
            Browse Market
          </NavLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((asset) => (
            <div 
              key={asset.id} 
              className="group bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl hover:border-white/20 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-white font-medium">{asset.name}</h3>
                <span className="text-[10px] text-[#444444] uppercase tracking-widest">Asset</span>
              </div>
              <div className="text-4xl font-light text-white tracking-tight">
                {asset.amount}
              </div>
              <div className="mt-2 text-xs text-[#666666]">Units Held</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}