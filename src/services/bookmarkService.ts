import { Bookmark, RevisionStatus, StudyCollection } from '../types';
import { INITIAL_BOOKMARKS, INITIAL_COLLECTIONS } from '../data/mockData';

const BOOKMARKS_STORAGE_KEY = 'noteshub_bookmarks_v1';
const COLLECTIONS_STORAGE_KEY = 'noteshub_collections_v1';

function loadBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKMARKS));
      return INITIAL_BOOKMARKS;
    }
    return JSON.parse(raw) as Bookmark[];
  } catch {
    return INITIAL_BOOKMARKS;
  }
}

function saveBookmarks(bookmarks: Bookmark[]): void {
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save bookmarks:', e);
  }
}

function loadCollections(): StudyCollection[] {
  try {
    const raw = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(INITIAL_COLLECTIONS));
      return INITIAL_COLLECTIONS;
    }
    return JSON.parse(raw) as StudyCollection[];
  } catch {
    return INITIAL_COLLECTIONS;
  }
}

/**
 * Dedicated bookmarkService for managing saved study materials, revision status, and collections.
 */
export const bookmarkService = {
  async getBookmarks(): Promise<Bookmark[]> {
    return loadBookmarks();
  },

  async getCollections(): Promise<StudyCollection[]> {
    return loadCollections();
  },

  async createCollection(name: string, description: string): Promise<StudyCollection> {
    const collections = loadCollections();
    const newCol: StudyCollection = {
      id: `col_${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Custom student revision folder',
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...collections, newCol];
    localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(updated));
    return newCol;
  },

  async deleteCollection(collectionId: string): Promise<void> {
    const collections = loadCollections().filter((c) => c.id !== collectionId);
    localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));

    const fallbackId = collections[0]?.id || 'col_midterm';
    const bookmarks = loadBookmarks().map((b) =>
      b.collectionId === collectionId ? { ...b, collectionId: fallbackId } : b
    );
    saveBookmarks(bookmarks);
  },

  async toggleBookmark(
    noteId: string,
    defaultCollectionId = 'col_midterm'
  ): Promise<{ bookmarked: boolean; bookmark?: Bookmark }> {
    const bookmarks = loadBookmarks();
    const existing = bookmarks.find((b) => b.noteId === noteId);
    if (existing) {
      const updated = bookmarks.filter((b) => b.noteId !== noteId);
      saveBookmarks(updated);
      return { bookmarked: false };
    }

    const newBookmark: Bookmark = {
      id: `bm_${Date.now()}`,
      noteId,
      createdAt: new Date().toISOString().split('T')[0],
      collectionId: defaultCollectionId,
      revisionStatus: 'to_read',
      personalNote: '',
      lastReviewedAt: 'Added just now',
    };
    saveBookmarks([newBookmark, ...bookmarks]);
    return { bookmarked: true, bookmark: newBookmark };
  },

  async updateBookmarkDetails(
    noteId: string,
    updates: Partial<Pick<Bookmark, 'collectionId' | 'revisionStatus' | 'personalNote'>>
  ): Promise<Bookmark | undefined> {
    const bookmarks = loadBookmarks();
    const index = bookmarks.findIndex((b) => b.noteId === noteId);
    if (index === -1) return undefined;

    const updated: Bookmark = {
      ...bookmarks[index],
      ...updates,
      lastReviewedAt: 'Updated just now',
    };
    bookmarks[index] = updated;
    saveBookmarks(bookmarks);
    return updated;
  },

  async updateRevisionStatus(noteId: string, status: RevisionStatus): Promise<Bookmark | undefined> {
    return this.updateBookmarkDetails(noteId, { revisionStatus: status });
  },

  async removeBookmarksForNote(noteId: string): Promise<void> {
    const bookmarks = loadBookmarks().filter((b) => b.noteId !== noteId);
    saveBookmarks(bookmarks);
  },
};
