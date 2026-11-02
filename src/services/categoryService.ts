import { Category, Note } from '../types';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { notesService } from './notesService';

/**
 * Dedicated categoryService for retrieving academic domains and dynamically computing note counts.
 */
export const categoryService = {
  async getCategoriesWithCounts(): Promise<(Category & { noteCount: number })[]> {
    const notes = await notesService.getAllNotes();
    return INITIAL_CATEGORIES.map((category) => {
      const count = notes.filter((n) => n.categoryId === category.id).length;
      return {
        ...category,
        noteCount: count,
      };
    });
  },

  async getCategoryById(categoryId: string): Promise<(Category & { noteCount: number }) | undefined> {
    const all = await this.getCategoriesWithCounts();
    return all.find((c) => c.id === categoryId);
  },

  async getNotesByCategory(categoryId: string): Promise<Note[]> {
    return notesService.queryNotes({ categoryId });
  },
};
