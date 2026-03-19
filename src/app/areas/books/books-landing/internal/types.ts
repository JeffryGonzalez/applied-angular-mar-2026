export type BooksApiItemModel = {
  data: BookEntity[];
};

export type BookEntity = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: number;
  custom?: boolean | false;
  imageData?: string;
};
