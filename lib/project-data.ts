import type { Project, Developer } from '@/types';
import { fetchAllRawData } from '@/lib/raw-data';

// =========================================================
// ✅ مطورو المشاريع الرئيسيون (مع روابط رسمية لشعاراتهم)
// =========================================================
export const developers: Developer[] = [
  {
    name: 'Emaar',
    slug: 'emaar',
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/33/Emaar_Properties_logo.svg',
    description:
      "One of Dubai's largest developers, known for large-scale, luxury projects.",
  },
  {
    name: 'Damac',
    slug: 'damac',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Damac_Properties_logo.svg',
    description:
      'Luxury and innovative real estate projects in collaboration with global brands.',
  },
  {
    name: 'Nakheel',
    slug: 'nakheel',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/02/Nakheel_Logo.svg',
    description:
      'Developer of iconic waterfront projects and artificial islands.',
  },
  {
    name: 'Sobha',
    slug: 'sobha',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Sobha_Developers_logo.svg',
    description:
      'Focuses on high-quality construction and modern design in prime locations.',
  },
];

// =========================================================
// 🔧 أداة تحويل JSON إلى Project متكامل
// =========================================================
const convertToProject = (
  jsonData: any,
  developerSlug: string,
  projectSlug: string
): Project | null => {
  if (!jsonData || typeof jsonData !== 'object' || Object.keys(jsonData).length === 0) {
    console.warn(`⚠️ Skipped empty JSON data for: ${developerSlug}/${projectSlug}`);
    return null;
  }

  if ((!jsonData.name && !jsonData.title) || jsonData.name === 'error') {
    console.warn(
      `⚠️ Skipped invalid JSON data (missing name/title) for: ${developerSlug}/${projectSlug}`
    );
    return null;
  }

  const formatPrice = (price: number | null | undefined): string => {
    if (price === null || price === undefined || price === 0)
      return 'Price on request';
    if (price < 1000) return `AED ${price.toFixed(2)}M`;
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  let name = (jsonData.name || jsonData.title || projectSlug.replace(/-/g, ' '))
    .split('|')[0]
    .split(' - ')[0]
    .trim();

  if (name.includes('\n') || name.toLowerCase() === 'error') {
    name = projectSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  const galleryImages = [
    ...(jsonData.gallery || []),
    ...(jsonData.images || []),
  ].filter(
    (img) => typeof img === 'string' && (img.startsWith('http') || img.startsWith('/'))
  );

  return {
    id: `${developerSlug}-${projectSlug}`,
    developer: developerSlug,
    name: name,
    slug: projectSlug,
    location: jsonData.location || 'Dubai',
    priceFrom: formatPrice(jsonData.priceMinAED),
    image:
      jsonData.mainImage ||
      galleryImages[0] ||
      'https://placehold.co/640x480/0B0E13/FFD700?text=Imperium+Gate',
    gallery: galleryImages,
    video:
      Array.isArray(jsonData.videos) && jsonData.videos.length > 0
        ? jsonData.videos[0]
        : jsonData.video || undefined,
    description: jsonData.description || 'No description available.',
    propertyType: Array.isArray(jsonData.propertyTypes)
      ? jsonData.propertyTypes.join(', ')
      : undefined,
    status: jsonData.status,
    completionDate:
      jsonData.completionDate === 'N/A' || !jsonData.completionDate
        ? undefined
        : jsonData.completionDate,
    amenities: jsonData.amenities || [],
    coords: jsonData.coords,
    brochure:
      (Array.isArray(jsonData.brochures) && jsonData.brochures[0]) ||
      jsonData.brochure ||
      jsonData.pdf ||
      (jsonData.pdfs && jsonData.pdfs[0]) ||
      undefined,
  };
};


// =========================================================
// 🧩 عمليات المخرجات النهائية (غير متزامنة)
// =========================================================

// Cache for the loaded and processed projects
let projectsPromise: Promise<Project[]> | null = null;

/**
 * Initializes and caches project data by fetching and processing it.
 * This function is the core of the async data loading strategy.
 */
function initializeProjects(): Promise<Project[]> {
  if (projectsPromise) {
    return projectsPromise;
  }

  projectsPromise = new Promise(async (resolve, reject) => {
    try {
      const rawDataWithMeta = await fetchAllRawData();
      
      const projects = rawDataWithMeta
        .map(item => convertToProject(item.data, item.dev, item.slug))
        .filter((project): project is Project => project !== null);
        
      resolve(projects);
    } catch (error) {
      console.error("Fatal error during project initialization:", error);
      reject(error);
    }
  });

  return projectsPromise;
}

export const getAllProjects = async (): Promise<Project[]> => {
  return initializeProjects();
};

export const getProjectsByDeveloper = async (developerSlug: string): Promise<Project[]> => {
  const allProjects = await initializeProjects();
  return allProjects.filter((p) => p.developer === developerSlug);
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const allProjects = await initializeProjects();
  return allProjects.find((p) => p.id === id);
};
