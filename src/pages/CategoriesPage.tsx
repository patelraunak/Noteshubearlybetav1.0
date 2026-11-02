import React, { useState } from 'react';
import {
  Cpu,
  Code2,
  Sigma,
  Layers,
  Atom,
  Briefcase,
  BookOpen,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Bookmark, Category, Note } from '../types';
import { NoteCard } from '../components/NoteCard';

interface CategoriesPageProps {
  categories: (Category & { noteCount: number })[];
  allNotes: Note[];
  bookmarks: Bookmark[];
  onOpenNote: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onExploreCategoryInSearch: (categoryId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Code2,
  Sigma,
  Layers,
  Atom,
  Briefcase,
  BookOpen,
};

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  categories,
  allNotes,
  bookmarks,
  onOpenNote,
  onToggleBookmark,
  onExploreCategoryInSearch,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const bookmarkedIds = new Set(bookmarks.map((b) => b.noteId));

  const selectedCategory = categories.find((c) => c.id === activeCategoryId);
  const categoryNotes = activeCategoryId
    ? allNotes.filter((n) => n.categoryId === activeCategoryId)
    : [];

  if (selectedCategory) {
    const Icon = ICON_MAP[selectedCategory.iconName] || BookOpen;
    return (
      <div className="space-y-6 pb-12">
        <button
          type="button"
          onClick={() => setActiveCategoryId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Academic Categories</span>
        </button>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                {selectedCategory.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                {selectedCategory.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-2.5">
                <span>Subjects:</span>
                {selectedCategory.subjects.map((sub, i) => (
                  <React.Fragment key={sub}>
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <span className="font-medium text-slate-700 dark:text-slate-300">{sub}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onExploreCategoryInSearch(selectedCategory.id)}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold whitespace-nowrap"
          >
            Filter in Explore View →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isBookmarked={bookmarkedIds.has(note.id)}
              onOpen={onOpenNote}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
          Academic Categories
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Browse study materials structured by university department and core subject streams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || BookOpen;
          return (
            <article
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono tabular-nums text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {cat.noteCount} {cat.noteCount === 1 ? 'resource' : 'resources'}
                  </span>
                </div>

                <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-slate-400">Key Topics: </span>
                  {cat.popularTopics.join(' · ')}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Explore {cat.name} Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
