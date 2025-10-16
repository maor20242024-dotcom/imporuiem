import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const FaBars = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>;

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/developers', label: t('developers') },
    { href: '/ai', label: t('ai_insights') },
    { href: '/admin', label: t('admin') },
  ];
  
  const headerClass = isHomePage && !isScrolled
    ? "bg-transparent text-white"
    : "bg-black/70 backdrop-blur-md border-b border-zinc-800 text-white";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 p-4 ${headerClass}`}>
      <div className="mx-auto px-4 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-gold">
          <div className="w-8 h-8"><Logo /></div>
          Imperium Gate
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                `relative text-white hover:text-brand-gold transition-colors ${isActive ? 'text-brand-gold' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-gold" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white text-2xl"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-navy bg-white/5 backdrop-blur-md shadow-lg overflow-hidden">
              <nav className="flex flex-col items-center py-4 gap-4">
                  {navLinks.map((link) => (
                      <NavLink
                          key={link.href}
                          to={link.href}
                          end={link.href === '/'}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) => 
                            `block text-xl py-2 hover:text-brand-gold transition-colors ${isActive ? 'text-brand-gold' : 'text-white'}`
                          }
                      >
                          {link.label}
                      </NavLink>
                  ))}
              </nav>
          </div>
      )}
    </header>
  );
}