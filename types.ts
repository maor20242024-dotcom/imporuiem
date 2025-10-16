/**
 * ================================
 * 🏗️  Global Type Definitions
 * Imperium Gate AI — Unified Types
 * ================================
 */

/**
 * المطور العقاري الرئيسي (Emaar, Damac, Nakheel, Sobha)
 */
export interface Developer {
  /** الاسم الرسمي للمطور */
  name: string;
  /** المعرف النصي (slug) — يستخدم في المسارات */
  slug: string;
  /** شعار المطور (رابط مباشر) */
  logo?: string;
  /** وصف المطور */
  description?: string;
}

/**
 * مواصفات المشروع العقاري
 */
export interface Project {
  /** معرف المشروع الفريد (developer-slug + project-slug) */
  id: string;

  /** المطور */
  developer: string;

  /** اسم المشروع */
  name: string;

  /** المعرف النصي للمسار (slug) */
  slug: string;

  /** موقع المشروع (عادة دبي) */
  location: string;

  /** السعر الابتدائي */
  priceFrom?: string;

  /** الصورة الرئيسية */
  image?: string;

  /** معرض الصور */
  gallery?: string[];

  /** فيديو ترويجي */
  video?: string;

  /** الوصف الكامل */
  description?: string;

  /** نوع العقار (شقة، فيلا، تاونهاوس...) */
  propertyType?: string;

  /** حالة المشروع (قيد الإنشاء، جاهز، مخطط...) */
  status?: string;

  /** تاريخ التسليم */
  completionDate?: string;

  /** قائمة المميزات أو الخدمات */
  amenities?: string[];

  /** الإحداثيات الجغرافية (Lat, Lng) */
  coords?: {
    lat: number;
    lng: number;
  };

  /** رابط كتيب المشروع أو البروشور */
  brochure?: string;
}

/**
 * بيانات وسائط العرض (صور، فيديوهات، ملفات)
 */
export interface MediaItem {
  type: 'image' | 'video' | 'pdf' | 'link';
  url: string;
  caption?: string;
}

/**
 * مخرجات واجهة API موحدة
 */
export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * نوع خاص لنتائج المقارنة بين المشاريع
 */
export interface ProjectComparison {
  projectA: Project;
  projectB: Project;
  differences: Record<string, string>;
}

/**
 * إعدادات التكوين العامة للتطبيق
 */
export interface AppConfig {
  siteName: string;
  baseUrl: string;
  apiBaseUrl: string;
  theme: 'light' | 'dark' | 'auto';
  defaultLanguage: string;
  supportedLanguages: string[];
}
