import React, { useEffect, useState } from 'react';
import { getUserInfo } from './services/authService';
import { ClientPrincipal } from './types';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';

const App: React.FC = () => {
  const [user, setUser] = useState<ClientPrincipal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getUserInfo();
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed", error);
      } finally {
        // Small delay to prevent flicker on fast loads and smoother transition
        setTimeout(() => setLoading(false), 500);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Verifying identity...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">AzureAuth</span>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
             App Service Authentication Demo
          </div>
        </div>
      </header>

      <main>
        {user ? (
          <UserProfile user={user} />
        ) : (
          <Login />
        )}
      </main>

      {!user && (
        <footer className="py-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Azure Auth Demo. Deploy to App Service to test.</p>
        </footer>
      )}
    </div>
  );
};

export default App;