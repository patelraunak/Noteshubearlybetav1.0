import { Note, Review, SortOption, FileType, RecentlyViewedEntry } from '../types';
import { INITIAL_NOTES, INITIAL_REVIEWS, INITIAL_RECENTLY_VIEWED } from '../data/mockData';

const NOTES_STORAGE_KEY = 'noteshub_notes_v3';
const REVIEWS_STORAGE_KEY = 'noteshub_reviews_v3';
const RECENT_STORAGE_KEY = 'noteshub_recent_v3';
const SCRATCHPAD_STORAGE_KEY = 'noteshub_scratchpad_v3';

function getStoredNotes(): Note[] {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(INITIAL_NOTES));
      return INITIAL_NOTES;
    }
    return JSON.parse(raw) as Note[];
  } catch {
    return INITIAL_NOTES;
  }
}

function saveStoredNotes(notes: Note[]): void {
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to persist notes in localStorage:', e);
  }
}

export interface NoteFilterParams {
  search?: string;
  subject?: string;
  categoryId?: string;
  semester?: string;
  fileType?: FileType | 'ALL';
  sortBy?: SortOption;
  uploaderId?: string;
}

/**
 * Dedicated notesService designed for drop-in replacement with FastAPI endpoints
 * (e.g., GET /api/v1/notes, GET /api/v1/notes/{id}, PATCH /api/v1/notes/{id}, DELETE /api/v1/notes/{id})
 */
export const notesService = {
  async getAllNotes(): Promise<Note[]> {
    return getStoredNotes();
  },

  async queryNotes(params: NoteFilterParams): Promise<Note[]> {
    const all = getStoredNotes();
    const q = (params.search || '').trim().toLowerCase();

    const filtered = all.filter((note) => {
      if (params.uploaderId && note.uploaderId !== params.uploaderId) {
        return false;
      }
      if (params.categoryId && params.categoryId !== 'ALL' && note.categoryId !== params.categoryId) {
        return false;
      }
      if (params.subject && params.subject !== 'ALL' && note.subject !== params.subject) {
        return false;
      }
      if (params.semester && params.semester !== 'ALL' && note.semester !== params.semester) {
        return false;
      }
      if (params.fileType && params.fileType !== 'ALL' && note.fileType !== params.fileType) {
        return false;
      }
      if (q) {
        const matchesTitle = note.title.toLowerCase().includes(q);
        const matchesSubject = note.subject.toLowerCase().includes(q);
        const matchesUnit = note.unit.toLowerCase().includes(q);
        const matchesDesc = note.description.toLowerCase().includes(q);
        const matchesTags = note.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesSubject || matchesUnit || matchesDesc || matchesTags;
      }
      return true;
    });

    const sortBy = params.sortBy || 'newest';
    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return b.uploadDate.localeCompare(a.uploadDate);
      }
      if (sortBy === 'popular') {
        return b.viewsCount + b.downloadsCount * 2 - (a.viewsCount + a.downloadsCount * 2);
      }
      if (sortBy === 'highest_rated') {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.ratingCount - a.ratingCount;
      }
      if (sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  },

  async getNoteById(noteId: string): Promise<Note | undefined> {
    const notes = getStoredNotes();
    return notes.find((n) => n.id === noteId);
  },

  async createNote(newNote: Note): Promise<Note> {
    const notes = getStoredNotes();
    const updated = [newNote, ...notes];
    saveStoredNotes(updated);
    return newNote;
  },

  async updateNote(
    noteId: string,
    updates: Partial<Pick<Note, 'title' | 'subject' | 'categoryId' | 'semester' | 'unit' | 'description' | 'tags'>>
  ): Promise<Note | undefined> {
    const notes = getStoredNotes();
    const index = notes.findIndex((n) => n.id === noteId);
    if (index === -1) return undefined;

    const updatedNote: Note = {
      ...notes[index],
      ...updates,
    };
    notes[index] = updatedNote;
    saveStoredNotes(notes);
    return updatedNote;
  },

  async deleteNote(noteId: string): Promise<boolean> {
    const notes = getStoredNotes();
    const filtered = notes.filter((n) => n.id !== noteId);
    if (filtered.length === notes.length) return false;
    saveStoredNotes(filtered);
    return true;
  },

  async incrementDownload(noteId: string): Promise<Note | undefined> {
    const notes = getStoredNotes();
    const index = notes.findIndex((n) => n.id === noteId);
    if (index === -1) return undefined;
    notes[index] = {
      ...notes[index],
      downloadsCount: notes[index].downloadsCount + 1,
    };
    saveStoredNotes(notes);
    return notes[index];
  },

  async getDistinctSubjects(): Promise<string[]> {
    const notes = getStoredNotes();
    const set = new Set<string>(notes.map((n) => n.subject));
    return Array.from(set).sort();
  },

  async getDistinctSemesters(): Promise<string[]> {
    return [
      'Semester 1',
      'Semester 2',
      'Semester 3',
      'Semester 4',
      'Semester 5',
      'Semester 6',
      'Semester 7',
      'Semester 8',
    ];
  },

  async getReviewsForNote(noteId: string): Promise<Review[]> {
    try {
      const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
      const all: Review[] = raw ? JSON.parse(raw) : INITIAL_REVIEWS;
      if (!raw) {
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      }
      return all.filter((r) => r.noteId === noteId);
    } catch {
      return INITIAL_REVIEWS.filter((r) => r.noteId === noteId);
    }
  },

  async addReview(
    noteId: string,
    rating: number,
    comment: string,
    userName: string,
    userRole: string
  ): Promise<{ review: Review; updatedNote?: Note }> {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const all: Review[] = raw ? JSON.parse(raw) : INITIAL_REVIEWS;

    const newReview: Review = {
      id: `rev_${Date.now()}`,
      noteId,
      userId: 'usr_student_01',
      userName,
      userRole,
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedReviews = [newReview, ...all];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));

    const notes = getStoredNotes();
    const idx = notes.findIndex((n) => n.id === noteId);
    let updatedNote: Note | undefined;
    if (idx !== -1) {
      const current = notes[idx];
      const totalScore = current.rating * current.ratingCount + rating;
      const newCount = current.ratingCount + 1;
      const newAvg = Number((totalScore / newCount).toFixed(1));
      updatedNote = {
        ...current,
        rating: newAvg,
        ratingCount: newCount,
      };
      notes[idx] = updatedNote;
      saveStoredNotes(notes);
    }

    return { review: newReview, updatedNote };
  },

  async getRecentlyViewed(): Promise<(RecentlyViewedEntry & { note: Note })[]> {
    const notes = getStoredNotes();
    let entries: RecentlyViewedEntry[] = INITIAL_RECENTLY_VIEWED;
    try {
      const raw = localStorage.getItem(RECENT_STORAGE_KEY);
      if (raw) {
        entries = JSON.parse(raw);
      } else {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(INITIAL_RECENTLY_VIEWED));
      }
    } catch {
      entries = INITIAL_RECENTLY_VIEWED;
    }

    return entries
      .map((entry) => {
        const note = notes.find((n) => n.id === entry.noteId);
        return note ? { ...entry, note } : null;
      })
      .filter((item): item is RecentlyViewedEntry & { note: Note } => item !== null);
  },

  async recordNoteView(noteId: string, pageRead = 1): Promise<void> {
    const notes = getStoredNotes();
    const noteIdx = notes.findIndex((n) => n.id === noteId);
    let pageCount = 1;
    if (noteIdx !== -1) {
      pageCount = notes[noteIdx].pageCount || 1;
      notes[noteIdx] = {
        ...notes[noteIdx],
        viewsCount: notes[noteIdx].viewsCount + 1,
      };
      saveStoredNotes(notes);
    }

    let entries: RecentlyViewedEntry[] = INITIAL_RECENTLY_VIEWED;
    try {
      const raw = localStorage.getItem(RECENT_STORAGE_KEY);
      if (raw) entries = JSON.parse(raw);
    } catch {
      // ignore
    }

    const existing = entries.find((e) => e.noteId === noteId);
    const maxPage = Math.max(existing?.lastPageRead || 1, pageRead);
    const progressPercent = Math.min(100, Math.round((maxPage / pageCount) * 100));

    const newEntry: RecentlyViewedEntry = {
      noteId,
      lastAccessedAt: 'Just now',
      lastPageRead: pageRead,
      progressPercent,
    };

    const updated = [newEntry, ...entries.filter((e) => e.noteId !== noteId)].slice(0, 15);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
  },

  async clearRecentlyViewed(): Promise<void> {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify([]));
  },

  getScratchpadForNote(noteId: string): string {
    try {
      const raw = localStorage.getItem(SCRATCHPAD_STORAGE_KEY);
      const map: Record<string, string> = raw ? JSON.parse(raw) : {};
      return map[noteId] || '';
    } catch {
      return '';
    }
  },

  saveScratchpadForNote(noteId: string, text: string): void {
    try {
      const raw = localStorage.getItem(SCRATCHPAD_STORAGE_KEY);
      const map: Record<string, string> = raw ? JSON.parse(raw) : {};
      map[noteId] = text;
      localStorage.setItem(SCRATCHPAD_STORAGE_KEY, JSON.stringify(map));
    } catch {
      // ignore
    }
  },
};
