import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo';

const FaFacebook = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>;
const FaTwitter = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.214 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>;
const FaLinkedin = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>;
const FaInstagram = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37.2-2.1-147.9-2.1-185.1 0-35.9 1.7-67.7 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37.2-2.1 147.9 0 185.1 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37.2 2.1 147.9 2.1 185.1 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37.2 2.1-147.8 0-185.1z"></path></svg>;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const textAlignment = i18n.dir() === 'rtl' ? 'md:text-right' : 'md:text-left';
  const itemAlignment = i18n.dir() === 'rtl' ? 'md:items-end' : 'md:items-start';
  const justifyAlignment = i18n.dir() === 'rtl' ? 'md:justify-end' : 'md:justify-start';

  return (
    <footer className="bg-zinc-900/50 text-white py-10 border-t border-zinc-800">
      <div className="mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className={`text-center ${textAlignment}`}>
          <Link to="/" className={`flex items-center gap-2 text-2xl font-bold text-brand-gold mb-4 justify-center ${justifyAlignment}`}>
            <div className="w-10 h-10"><Logo /></div>
            Imperium Gate
          </Link>
          <p className="text-sm text-zinc-400 mb-2">
            {t('imperium_gate_slogan')}
          </p>
          <p className="text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} Imperium Gate. {t('all_rights_reserved')}
          </p>
        </div>

        <div className={`flex flex-col items-center ${itemAlignment} gap-4`}>
            <div className="flex gap-4 text-2xl">
                <a href="#/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-gold transition-colors">
                    <FaFacebook />
                </a>
                <a href="#/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-gold transition-colors">
                    <FaTwitter />
                </a>
                <a href="#/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-gold transition-colors">
                    <FaLinkedin />
                </a>
                <a href="#/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-brand-gold transition-colors">
                    <FaInstagram />
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}