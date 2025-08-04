// frontend/src/components/CategorySelector.tsx
import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';

interface CategorySelectorProps {
  selectedCategoryIds: string[];
  onCategoriesChange: (categoryIds: string[]) => void;
}

export const CategorySelector = ({
  selectedCategoryIds,
  onCategoriesChange,
}: CategorySelectorProps) => {
  const { categories, createCategory } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Filter categories that are selected by ID
  const selectedCategories = categories.filter((cat) =>
    selectedCategoryIds.includes(cat.id),
  );

  const availableCategories = categories.filter(
    (cat) => !selectedCategoryIds.includes(cat.id),
  );

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    setIsCreating(true);
    const newCategory = await createCategory(newCategoryName.trim());
    if (newCategory) {
      onCategoriesChange([...selectedCategoryIds, newCategory.id]);
      setNewCategoryName('');
    }
    setIsCreating(false);
  };

  const handleSelectCategory = (categoryId: string) => {
    onCategoriesChange([...selectedCategoryIds, categoryId]);
  };

  const handleRemoveCategory = (categoryId: string) => {
    onCategoriesChange(selectedCategoryIds.filter((id) => id !== categoryId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <div className="category-selector">
      <label className="category-label">Categories</label>

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="selected-categories">
          {selectedCategories.map((category) => (
            <div key={category.id} className="category-tag">
              {category.name}
              <button
                type="button"
                className="remove-category"
                onClick={() => handleRemoveCategory(category.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Category */}
      <div className="category-input-group">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new category..."
          disabled={isCreating}
          className="category-input"
        />
        <button
          type="button"
          className="add-category-btn"
          onClick={handleAddCategory}
          disabled={isCreating || !newCategoryName.trim()}
        >
          {isCreating ? '...' : 'Add'}
        </button>
      </div>

      {/* Available Categories */}
      {availableCategories.length > 0 && (
        <div className="available-categories">
          <p className="available-categories-label">Available categories:</p>
          <div className="available-categories-list">
            {availableCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="available-category-btn"
                onClick={() => handleSelectCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
