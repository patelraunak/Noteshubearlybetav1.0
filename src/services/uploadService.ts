import { FileType, Note, Upload, User } from '../types';
import { notesService } from './notesService';
import { userService } from './userService';

const UPLOADS_STORAGE_KEY = 'noteshub_uploads_v1';

const ALLOWED_EXTENSIONS: Record<string, FileType> = {
  pdf: 'PDF',
  docx: 'DOCX',
  doc: 'DOCX',
  pptx: 'PPTX',
  ppt: 'PPTX',
  md: 'MD',
  txt: 'MD',
};

export interface UploadInputPayload {
  title: string;
  subject: string;
  categoryId: string;
  semester: string;
  unit: string;
  description: string;
  tags: string[];
  file: File;
}

/**
 * Dedicated uploadService handling file type validation, progress simulation,
 * local blob URL creation for session PDF previews, and metadata persistence.
 */
export const uploadService = {
  validateFile(file: File): { valid: boolean; fileType?: FileType; error?: string } {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const detectedType = ALLOWED_EXTENSIONS[ext];
    if (!detectedType) {
      return {
        valid: false,
        error: 'Unsupported format. Please upload a PDF, DOCX, PPTX, or Markdown (.md) document.',
      };
    }
    const maxBytes = 50 * 1024 * 1024; // 50 MB limit
    if (file.size > maxBytes) {
      return {
        valid: false,
        error: 'File exceeds the 50 MB student upload limit.',
      };
    }
    return { valid: true, fileType: detectedType };
  },

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  },

  async simulateUploadWithProgress(
    payload: UploadInputPayload,
    user: User,
    onProgress: (percent: number, stageLabel: string) => void
  ): Promise<{ note: Note; uploadRecord: Upload }> {
    const validation = this.validateFile(payload.file);
    if (!validation.valid || !validation.fileType) {
      throw new Error(validation.error || 'Invalid file.');
    }

    const stages = [
      { pct: 18, label: 'Validating document headers & checksum...' },
      { pct: 45, label: 'Extracting academic outline & page metadata...' },
      { pct: 76, label: 'Indexing tags & subject catalog...' },
      { pct: 94, label: 'Saving resource metadata to local browser store...' },
      { pct: 100, label: 'Simulated frontend upload complete!' },
    ];

    for (const stage of stages) {
      await new Promise((resolve) => setTimeout(resolve, 260));
      onProgress(stage.pct, stage.label);
    }

    let localBlobUrl: string | undefined;
    if (validation.fileType === 'PDF') {
      try {
        localBlobUrl = URL.createObjectURL(payload.file);
      } catch {
        localBlobUrl = undefined;
      }
    }

    const formattedSize = this.formatFileSize(payload.file.size);
    const noteId = `note_sim_${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const cleanTags = payload.tags.length > 0 ? payload.tags : [payload.subject, payload.semester];

    const newNote: Note = {
      id: noteId,
      title: payload.title.trim(),
      subject: payload.subject.trim(),
      categoryId: payload.categoryId,
      semester: payload.semester,
      unit: payload.unit.trim(),
      description: payload.description.trim(),
      fileType: validation.fileType,
      fileSize: formattedSize,
      pageCount: 2,
      uploadDate: today,
      uploaderId: user.id,
      uploaderName: user.name,
      uploaderRole: user.role,
      tags: cleanTags,
      rating: 5.0,
      ratingCount: 1,
      viewsCount: 1,
      downloadsCount: 0,
      isSimulatedUpload: true,
      localBlobUrl,
      fileName: payload.file.name,
      outline: [
        {
          id: `${noteId}_sec_1`,
          title: `1. ${payload.unit} — Core Concepts & Definitions`,
          pageNumber: 1,
          summary: `Uploaded study material for ${payload.subject} (${payload.file.name}).`,
        },
        {
          id: `${noteId}_sec_2`,
          title: '2. Worked Examples, Key Formulas & Revision Notes',
          pageNumber: 2,
          summary: 'Summary of key exam derivations, practice questions, and unit takeaways.',
        },
      ],
      pagesContent: [
        {
          pageNumber: 1,
          sectionTitle: `${payload.subject} — ${payload.unit}`,
          heading: payload.title.trim(),
          paragraphs: [
            payload.description.trim(),
            `This resource was uploaded via the Notes Hub Frontend Upload Simulator from file "${payload.file.name}" (${formattedSize}). Its metadata is persisted in browser localStorage so you can search, bookmark, edit, and revise it across sessions.`,
          ],
          keyFormulaOrCode: `Document Metadata Summary:
  File Name : ${payload.file.name}
  Format    : ${validation.fileType} (${formattedSize})
  Course    : ${payload.subject} · ${payload.semester}
  Unit      : ${payload.unit}`,
          diagramCaption: 'Simulated Frontend Upload — Ready for future FastAPI + Cloud Storage integration.',
          takeaways: [
            `Tagged under: ${cleanTags.join(', ')}`,
            'You can edit this note’s metadata or manage it anytime from My Library.',
          ],
        },
        {
          pageNumber: 2,
          sectionTitle: `${payload.unit} — Exam Revision Synthesis`,
          heading: 'Structured Revision & Practice Checkpoints',
          paragraphs: [
            `Second preview page generated for "${payload.title.trim()}". When connected to a Python FastAPI backend with object storage (S3 / GCS), full multi-page PDF streams and OCR text indexing will populate automatically.`,
          ],
          takeaways: [
            'Use the Personal Study Scratchpad on the right to record custom revision reminders for this upload.',
          ],
        },
      ],
      aiPreview: {
        executiveSummary: `Preview summary for your uploaded note "${payload.title.trim()}" in ${payload.subject} (${payload.unit}). Once backend AI pipelines are connected, this tab will synthesize automatic chapter summaries from "${payload.file.name}".`,
        estimatedStudyMinutes: 20,
        examWeightageHint: 'Custom Uploaded Resource',
        keyPoints: [
          `Primary focus: ${payload.title.trim()} (${payload.unit}).`,
          `Categorized under ${payload.subject} for ${payload.semester}.`,
          `Key topics indexed: ${cleanTags.join(', ')}.`,
        ],
        autoTags: cleanTags.map((t) => ({
          label: t,
          confidence: '95%',
          category: 'User Tag',
        })),
        flashcards: [
          {
            id: `fc_${noteId}_1`,
            topic: payload.subject,
            question: `What are the core objectives covered in ${payload.title.trim()}?`,
            answer: payload.description.trim(),
          },
        ],
        quizQuestions: [
          {
            id: `qz_${noteId}_1`,
            question: `Which academic unit does "${payload.title.trim()}" belong to?`,
            options: [payload.unit, 'Unit 1 — Introduction', 'Appendix — Lab Manual', 'General Syllabus'],
            correctIndex: 0,
            explanation: `This resource was cataloged under ${payload.unit} for ${payload.subject}.`,
          },
        ],
        examPrepChecklist: [
          `Review ${payload.unit} core definitions and lecture examples.`,
          'Add this note to a Bookmark Collection to track your revision status.',
        ],
      },
    };

    await notesService.createNote(newNote);

    const uploadRecord: Upload = {
      id: `up_${Date.now()}`,
      noteId: newNote.id,
      title: newNote.title,
      subject: newNote.subject,
      categoryId: newNote.categoryId,
      semester: newNote.semester,
      unit: newNote.unit,
      description: newNote.description,
      tags: newNote.tags,
      fileName: payload.file.name,
      fileSize: formattedSize,
      fileType: validation.fileType,
      uploadedAt: today,
      status: 'completed',
      isSimulated: true,
      localBlobUrl,
    };

    const existingUploads = this.getUploadHistory();
    localStorage.setItem(UPLOADS_STORAGE_KEY, JSON.stringify([uploadRecord, ...existingUploads]));

    await userService.addNotification({
      title: 'Simulated Upload Complete',
      message: `"${newNote.title}" (${formattedSize}) is now available in My Library and Explore Notes.`,
      targetNoteId: newNote.id,
      type: 'upload',
    });

    return { note: newNote, uploadRecord };
  },

  getUploadHistory(): Upload[] {
    try {
      const raw = localStorage.getItem(UPLOADS_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Upload[]) : [];
    } catch {
      return [];
    }
  },
};
