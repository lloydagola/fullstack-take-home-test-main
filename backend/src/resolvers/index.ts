import { booksData } from '../data/books';

export const resolvers = {
  Query: {
    books: () => booksData,
    book(parent: unknown, args: { title: string; }, context: unknown, info: unknown){
      const { title } = args;
      
      const response = booksData.find((book) => book.title.toLocaleLowerCase() === title.toLocaleLowerCase());

      return response;
    }
  },
};
