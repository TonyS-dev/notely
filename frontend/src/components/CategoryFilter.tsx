// frontend/src/components/CategoryFilter.tsx
import { useCategories } from '../hooks/useCategories';

interface CategoryFilterProps {
  selectedCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategoryFilter = ({
  selectedCategoryId,
  onCategoryChange,
}: CategoryFilterProps) => {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return <div className="category-filter-loading">Loading categories...</div>;
  }

  return (
    <div className="category-filter">
      <label className="filter-label">Filter by category:</label>
      <div className="category-filter-buttons">
        <button
          className={`filter-btn ${selectedCategoryId === null ? 'active' : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          All Notes
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${
              selectedCategoryId === category.id ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
