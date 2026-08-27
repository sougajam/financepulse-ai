export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  tags: string[];
  imageUrl?: string;
}
