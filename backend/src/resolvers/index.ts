import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: () => booksData,
    book(parent: unknown, args: { title: string; }, context: unknown, info: unknown){
      const { title } = args;

      if(!title) return booksData;
      
      const response = booksData.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));

      return response;
    }
  },
};
