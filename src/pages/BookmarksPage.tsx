import React, { useState } from 'react';
import {
  Bookmark as BookmarkIcon,
  FolderPlus,
  Search,
  Trash2,
  ArrowUpRight,
  Compass,
  Folder,
  CheckCircle2,
  Clock,
  BookOpen,
} from 'lucide-react';
import {
  Bookmark,
  NavigationPage,
  Note,
  RevisionStatus,
  StudyCollection,
} from '../types';

interface BookmarksPageProps {
  bookmarks: Bookmark[];
  allNotes: Note[];
  collections: StudyCollection[];
  onOpenNote: (noteId: string) => void;
  onRemoveBookmark: (noteId: string, e: React.MouseEvent) => void;
  onUpdateBookmarkMeta: (
    noteId: string,
    updates: {
      collectionId?: string;
      revisionStatus?: RevisionStatus;
      personalNote?: string;
    }
  ) => void;
  onCreateCollection: (name: string, description: string) => Promise<void>;
  onDeleteCollection: (collectionId: string) => Promise<void>;
  onNavigate: (page: NavigationPage) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarks,
  allNotes,
  collections,
  onOpenNote,
  onRemoveBookmark,
  onUpdateBookmarkMeta,
  onCreateCollection,
  onDeleteCollection,
  onNavigate,
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<RevisionStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // New Collection Modal
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [folderDesc, setFolderDesc] = useState('');

  const hydratedBookmarks = bookmarks
    .map((bm) => {
      const note = allNotes.find((n) => n.id === bm.noteId);
      return note ? { ...bm, note } : null;
    })
    .filter((item): item is Bookmark & { note: Note } => item !== null);

  const filteredBookmarks = hydratedBookmarks.filter((item) => {
    if (selectedCollectionId !== 'ALL' && item.collectionId !== selectedCollectionId) {
      return false;
    }
    if (statusFilter !== 'ALL' && item.revisionStatus !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.note.title.toLowerCase().includes(q) ||
        item.note.subject.toLowerCase().includes(q) ||
        item.note.unit.toLowerCase().includes(q) ||
        (item.personalNote || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateFolderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    await onCreateCollection(folderName.trim(), folderDesc.trim());
    setFolderName('');
    setFolderDesc('');
    setShowNewFolderModal(false);
  };

  const countByStatus = (st: RevisionStatus) =>
    hydratedBookmarks.filter((b) => b.revisionStatus === st).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Bookmarks & Study Collections
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Organize saved notes into exam folders and track your revision progress from To Read to Mastered.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewFolderModal(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-xs"
        >
          <FolderPlus className="w-4 h-4" />
          <span>New Study Folder</span>
        </button>
      </div>

      {/* Revision Progress Summary Strip */}
      <div className="grid grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'to_read' ? 'ALL' : 'to_read')}
          className={`text-left p-4 rounded-xl border transition-colors ${
            statusFilter === 'to_read'
              ? 'bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-400'
              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>To Read</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {countByStatus('to_read')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'reviewing' ? 'ALL' : 'reviewing')}
          className={`text-left p-4 rounded-xl border transition-colors ${
            statusFilter === 'reviewing'
              ? 'bg-amber-50/70 dark:bg-amber-950/50 border-amber-400'
              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Currently Reviewing</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {countByStatus('reviewing')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'mastered' ? 'ALL' : 'mastered')}
          className={`text-left p-4 rounded-xl border transition-colors ${
            statusFilter === 'mastered'
              ? 'bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-400'
              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Mastered for Exam</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-display font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
            {countByStatus('mastered')}
          </p>
        </button>
      </div>

      {/* Main Split: Study Collections Sidebar (Left 4 cols) + Bookmarked Resources (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Collections Folder List */}
        <aside className="lg:col-span-4 space-y-3">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 space-y-2">
            <h2 className="text-xs font-display font-bold text-slate-900 dark:text-white px-2 py-1">
              Study Folders
            </h2>

            <button
              type="button"
              onClick={() => setSelectedCollectionId('ALL')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors flex items-center justify-between ${
                selectedCollectionId === 'ALL'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookmarkIcon className="w-4 h-4" />
                <span>All Saved Bookmarks</span>
              </span>
              <span className="font-mono tabular-nums text-xs">{hydratedBookmarks.length}</span>
            </button>

            {collections.map((col) => {
              const count = hydratedBookmarks.filter((b) => b.collectionId === col.id).length;
              const isSelected = selectedCollectionId === col.id;
              return (
                <div
                  key={col.id}
                  className={`group rounded-xl transition-colors flex items-center justify-between pr-2 ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCollectionId(col.id)}
                    className="flex-1 px-3 py-2.5 text-left min-w-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2.5 text-xs font-semibold truncate">
                        <Folder className="w-4 h-4 shrink-0" />
                        <span className="truncate">{col.name}</span>
                      </span>
                      <span className="font-mono tabular-nums text-xs text-slate-400">
                        {count}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 pl-6">
                      {col.description}
                    </p>
                  </button>

                  {collections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onDeleteCollection(col.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-600 transition-opacity"
                      title="Delete folder"
                      aria-label={`Delete folder ${col.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Bookmarked Notes Area */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search & Status Filter Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bookmarked notes or personal annotations..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
              {(
                [
                  { id: 'ALL', label: 'All' },
                  { id: 'to_read', label: 'To Read' },
                  { id: 'reviewing', label: 'Reviewing' },
                  { id: 'mastered', label: 'Mastered' },
                ] as { id: RevisionStatus | 'ALL'; label: string }[]
              ).map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    statusFilter === st.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bookmarks List */}
          {filteredBookmarks.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center">
              <BookmarkIcon className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-display font-bold text-slate-900 dark:text-white">
                No bookmarked notes in this view
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Save study materials while exploring subjects to organize your exam revision folders here.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('explore')}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Notes</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredBookmarks.map((item) => {
                const { note } = item;
                return (
                  <article
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 space-y-4 hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div
                        onClick={() => onOpenNote(note.id)}
                        className="cursor-pointer space-y-1 flex-1 min-w-0"
                      >
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            {note.subject}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{note.unit}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{note.semester}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            {note.fileType} ({note.fileSize})
                          </span>
                        </div>

                        <h3 className="text-base font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {note.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {note.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onOpenNote(note.id)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          <span>Study Now</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => onRemoveBookmark(note.id, e)}
                          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors"
                          title="Remove from bookmarks"
                          aria-label="Remove from bookmarks"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Organization Controls: Folder Selection + Revision Status + Personal Note */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-4">
                        <select
                          value={item.collectionId}
                          onChange={(e) =>
                            onUpdateBookmarkMeta(note.id, { collectionId: e.target.value })
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                        >
                          {collections.map((c) => (
                            <option key={c.id} value={c.id}>
                              Folder: {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-4">
                        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                          {(
                            [
                              { id: 'to_read', label: 'To Read' },
                              { id: 'reviewing', label: 'Reviewing' },
                              { id: 'mastered', label: 'Mastered' },
                            ] as { id: RevisionStatus; label: string }[]
                          ).map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() =>
                                onUpdateBookmarkMeta(note.id, { revisionStatus: st.id })
                              }
                              className={`py-1 px-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                                item.revisionStatus === st.id
                                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                              }`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={item.personalNote || ''}
                          onChange={(e) =>
                            onUpdateBookmarkMeta(note.id, { personalNote: e.target.value })
                          }
                          placeholder="Add revision reminder note..."
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create New Study Collection Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
              Create Study Collection Folder
            </h2>
            <form onSubmit={handleCreateFolderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Collection Name *
                </label>
                <input
                  type="text"
                  required
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="e.g., End-Sem DBMS & OS Revision"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={folderDesc}
                  onChange={(e) => setFolderDesc(e.target.value)}
                  placeholder="e.g., High-weightage numericals and derivations"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
