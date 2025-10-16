import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProject } from '@/lib/hooks/useProjects';
import Spinner from '@/components/Spinner';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { project, loading } = useProject(id);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <Spinner />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-brand-gold mb-4">{t('project_not_found')}</h1>
        <p className="text-white/70 mb-8">The project you are looking for does not exist or has been moved.</p>
        <Link 
          to="/projects"
          className="inline-flex items-center px-6 py-3 bg-brand-gold text-black font-medium rounded-lg hover:bg-[var(--brand-gold-light)] transition"
        >
          ← {t('explore_projects')}
        </Link>
      </main>
    );
  }

  const heroImage = project.image || project.gallery?.[0] || 'https://placehold.co/1280x540/0B0E13/d4af37?text=Imperium+Gate';

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <img src={heroImage} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-white">{project.name}</h1>
            <p className="text-white/80 mt-2">{project.location}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-8">
          {project.description && (
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-brand-gold">{t('project_overview')}</h2>
                <p className="text-white/80 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-brand-gold">{t('image_gallery')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.slice(0, 6).map((img, index) => (
                  <a key={index} href={img} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg group border border-white/10">
                    <img
                      src={img}
                      alt={`${project.name} image ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {project.video && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-brand-gold">{t('project_video')}</h2>
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                <iframe
                  src={project.video}
                  title={project.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky top-24 h-fit">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-brand-gold mb-1">{t('developer')}</h3>
              <p className="capitalize text-lg">{project.developer}</p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-gold mb-1">{t('price_from')}</h3>
              <p className="text-lg">{project.priceFrom || t('price_on_request')}</p>
            </div>
            {project.propertyType && <div>
              <h3 className="font-semibold text-brand-gold mb-1">{t('property_type')}</h3>
              <p className="text-lg">{project.propertyType}</p>
            </div>}
            {project.status && <div>
              <h3 className="font-semibold text-brand-gold mb-1">{t('status')}</h3>
              <p className="text-lg capitalize">{project.status}</p>
            </div>}
             {project.amenities?.length ? (
            <div className="pt-4">
              <h3 className="font-semibold text-brand-gold mb-2">Amenities</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-white/80">
                {project.amenities.slice(0, 5).map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          ) : null}
          </div>

          {project.brochure && (
            <a
              href={project.brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 bg-brand-gold text-black font-medium rounded-lg hover:bg-[var(--brand-gold-light)] transition"
            >
              📄 {t('download_brochure')}
            </a>
          )}
          
          <div className="mt-8 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
            >
              ← {t('explore_projects')}
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}