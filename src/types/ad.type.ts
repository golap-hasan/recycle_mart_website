export interface Ad {
  id: string;
  title: string;
  price: number;
  location: string;
  postedAt: string;
  coverImage: string;
  isFeatured: boolean;
  isUrgent: boolean;
}

export interface AdMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AdResponse {
  success: boolean;
  message: string;
  meta?: AdMeta;
  data: Ad | Ad[];
}
