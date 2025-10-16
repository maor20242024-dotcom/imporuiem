import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Developer } from '@/types';

interface DeveloperCardProps {
  developer: Developer;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/developers/${developer.slug}`} className="block group">
        <div className="relative h-40 bg-zinc-900 flex items-center justify-center p-4">
          <img
            src={developer.logo}
            alt={`${developer.name} logo`}
            className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-brand-gold mb-2">{developer.name}</h3>
          <p className="text-sm text-zinc-400 mb-4 h-16 overflow-hidden">{developer.description}</p>
          <span className="inline-block px-6 py-2 bg-brand-gold text-black rounded-full font-semibold group-hover:bg-[var(--brand-gold-light)] transition-colors">
            {t('view_projects')}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default DeveloperCard;