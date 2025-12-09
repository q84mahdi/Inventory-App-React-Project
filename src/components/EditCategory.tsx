import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useCategories } from "../contexts/CategoriesContext";
import type { CategoryType } from "../types/CategoryType";

interface EditCategoryProps {
  category: CategoryType;
  SetEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  category,
  SetEditOpen,
}) => {
  const [editCategoryFormData, setEditCategoryFormData] = useState({
    title: category.title,
    description: category.description,
  });

  const { categories, setCategories } = useCategories();

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditCategoryFormData({ ...editCategoryFormData, [name]: value });
  };

  const cancelHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    SetEditOpen(false);
  };

  const editCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    let selectedCategory = categories.find((item) => item.id === category.id)!;
    selectedCategory.title = editCategoryFormData.title;
    selectedCategory.description = editCategoryFormData.description;
    selectedCategory.createdAt = new Date().toISOString();

    const filteredProducts = categories.filter(
      (item) => item.id !== category.id
    );

    setCategories([...filteredProducts, selectedCategory]);

    SetEditOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        label="Title"
        id="category-title"
        name="title"
        value={editCategoryFormData.title}
        onChange={changeHandler}
      />

      <div>
        <label
          htmlFor="category-description"
          className="text-slate-300 block mb-1"
        >
          Description
        </label>
        <textarea
          className="bg-transparent border border-slate-500 text-slate-400 rounded-xl w-full py-1"
          name="description"
          onChange={changeHandler}
          value={editCategoryFormData.description}
        ></textarea>
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <Button onClick={cancelHandler} style="btn--secondary" text="Cancel" />

        <Button
          onClick={editCategoryHandler}
          style="btn--primary"
          text="Add Category"
          disabled={
            editCategoryFormData.title === "" ||
            editCategoryFormData.description === "" ||
            (editCategoryFormData.title === category.title &&
              editCategoryFormData.description === category.description)
          }
        />
      </div>
    </div>
  );
};
export default EditCategory;
