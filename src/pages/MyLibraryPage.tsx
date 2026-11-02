import React, { useState } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  UploadCloud,
  FolderKanban,
  History,
  X,
  AlertTriangle,
} from 'lucide-react';
import {
  Bookmark,
  NavigationPage,
  Note,
  RecentlyViewedEntry,
  User,
} from '../types';
import { NoteCard } from '../components/NoteCard';

interface MyLibraryPageProps {
  user: User;
  allNotes: Note[];
  bookmarks: Bookmark[];
  recentEntries: (RecentlyViewedEntry & { note: Note })[];
  semesters: string[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenNote: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onUpdateNote: (
    noteId: string,
    updates: Partial<Pick<Note, 'title' | 'subject' | 'semester' | 'unit' | 'description' | 'tags'>>
  ) => Promise<void>;
  onDeleteNote: (noteId: string) => Promise<void>;
  onNavigate: (page: NavigationPage) => void;
}

export const MyLibraryPage: React.FC<MyLibraryPageProps> = ({
  user,
  allNotes,
  bookmarks,
  recentEntries,
  semesters,
  viewMode,
  onViewModeChange,
  onOpenNote,
  onToggleBookmark,
  onUpdateNote,
  onDeleteNote,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'uploaded' | 'recent'>('uploaded');
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('ALL');

  // Edit Modal State
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editSemester, setEditSemester] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editTags, setEditTags] = useState('');

  // Delete Confirmation Modal State
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  const bookmarkedIds = new Set(bookmarks.map((b) => b.noteId));

  // Notes uploaded by the current student (or simulated uploads)
  const uploadedNotes = allNotes.filter(
    (n) => n.uploaderId === user.id || n.isSimulatedUpload
  );

  const recentNotes = recentEntries.map((r) => r.note);

  const sourceList = activeTab === 'uploaded' ? uploadedNotes : recentNotes;

  const filteredList = sourceList.filter((note) => {
    if (semesterFilter !== 'ALL' && note.semester !== semesterFilter) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        note.title.toLowerCase().includes(q) ||
        note.subject.toLowerCase().includes(q) ||
        note.unit.toLowerCase().includes(q) ||
        note.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditSubject(note.subject);
    setEditSemester(note.semester);
    setEditUnit(note.unit);
    setEditDesc(note.description);
    setEditTags(note.tags.join(', '));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote) return;
    const parsedTags = editTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    await onUpdateNote(editingNote.id, {
      title: editTitle.trim(),
      subject: editSubject.trim(),
      semester: editSemester,
      unit: editUnit.trim(),
      description: editDesc.trim(),
      tags: parsedTags,
    });
    setEditingNote(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingNote) return;
    await onDeleteNote(deletingNote.id);
    setDeletingNote(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            My Study Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your uploaded study materials, edit resource metadata, or revisit recently opened notes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('upload')}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap shadow-xs"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New Note</span>
        </button>
      </div>

      {/* Tabs + Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start">
            <button
              type="button"
              onClick={() => setActiveTab('uploaded')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'uploaded'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>My Uploaded Notes ({uploadedNotes.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('recent')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'recent'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Recently Opened ({recentNotes.length})</span>
            </button>
          </div>

          {/* Grid / List View Switcher */}
          <div className="flex items-center gap-2">
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="ALL">All Semesters</option>
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
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
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your library by title, subject, unit, or tag..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Library Grid or List */}
      {filteredList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center max-w-md mx-auto">
          <p className="text-base font-display font-bold text-slate-900 dark:text-white">
            No study notes found in this view
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Upload a new PDF/DOCX study guide or clear your search filter to see your library resources.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('upload')}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            Upload Study Notes
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isBookmarked={bookmarkedIds.has(note.id)}
              viewMode="grid"
              onOpen={onOpenNote}
              onToggleBookmark={onToggleBookmark}
              onEdit={(n) => openEditModal(n)}
              onDelete={(n) => setDeletingNote(n)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isBookmarked={bookmarkedIds.has(note.id)}
              viewMode="list"
              onOpen={onOpenNote}
              onToggleBookmark={onToggleBookmark}
              onEdit={(n) => openEditModal(n)}
              onDelete={(n) => setDeletingNote(n)}
            />
          ))}
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                Edit Note Metadata
              </h2>
              <button
                type="button"
                onClick={() => setEditingNote(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Semester
                  </label>
                  <select
                    value={editSemester}
                    onChange={(e) => setEditSemester(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    {semesters.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Unit / Chapter
                </label>
                <input
                  type="text"
                  required
                  value={editUnit}
                  onChange={(e) => setEditUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
                  Delete Study Resource?
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Are you sure you want to remove <strong>"{deletingNote.title}"</strong> from Notes Hub? This action will also remove any bookmarks associated with this note.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeletingNote(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
