import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProjectCard from '@/components/ProjectCard';
import Spinner from '@/components/Spinner';
import { getProjectsByDeveloper, developers } from '@/lib/project-data';
import type { Project, Developer } from '@/types';

export default function DeveloperProjectsPage() {
  const { developer: developerSlug } = useParams<{ developer: string }>();
  const { t } = useTranslation();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [developerInfo, setDeveloperInfo] = useState<Developer | undefined>();
  const [loading, setLoading] = useState(true);

  // FIX: getProjectsByDeveloper is an async function and its result must be awaited.
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      if (developerSlug) {
        try {
          const data = await getProjectsByDeveloper(developerSlug);
          const info = developers.find(d => d.slug === developerSlug);
          setProjects(data);
          setDeveloperInfo(info);
        } catch (error) {
          console.error("❌ Error loading developer projects:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [developerSlug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Spinner />
      </main>
    )
  }

  if (!developerInfo) {
       return (
           <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-bold text-brand-gold mb-4">Developer Not Found</h1>
                <p className="text-white/70 mb-8">The developer '{developerSlug}' does not exist.</p>
                <Link 
                  to="/developers"
                  className="inline-flex items-center px-6 py-3 bg-brand-gold text-black font-medium rounded-lg hover:bg-[var(--brand-gold-light)] transition"
                >
                  ← Back to Developers
                </Link>
            </main>
      )
  }
  
  const developerName = developerInfo.name;
  
  return (
    <main className="min-h-screen bg-brand-navy text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <img src={developerInfo.logo} alt={`${developerName} logo`} className="h-20 w-auto mx-auto mb-4"/>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                {developerName} <span className="text-brand-gold">{t('projects')}</span>
            </h1>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-24">
            <p className="text-xl">No projects found for this developer.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/developers"
            className="inline-flex items-center px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
          >
            ← Back to Developers
          </Link>
        </div>
      </div>
    </main>
  );
}