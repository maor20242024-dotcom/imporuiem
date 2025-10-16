import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';

interface ApiStatusCardProps {
  developer: string;
}

const ApiStatusCard: React.FC<ApiStatusCardProps> = ({ developer }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const { t } = useTranslation();

  useEffect(() => {
    const checkStatus = () => {
        // This is a mock status check
        setTimeout(() => {
            setStatus(Math.random() > 0.1 ? 'success' : 'error'); // 90% success rate
        }, 500 + Math.random() * 1000);
    };
    checkStatus();
  }, [developer]);

  const statusColor = status === 'success' ? 'text-green-500' : status === 'error' ? 'text-red-500' : 'text-yellow-500';
  const statusIcon = status === 'success' ? '✅' : status === 'error' ? '❌' : '⏳';

  return (
    <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm p-4 rounded-lg">
      <span className="font-semibold text-white capitalize">{developer} API</span>
      <div className="flex items-center gap-2">
        <span className={statusColor}>{statusIcon} {status}</span>
      </div>
    </div>
  );
};


export default function AdminPage() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    
    setTimeout(() => {
        if (username === 'admin' && password === 'admin123') {
          setIsAuthenticated(true);
          sessionStorage.setItem('admin_token', 'mock-token');
        } else {
          setLoginError('Invalid credentials');
        }
        setLoading(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-brand-gold mb-6">
            {t('admin_login')}
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder={t('username') || ''}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 ring-brand-gold"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder={t('password') || ''}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 ring-brand-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-brand-gold text-black font-semibold rounded-lg hover:bg-[var(--brand-gold-light)] transition-colors" disabled={loading}>
              {loading ? <Spinner /> : t('login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 md:p-12">
      <h1 className="text-4xl font-extrabold text-brand-gold mb-8">
        {t('admin_dashboard')}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">{t('api_status')}</h2>
          <div className="space-y-4">
            {['emaar', 'damac', 'nakheel', 'sobha'].map((dev) => (
              <ApiStatusCard key={dev} developer={dev} />
            ))}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-brand-gold mb-6">{t('ai_tools')}</h2>
          <p className="text-white/80 mb-6">Access the AI studio to analyze project data and generate insights.</p>
          <div className="flex gap-4">
            <Link to="/ai" className="px-6 py-3 bg-brand-gold text-black rounded-full font-semibold hover:bg-[var(--brand-gold-light)] transition-colors">
              Go to AI Studio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}