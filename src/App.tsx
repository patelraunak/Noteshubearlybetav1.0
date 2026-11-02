import React, { useState, useEffect, useCallback } from 'react';
import {
  AppNotification,
  Bookmark,
  Category,
  FileType,
  NavigationPage,
  Note,
  RecentlyViewedEntry,
  RevisionStatus,
  SortOption,
  StudyCollection,
  User,
} from './types';
import { INITIAL_USER } from './data/mockData';
import { notesService } from './services/notesService';
import { userService } from './services/userService';
import { bookmarkService } from './services/bookmarkService';
import { categoryService } from './services/categoryService';
import { ToastProvider, useToast } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardPage } from './pages/DashboardPage';
import { ExploreNotesPage } from './pages/ExploreNotesPage';
import { NoteDetailsPage } from './pages/NoteDetailsPage';
import { UploadNotesPage } from './pages/UploadNotesPage';
import { MyLibraryPage } from './pages/MyLibraryPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { RecentlyViewedPage } from './pages/RecentlyViewedPage';
import { SettingsPage } from './pages/SettingsPage';

function NotesHubWorkspace() {
  const { showToast } = useToast();

  // Navigation & Active Document State
  const [activePage, setActivePage] = useState<NavigationPage>('dashboard');
  const [previousPage, setPreviousPage] = useState<NavigationPage>('dashboard');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Data State
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    userService.getThemePreference()
  );
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<(Category & { noteCount: number })[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [collections, setCollections] = useState<StudyCollection[]>([]);
  const [recentEntries, setRecentEntries] = useState<
    (RecentlyViewedEntry & { note: Note })[]
  >([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Explore & Global Search Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');
  const [selectedFileType, setSelectedFileType] = useState<FileType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync theme on mount & change
  useEffect(() => {
    userService.setThemePreference(theme);
  }, [theme]);

  const refreshWorkspaceData = useCallback(async () => {
    const [
      loadedUser,
      loadedNotes,
      loadedCats,
      loadedSubjects,
      loadedSemesters,
      loadedBookmarks,
      loadedCollections,
      loadedRecent,
      loadedNotifs,
    ] = await Promise.all([
      userService.getCurrentUser(),
      notesService.getAllNotes(),
      categoryService.getCategoriesWithCounts(),
      notesService.getDistinctSubjects(),
      notesService.getDistinctSemesters(),
      bookmarkService.getBookmarks(),
      bookmarkService.getCollections(),
      notesService.getRecentlyViewed(),
      userService.getNotifications(),
    ]);

    setUser(loadedUser);
    setViewMode(loadedUser.defaultViewMode || 'grid');
    setAllNotes(loadedNotes);
    setCategories(loadedCats);
    setSubjects(loadedSubjects);
    setSemesters(loadedSemesters);
    setBookmarks(loadedBookmarks);
    setCollections(loadedCollections);
    setRecentEntries(loadedRecent);
    setNotifications(loadedNotifs);
  }, []);

  useEffect(() => {
    refreshWorkspaceData();
  }, [refreshWorkspaceData]);

  // Run filtered query whenever Explore filter parameters or allNotes change
  useEffect(() => {
    notesService
      .queryNotes({
        search: searchQuery,
        categoryId: selectedCategory,
        subject: selectedSubject,
        semester: selectedSemester,
        fileType: selectedFileType,
        sortBy,
      })
      .then(setFilteredNotes);
  }, [
    allNotes,
    searchQuery,
    selectedCategory,
    selectedSubject,
    selectedSemester,
    selectedFileType,
    sortBy,
  ]);

  const handleNavigate = (page: NavigationPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNote = async (noteId: string) => {
    if (activePage !== 'note-details') {
      setPreviousPage(activePage);
    }
    setActiveNoteId(noteId);
    setActivePage('note-details');
    await notesService.recordNoteView(noteId, 1);
    const [updatedNotes, updatedRecent] = await Promise.all([
      notesService.getAllNotes(),
      notesService.getRecentlyViewed(),
    ]);
    setAllNotes(updatedNotes);
    setRecentEntries(updatedRecent);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = async (noteId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const defaultCol = collections[0]?.id || 'col_midterm';
    const result = await bookmarkService.toggleBookmark(noteId, defaultCol);
    const updatedBookmarks = await bookmarkService.getBookmarks();
    setBookmarks(updatedBookmarks);

    const targetNote = allNotes.find((n) => n.id === noteId);
    if (result.bookmarked) {
      showToast(
        'Saved to Bookmarks',
        targetNote
          ? `"${targetNote.title}" added to your study collection.`
          : 'Resource bookmarked.'
      );
    } else {
      showToast(
        'Removed from Bookmarks',
        targetNote ? `"${targetNote.title}" removed from saved items.` : undefined,
        'info'
      );
    }
  };

  const handleUpdateBookmarkMeta = async (
    noteId: string,
    updates: {
      collectionId?: string;
      revisionStatus?: RevisionStatus;
      personalNote?: string;
    }
  ) => {
    await bookmarkService.updateBookmarkDetails(noteId, updates);
    const updatedBookmarks = await bookmarkService.getBookmarks();
    setBookmarks(updatedBookmarks);
    if (updates.revisionStatus || updates.collectionId) {
      showToast('Revision status updated', 'Saved to your study collection.');
    }
  };

  const handleCreateCollection = async (name: string, description: string) => {
    await bookmarkService.createCollection(name, description);
    const updatedCols = await bookmarkService.getCollections();
    setCollections(updatedCols);
    showToast('Study folder created', `Created folder "${name}".`);
  };

  const handleDeleteCollection = async (collectionId: string) => {
    await bookmarkService.deleteCollection(collectionId);
    const [updatedCols, updatedBookmarks] = await Promise.all([
      bookmarkService.getCollections(),
      bookmarkService.getBookmarks(),
    ]);
    setCollections(updatedCols);
    setBookmarks(updatedBookmarks);
    showToast('Study folder removed', 'Bookmarks moved to default collection.', 'info');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedSubject('ALL');
    setSelectedSemester('ALL');
    setSelectedFileType('ALL');
    setSortBy('newest');
  };

  const handleSelectCategoryFromDashboard = (categoryId: string) => {
    handleClearFilters();
    setSelectedCategory(categoryId);
    handleNavigate('explore');
  };

  const handleSelectTag = (tag: string) => {
    handleClearFilters();
    setSearchQuery(tag);
    handleNavigate('explore');
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    showToast(
      next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled',
      undefined,
      'info'
    );
  };

  const handleMarkAllRead = async () => {
    const updated = await userService.markAllNotificationsRead();
    setNotifications(updated);
    showToast('All notifications marked read', undefined, 'info');
  };

  const handleUpdateNote = async (
    noteId: string,
    updates: Partial<
      Pick<Note, 'title' | 'subject' | 'semester' | 'unit' | 'description' | 'tags'>
    >
  ) => {
    await notesService.updateNote(noteId, updates);
    await refreshWorkspaceData();
    showToast('Note metadata updated', 'Your changes have been saved.');
  };

  const handleDeleteNote = async (noteId: string) => {
    await notesService.deleteNote(noteId);
    await bookmarkService.removeBookmarksForNote(noteId);
    await refreshWorkspaceData();
    showToast('Study note deleted', 'Resource removed from your library.', 'info');
  };

  const handleClearHistory = async () => {
    await notesService.clearRecentlyViewed();
    setRecentEntries([]);
    showToast('Reading history cleared', undefined, 'info');
  };

  const handleUpdateUser = async (updates: Partial<User>) => {
    const updated = await userService.updateUserProfile(updates);
    setUser(updated);
    if (updates.defaultViewMode) {
      setViewMode(updates.defaultViewMode);
    }
  };

  const handleResetDemoData = () => {
    localStorage.clear();
    userService.setThemePreference(theme);
    refreshWorkspaceData();
    handleClearFilters();
    showToast('Demo data restored', 'All seeded university resources have been reset.');
  };

  const quickMatchNotes = searchQuery.trim()
    ? allNotes.filter((n) => {
        const q = searchQuery.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.subject.toLowerCase().includes(q) ||
          n.unit.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  const myUploadedLibraryCount = allNotes.filter(
    (n) => n.uploaderId === user.id || n.isSimulatedUpload
  ).length;

  const activeNote =
    allNotes.find((n) => n.id === activeNoteId) || allNotes[0];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
      {/* Persistent Desktop Sidebar + Mobile Drawer */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        user={user}
        bookmarksCount={bookmarks.length}
        libraryCount={myUploadedLibraryCount}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          activePage={activePage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={(q) => {
            setSearchQuery(q);
            handleNavigate('explore');
          }}
          quickMatchNotes={quickMatchNotes}
          onSelectNote={handleOpenNote}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          user={user}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activePage === 'dashboard' && (
            <DashboardPage
              user={user}
              allNotes={allNotes}
              bookmarks={bookmarks}
              recentEntries={recentEntries}
              categories={categories}
              onNavigate={handleNavigate}
              onOpenNote={handleOpenNote}
              onToggleBookmark={handleToggleBookmark}
              onSelectCategory={handleSelectCategoryFromDashboard}
              onSelectTag={handleSelectTag}
            />
          )}

          {activePage === 'explore' && (
            <ExploreNotesPage
              notes={filteredNotes}
              bookmarks={bookmarks}
              categories={categories}
              subjects={subjects}
              semesters={semesters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              selectedFileType={selectedFileType}
              onFileTypeChange={setSelectedFileType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onClearFilters={handleClearFilters}
              onOpenNote={handleOpenNote}
              onToggleBookmark={handleToggleBookmark}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'note-details' && activeNote && (
            <NoteDetailsPage
              note={activeNote}
              allNotes={allNotes}
              bookmarks={bookmarks}
              collections={collections}
              user={user}
              onBack={() => handleNavigate(previousPage)}
              onOpenNote={handleOpenNote}
              onToggleBookmark={handleToggleBookmark}
              onUpdateBookmarkMeta={handleUpdateBookmarkMeta}
              onNoteUpdated={(updated) => {
                setAllNotes((prev) =>
                  prev.map((n) => (n.id === updated.id ? updated : n))
                );
              }}
              onSelectTag={handleSelectTag}
            />
          )}

          {activePage === 'upload' && (
            <UploadNotesPage
              user={user}
              categories={categories}
              semesters={semesters}
              onUploadSuccess={async () => {
                await refreshWorkspaceData();
              }}
              onOpenNote={handleOpenNote}
            />
          )}

          {activePage === 'library' && (
            <MyLibraryPage
              user={user}
              allNotes={allNotes}
              bookmarks={bookmarks}
              recentEntries={recentEntries}
              semesters={semesters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onOpenNote={handleOpenNote}
              onToggleBookmark={handleToggleBookmark}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'bookmarks' && (
            <BookmarksPage
              bookmarks={bookmarks}
              allNotes={allNotes}
              collections={collections}
              onOpenNote={handleOpenNote}
              onRemoveBookmark={handleToggleBookmark}
              onUpdateBookmarkMeta={handleUpdateBookmarkMeta}
              onCreateCollection={handleCreateCollection}
              onDeleteCollection={handleDeleteCollection}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'categories' && (
            <CategoriesPage
              categories={categories}
              allNotes={allNotes}
              bookmarks={bookmarks}
              onOpenNote={handleOpenNote}
              onToggleBookmark={handleToggleBookmark}
              onExploreCategoryInSearch={handleSelectCategoryFromDashboard}
            />
          )}

          {activePage === 'recent' && (
            <RecentlyViewedPage
              recentEntries={recentEntries}
              bookmarks={bookmarks}
              onOpenNote={handleOpenNote}
              onToggleBookmark={handleToggleBookmark}
              onClearHistory={handleClearHistory}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'settings' && (
            <SettingsPage
              user={user}
              theme={theme}
              onThemeChange={(newTheme) => {
                setTheme(newTheme);
                showToast(
                  newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled',
                  undefined,
                  'info'
                );
              }}
              onUpdateUser={handleUpdateUser}
              semesters={semesters}
              onResetDemoData={handleResetDemoData}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <NotesHubWorkspace />
    </ToastProvider>
  );
}
