# Notes Hub — Student Learning & Resource Management Platform

Notes Hub unifies scattered student study materials (PDFs, lecture slides, exam summaries, and reference sheets) into a structured, high-clarity academic workspace following the core student workflow: **Upload → Organize → Search → Read → Bookmark → Revise**.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX decisions incorporate your confirmed preferences and the frontend-only modular specification:

- **Confirmed Decision 1 — Multi-Page Academic Reader**: The Note Details page will feature an interactive multi-page academic document reader with page navigation, zoom controls (75%–150%), table-of-contents chapter outline jumping, full-screen reading mode, and support for real local PDF file blobs when a user uploads a PDF during their session, alongside rich rendered academic page previews for pre-populated notes.
- **Confirmed Decision 2 — Study Collections & Revision Status**: Bookmarks and My Library will support custom study collections/folders (e.g., *Midterm Prep*, *OS Kernel Deep Dive*, *Placement Revision*) and per-note revision status tracking (*To Read*, *Reviewing*, *Mastered*) persisted in `localStorage`.
- **Confirmed Decision 3 — Interactive AI Study Preview Tabs**: Note Details will include clearly badged *"Coming Soon — UI Preview"* interactive tabs demonstrating sample structured outputs for AI Summary, Key Points, Auto-Tagged Topics, Interactive Flashcards (flippable preview cards), Practice Quiz, and Exam Prep Mode without making any external AI API calls.
- **Frontend-Only Service Layer Architecture**: All data mutations (uploading notes, editing metadata, deleting notes, toggling bookmarks, organizing collections, submitting ratings/reviews, tracking recently viewed timestamps, and updating preferences) operate through asynchronous TypeScript service modules (`notesService`, `userService`, `bookmarkService`, `categoryService`, `uploadService`) backed by seeded mock data and `localStorage`, ready for drop-in replacement with Python FastAPI endpoints.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a centralized academic workspace where students can upload study documents, browse curated course materials across subjects and semesters, preview multi-page lecture notes, organize bookmarks into revision folders, track reading progress, and manage their personal study library.
- **Target Audience / Persona**: University and college students studying Computer Science, Engineering, Mathematics, Science, and Business who need a fast, distraction-free alternative to scattered WhatsApp/Telegram links and unsorted Drive folders.
- **Key Value**: Transforms disorganized files into structured, searchable academic knowledge with instant filtering, revision status tracking, and an ergonomic document reader.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Dashboard Overview & Quick Resume**: Students land on a structured dashboard showing real-time statistics (Total Notes, Bookmarked Notes, Recently Viewed, Available Categories), quick action triggers (*Upload Notes*, *Explore Resources*, *Open Bookmarks*), a *Continue Learning* progress strip with revision status, *Recently Accessed Notes*, *Recommended Notes*, and *Popular Categories*.
2. **Explore & Multi-Faceted Discovery**: Students search across titles, subjects, topics, or tags; filter by Subject, Semester (Sem 1–8), and File Type (`PDF`, `DOCX`, `PPTX`, `MD`); sort by Newest, Most Popular, or Highest Rated; toggle between Grid and List layouts; and reset filters with one click.
3. **Note Details, Multi-Page Reader & AI Previews**: Clicking any note opens the dedicated reader view with breadcrumb navigation, metadata header, uploader details, interactive 5-star rating & review submission, bookmark/collection assignment, download trigger, the interactive multi-page academic reader with outline & zoom, related notes, and the *Future AI Study Tools (Coming Soon)* preview tabs.
4. **Simulated Drag-and-Drop Upload**: Students drag and drop a `.pdf`, `.docx`, or `.pptx` file (with client-side file type & size validation), fill in structured academic metadata (Title, Subject, Category, Semester, Unit/Chapter, Description, comma-separated Tags), watch a realistic step-by-step upload progress bar, and immediately view their newly created note in *My Library* and *Explore Notes*.
5. **My Library & Bookmarks Organization**: Students manage their own uploads (inline metadata edit modal, delete confirmation dialog) and organize bookmarked notes into custom study folders with revision status toggles (*To Read*, *Reviewing*, *Mastered*).
6. **Categories, Recently Viewed & Settings**: Students browse 7 academic categories with note counts, inspect chronological reading history with one-click clear/reopen, and customize Light/Dark theme, profile details, and notification toggles.

### Visual Identity & Theme
- **Aesthetic Direction**: Refined, high-craft academic SaaS workspace inspired by Notion and Linear—prioritizing crisp typographic hierarchy, generous whitespace, single-elevation cards with subtle hairline borders, and zero visual clutter.
- **Color Palette & Dual-Theme Posture**:
  - **Light Mode (Default)**: Cool alabaster canvas (`#F8FAFC`), pure white structural surfaces (`#FFFFFF`), hairline borders (`#E2E8F0`), deep charcoal ink (`#0F172A`), muted slate secondary text (`#475569`), and high-intent Indigo accent (`#4F46E5`) with soft violet/indigo subtle surface tints (`#EEF2FF`).
  - **Dark Mode**: Deep obsidian slate canvas (`#0B0F19`), elevated slate surfaces (`#111827`), crisp hairline dividers (`#1E293B`), off-white primary text (`#F8FAFC`), and luminous indigo accent (`#6366F1`). Configured via Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *));` for seamless switching.
- **Typography & Hierarchy**:
  - **Display & Headings**: `Plus Jakarta Sans` (SemiBold/Bold, tight tracking) for workspace headers, section titles, and navigation.
  - **Body & Academic Prose**: `Public Sans` / `DM Sans` for effortless scannability across note descriptions and reader content.
  - **Metrics & Technical Metadata**: `JetBrains Mono` with `tabular-nums` for file sizes, page counters, semester numbers, ratings, and timestamps.
  - **Zero-Pill Metadata Discipline**: Card metadata (Subject, Unit, File Type, File Size, Upload Date) renders as clean, unboxed inline text separated by middots (`·`), reserving button styling strictly for interactive filters, tabs, and actions.
- **Component Styling & Spatial Layout**:
  - Desktop persistent sidebar (`256px` fixed width) + clean top navigation bar with live global search command bar, notifications popover, theme toggle, and user profile menu + responsive main viewport (`max-w-7xl` container with `24px–32px` padding).
  - Mobile drawer navigation and responsive grid layouts with zero horizontal overflow.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Decoupled Asynchronous Service Layer**:
  - *Chosen Approach*: All UI components call async methods on `notesService`, `bookmarkService`, `categoryService`, `uploadService`, and `userService`, which read/write versioned keys in `localStorage` and simulate realistic network latency (`120ms–300ms`).
  - *Why*: Ensures clean separation of concerns so replacing mock persistence with FastAPI `fetch`/`axios` calls later requires zero component refactoring.
- **Decision 2 — Rich Academic Content Seeding**:
  - *Chosen Approach*: Pre-populate 14 detailed, realistic university notes across Operating Systems, Computer Networks, DBMS, Mathematics, Data Structures & Algorithms, Software Engineering, Machine Learning, Macroeconomics, and Digital Logic, complete with multi-page structured academic content for the reader preview.
  - *Why*: Makes the platform immediately feel like an active, lived-in university resource hub rather than an empty template.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         App Shell & Context Providers                        │
│       (ThemeProvider · ToastProvider · AppState / Navigation Router)         │
└───────────────┬──────────────────────────────────────────────┬───────────────┘
                │                                              │
                ▼                                              ▼
┌───────────────────────────────┐              ┌───────────────────────────────┐
│   Persistent Navigation UI    │              │     Active Page Viewport      │
│  ├─ Desktop Sidebar (256px)   │              │  ├─ DashboardView             │
│  ├─ Mobile Drawer & Header    │              │  ├─ ExploreNotesView          │
│  ├─ Global Search Input       │              │  ├─ NoteDetailsReaderView     │
│  ├─ Notifications Popover     │              │  ├─ UploadNotesModal / View   │
│  └─ Theme & Profile Menu      │              │  ├─ MyLibraryView             │
└───────────────────────────────┘              │  ├─ BookmarksCollectionsView  │
                                               │  ├─ CategoriesBrowseView      │
                                               │  ├─ RecentlyViewedView        │
                                               │  └─ SettingsView              │
                                               └───────────────┬───────────────┘
                                                               │
                                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                    Modular Frontend Service Layer (Async)                    │
│  ├─ notesService      (query, filter, sort, getById, update, delete, rate)   │
│  ├─ uploadService     (validateFile, simulateUploadWithProgress)             │
│  ├─ bookmarkService   (toggleBookmark, manageCollections, setRevisionState)  │
│  ├─ categoryService   (getCategoriesWithCounts, getNotesByCategory)          │
│  └─ userService       (getProfile, updateProfile, getNotifications, prefs)   │
└──────────────────────────────────────────────┬───────────────────────────────┘
                                               │
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│             Browser Persistence & Seed Store (localStorage + Blob)           │
│     (Seeded Academic Notes · User Uploads · Bookmarks · History · Theme)     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Core TypeScript Interfaces
- `User`: `id`, `name`, `email`, `university`, `department`, `semester`, `avatarUrl`, `role`, `bio`, `preferences` (theme, notifications, defaultView).
- `Note`: `id`, `title`, `subject`, `categoryId`, `semester`, `unit`, `description`, `fileType` (`PDF` | `DOCX` | `PPTX` | `MD`), `fileSize`, `pageCount`, `uploadDate`, `uploaderId`, `uploaderName`, `uploaderRole`, `tags`, `rating`, `ratingCount`, `viewsCount`, `downloadsCount`, `isSimulatedUpload`, `fileUrl`, `outline` (chapters/sections), `pagesContent` (structured academic preview pages), `aiPreview` (sample summary, key points, flashcards, quiz questions).
- `Category`: `id`, `name`, `slug`, `iconName`, `description`, `subjects`, `accentColor`.
- `Bookmark`: `id`, `noteId`, `createdAt`, `collectionId`, `revisionStatus` (`to_read` | `reviewing` | `mastered`), `personalNotes`.
- `Review`: `id`, `noteId`, `userId`, `userName`, `rating`, `comment`, `createdAt`.
- `UploadPayload`: `title`, `subject`, `categoryId`, `semester`, `unit`, `description`, `tags`, `fileName`, `fileSize`, `fileType`, `localBlobUrl`.

### Interactive Component & State Mapping
- **Global Search & Command Bar**: Typing in the top bar filters notes in real time with instant keyboard/click navigation to the Note Details page or full Explore results.
- **Note Details Multi-Page Reader**: Supports page stepping (`Prev` / `Next` / direct page jump), zoom scaling (`75%`, `100%`, `125%`, `150%`), clickable outline chapters, full-screen toggle, personal study scratchpad notes persisted per document, and interactive AI preview tabs (including flippable flashcards and interactive sample quiz questions with instant answer checking).
- **My Library Management**: Supports editing any note's title, subject, semester, unit, description, and tags via an accessible modal, plus a confirmation modal for note deletion that updates all dependent counts and bookmarks.
- **Toast Feedback System**: Every user action (bookmark added/removed, revision status changed, upload completed, note edited/deleted, rating submitted, settings saved, link copied) triggers a non-intrusive toast notification.
