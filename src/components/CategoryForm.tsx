import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useCategories } from "../contexts/CategoriesContext";

const CategoryForm: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  const { setCategories } = useCategories();

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const cancelHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsShown(false);
    setCategoryFormData({
      title: "",
      description: "",
    });
  };

  const addNewCategoryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const newCategory = {
      ...categoryFormData,
      createdAt: new Date().toISOString(),
      id: new Date().getTime(),
    };

    setCategories((prevState) => [...prevState, newCategory]);
    setCategoryFormData({
      title: "",
      description: "",
    });
  };

  return (
    <div className="mb-6">
      <Button
        onClick={() => setIsShown(true)}
        style={`${isShown && "hidden"} btn--text`}
        text="Add New Category ?"
      />

      <div className={`${isShown || "hidden"}`}>
        <h2 className="text-slate-300 font-bold text-xl mb-3">
          Add New Category
        </h2>

        <form className="flex flex-col bg-slate-700 rounded-xl p-4 gap-y-4">
          <Input
            label="Title"
            id="category-title"
            name="title"
            value={categoryFormData.title}
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
              id="category-description"
              className="bg-transparent border border-slate-500 text-slate-400 rounded-xl w-full py-1"
              name="description"
              onChange={changeHandler}
              value={categoryFormData.description}
            ></textarea>
          </div>

          <div className="flex items-center justify-between gap-x-4">
            <Button
              onClick={cancelHandler}
              style="btn--secondary"
              text="Cancel"
            />

            <Button
              onClick={addNewCategoryHandler}
              style="btn--primary"
              text="Add Category"
              disabled={
                categoryFormData.title === "" ||
                categoryFormData.description === ""
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
