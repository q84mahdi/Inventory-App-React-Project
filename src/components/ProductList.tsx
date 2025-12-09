import { useState } from "react";
import Modal from "../ui/Modal";
import EditProduct from "./EditProduct";
import { useCategories } from "../contexts/CategoriesContext";
import { useProducts } from "../contexts/ProductsContext";
import type { ProductType } from "../types/ProductType";

interface ProductListProps {
  product: ProductType;
}

const ProductList: React.FC<ProductListProps> = ({ product }) => {
  const [editOpen, SetEditOpen] = useState(false);

  const { categories } = useCategories();

  const { setProducts } = useProducts();

  const category =
    categories.find((c) => c.id.toString() === product.category)?.title || "";

  const handleDeleteProduct = () => {
    setProducts((prevState) =>
      prevState.filter((item) => item.id !== product.id)
    );
  };

  return (
    <div className="flex flex-row items-center justify-between min-w-[350px] pb-3 gap-x-6">
      <span className="text-slate-300 whitespace-nowrap">{product.title}</span>

      <div className="flex  flex-row items-center gap-x-2">
        <span className="text-slate-300 text-sm">
          {new Date(product.createdAt).toLocaleDateString()}
        </span>

        <span className="flex items-center justify-center text-slate-300 text-sm border border-slate-400 rounded-2xl px-3 h-7 whitespace-nowrap">
          {category}
        </span>

        <span className="flex items-center justify-center text-slate-300 text-sm border border-slate-400 rounded-full min-w-7 px-2 h-7 whitespace-nowrap">
          {product.quantity}
        </span>

        <button
          onClick={() => SetEditOpen(true)}
          className="flex items-center justify-center text-green-400 text-sm border border-green-400 rounded-2xl px-2 h-7"
        >
          edit
        </button>
        <Modal
          title="Edit Product"
          open={editOpen}
          onClose={() => SetEditOpen(false)}
        >
          <EditProduct SetEditOpen={SetEditOpen} product={product} />
        </Modal>

        <button
          onClick={handleDeleteProduct}
          className="flex items-center justify-center text-red-400 text-sm border border-red-400 rounded-2xl px-2 h-7"
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default ProductList;
