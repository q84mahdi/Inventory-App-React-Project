import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { CategoryType } from "../types/CategoryType";

// Context Type
interface CategoriesContextType {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}

// Context
const CategoriesContext = createContext({} as CategoriesContextType);

// Context Provider
export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useLocalStorage<CategoryType[]>(
    "categories",
    []
  );

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

// Context Hook
export function useCategories() {
  const context = useContext(CategoriesContext);

  if (context === undefined)
    throw new Error("CategoriesContext was used outside of CategoriesProvider");

  return context;
}
