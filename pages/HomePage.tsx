import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import { useProjects } from '@/lib/hooks/useProjects';

export default function HomePage() {
  const { t } = useTranslation();
  const { projects } = useProjects();
  
  // A more diverse selection of featured projects
  const featured = projects.slice(0, 8);

  return (
    <main className="bg-brand-navy text-white overflow-hidden">
      <HeroSection />

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="py-24 px-6 bg-brand-navy relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-brand-gold">
              {t('featured_projects')}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link
                to="/developers"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
              >
                {t('browse_by_developer')} →
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}