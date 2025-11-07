
import React from 'react';
import type { AppView } from '../App';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const getTabClass = (view: AppView) => {
    const baseClass = "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
    if (activeView === view) {
      return `${baseClass} bg-cyan-500/20 text-cyan-400 border border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]`;
    }
    return `${baseClass} text-gray-400 hover:bg-gray-800 hover:text-cyan-300`;
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm">
      <h1 className="text-4xl font-bold text-cyan-400 tracking-wider mb-4 sm:mb-0" style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.7)' }}>
        IKGPT
      </h1>
      <nav className="flex space-x-4">
        <button onClick={() => setActiveView('glm')} className={getTabClass('glm')}>
          GLM
        </button>
        <button onClick={() => setActiveView('image')} className={getTabClass('image')}>
          Image Generator
        </button>
      </nav>
    </header>
  );
};

export default Header;
