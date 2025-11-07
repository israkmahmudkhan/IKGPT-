import React, { useState } from 'react';
import GLM from './components/GLM';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';

export type AppView = 'glm' | 'image';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('glm');

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-sans">
      <div className="container mx-auto p-4 flex flex-col h-screen">
        <Header activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-grow mt-4 flex flex-col">
          {activeView === 'glm' ? <GLM /> : <ImageGenerator />}
        </main>
      </div>
    </div>
  );
};

export default App;
