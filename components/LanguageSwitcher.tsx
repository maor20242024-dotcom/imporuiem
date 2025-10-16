

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// FIX: Update component to accept and pass down className prop
const IoLanguageOutline = ({ className }: { className?: string }) => <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M336.63 128A17.37 17.37 0 00320 137.37V144h-17.37A17.37 17.37 0 00286 160v17.37A17.37 17.37 0 00302.63 194V224h-28.26a16 16 0 00-11.32 4.69l-11.31 11.31a16 16 0 00-4.69 11.31V280H216a16 16 0 00-16-16h-32a16 16 0 00-16 16h-32a16 16 0 000 32h32a16 16 0 0016 16h32a16 16 0 0016-16h32.69a16 16 0 0011.31-4.69l11.31-11.31a16 16 0 004.69-11.31V256h17.37A17.37 17.37 0 00320 239.37V224h17.37A17.37 17.37 0 00354 208v-17.37A17.37 17.37 0 00337.37 174V144h17.37A17.37 17.37 0 00371 128h-34.37zM256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm149.23 189.31a15.75 15.75 0 00-6.32 12.92c0 2.26.49 4.42 1.38 6.41l-43.14 43.14a60.31 60.31 0 01-2.28-1.59 47.92 47.92 0 01-14.9-34.82c0-26.46 21.53-48 48-48a47.79 47.79 0 0113.84 2.28C405.32 218 405.23 230 405.23 237.31zm-208.4 128.27c-3.13-1.29-6.36-2.31-9.64-3.23a48.56 48.56 0 01-14.45-39.75c.59-15.52 7.86-29.83 18.63-40.38s25.13-17.65 40.64-18.09h1.12a48.22 48.22 0 0140.16 22.24l.11.16a64.12 64.12 0 0112 14.85l-51.53 51.52a48.22 48.22 0 01-37.04 12.68z"></path></svg>;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const dropdownPosition = i18n.language === 'ar' ? 'left-0' : 'right-0';

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded-full text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
      >
        <IoLanguageOutline className="text-xl" />
        <span className="font-medium uppercase">{i18n.language}</span>
      </button>
      {isOpen && (
        <div className={`absolute top-full ${dropdownPosition} mt-2 w-28 bg-brand-navy bg-white/5 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/10`}>
          <button
            onClick={() => changeLanguage('ar')}
            className={`block w-full text-right px-4 py-2 hover:bg-brand-gold hover:text-black transition-colors ${i18n.language === 'ar' ? 'bg-brand-gold text-black' : ''}`}
          >
            العربية
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 hover:bg-brand-gold hover:text-black transition-colors ${i18n.language === 'en' ? 'bg-brand-gold text-black' : ''}`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}