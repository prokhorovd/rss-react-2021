export interface Article {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string | null, name: string };
  title: string;
  urlToImage: string;
  url: string;
}
