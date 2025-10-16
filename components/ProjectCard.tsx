import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/types';

// FIX: Define a props interface for clarity and stronger typing.
interface ProjectCardProps {
  project: Project;
}

// FIX: Use the props interface. This helps TypeScript correctly interpret props,
// including special React props like 'key' that are passed during iteration.
export default function ProjectCard({ project }: ProjectCardProps) {
  const img = project.image || 'https://placehold.co/640x480/0B0E13/d4af37?text=Imperium+Gate';
  
  return (
    <article className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:border-brand-gold/50 transition-all duration-300 group">
      <Link to={`/projects/${project.id}`}>
        <img 
            src={img} 
            alt={project.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform" 
            loading="lazy" 
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src='https://placehold.co/640x480/0B0E13/d4af37?text=Imperium+Gate';
            }}
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-white truncate">{project.name}</h3>
          <p className="text-sm text-zinc-400 capitalize">{project.developer}</p>
          {project.priceFrom && <p className="mt-2 font-medium text-brand-gold">{project.priceFrom}</p>}
          <span
            className="mt-3 inline-block text-sm text-brand-gold underline underline-offset-4"
          >
            Details
          </span>
        </div>
      </Link>
    </article>
  );
}
