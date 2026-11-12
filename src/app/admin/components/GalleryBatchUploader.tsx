"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface StagedPhoto {
  file?: File;
  previewUrl: string;
  title: string;
  category: string;
  location: string;
  state: string;
  year: number;
  orientation: "landscape" | "portrait" | "square";
  tags: string[];
  notes: string;
  isUploading?: boolean;
  isUploaded?: boolean;
  error?: string;
}

interface GalleryBatchUploaderProps {
  onPhotosAdded: (photos: any[]) => void;
  folder?: string;
}

export default function GalleryBatchUploader({
  onPhotosAdded,
  folder = "ashraf-travel/gallery",
}: GalleryBatchUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stagedPhotos, setStagedPhotos] = useState<StagedPhoto[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalCategory, setGlobalCategory] = useState("Mountains");
  const [globalLocation, setGlobalLocation] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Helper to format clean title from file name
  const cleanTitleFromName = (filename: string): string => {
    return filename
      .replace(/\.[^/.]+$/, "") // strip extension
      .replace(/[-_]+/g, " ")   // replace dashes & underscores
      .replace(/\s+/g, " ")     // collapse double spaces
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
  };

  // Inspect image dimensions in-browser to accurately auto-detect orientation
  const inspectOrientation = (file: File): Promise<"landscape" | "portrait"> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const isLandscape = img.naturalWidth >= img.naturalHeight;
        URL.revokeObjectURL(objectUrl);
        resolve(isLandscape ? "landscape" : "portrait");
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve("landscape");
      };
      img.src = objectUrl;
    });
  };

  // Process incoming files from file picker or drag-drop
  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) return;

    setStatusMessage(`Preparing ${validFiles.length} photo(s)...`);

    const newStaged: StagedPhoto[] = [];

    for (const file of validFiles) {
      const orientation = await inspectOrientation(file);
      const title = cleanTitleFromName(file.name);
      const previewUrl = URL.createObjectURL(file);

      newStaged.push({
        file,
        previewUrl,
        title: title || "Travel Photograph",
        category: globalCategory,
        location: globalLocation || "India",
        state: "India",
        year: new Date().getFullYear(),
        orientation,
        tags: ["travel", "india", globalCategory.toLowerCase()],
        notes: "",
      });
    }

    setStagedPhotos((prev) => [...newStaged, ...prev]);
    setStatusMessage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Upload all staged photos and add to gallery
  const handleUploadAll = async () => {
    if (stagedPhotos.length === 0) return;

    setIsProcessing(true);
    setStatusMessage(`Uploading ${stagedPhotos.length} photo(s)...`);

    const successfullyAdded: any[] = [];
    const remainingStaged: StagedPhoto[] = [];

    for (let i = 0; i < stagedPhotos.length; i++) {
      const item = stagedPhotos[i];
      if (!item.file) continue;

      try {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Upload failed");
        }

        // Auto orientation fallback from backend or keep user chosen
        const finalOrientation = item.orientation || data.orientation || "landscape";

        successfullyAdded.push({
          id: `g-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
          src: data.url,
          alt: item.title,
          title: item.title,
          location: item.location,
          state: item.state,
          year: item.year,
          category: item.category,
          orientation: finalOrientation,
          tags: item.tags,
          notes: item.notes,
        });
      } catch (err: any) {
        remainingStaged.push({
          ...item,
          error: err.message || "Failed to upload",
        });
      }
    }

    if (successfullyAdded.length > 0) {
      onPhotosAdded(successfullyAdded);
    }

    setStagedPhotos(remainingStaged);
    setIsProcessing(false);

    if (remainingStaged.length === 0) {
      setStatusMessage(`Successfully uploaded and added ${successfullyAdded.length} photo(s)!`);
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage(`Uploaded ${successfullyAdded.length} photo(s). ${remainingStaged.length} failed.`);
    }
  };

  const removeStagedPhoto = (index: number) => {
    const item = stagedPhotos[index];
    if (item?.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }
    setStagedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleOrientation = (index: number) => {
    setStagedPhotos((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        return {
          ...p,
          orientation: p.orientation === "landscape" ? "portrait" : "landscape",
        };
      })
    );
  };

  return (
    <div className="rounded-3xl bg-[#111113] border border-white/10 p-5 sm:p-7 space-y-5">
      {/* Top Banner / Explanation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            <span>Easy Photo Upload &amp; Auto-Organizer</span>
          </h3>
          <p className="text-xs text-white/50 mt-0.5">
            Drop multiple photos at once. Orientations (Horizontal vs. Vertical) and clean titles are detected automatically.
          </p>
        </div>

        {/* Global Batch Settings */}
        <div className="flex items-center gap-2">
          <select
            value={globalCategory}
            onChange={(e) => setGlobalCategory(e.target.value)}
            className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
            title="Default category for new uploads"
          >
            {["Mountains", "Roads", "Cultures", "Cities", "Nature", "People"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Default location (e.g. Kashmir)"
            value={globalLocation}
            onChange={(e) => setGlobalLocation(e.target.value)}
            className="bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 outline-none w-36 sm:w-44"
          />
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
          isDragging
            ? "border-white bg-white/10 scale-[1.01]"
            : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
          className="hidden"
        />

        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <div>
          <p className="text-sm font-bold text-white">
            Drag &amp; Drop photos here, or <span className="underline underline-offset-4">click to browse</span>
          </p>
          <p className="text-xs text-white/40 mt-1">
            Upload 1 or 20 photos at once · Supports JPG, PNG, WEBP, AVIF
          </p>
        </div>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-white flex items-center justify-between">
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Staged Photos Preview (Ready to Upload) */}
      {stagedPhotos.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">
                Ready to Upload ({stagedPhotos.length} Photos)
              </span>
              <span className="text-[10px] text-white/40 font-mono">
                {stagedPhotos.filter((p) => p.orientation === "landscape").length} Horizontal ·{" "}
                {stagedPhotos.filter((p) => p.orientation === "portrait").length} Vertical
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStagedPhotos([])}
                className="px-3 py-1 rounded-full text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleUploadAll}
                disabled={isProcessing}
                className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-[#eaeaea] transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                {isProcessing ? (
                  <span>Uploading...</span>
                ) : (
                  <>
                    <span>Upload &amp; Add All ({stagedPhotos.length})</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Staged Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {stagedPhotos.map((photo, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-black/60 border border-white/10 space-y-2.5 relative group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 relative border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.previewUrl} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <input
                      type="text"
                      value={photo.title}
                      onChange={(e) => {
                        const arr = [...stagedPhotos];
                        arr[idx].title = e.target.value;
                        setStagedPhotos(arr);
                      }}
                      className="w-full bg-transparent border-b border-white/15 focus:border-white text-xs font-bold text-white outline-none truncate"
                      placeholder="Title"
                    />

                    <div className="flex items-center gap-2">
                      <select
                        value={photo.category}
                        onChange={(e) => {
                          const arr = [...stagedPhotos];
                          arr[idx].category = e.target.value;
                          setStagedPhotos(arr);
                        }}
                        className="bg-black border border-white/15 rounded-md px-1.5 py-0.5 text-[10px] text-white/80 outline-none"
                      >
                        {["Mountains", "Roads", "Cultures", "Cities", "Nature", "People"].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={photo.location}
                        onChange={(e) => {
                          const arr = [...stagedPhotos];
                          arr[idx].location = e.target.value;
                          setStagedPhotos(arr);
                        }}
                        className="bg-black border border-white/15 rounded-md px-1.5 py-0.5 text-[10px] text-white/80 outline-none flex-1 truncate"
                        placeholder="Location"
                      />
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeStagedPhoto(idx)}
                    className="p-1 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remove"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* 1-Click Orientation Switcher */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                  <span className="text-white/40 font-mono">Format:</span>
                  <button
                    type="button"
                    onClick={() => toggleOrientation(idx)}
                    className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    title="Click to toggle orientation"
                  >
                    {photo.orientation === "landscape" ? (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                        </svg>
                        <span>Horizontal (16:9)</span>
                      </>
                    ) : (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="5" y="2" width="14" height="20" rx="2" />
                        </svg>
                        <span>Vertical (3:4)</span>
                      </>
                    )}
                    <span className="text-white/40 ml-1">⇄</span>
                  </button>
                </div>

                {photo.error && (
                  <p className="text-[10px] text-red-400 mt-1">{photo.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
