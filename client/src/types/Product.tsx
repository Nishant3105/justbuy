export interface Product {
  _id: string | number;
  name: string;
  sku: string;
  slug: string;
  brand: string;
  category: string;
  subCategory: string;
  mrp: number;
  sellingPrice: number;
  discount?: number;
  taxClass?: string;
  stockQty: number;
  lowStockThreshold?: number;
  stockStatus: "in_stock" | "out_of_stock";
  mainImage?: string;
  detailImage?: string;
  galleryImages?: string[];
  status?: "active" | "draft" | "disabled";
  visibility?: "public" | "private";
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  // ADMIN / INTERNAL fields
  vendorId?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
