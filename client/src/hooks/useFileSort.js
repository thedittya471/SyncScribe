import { useMemo, useState } from 'react';

export const sortOptions = [
  'Date Created (newest)',
  'Date Created (oldest)',
  'Name (A-Z)',
  'Name (Z-A)',
  'Size (largest)',
  'Size (smallest)',
];

export const useFileSort = (files) => {
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const sortedFiles = useMemo(() => {
    let result = [...files];
    
    switch (sortBy) {
      case 'Name (A-Z)':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Size (largest)':
        result.sort((a, b) => b.size - a.size);
        break;
      case 'Size (smallest)':
        result.sort((a, b) => a.size - b.size);
        break;
      case 'Date Created (oldest)':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'Date Created (newest)':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    
    return result;
  }, [files, sortBy]);

  return { sortedFiles, sortBy, setSortBy, sortOptions };
};
