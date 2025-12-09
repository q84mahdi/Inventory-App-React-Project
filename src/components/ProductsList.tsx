import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import { useProducts } from "../contexts/ProductsContext";
import type { ProductType } from "../types/ProductType";

const ProductsList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortDateValue, setSortDateValue] = useState("latest");
  const [sortCategoryValue, setSortCategoryValue] = useState("");

  const { products } = useProducts();

  useEffect(() => {
    let result = products;
    result = filterSearch(result);
    result = filterSortDate(result);
    result = filterSortCategory(result);

    setFilteredProducts(result);
  }, [products, searchValue, sortDateValue, sortCategoryValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim().toLocaleLowerCase());
  };
  const handleSortDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortDateValue(e.target.value);
  };
  const handleSortCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCategoryValue(e.target.value);
  };

  const filterSearch = (array: ProductType[]) => {
    return array.filter((product) =>
      product.title.trim().toLocaleLowerCase().includes(searchValue)
    );
  };
  const filterSortDate = (array: ProductType[]) => {
    return array.sort((a, b) => {
      if (sortDateValue === "latest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sortDateValue === "earliest") {
        return new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
      } else return -1;
    });
  };
  const filterSortCategory = (array: ProductType[]) => {
    if (sortCategoryValue === "") {
      return array;
    } else {
      return array.filter((product) => product.category === sortCategoryValue);
    }
  };

  return (
    <div className="flex flex-col gap-y-3 pb-6">
      <h2 className="text-slate-300 text-xl font-bold">Products List</h2>

      {/* search bar */}
      <SearchBar searchValue={searchValue} onSearch={handleSearch} />

      {/* sort bar*/}
      <SortBar
        sortDate={sortDateValue}
        sortCategory={sortCategoryValue}
        onSortDate={handleSortDate}
        onSortCategory={handleSortCategory}
      />

      {/* products list*/}
      <div className="flex flex-col overflow-x-auto ">
        {filteredProducts.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductsList;
