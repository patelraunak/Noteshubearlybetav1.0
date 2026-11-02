import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark as BookmarkIcon,
  Download,
  Share2,
  Star,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Layers,
  ListChecks,
  BookOpen,
  MessageSquare,
  RotateCw,
} from 'lucide-react';
import {
  Bookmark,
  Note,
  Review,
  RevisionStatus,
  StudyCollection,
  User,
} from '../types';
import { notesService } from '../services/notesService';
import { NoteCard } from '../components/NoteCard';
import { useToast } from '../components/Toast';

interface NoteDetailsPageProps {
  note: Note;
  allNotes: Note[];
  bookmarks: Bookmark[];
  collections: StudyCollection[];
  user: User;
  onBack: () => void;
  onOpenNote: (noteId: string) => void;
  onToggleBookmark: (noteId: string, e: React.MouseEvent) => void;
  onUpdateBookmarkMeta: (
    noteId: string,
    updates: { collectionId?: string; revisionStatus?: RevisionStatus }
  ) => void;
  onNoteUpdated: (updated: Note) => void;
  onSelectTag: (tag: string) => void;
}

type AITabType =
  | 'summary'
  | 'keypoints'
  | 'autotags'
  | 'flashcards'
  | 'quiz'
  | 'examprep';

export const NoteDetailsPage: React.FC<NoteDetailsPageProps> = ({
  note,
  allNotes,
  bookmarks,
  collections,
  user,
  onBack,
  onOpenNote,
  onToggleBookmark,
  onUpdateBookmarkMeta,
  onNoteUpdated,
  onSelectTag,
}) => {
  const { showToast } = useToast();

  // Reader state
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scratchpad, setScratchpad] = useState('');

  // Future AI Preview Tabs state
  const [activeAITab, setActiveAITab] = useState<AITabType>('summary');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const currentBookmark = bookmarks.find((b) => b.noteId === note.id);
  const isBookmarked = Boolean(currentBookmark);

  useEffect(() => {
    setCurrentPage(1);
    setFlippedCards({});
    setQuizAnswers({});
    setScratchpad(notesService.getScratchpadForNote(note.id));
    notesService.getReviewsForNote(note.id).then(setReviews);
  }, [note.id]);

  const handlePageChange = (nextPage: number) => {
    const bounded = Math.max(1, Math.min(note.pageCount, nextPage));
    setCurrentPage(bounded);
    notesService.recordNoteView(note.id, bounded);
  };

  const handleScratchpadChange = (value: string) => {
    setScratchpad(value);
    notesService.saveScratchpadForNote(note.id, value);
  };

  const handleDownload = async () => {
    const updated = await notesService.incrementDownload(note.id);
    if (updated) onNoteUpdated(updated);

    if (note.localBlobUrl) {
      const a = document.createElement('a');
      a.href = note.localBlobUrl;
      a.download = note.fileName || `${note.title}.pdf`;
      a.click();
      showToast('Download started', `Saved "${note.fileName || note.title}" to your device.`);
      return;
    }

    // Generate clean structured study guide text file for sample academic notes
    const contentLines = [
      `====================================================================`,
      `NOTES HUB — ACADEMIC STUDY DOCUMENT`,
      `Title    : ${note.title}`,
      `Subject  : ${note.subject} (${note.semester})`,
      `Unit     : ${note.unit}`,
      `Author   : ${note.uploaderName} (${note.uploaderRole})`,
      `Tags     : ${note.tags.join(', ')}`,
      `====================================================================\n`,
      `DESCRIPTION:\n${note.description}\n`,
      ...note.pagesContent.map(
        (p) =>
          `--- PAGE ${p.pageNumber}: ${p.sectionTitle} ---\n` +
          `## ${p.heading}\n\n` +
          `${p.paragraphs.join('\n\n')}\n\n` +
          (p.keyFormulaOrCode ? `FORMULA / CODE:\n${p.keyFormulaOrCode}\n\n` : '') +
          `KEY TAKEAWAYS:\n${p.takeaways.map((t) => `• ${t}`).join('\n')}\n`
      ),
    ];

    const blob = new Blob([contentLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_study_notes.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(
      'Study package downloaded',
      `Downloaded "${note.title}" (${note.fileSize}) for offline revision.`
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    showToast('Resource link copied', 'Shareable study link copied to clipboard.', 'info');
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast('Please enter a review comment', undefined, 'error');
      return;
    }
    const { review, updatedNote } = await notesService.addReview(
      note.id,
      newRating,
      newComment.trim(),
      user.name,
      `${user.department.split(' ')[0]} · ${user.semester}`
    );
    setReviews((prev) => [review, ...prev]);
    setNewComment('');
    if (updatedNote) onNoteUpdated(updatedNote);
    showToast('Review published', 'Thank you for rating this study material.');
  };

  const relatedNotes = allNotes
    .filter(
      (n) =>
        n.id !== note.id &&
        (n.categoryId === note.categoryId || n.subject === note.subject)
    )
    .slice(0, 3);

  const pageData =
    note.pagesContent.find((p) => p.pageNumber === currentPage) ||
    note.pagesContent[0];

  const bookmarkedIds = new Set(bookmarks.map((b) => b.noteId));

  return (
    <div className="space-y-8 pb-14">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Study Resources</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{note.subject}</span>
          <span aria-hidden="true">·</span>
          <span>{note.semester}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{note.fileType} ({note.fileSize})</span>
        </div>
      </div>

      {/* Document Header Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {note.subject}
              </span>
              <span aria-hidden="true">·</span>
              <span>{note.unit}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{note.semester}</span>
              {note.isSimulatedUpload && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    Simulated Frontend Upload (localStorage)
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight text-balance">
              {note.title}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {note.description}
            </p>

            {/* Unboxed Metadata & Tags */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Uploaded by <strong className="text-slate-800 dark:text-slate-200">{note.uploaderName}</strong> ({note.uploaderRole})</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{note.uploadDate}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-mono tabular-nums text-amber-600 dark:text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {note.rating.toFixed(1)} ({note.ratingCount} ratings)
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{note.viewsCount} views</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{note.downloadsCount} downloads</span>
            </div>

            {/* Interactive Tag Filter Links */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="text-slate-400">Topics:</span>
              {note.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <button
                    type="button"
                    onClick={() => onSelectTag(tag)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    #{tag}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Primary Action Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 min-w-[210px]">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Download {note.fileType} ({note.fileSize})</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => onToggleBookmark(note.id, e)}
                className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap ${
                  isBookmarked
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <BookmarkIcon className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title="Copy share link"
                aria-label="Copy share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* If bookmarked, allow instant Study Collection & Revision Status assignment */}
            {isBookmarked && currentBookmark && (
              <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    Study Collection Folder
                  </label>
                  <select
                    value={currentBookmark.collectionId}
                    onChange={(e) =>
                      onUpdateBookmarkMeta(note.id, { collectionId: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                  >
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    Revision Status
                  </label>
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
                          currentBookmark.revisionStatus === st.id
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Multi-Page Academic Reader & Outline Sidebar */}
      <section
        aria-label="Interactive document preview and reader"
        className={
          isFullscreen
            ? 'fixed inset-0 z-50 bg-slate-950/95 p-4 sm:p-6 overflow-y-auto flex flex-col'
            : ''
        }
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden flex-1 flex flex-col">
          {/* Reader Top Control Bar */}
          <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                Interactive Academic Reader
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                ·
              </span>
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                Page {currentPage} of {note.pageCount}
              </span>
            </div>

            {/* Page Stepping & Zoom Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Previous page"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-200">
                  {currentPage} / {note.pageCount}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= note.pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Next page"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-1">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Zoom out"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-xs font-mono tabular-nums text-slate-700 dark:text-slate-200">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(145, z + 15))}
                  className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Zoom in"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen((f) => !f)}
                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                title={isFullscreen ? 'Exit full screen' : 'Full screen reader'}
                aria-label={isFullscreen ? 'Exit full screen' : 'Full screen reader'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* 3-Column Workspace inside Reader: Outline (Left) + Document Sheet (Center) + Scratchpad (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 dark:divide-slate-800">
            {/* Left Column: Document Outline / Chapters (3 cols) */}
            <div className="lg:col-span-3 p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
              <div>
                <h2 className="text-xs font-display font-bold text-slate-900 dark:text-white tracking-wide">
                  Document Outline
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Jump directly to any section or unit page
                </p>
              </div>

              <div className="space-y-1.5">
                {note.outline.map((sec) => {
                  const isActive = sec.pageNumber === currentPage;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handlePageChange(sec.pageNumber)}
                      className={`w-full p-2.5 rounded-xl text-left transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold line-clamp-1">
                          {sec.title}
                        </span>
                        <span className="text-[11px] font-mono tabular-nums text-slate-400 shrink-0">
                          Pg {sec.pageNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {sec.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Column: Rendered Academic Document Sheet or Local PDF Preview (6 cols) */}
            <div className="lg:col-span-6 p-4 sm:p-8 bg-slate-100/70 dark:bg-[#0B0F19] flex flex-col items-center justify-between min-h-[540px]">
              {note.localBlobUrl ? (
                <div className="w-full h-[560px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                  <iframe
                    src={note.localBlobUrl}
                    title={note.title}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-xs p-6 sm:p-10 transition-all origin-top"
                  style={{ fontSize: `${zoomLevel}%` }}
                >
                  {/* Simulated Academic Header on Paper */}
                  <div className="pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>{pageData.sectionTitle}</span>
                    <span className="font-mono tabular-nums">
                      Page {pageData.pageNumber} of {note.pageCount}
                    </span>
                  </div>

                  {/* Main Page Heading */}
                  <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white leading-snug mb-4">
                    {pageData.heading}
                  </h2>

                  {/* Academic Body Paragraphs */}
                  <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {pageData.paragraphs.map((para, i) => (
                      <p key={i} className="whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Formula / Pseudocode Block */}
                  {pageData.keyFormulaOrCode && (
                    <div className="my-6 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                      <pre className="whitespace-pre-wrap">{pageData.keyFormulaOrCode}</pre>
                    </div>
                  )}

                  {pageData.diagramCaption && (
                    <p className="text-xs italic text-slate-500 dark:text-slate-400 text-center my-4">
                      {pageData.diagramCaption}
                    </p>
                  )}

                  {/* Key Takeaways Box */}
                  {pageData.takeaways.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                      <h3 className="text-xs font-display font-bold text-slate-900 dark:text-white mb-2.5">
                        Key Exam Takeaways on this Page
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                        {pageData.takeaways.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Page Navigation Bar */}
              <div className="w-full max-w-2xl mt-6 flex items-center justify-between text-xs">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium disabled:opacity-40 hover:border-indigo-500/50 transition-colors inline-flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Viewing Page {currentPage} of {note.pageCount}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= note.pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium disabled:opacity-40 hover:border-indigo-500/50 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Personal Study Scratchpad (3 cols) */}
            <div className="lg:col-span-3 p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col justify-between space-y-4">
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-display font-bold text-slate-900 dark:text-white">
                    Personal Study Scratchpad
                  </h2>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Auto-saved locally
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Jot down your own revision reminders, doubts, or page references for this document.
                </p>
                <textarea
                  value={scratchpad}
                  onChange={(e) => handleScratchpadChange(e.target.value)}
                  placeholder="Write your personal study annotations for this note..."
                  className="w-full flex-1 min-h-[220px] p-3 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                <p>Ready for backend cloud storage & real PDF stream URLs via FastAPI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 14: Future AI Study Features — Interactive UI Preview (Clearly Marked as Coming Soon) */}
      <section
        aria-label="Future AI study features preview"
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Future AI Study Suite · Coming Soon (UI Preview Only)</span>
            </div>
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
              AI Revision Assistant & Study Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Interactive preview of upcoming backend AI capabilities—no external AI APIs are connected in this frontend release.
            </p>
          </div>

          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 px-3 py-1.5 rounded-lg self-start sm:self-center shrink-0">
            Coming Soon · Static Demo Preview
          </span>
        </div>

        {/* Interactive Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {[
            { id: 'summary', label: 'AI Summary', icon: BookOpen },
            { id: 'keypoints', label: 'Important Key Points', icon: ListChecks },
            { id: 'autotags', label: 'Auto Topic Tagging', icon: Layers },
            { id: 'flashcards', label: 'Flashcard Generator', icon: RotateCw },
            { id: 'quiz', label: 'Practice Quiz', icon: HelpCircle },
            { id: 'examprep', label: 'Exam Prep Mode', icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeAITab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAITab(tab.id as AITabType)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-2 whitespace-nowrap ${
                  active
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="p-5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800">
          {activeAITab === 'summary' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Sample AI Executive Synthesis (Coming Soon)</span>
                <span className="font-mono tabular-nums">
                  Est. Revision Time: {note.aiPreview.estimatedStudyMinutes} mins · {note.aiPreview.examWeightageHint}
                </span>
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {note.aiPreview.executiveSummary}
              </p>
            </div>
          )}

          {activeAITab === 'keypoints' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                High-yield bullet points automatically distilled from lecture pages (Coming Soon):
              </p>
              <ul className="space-y-2.5">
                {note.aiPreview.keyPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-slate-200"
                  >
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeAITab === 'autotags' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sample automated taxonomy classification & confidence weights (Coming Soon):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {note.aiPreview.autoTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">
                        {tag.label}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {tag.category}
                      </p>
                    </div>
                    <span className="font-mono tabular-nums text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {tag.confidence}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeAITab === 'flashcards' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any sample card below to flip between Question and Answer (UI Preview — Coming Soon):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {note.aiPreview.flashcards.map((card, idx) => {
                  const isFlipped = Boolean(flippedCards[card.id]);
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() =>
                        setFlippedCards((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
                      }
                      className="text-left p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition-all flex flex-col justify-between min-h-[160px]"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                          <span>Card 0{idx + 1} · {card.topic}</span>
                          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                            {isFlipped ? 'Answer' : 'Question'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                          {isFlipped ? card.answer : card.question}
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-3 inline-flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        <span>Click to flip card</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeAITab === 'quiz' && (
            <div className="space-y-5">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Interactive sample multiple-choice check (UI Preview — Coming Soon):
              </p>
              {note.aiPreview.quizQuestions.map((q, qIdx) => {
                const selectedOpt = quizAnswers[q.id];
                const hasAnswered = typeof selectedOpt === 'number';
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Q{qIdx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrect = optIdx === q.correctIndex;
                        let btnStyle =
                          'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
                        if (hasAnswered) {
                          if (isCorrect) {
                            btnStyle =
                              'border-emerald-500/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium';
                          } else if (isSelected && !isCorrect) {
                            btnStyle =
                              'border-rose-500/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300';
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() =>
                              setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                            }
                            className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {hasAnswered && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeAITab === 'examprep' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recommended Exam Preparation Checklist for {note.unit} (UI Preview — Coming Soon):
              </p>
              <div className="space-y-2">
                {note.aiPreview.examPrepChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Peer Ratings & Reviews + Related Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reviews Section (7 cols) */}
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
                Student Feedback & Reviews ({reviews.length})
              </h2>
            </div>
            <span className="text-xs font-mono tabular-nums text-amber-600 dark:text-amber-400 font-semibold">
              ★ {note.rating.toFixed(1)} avg
            </span>
          </div>

          <form onSubmit={handleAddReview} className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Rate this study resource
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className={`p-1 transition-colors ${
                      star <= newRating
                        ? 'text-amber-500'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share how these notes helped your exam prep..."
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
              >
                Post Review
              </button>
            </div>
          </form>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {reviews.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 py-4">
                No written reviews yet. Be the first student to review this note!
              </p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {rev.userName}
                      </span>
                      <span className="text-slate-400 mx-1.5">·</span>
                      <span className="text-slate-500 dark:text-slate-400">{rev.userRole}</span>
                    </div>
                    <span className="font-mono tabular-nums text-amber-600 dark:text-amber-400 font-medium">
                      {'★'.repeat(rev.rating)} · {rev.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Notes Section (5 cols) */}
        <section className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
            Related Study Notes
          </h2>
          <div className="space-y-4">
            {relatedNotes.map((rel) => (
              <NoteCard
                key={rel.id}
                note={rel}
                isBookmarked={bookmarkedIds.has(rel.id)}
                onOpen={onOpenNote}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
