import React from 'react';
import {
  LayoutDashboard,
  Compass,
  FolderKanban,
  Bookmark,
  Grid,
  History,
  UploadCloud,
  Settings,
  GraduationCap,
  X,
  ChevronRight,
} from 'lucide-react';
import { NavigationPage, User } from '../types';

interface SidebarProps {
  activePage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  user: User;
  bookmarksCount: number;
  libraryCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  user,
  bookmarksCount,
  libraryCount,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems: {
    id: NavigationPage;
    label: string;
    icon: React.FC<{ className?: string }>;
    count?: number;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Notes', icon: Compass },
    { id: 'library', label: 'My Library', icon: FolderKanban, count: libraryCount },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, count: bookmarksCount },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'recent', label: 'Recently Viewed', icon: History },
    { id: 'upload', label: 'Upload Notes', icon: UploadCloud },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (page: NavigationPage) => {
    onNavigate(page);
    onCloseMobile();
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full justify-between bg-white dark:bg-[#0F1523] border-r border-slate-200/90 dark:border-slate-800/90 select-none">
      {/* Top Brand + Primary Navigation */}
      <div>
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80">
          <button
            type="button"
            onClick={() => handleSelect('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-500 transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              Notes Hub
            </span>
          </button>

          {mobileOpen && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Upload CTA */}
        <div className="px-3.5 pt-4 pb-2">
          <button
            type="button"
            onClick={() => handleSelect('upload')}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Study Notes</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-0.5" aria-label="Workspace navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activePage === item.id ||
              (activePage === 'note-details' && item.id === 'explore');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </span>
                {typeof item.count === 'number' && (
                  <span className="font-mono tabular-nums text-xs text-slate-400 dark:text-slate-500">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Settings Shortcut */}
      <div className="p-3.5 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1">
        <button
          type="button"
          onClick={() => handleSelect('settings')}
          className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between gap-2.5 text-left group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-display font-bold text-xs flex items-center justify-center shrink-0">
              {(user.name || user.role)
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                {user.name || user.role}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {user.role} · {user.semester}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 shrink-0" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[82vw] h-full z-10">
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </>
  );
};
