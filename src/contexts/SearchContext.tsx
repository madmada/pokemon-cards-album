import { Dispatch, SetStateAction, createContext, useContext, PropsWithChildren, useState } from 'react';

interface SearchContextInterface {
  searchValue: string;
  setSearchValue: Dispatch<
    SetStateAction<string>
  >;
}

const SearchContext = createContext<SearchContextInterface | null>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useState<string>('');

  const value: SearchContextInterface = { searchValue: state, setSearchValue: dispatch };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === null) {
    throw new Error(
      'use SearchContext must be used within a SearchContextProvider provider',
    );
  }

  return context;
};
