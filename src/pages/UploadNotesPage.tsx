import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Category, Note, User } from '../types';
import { uploadService } from '../services/uploadService';
import { useToast } from '../components/Toast';

interface UploadNotesPageProps {
  user: User;
  categories: (Category & { noteCount: number })[];
  semesters: string[];
  onUploadSuccess: (newNote: Note) => void;
  onOpenNote: (noteId: string) => void;
}

export const UploadNotesPage: React.FC<UploadNotesPageProps> = ({
  user,
  categories,
  semesters,
  onUploadSuccess,
  onOpenNote,
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat_cs');
  const [subject, setSubject] = useState('Operating Systems');
  const [semester, setSemester] = useState(user.semester || 'Semester 5');
  const [unit, setUnit] = useState('Unit 1 — Core Foundations');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Lecture Notes, Exam Prep, Summary');

  // Upload simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [completedNote, setCompletedNote] = useState<Note | null>(null);

  const handleFileChosen = (file: File) => {
    setFileError(null);
    const result = uploadService.validateFile(file);
    if (!result.valid) {
      setSelectedFile(null);
      setFileError(result.error || 'Invalid file format.');
      showToast('Unsupported file', result.error, 'error');
      return;
    }
    setSelectedFile(file);
    if (!title.trim()) {
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ');
      setTitle(baseName.charAt(0).toUpperCase() + baseName.slice(1));
    }
  };

  const handleLoadSampleFile = () => {
    const samplePdfContent = `%PDF-1.4\n% Sample Academic Study Resource for Notes Hub`;
    const sampleFile = new File(
      [samplePdfContent],
      'Distributed_Systems_Consensus_Raft_Notes.pdf',
      { type: 'application/pdf' }
    );
    handleFileChosen(sampleFile);
    setTitle('Distributed Systems: Raft Consensus, Leader Election & Log Replication');
    setCategoryId('cat_cs');
    setSubject('Operating Systems');
    setSemester('Semester 6');
    setUnit('Unit 5 — Distributed Consensus');
    setDescription(
      'Structured lecture notes explaining fault-tolerant state machines, Split-Vote recovery via randomized election timeouts, AppendEntries RPC heartbeats, and log safety invariants.'
    );
    setTagsInput('Distributed Systems, Raft, Consensus, Fault Tolerance, RPC');
    showToast('Sample academic PDF loaded', 'Form pre-filled for quick upload demonstration.', 'info');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChosen(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Please select or drag-and-drop a PDF, DOCX, PPTX, or MD file first.');
      showToast('File required', 'Select a document or click "Load Demo Academic PDF".', 'error');
      return;
    }
    if (!title.trim() || !subject.trim() || !description.trim()) {
      showToast('Missing required fields', 'Please fill in the note title, subject, and description.', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(5);
    setUploadStage('Initializing simulated frontend upload...');

    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean);

      const { note } = await uploadService.simulateUploadWithProgress(
        {
          title,
          subject,
          categoryId,
          semester,
          unit,
          description,
          tags,
          file: selectedFile,
        },
        user,
        (pct, stageLabel) => {
          setUploadProgress(pct);
          setUploadStage(stageLabel);
        }
      );

      setCompletedNote(note);
      onUploadSuccess(note);
      showToast(
        'Note uploaded to local store',
        `"${note.title}" is now live in My Library and Explore Notes.`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setFileError(msg);
      showToast('Upload error', msg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleResetForm = () => {
    setSelectedFile(null);
    setCompletedNote(null);
    setTitle('');
    setDescription('');
    setUploadProgress(0);
    setUploadStage('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Upload Study Notes
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Add lecture slides, handwritten PDF scans, or revision sheets to your centralized study workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSampleFile}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Load Demo Academic PDF</span>
        </button>
      </div>

      {/* Simulated Upload Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong>Frontend Simulation Mode:</strong> Uploaded files are validated in your browser and their metadata is persisted in <code className="font-mono">localStorage</code> so your notes remain accessible across page reloads. When connected to the future Python FastAPI + cloud storage backend, binary files will stream directly to object storage.
        </div>
      </div>

      {/* Success Banner if Upload Just Completed */}
      {completedNote && (
        <div className="p-6 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-display font-bold text-slate-900 dark:text-white">
                "{completedNote.title}" added to Notes Hub!
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Persisted to browser storage under {completedNote.subject} · {completedNote.semester} ({completedNote.fileSize}).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-3.5 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700 text-xs font-semibold text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100/60 transition-colors"
            >
              Upload Another
            </button>
            <button
              type="button"
              onClick={() => onOpenNote(completedNote.id)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Open in Reader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        {/* Drag and Drop Zone */}
        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
            1. Study Document File (PDF, DOCX, PPTX, or MD · Max 50 MB)
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                : selectedFile
                ? 'border-emerald-500/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500/60 hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.md,.txt"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChosen(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {uploadService.formatFileSize(selectedFile.size)} · Validated & Ready
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Drag and drop your study file here, or <span className="text-indigo-600 dark:text-indigo-400 underline">browse computer</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Supports PDF lecture notes, DOCX summaries, PPTX slides, and Markdown (.md)
                </p>
              </div>
            )}
          </div>

          {fileError && (
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 mt-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{fileError}</span>
            </div>
          )}
        </div>

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Note Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Operating Systems: Process Synchronization & Deadlock Avoidance"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Academic Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => {
                const newCatId = e.target.value;
                setCategoryId(newCatId);
                const found = categories.find((c) => c.id === newCatId);
                if (found && found.subjects[0]) {
                  setSubject(found.subjects[0]);
                }
              }}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Subject Name *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Operating Systems, DBMS, Linear Algebra"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Semester *
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Unit or Chapter *
            </label>
            <input
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g., Unit 3 — Deadlocks & Memory Management"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Description & Syllabus Coverage *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summarize key theorems, algorithms, derivations, or exam topics covered in this resource..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              Topic Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g., Semaphores, Banker Algorithm, Virtual Memory, Midterm"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Upload Progress Animation Bar */}
        {isUploading && (
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-indigo-900 dark:text-indigo-200">
              <span>{uploadStage}</span>
              <span className="font-mono tabular-nums font-bold">{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-indigo-100 dark:bg-indigo-900 overflow-hidden">
              <div
                className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetForm}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isUploading ? 'Simulating Upload...' : 'Upload & Save to Library'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
