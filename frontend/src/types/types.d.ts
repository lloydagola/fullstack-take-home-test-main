export type TBook = {
  title: string;
  author: string;
  readingLevel: string;
  coverPhotoURL: string;
};

export type TContext = {
  books: TBook[];
  readingList: TBook[];
  addToReadingList: (Book: TBook) => void;
  removeFromReadingList: (Book: TBook) => void;
};