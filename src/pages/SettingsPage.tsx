import React, { useState } from 'react';
import {
  Sun,
  Moon,
  User as UserIcon,
  Bell,
  Info,
  RotateCcw,
  Check,
  Server,
} from 'lucide-react';
import { User } from '../types';
import { useToast } from '../components/Toast';

interface SettingsPageProps {
  user: User;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  onUpdateUser: (updates: Partial<User>) => Promise<void>;
  semesters: string[];
  onResetDemoData: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  user,
  theme,
  onThemeChange,
  onUpdateUser,
  semesters,
  onResetDemoData,
}) => {
  const { showToast } = useToast();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [university, setUniversity] = useState(user.university);
  const [department, setDepartment] = useState(user.department);
  const [semester, setSemester] = useState(user.semester);
  const [bio, setBio] = useState(user.bio);
  const [defaultViewMode, setDefaultViewMode] = useState<'grid' | 'list'>(user.defaultViewMode);

  const [notifications, setNotifications] = useState(user.notifications);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateUser({
      name: name.trim(),
      email: email.trim(),
      university: university.trim(),
      department: department.trim(),
      semester,
      bio: bio.trim(),
      defaultViewMode,
      notifications,
    });
    showToast('Settings saved', 'Your profile and workspace preferences have been updated.');
  };

  const toggleNotifKey = (key: keyof typeof notifications) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    onUpdateUser({ notifications: next });
    showToast('Notification preference updated', undefined, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
          Workspace Settings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Customize your visual appearance, academic profile metadata, and notification preferences.
        </p>
      </div>

      {/* 1. Appearance & Theme Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          {theme === 'dark' ? (
            <Moon className="w-4 h-4 text-indigo-400" />
          ) : (
            <Sun className="w-4 h-4 text-indigo-600" />
          )}
          <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
            Appearance & Layout
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onThemeChange('light')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              theme === 'light'
                ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Sophisticated Light
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  High-contrast daylight paper workspace (Default)
                </p>
              </div>
            </div>
            {theme === 'light' && <Check className="w-4 h-4 text-indigo-600" />}
          </button>

          <button
            type="button"
            onClick={() => onThemeChange('dark')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              theme === 'dark'
                ? 'border-indigo-500 bg-indigo-950/40'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Deep Slate Dark
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Low-glare night study mode
                </p>
              </div>
            </div>
            {theme === 'dark' && <Check className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </section>

      {/* 2. Student Profile Information (Mock Data persisted to localStorage) */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
              Student Profile Information
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">ID: {user.studentId}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Academic Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              University / Institution
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Department / Degree
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Default Resource Layout
            </label>
            <select
              value={defaultViewMode}
              onChange={(e) => setDefaultViewMode(e.target.value as 'grid' | 'list')}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="grid">Grid Cards View</option>
              <option value="list">Compact List View</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Academic Bio & Study Interests
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Save Profile Changes
          </button>
        </div>
      </form>

      {/* 3. Notification Preferences (Visual Demonstration) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
            Notification Preferences
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            {
              key: 'newSubjectUploads' as const,
              title: 'New Subject Uploads',
              desc: 'Notify when peers or TAs upload notes in your current semester subjects.',
            },
            {
              key: 'weeklyRevisionDigest' as const,
              title: 'Weekly Revision Progress Digest',
              desc: 'Summary of bookmarked notes still marked as To Read or Reviewing.',
            },
            {
              key: 'examReminders' as const,
              title: 'Exam Sprint Reminders',
              desc: 'Alerts for high-weightage units in your study collections.',
            },
            {
              key: 'bookmarkUpdates' as const,
              title: 'Bookmarked Document Updates',
              desc: 'Notify when an author uploads a revised version of a note you bookmarked.',
            },
          ].map((item) => {
            const active = notifications[item.key];
            return (
              <div
                key={item.key}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => toggleNotifKey(item.key)}
                  className={`w-10 h-5.5 rounded-full transition-colors p-0.5 shrink-0 ${
                    active ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      active ? 'translate-x-4.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. About Notes Hub & Future Backend Compatibility */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
              About Notes Hub & Service Layer Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Frontend Release</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Notes Hub is built with a clean separation between UI components, TypeScript domain interfaces (<code className="font-mono">User, Note, Category, Bookmark, Review, Upload</code>), and modular service layers (<code className="font-mono">notesService, userService, bookmarkService, categoryService, uploadService</code>).
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Server className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">Reset Local Demo Storage:</strong> Restore default seeded university notes, bookmarks, and collections in <code className="font-mono">localStorage</code>.
            </div>
          </div>
          <button
            type="button"
            onClick={onResetDemoData}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </section>
    </div>
  );
};
