import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  User as UserIcon,
  Bell,
  Info,
  RotateCcw,
  Check,
  GraduationCap,
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

  const [role, setRole] = useState<'Guest' | 'Student'>(
    user.role === 'Guest' || user.role === 'Student' ? user.role : 'Student'
  );
  const [name, setName] = useState(user.name || 'Student');
  const [email, setEmail] = useState(user.email || '');
  const [university, setUniversity] = useState(user.university || '');
  const [department, setDepartment] = useState(user.department || '');
  const [semester, setSemester] = useState(user.semester || 'Semester 5');
  const [bio, setBio] = useState(user.bio || '');
  const [defaultViewMode, setDefaultViewMode] = useState<'grid' | 'list'>(
    user.defaultViewMode || 'grid'
  );
  const [notifications, setNotifications] = useState(user.notifications);

  useEffect(() => {
    setRole(user.role === 'Guest' || user.role === 'Student' ? user.role : 'Student');
    setName(user.name || 'Student');
    setEmail(user.email || '');
    setUniversity(user.university || '');
    setDepartment(user.department || '');
    setSemester(user.semester || 'Semester 5');
    setBio(user.bio || '');
    setDefaultViewMode(user.defaultViewMode || 'grid');
    setNotifications(user.notifications);
  }, [user]);

  const handleRoleSwitch = (nextRole: 'Guest' | 'Student') => {
    setRole(nextRole);
    if (nextRole === 'Guest' && (name.trim() === '' || name.trim() === 'Student')) {
      setName('Guest');
    } else if (nextRole === 'Student' && (name.trim() === '' || name.trim() === 'Guest')) {
      setName('Student');
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedName = name.trim() || role;
    await onUpdateUser({
      role,
      name: resolvedName,
      email: email.trim(),
      university: university.trim(),
      department: department.trim(),
      semester,
      bio: bio.trim(),
      defaultViewMode,
      notifications,
    });
    showToast(
      'Profile updated',
      `Your ${role} profile and study preferences have been saved.`
    );
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
          Profile & Settings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Manage your Guest or Student profile, appearance preferences, and study notifications.
        </p>
      </div>

      {/* 1. Profile Section (Only Guest and Student can update it) */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-display font-bold text-sm flex items-center justify-center shrink-0">
              {(name || role)
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
                  User Profile
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  {role} Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Available exclusively for Guest and Student profiles
              </p>
            </div>
          </div>

          {/* Role Switcher: Only Guest and Student */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-center">
            {(['Student', 'Guest'] as const).map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSwitch(r)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 ${
                    active
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r === 'Student' ? (
                    <GraduationCap className="w-3.5 h-3.5" />
                  ) : (
                    <UserIcon className="w-3.5 h-3.5" />
                  )}
                  <span>{r}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'Guest' ? 'Guest' : 'Student Name'}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Account Role
            </label>
            <select
              value={role}
              onChange={(e) => handleRoleSwitch(e.target.value as 'Guest' | 'Student')}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Student">Student</option>
              <option value="Guest">Guest</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Department / Major
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g., Computer Science & Engineering"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
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
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="grid">Grid Cards View</option>
              <option value="list">Compact List View</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Study Focus & Subjects (Optional)
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Add your current courses, exam goals, or study focus..."
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Update {role} Profile
          </button>
        </div>
      </form>

      {/* 2. Appearance & Theme Section */}
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

      {/* 3. Notification Preferences */}
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
              desc: 'Notify when new notes are uploaded in your current semester subjects.',
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
              desc: 'Notify when a revised version of a bookmarked note becomes available.',
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

      {/* 4. About NotesHub */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
            About NotesHub
          </h2>
        </div>

        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            NotesHub is an all-in-one digital study platform designed to make learning, organizing, and accessing study materials easier. It allows students to upload, store, categorize, and manage their notes in one centralized space. Users can organize resources by subjects, topics, and tags, bookmark important materials for quick access, and easily search through their personal study library.
          </p>
          <p>
            Whether it&apos;s PDFs, lecture notes, reference materials, or study resources, NotesHub brings everything together in one place, helping students stay organized, study smarter, and focus on what matters most: learning.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onResetDemoData}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Study Workspace</span>
          </button>
        </div>
      </section>
    </div>
  );
};
