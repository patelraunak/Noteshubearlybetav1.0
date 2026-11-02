import React from 'react';
import {
  UploadCloud,
  Compass,
  Bookmark as BookmarkIcon,
  ArrowRight,
  Clock,
  Layers,
  FileText,
  Sparkles,
  Cpu,
  Code2,
  Sigma,
  Atom,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import {
  Bookmark,
  Category,
  NavigationPage,
  Note,
  RecentlyViewedEntry,
  User,
} from '../types';
import { NoteCard } from '../components/NoteCard';

interface DashboardPageProps {
  user: User;
  allNotes: Note[];
  bookmarks: Bookmark[];
  recentEntries: (RecentlyViewedEntry & { note: Note })[];
  categories: (Category & { noteCount: number })[];
  onNavigate: (page: NavigationPage) => void;
  onOpenNote: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectTag: (tag: string) => void;
}

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  Code2,
  Sigma,
  Layers,
  Atom,
  Briefcase,
  BookOpen,
};

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  allNotes,
  bookmarks,
  recentEntries,
  categories,
  onNavigate,
  onOpenNote,
  onToggleBookmark,
  onSelectCategory,
  onSelectTag,
}) => {
  const bookmarkedIds = new Set(bookmarks.map((b) => b.noteId));

  // Continue learning: combine recent entries with bookmarked revision status
  const continueLearningItems = recentEntries.slice(0, 3).map((entry) => {
    const bm = bookmarks.find((b) => b.noteId === entry.noteId);
    return {
      ...entry,
      revisionStatus: bm?.revisionStatus || 'reviewing',
    };
  });

  // Recommended notes: highest rated notes in student's semester or CS/Math core
  const recommendedNotes = [...allNotes]
    .sort((a, b) => b.rating - a.rating || b.viewsCount - a.viewsCount)
    .slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner + Quick Actions */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1.5">
            {user.university} · {user.department} · {user.semester}
          </p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight text-balance">
            Welcome back, {user.name.split(' ')[0]}. Ready for your next study session?
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Your centralized academic hub for lecture notes, formula sheets, and exam revision. Upload new study materials or pick up right where you left off.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('upload')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 shadow-xs whitespace-nowrap"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Notes</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Resources</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('bookmarks')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            <BookmarkIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Open Bookmarks</span>
          </button>
        </div>
      </section>

      {/* Quick Statistics Strip (4 KPI Cards with Tabular Numerals) */}
      <section aria-label="Workspace statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          onClick={() => onNavigate('explore')}
          className="text-left bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Notes</span>
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-2">
            {allNotes.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verified & community resources
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('bookmarks')}
          className="text-left bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Bookmarked Notes</span>
            <BookmarkIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-2">
            {bookmarks.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organized in study folders
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('recent')}
          className="text-left bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Recently Viewed</span>
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-2">
            {recentEntries.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Active reading history
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('categories')}
          className="text-left bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition-colors"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Available Categories</span>
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-2">
            {categories.length}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Core academic disciplines
          </p>
        </button>
      </section>

      {/* Continue Learning & Recently Accessed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning (7 cols) */}
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                  Continue Learning
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Resume your active multi-page study documents right where you stopped
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('recent')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Full History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {continueLearningItems.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No recently opened notes yet. Open any note to track your reading progress.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-medium"
                >
                  Browse Study Notes
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {continueLearningItems.map(({ note, lastAccessedAt, lastPageRead, progressPercent }) => (
                  <div
                    key={note.id}
                    onClick={() => onOpenNote(note.id)}
                    className="py-3.5 first:pt-0 last:pb-0 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {note.subject}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{note.unit}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{lastAccessedAt}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate mt-0.5">
                        {note.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-28">
                        <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400 mb-1">
                          <span>
                            Pg {lastPageRead}/{note.pageCount}
                          </span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenNote(note.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors whitespace-nowrap"
                      >
                        Resume
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming AI Study Assistant Banner inside Dashboard */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>
                Preview upcoming <strong>AI Summaries, Flashcards & Exam Prep</strong> tabs inside any note reader.
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenNote(allNotes[0]?.id || 'note_os_01')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap shrink-0"
            >
              Try AI UI Preview →
            </button>
          </div>
        </section>

        {/* Popular Categories (5 cols) */}
        <section className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                Popular Categories
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Explore curated notes organized by academic department
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('categories')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>All ({categories.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {categories.slice(0, 5).map((cat) => {
              const Icon = CATEGORY_ICONS[cat.iconName] || BookOpen;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className="w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all flex items-center justify-between gap-3 text-left group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {cat.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {cat.subjects.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono tabular-nums text-xs text-slate-500 dark:text-slate-400 shrink-0">
                    {cat.noteCount} {cat.noteCount === 1 ? 'note' : 'notes'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recommended Notes Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
              Recommended Study Resources
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Highest-rated notes across Operating Systems, DBMS, Computer Networks, DSA, and Mathematics
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore all {allNotes.length} notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isBookmarked={bookmarkedIds.has(note.id)}
              onOpen={onOpenNote}
              onToggleBookmark={onToggleBookmark}
              onTagClick={(tag) => onSelectTag(tag)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
