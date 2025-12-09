import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { ProductType } from "../types/ProductType";

// Context Type
interface ProductsContextType {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

// Context
const ProductsContext = createContext({} as ProductsContextType);

// Context Provider
export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<ProductType[]>(
    "products",
    []
  );

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

// Context Hook
export function useProducts() {
  const context = useContext(ProductsContext);

  if (context === undefined)
    throw new Error("ProductsContext was used outside of ProductsProvider");

  return context;
}
