import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  BookOpen,
  Settings,
  FolderKanban,
  Bookmark,
  CheckCheck,
} from 'lucide-react';
import { AppNotification, NavigationPage, Note, User } from '../types';

interface TopBarProps {
  activePage: NavigationPage;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  quickMatchNotes: Note[];
  onSelectNote: (noteId: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: User;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  onNavigate: (page: NavigationPage) => void;
  onOpenMobileMenu: () => void;
}

const PAGE_LABELS: Record<NavigationPage, string> = {
  dashboard: 'Dashboard',
  explore: 'Explore Notes',
  library: 'My Library',
  bookmarks: 'Bookmarks & Collections',
  categories: 'Academic Categories',
  recent: 'Recently Viewed',
  upload: 'Upload Study Resource',
  settings: 'Workspace Settings',
  'note-details': 'Document Reader & Preview',
};

export const TopBar: React.FC<TopBarProps> = ({
  activePage,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  quickMatchNotes,
  onSelectNote,
  theme,
  onToggleTheme,
  user,
  notifications,
  onMarkAllRead,
  onNavigate,
  onOpenMobileMenu,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/90 dark:bg-[#0F1523]/90 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left Zone: Mobile menu trigger + Contextual Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-sm min-w-0">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            Workspace
          </button>
          <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
            /
          </span>
          <span className="font-display font-semibold text-slate-900 dark:text-slate-100 truncate">
            {PAGE_LABELS[activePage]}
          </span>
        </div>
      </div>

      {/* Center Zone: Global Search Bar with Instant Academic Lookup */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <form onSubmit={handleFormSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes by title, subject, unit, or #tag..."
            className="w-full pl-9 pr-8 py-2 text-sm rounded-xl bg-slate-100/80 dark:bg-slate-800/70 border border-transparent focus:border-indigo-500/60 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Live Search Results Dropdown */}
        {searchFocused && searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-40">
            <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Matching study resources</span>
              <button
                type="button"
                onClick={() => {
                  setSearchFocused(false);
                  onSearchSubmit(searchQuery);
                }}
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                View all in Explore →
              </button>
            </div>
            {quickMatchNotes.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                No notes matching "{searchQuery}". Press Enter to filter in Explore Notes.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto">
                {quickMatchNotes.slice(0, 5).map((note) => (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => {
                      setSearchFocused(false);
                      onSelectNote(note.id);
                    }}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {note.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {note.subject} · {note.unit} · {note.fileType}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Zone: Notifications, Theme Toggle & User Profile Menu */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-40">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Academic Updates ({unreadCount} unread)
                </span>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setNotifOpen(false);
                      if (n.targetNoteId) {
                        onSelectNote(n.targetNoteId);
                      }
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors block ${
                      !n.read ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                        {n.title}
                      </p>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        {n.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {n.message}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown (Guest / Student) */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="User profile menu"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-display font-bold text-xs flex items-center justify-center">
              {(user.name || user.role)
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <span className="hidden md:inline text-xs font-medium text-slate-800 dark:text-slate-200 max-w-[110px] truncate">
              {user.name || user.role}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-40">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {user.name || user.role}
                  </p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                    {user.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-1">
                  {user.department ? `${user.department} · ` : ''}{user.semester}
                </p>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('library');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
                >
                  <FolderKanban className="w-4 h-4 text-slate-400" />
                  <span>My Study Library</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('bookmarks');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
                >
                  <Bookmark className="w-4 h-4 text-slate-400" />
                  <span>Saved Bookmarks</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Edit Profile & Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
