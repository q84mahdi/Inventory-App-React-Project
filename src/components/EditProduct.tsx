import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import SelectCategory from "./SelectCategory";
import { useProducts } from "../contexts/ProductsContext";
import type { ProductType } from "../types/ProductType";

interface EditProductProps {
  SetEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: ProductType;
}

const EditProduct: React.FC<EditProductProps> = ({ SetEditOpen, product }) => {
  const [editProductFormData, setEditProductFormData] = useState({
    title: product.title,
    quantity: product.quantity,
    category: product.category,
  });

  const { products, setProducts } = useProducts();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditProductFormData({ ...editProductFormData, [name]: value });
  };

  const cancelHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    SetEditOpen(false);
  };

  const editProductHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let selectedProduct = products.find((item) => item.id === product.id)!;
    selectedProduct.title = editProductFormData.title;
    selectedProduct.quantity = editProductFormData.quantity;
    selectedProduct.category = editProductFormData.category;
    selectedProduct.createdAt = new Date().toISOString();

    const filteredProducts = products.filter((item) => item.id !== product.id);

    setProducts([...filteredProducts, selectedProduct]);

    SetEditOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        label="Title"
        id="product-title"
        name="title"
        value={editProductFormData.title}
        onChange={changeHandler}
      />

      <Input
        label="Quantity"
        id="product-quantity"
        name="quantity"
        value={editProductFormData.quantity.toString()}
        onChange={changeHandler}
        type="number"
      />

      <SelectCategory
        productFormData={editProductFormData}
        setProductFormData={setEditProductFormData}
      />

      <div className="flex items-center justify-between gap-x-4">
        <Button onClick={cancelHandler} text="Cancel" style="btn--secondary" />

        <Button
          onClick={editProductHandler}
          style="btn--primary"
          text="Add Product"
          disabled={
            editProductFormData.title === "" ||
            editProductFormData.quantity <= 0 ||
            editProductFormData.category === "" ||
            (editProductFormData.title === product.title &&
              editProductFormData.quantity === product.quantity &&
              editProductFormData.category === product.category)
          }
        />
      </div>
    </div>
  );
};
export default EditProduct;
