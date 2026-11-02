export type NavigationPage =
  | 'dashboard'
  | 'explore'
  | 'library'
  | 'bookmarks'
  | 'categories'
  | 'recent'
  | 'upload'
  | 'settings'
  | 'note-details';

export type FileType = 'PDF' | 'DOCX' | 'PPTX' | 'MD';

export type RevisionStatus = 'to_read' | 'reviewing' | 'mastered';

export type SortOption = 'newest' | 'popular' | 'highest_rated' | 'title_asc';

export interface NotificationPreferences {
  newSubjectUploads: boolean;
  weeklyRevisionDigest: boolean;
  bookmarkUpdates: boolean;
  examReminders: boolean;
  commentReplies: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  department: string;
  semester: string;
  studentId: string;
  bio: string;
  role: 'Student' | 'Class Representative' | 'Teaching Assistant';
  joinedDate: string;
  themePreference: 'light' | 'dark';
  defaultViewMode: 'grid' | 'list';
  notifications: NotificationPreferences;
}

export interface NoteOutlineSection {
  id: string;
  title: string;
  pageNumber: number;
  summary: string;
}

export interface NotePageContent {
  pageNumber: number;
  sectionTitle: string;
  heading: string;
  paragraphs: string[];
  keyFormulaOrCode?: string;
  diagramCaption?: string;
  takeaways: string[];
}

export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NoteAIPreview {
  executiveSummary: string;
  estimatedStudyMinutes: number;
  examWeightageHint: string;
  keyPoints: string[];
  autoTags: { label: string; confidence: string; category: string }[];
  flashcards: FlashcardItem[];
  quizQuestions: QuizQuestionItem[];
  examPrepChecklist: string[];
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  categoryId: string;
  semester: string;
  unit: string;
  description: string;
  fileType: FileType;
  fileSize: string;
  pageCount: number;
  uploadDate: string;
  uploaderId: string;
  uploaderName: string;
  uploaderRole: string;
  tags: string[];
  rating: number;
  ratingCount: number;
  viewsCount: number;
  downloadsCount: number;
  isSimulatedUpload?: boolean;
  localBlobUrl?: string;
  fileName?: string;
  outline: NoteOutlineSection[];
  pagesContent: NotePageContent[];
  aiPreview: NoteAIPreview;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  subjects: string[];
  noteCount?: number;
  popularTopics: string[];
}

export interface StudyCollection {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  noteId: string;
  createdAt: string;
  collectionId: string;
  revisionStatus: RevisionStatus;
  personalNote?: string;
  lastReviewedAt?: string;
}

export interface Review {
  id: string;
  noteId: string;
  userId: string;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Upload {
  id: string;
  noteId: string;
  title: string;
  subject: string;
  categoryId: string;
  semester: string;
  unit: string;
  description: string;
  tags: string[];
  fileName: string;
  fileSize: string;
  fileType: FileType;
  uploadedAt: string;
  status: 'completed' | 'processing';
  isSimulated: boolean;
  localBlobUrl?: string;
}

export interface RecentlyViewedEntry {
  noteId: string;
  lastAccessedAt: string;
  lastPageRead: number;
  progressPercent: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetNoteId?: string;
  type: 'upload' | 'revision' | 'review' | 'system';
}
