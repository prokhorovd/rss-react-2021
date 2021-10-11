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

// export type HandlerFunction = (value: number | string) => void;
// export type HandleSortByChange = (value: string) => void;
// export type HandlePageSizeChange = (value: number) => void;
