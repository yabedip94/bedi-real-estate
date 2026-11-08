export type ListingStatus = "dijual" | "disewa";

export type PropertyType =
  | "rumah"
  | "vila"
  | "apartemen"
  | "townhouse"
  | "komersial";

export interface PropertyLocation {
  address: string;
  area: string; // e.g. "Menteng", "Kebayoran Baru", "Canggu", "Dago Pakar"
  city: string; // e.g. "Jakarta Pusat", "Jakarta Selatan", "Badung, Bali", "Bandung", "Tangerang Selatan"
  province: string; // e.g. "DKI Jakarta", "Bali", "Jawa Barat", "Banten"
}

export interface PropertySpecs {
  landArea?: number; // Luas Tanah (LT) in m² — optional for apartments / penthouses where land area is not applicable
  buildingArea: number; // Luas Bangunan (LB) in m²
  bedrooms: number; // Kamar Tidur (KT)
  bathrooms: number; // Kamar Mandi (KM)
  garages?: number;
  floors?: number;
  yearBuilt?: number;
  certificate?: "SHM" | "HGB" | "Strata Title";
}

export interface PropertyImage {
  url: string;
  alt: string;
  caption?: string;
  isPrimary?: boolean;
}

export interface Property {
  id: string;
  code: string; // e.g. "NRE-JKT-001"
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ListingStatus;
  type: PropertyType;
  price: number; // Numeric IDR value
  pricePeriod?: "tahun" | "bulan"; // For rental listings (status === 'disewa')
  location: PropertyLocation;
  specs: PropertySpecs;
  facilities: string[];
  images: PropertyImage[];
  agentId?: string; // Optional reference, no mandatory foreign key in M04
  isFeatured: boolean;
  createdAt: string; // ISO 8601 string
}
