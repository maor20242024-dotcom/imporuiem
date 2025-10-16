import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProjects } from "@/lib/hooks/useProjects";
import ProjectCard from "@/components/ProjectCard";
import { ProjectCardSkeleton } from "@/components/ProjectCardSkeleton";

export default function ProjectsOverviewPage() {
  const { t } = useTranslation();
  const { projects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => 
    projects.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.developer.toLowerCase().includes(searchTerm.toLowerCase())
    ), [projects, searchTerm]);
  
  if (!projects.length && !loading) {
     return (
      <main className="min-h-screen bg-brand-navy text-white px-6 py-24 flex items-center justify-center">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-brand-gold">No projects available at the moment.</h2>
            <p className="text-white/70 mt-2">Please check the data files inside the /data/ directory.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-navy text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-gold mb-8 text-center">
          {t('explore_dubai_properties')}
        </h1>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search projects by name or developer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 ring-brand-gold"
          />
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-24">
            <p className="text-xl">{t('project_not_found')}</p>
            <p>No projects found matching your search criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}