import React, { useState } from 'react';
import MainLauncher from './components/MainMenu/MainLauncher';
import TitleBar from './components/Common/TitleBar';

const mockUser = {
  id: 'test-user-123',
  email: 'test@axis.com',
  user_metadata: {
    name: 'Test Player'
  }
};

function App() {
  const [showMenu] = useState(true);

  return (
    <div className="h-screen w-screen minecraft-background overflow-hidden">
      <TitleBar />
      <div className="h-full pt-8">
        {showMenu ? (
          <MainLauncher user={mockUser} supabase={null} />
        ) : (
          <div className="h-screen w-screen flex items-center justify-center">
            <div className="modern-loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;