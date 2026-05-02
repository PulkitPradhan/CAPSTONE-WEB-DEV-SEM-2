import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Market from './components/Market';
import PortfolioForm from './components/PortfolioForm';

// Strictly using Context API 
export const PortfolioContext = createContext();

export default function App() {
  const [portfolio, setPortfolio] = useState([]);

  return (
    <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
      <BrowserRouter>
        <div className="min-h-screen p-8 font-sans">
          
          
<nav className="flex justify-between items-center mb-10 glass-panel p-5 rounded-2xl">
  <h1 className="text-3xl font-bold premium-header">Nexus Boutique</h1>
  <div className="space-x-8 font-semibold uppercase tracking-wide text-sm">
    <NavLink to="/market" className={({isActive}) => isActive ? "text-[#B0E4CC] drop-shadow-[0_0_8px_rgba(176,228,204,0.5)]" : "text-[#408A71] hover:text-[#B0E4CC] transition duration-300"}>Market</NavLink>
    <NavLink to="/portfolio" className={({isActive}) => isActive ? "text-[#B0E4CC] drop-shadow-[0_0_8px_rgba(176,228,204,0.5)]" : "text-[#408A71] hover:text-[#B0E4CC] transition duration-300"}>Portfolio</NavLink>
    <NavLink to="/add" className={({isActive}) => isActive ? "text-[#B0E4CC] drop-shadow-[0_0_8px_rgba(176,228,204,0.5)]" : "text-[#408A71] hover:text-[#B0E4CC] transition duration-300"}>Add Asset</NavLink>
  </div>
</nav>

          {/* Routes */}
          <Routes>
            {/* This instantly redirects the initial load to the Market */}
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