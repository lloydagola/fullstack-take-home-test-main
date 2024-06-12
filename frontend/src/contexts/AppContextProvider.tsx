import React, { ReactNode, createContext, useCallback, useState } from "react";
import { TBook, TContext } from "types/types";

export const AppContext = createContext<TContext | null>(null);
export default function AppContextProvider({
  children,
  books,
}: {
  children: ReactNode[] | ReactNode;
  books: TBook[];
}) {
  const [readingList, setReadingList] = useState<TBook[]>([]);

  const addToReadingList = useCallback((Book: TBook): void => {
    const bookIsInList = readingList.find(
      (currentBook) => currentBook.title === Book.title
    );

    if (bookIsInList) return;
    setReadingList((currentState): TBook[] => {
      return [...currentState, Book];
    });
  }, []);

  const removeFromReadingList = useCallback((Book: TBook): void => {
    const newReadingList = readingList.filter((currentBook: TBook) => {
      return currentBook.title !== Book.title;
    });

    setReadingList(newReadingList);
  }, []);

  return (
    <AppContext.Provider
      value={{ books, readingList, addToReadingList, removeFromReadingList }}
    >
      {children}
    </AppContext.Provider>
  );
}
