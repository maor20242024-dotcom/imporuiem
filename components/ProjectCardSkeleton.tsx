import React from 'react';

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 animate-pulse">
      <div className="h-48 bg-zinc-700 rounded-xl mb-4" />
      <div className="h-5 bg-zinc-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-zinc-700 rounded w-1/3 mb-4" />
      <div className="h-5 bg-zinc-700 rounded w-1/2" />
    </div>
  );
}
