import React, { ReactNode, createContext, useState } from "react";
import { TBook } from "utils/types";

type TContext = {
  books: TBook[];
  readingList: TBook[];
  addToReadingList: (Book: TBook) => void;
  removeFromReadingList: (Book: TBook) => void;
};

export const AppContext = createContext<TContext | null>(null);
export default function AppContextProvider({
  children,
  value,
}: {
  children: ReactNode[] | ReactNode;
  value: any;
}) {
  const [readingList, setReadingList] = useState<TBook[]>([]);

  function addToReadingList(Book: TBook): void {
    const bookIsInList = readingList.find(
      (currentBook) => currentBook.title === Book.title
    );

    if (bookIsInList) return;
    setReadingList((currentState): TBook[] => {
      return [...currentState, Book];
    });
  }

  function removeFromReadingList(Book: TBook): void {
    const newReadingList = readingList.filter((currentBook: TBook) => {
      return currentBook.title !== Book.title;
    });

    setReadingList(newReadingList);
  }

  return (
    <AppContext.Provider
      value={{ ...value, readingList, addToReadingList, removeFromReadingList }}
    >
      {children}
    </AppContext.Provider>
  );
}
