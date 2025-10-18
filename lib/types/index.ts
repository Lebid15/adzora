// Gallery Item Type
export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  tags: string[];
}

// Site Configuration Type
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
}

// Social Link Type
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Contact Form Data Type
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
