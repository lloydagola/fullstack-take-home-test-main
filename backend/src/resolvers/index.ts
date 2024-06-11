import { GraphQLResolveInfo } from 'graphql/type';
import { booksData } from '../data/books';
import { TBook } from '../types/types';

export const resolvers = {
  Query: {
   
    books(parent: TBook[], args: { title: string; }, context: unknown, info: GraphQLResolveInfo){
      const { title } = args;

      if(!title) return booksData;
      
      const response = booksData.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));

      return response;
    }
  },
};
