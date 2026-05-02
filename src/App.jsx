import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import PortfolioForm from './components/PortfolioForm';


export const PortfolioContext = createContext();

export default function App() {
  const [portfolio, setPortfolio] = useState([]);

  const addAsset = (coin, amount = 1) => {
    const newAsset = { 
      id: Date.now(), 
      name: coin.name, 
      amount: parseFloat(amount) || 1
    };
    setPortfolio(prev => [...prev, newAsset]);
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio, addAsset }}>
      <BrowserRouter>
        <div className="min-h-screen p-8 font-sans">

<nav className="flex justify-between items-center mb-12 border-b border-white/10 pb-6 px-4">
  <h1 className="text-2xl font-light tracking-tighter text-white">CRYPTO<span className="font-semibold">  tracker</span></h1>
  <div className="space-x-8 font-medium text-xs uppercase tracking-widest">
    <NavLink to="/market" className={({isActive}) => isActive ? "text-white" : "text-[#666666] hover:text-white transition duration-300"}>MARKETPLACE</NavLink>
    <NavLink to="/portfolio" className={({isActive}) => isActive ? "text-white" : "text-[#666666] hover:text-white transition duration-300"}>DASHBOARD</NavLink>
    <NavLink to="/add" className={({isActive}) => isActive ? "text-white" : "text-[#666666] hover:text-white transition duration-300"}>Add CRYPTO</NavLink>
  </div>
</nav>

          <Routes>
            <Route path="/" element={<Navigate replace to="/market" />} />
            
            <Route path="/market" element={<Market />} />
            <Route path="/portfolio" element={<Dashboard />} />
            <Route path="/add" element={<PortfolioForm />} />
          </Routes>

        </div>
      </BrowserRouter>
    </PortfolioContext.Provider>
  );
}