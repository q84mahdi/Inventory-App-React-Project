import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";
import Modal from "../ui/Modal";
import EditCategory from "./EditCategory";
import { useCategories } from "../contexts/CategoriesContext";
import type { CategoryType } from "../types/CategoryType";
import type { ProductType } from "../types/ProductType";

type ProductInfoType = Omit<ProductType, "createdAt" | "id">;

interface SelectCategoryProps {
  productFormData: ProductInfoType;
  setProductFormData: React.Dispatch<React.SetStateAction<ProductInfoType>>;
  edit: boolean;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  productFormData,
  setProductFormData,
  edit,
}) => {
  const [isShown, setIsShown] = useState(false);
  const [editOpen, SetEditOpen] = useState(false);

  const { categories } = useCategories();

  const changeCategoryHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: CategoryType
  ) => {
    e.preventDefault();
    setIsShown(false);
    setProductFormData({
      ...productFormData,
      category: category.id.toString(),
    });
  };

  return (
    <div>
      <label htmlFor="product-category" className="text-slate-300 block mb-1">
        Category
      </label>

      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsShown(true);
          }}
          className="w-full px-3 py-[6px] border border-slate-500 bg-transparent text-slate-400 rounded-xl focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:ring-offset-0 flex items-center justify-between z-10 relative"
        >
          <div>
            {productFormData.category
              ? categories.find(
                  (c) => c.id.toString() === productFormData.category
                )?.title
              : "select a category ..."}
          </div>
          <HiOutlineChevronDown className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsShown(false);
          }}
          className={`${isShown || "hidden"} inset-0 fixed cursor-default`}
        ></button>

        <div
          className={`${
            isShown || "hidden"
          } bg-slate-600 mt-1 w-full rounded-md overflow-hidden absolute left-0 border border-slate-500`}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={(e) => changeCategoryHandler(e, category)}
              className="text-white px-4 py-1 hover:bg-blue-600 flex items-center justify-between"
            >
              <span>{category.title}</span>

              <button
                onClick={() => SetEditOpen(true)}
                className={edit ? "" : "hidden"}
              >
                <FaEdit className="w-4 h-4 text-green-500" />
              </button>
            </div>
          ))}
        </div>

        <Modal
          title="Edit Category"
          open={editOpen}
          onClose={() => SetEditOpen(false)}
        >
          <EditCategory
            category={
              categories.find(
                (item) => item.id.toString() === productFormData.category
              )!
            }
            SetEditOpen={SetEditOpen}
          />
        </Modal>
      </div>
    </div>
  );
};
export default SelectCategory;
