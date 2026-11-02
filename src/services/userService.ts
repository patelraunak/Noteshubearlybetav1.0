import { User, AppNotification } from '../types';
import { INITIAL_USER, INITIAL_NOTIFICATIONS } from '../data/mockData';

const USER_STORAGE_KEY = 'noteshub_user_v1';
const THEME_STORAGE_KEY = 'noteshub_theme_v1';
const NOTIFICATIONS_STORAGE_KEY = 'noteshub_notifications_v1';

/**
 * Dedicated userService for managing student profile, appearance preferences, and notifications.
 */
export const userService = {
  async getCurrentUser(): Promise<User> {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_USER));
        return INITIAL_USER;
      }
      return JSON.parse(raw) as User;
    } catch {
      return INITIAL_USER;
    }
  },

  async updateUserProfile(updates: Partial<User>): Promise<User> {
    const current = await this.getCurrentUser();
    const updated: User = {
      ...current,
      ...updates,
      notifications: {
        ...current.notifications,
        ...(updates.notifications || {}),
      },
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  getThemePreference(): 'light' | 'dark' {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    } catch {
      return 'light';
    }
  },

  setThemePreference(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  },

  async getNotifications(): Promise<AppNotification[]> {
    try {
      const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(raw) as AppNotification[];
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  async markAllNotificationsRead(): Promise<AppNotification[]> {
    const list = await this.getNotifications();
    const updated = list.map((n) => ({ ...n, read: true }));
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  async addNotification(notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>): Promise<void> {
    const list = await this.getNotifications();
    const newItem: AppNotification = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify([newItem, ...list].slice(0, 12)));
  },
};
