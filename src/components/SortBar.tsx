import { useCategories } from "../contexts/CategoriesContext";

interface SortBarProps {
  sortDate: string;
  sortCategory: string;
  onSortDate: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortBar: React.FC<SortBarProps> = ({
  sortDate,
  sortCategory,
  onSortDate,
  onSortCategory,
}) => {
  const { categories } = useCategories();

  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-300">Sort</span>

      <div className="flex items-center gap-x-4">
        <select
          value={sortCategory}
          onChange={onSortCategory}
          className="bg-transparent border border-slate-500 text-slate-400 rounded-xl py-1"
        >
          <option className="bg-slate-600 text-slate-300" value="">
            All
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              className="bg-slate-600 text-slate-300"
              value={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>

        <select
          value={sortDate}
          onChange={onSortDate}
          className="bg-transparent border border-slate-500 text-slate-400 rounded-xl py-1"
        >
          <option className="bg-slate-600 text-slate-300" value="latest">
            Latest
          </option>
          <option className="bg-slate-600 text-slate-300" value="earliest">
            Earliest
          </option>
        </select>
      </div>
    </div>
  );
};
export default SortBar;
