import type { ReactNode } from "react";
import { CategoriesProvider } from "../contexts/CategoriesContext";
import { ProductsProvider } from "../contexts/ProductsContext";

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CategoriesProvider>
      <ProductsProvider>{children}</ProductsProvider>
    </CategoriesProvider>
  );
}
export default AppProviders;
