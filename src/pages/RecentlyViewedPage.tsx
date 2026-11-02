import React from 'react';
import {
  History,
  Trash2,
  ArrowUpRight,
  Compass,
  Bookmark as BookmarkIcon,
  FileText,
} from 'lucide-react';
import { Bookmark, NavigationPage, Note, RecentlyViewedEntry } from '../types';

interface RecentlyViewedPageProps {
  recentEntries: (RecentlyViewedEntry & { note: Note })[];
  bookmarks: Bookmark[];
  onOpenNote: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onClearHistory: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const RecentlyViewedPage: React.FC<RecentlyViewedPageProps> = ({
  recentEntries,
  bookmarks,
  onOpenNote,
  onToggleBookmark,
  onClearHistory,
  onNavigate,
}) => {
  const bookmarkedIds = new Set(bookmarks.map((b) => b.noteId));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Recently Viewed Notes
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Chronological log of study materials you recently opened, including your last read page and progress.
          </p>
        </div>

        {recentEntries.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 transition-colors inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Reading History</span>
          </button>
        )}
      </div>

      {recentEntries.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto">
          <History className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
            No reading history recorded yet
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Whenever you open a note in the interactive reader, it will appear here so you can jump back in immediately.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Study Notes</span>
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {recentEntries.map(({ note, lastAccessedAt, lastPageRead, progressPercent }) => {
            const isBookmarked = bookmarkedIds.has(note.id);
            return (
              <div
                key={note.id}
                onClick={() => onOpenNote(note.id)}
                className="p-4 sm:p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {note.subject}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{note.unit}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">Accessed {lastAccessedAt}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate mt-0.5">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="font-mono">{note.fileType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{note.fileSize}</span>
                      <span aria-hidden="true">·</span>
                      <span>By {note.uploaderName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="w-28 hidden md:block">
                    <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400 mb-1">
                      <span>
                        Pg {lastPageRead}/{note.pageCount}
                      </span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(note.id, e);
                    }}
                    className={`p-2 rounded-xl border transition-colors ${
                      isBookmarked
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700'
                    }`}
                    title={isBookmarked ? 'Bookmarked' : 'Bookmark note'}
                    aria-label="Toggle bookmark"
                  >
                    <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenNote(note.id);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Open Note</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
