import React from 'react';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  SlidersHorizontal,
  FolderOpen,
  UploadCloud,
} from 'lucide-react';
import {
  Bookmark,
  Category,
  FileType,
  NavigationPage,
  Note,
  SortOption,
} from '../types';
import { NoteCard } from '../components/NoteCard';

interface ExploreNotesPageProps {
  notes: Note[];
  bookmarks: Bookmark[];
  categories: (Category & { noteCount: number })[];
  subjects: string[];
  semesters: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (catId: string) => void;
  selectedSubject: string;
  onSubjectChange: (sub: string) => void;
  selectedSemester: string;
  onSemesterChange: (sem: string) => void;
  selectedFileType: FileType | 'ALL';
  onFileTypeChange: (ft: FileType | 'ALL') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onClearFilters: () => void;
  onOpenNote: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const ExploreNotesPage: React.FC<ExploreNotesPageProps> = ({
  notes,
  bookmarks,
  categories,
  subjects,
  semesters,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubject,
  onSubjectChange,
  selectedSemester,
  onSemesterChange,
  selectedFileType,
  onFileTypeChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onClearFilters,
  onOpenNote,
  onToggleBookmark,
  onNavigate,
}) => {
  const bookmarkedIds = new Set(bookmarks.map((b) => b.noteId));

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'ALL' ||
    selectedSubject !== 'ALL' ||
    selectedSemester !== 'ALL' ||
    selectedFileType !== 'ALL' ||
    sortBy !== 'newest';

  const fileTypes: (FileType | 'ALL')[] = ['ALL', 'PDF', 'DOCX', 'PPTX', 'MD'];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Explore Study Notes
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Discover lecture notes, solved problem sets, and revision guides across all subjects and semesters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('upload')}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Contribute Notes</span>
        </button>
      </div>

      {/* Search & Multi-Faceted Filter Toolbar */}
      <section
        aria-label="Filter and sort study materials"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4"
      >
        {/* Top Row: Search input + File Type segmented buttons + Grid/List toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter by title, topic, algorithm, or tag (e.g., Banker, BCNF, OSPF, SVD)..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
            {/* Segmented File Type Filter Controls */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {fileTypes.map((ft) => (
                <button
                  key={ft}
                  type="button"
                  onClick={() => onFileTypeChange(ft)}
                  className={`px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedFileType === ft
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {ft === 'ALL' ? 'All Formats' : ft}
                </button>
              ))}
            </div>

            {/* Grid / List View Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="List view"
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Dropdown Filters (Category, Subject, Semester, Sort) + Reset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.noteCount})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => onSemesterChange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Semesters</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">Newest Uploaded</option>
              <option value="popular">Most Popular (Views & Downloads)</option>
              <option value="highest_rated">Highest Rated</option>
              <option value="title_asc">Alphabetical (A–Z)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              disabled={!hasActiveFilters}
              onClick={onClearFilters}
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors inline-flex items-center justify-center gap-1.5 ${
                hasActiveFilters
                  ? 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>
            Showing <strong className="font-mono tabular-nums text-slate-900 dark:text-white">{notes.length}</strong>{' '}
            {notes.length === 1 ? 'study resource' : 'study resources'}
          </span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Notes Grid / List or Empty State */}
      {notes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto my-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
            No matching study notes found
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            No notes matched your current combination of search terms and filters. Try clearing your filters or upload a new resource for this topic.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Clear All Filters
            </button>
            <button
              type="button"
              onClick={() => onNavigate('upload')}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Upload Notes
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isBookmarked={bookmarkedIds.has(note.id)}
              viewMode="grid"
              onOpen={onOpenNote}
              onToggleBookmark={onToggleBookmark}
              onTagClick={(tag) => onSearchChange(tag)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isBookmarked={bookmarkedIds.has(note.id)}
              viewMode="list"
              onOpen={onOpenNote}
              onToggleBookmark={onToggleBookmark}
              onTagClick={(tag) => onSearchChange(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
