import React from 'react';
import { Bookmark, Star, FileText, ArrowUpRight, Pencil, Trash2, Download } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  isBookmarked: boolean;
  viewMode?: 'grid' | 'list';
  onOpen: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onTagClick?: (tag: string, e: React.MouseEvent) => void;
  onEdit?: (note: Note, e: React.MouseEvent) => void;
  onDelete?: (note: Note, e: React.MouseEvent) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  isBookmarked,
  viewMode = 'grid',
  onOpen,
  onToggleBookmark,
  onTagClick,
  onEdit,
  onDelete,
}) => {
  if (viewMode === 'list') {
    return (
      <article
        onClick={() => onOpen(note.id)}
        className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          {/* Quiet 1-line metadata kicker (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="font-medium text-indigo-600 dark:text-indigo-400">{note.subject}</span>
            <span aria-hidden="true">·</span>
            <span>{note.unit}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{note.semester}</span>
            {note.isSimulatedUpload && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Local Upload</span>
              </>
            )}
          </div>

          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {note.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">
            {note.description}
          </p>

          {/* Bottom metadata row with middots */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-3">
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{note.fileType}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{note.fileSize}</span>
            <span aria-hidden="true">·</span>
            <span>By {note.uploaderName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{note.uploadDate}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-mono tabular-nums text-amber-600 dark:text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              {note.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 font-mono tabular-nums">
              <Download className="w-3 h-3" />
              {note.downloadsCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note, e);
              }}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Edit note metadata"
              aria-label="Edit note metadata"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note, e);
              }}
              className="p-2 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Delete note"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(note.id, e);
            }}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark note'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(note.id);
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onOpen(note.id)}
      className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-150 flex flex-col justify-between h-full"
    >
      <div>
        {/* Top Row: Quiet 1-line text kicker + Bookmark button */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 min-w-0">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate">
              {note.subject}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{note.semester}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note, e);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit metadata"
                aria-label="Edit metadata"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note, e);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete note"
                aria-label="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(note.id, e);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
              aria-label={isBookmarked ? 'Remove from Bookmarks' : 'Save to Bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Primary Title */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
          {note.title}
        </h3>

        {/* Unit & Simulated upload notice */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{note.unit}</span>
          {note.isSimulatedUpload && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium shrink-0">
                Simulated Upload
              </span>
            </>
          )}
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-2.5 leading-relaxed">
          {note.description}
        </p>

        {/* Unboxed Tags list with middot separators or interactive tag filter clicks */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 text-xs text-slate-500 dark:text-slate-400">
            {note.tags.slice(0, 4).map((tag, index) => (
              <React.Fragment key={tag}>
                {index > 0 && <span aria-hidden="true">·</span>}
                {onTagClick ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick(tag, e);
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors"
                  >
                    #{tag}
                  </button>
                ) : (
                  <span>#{tag}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Footer Metadata Bar */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
            {note.fileType}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{note.fileSize}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{note.uploaderName}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-mono tabular-nums">
          <span>{note.uploadDate.slice(5)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
            <Star className="w-3.5 h-3.5 fill-current" />
            {note.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
};
