"use client";

import React, { useRef, useState } from "react";

interface CloudinaryUploadButtonProps {
  onSuccess: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
  className?: string;
}

export function CloudinaryUploadButton({
  onSuccess,
  folder = "ashraf-travel",
  accept = "image/*",
  label = "Upload to Cloudinary",
  className = "",
}: CloudinaryUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed. Please check your Cloudinary credentials in .env.local.");
      }

      onSuccess(data.url);
    } catch (err: any) {
      setErrorMessage(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="inline-flex flex-col">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          className ||
          "border-emerald-600/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-500"
        }`}
      >
        {isUploading ? (
          <>
            <svg
              className="animate-spin h-3.5 w-3.5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <svg
              className="w-3.5 h-3.5 text-current"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>{label}</span>
          </>
        )}
      </button>

      {errorMessage && (
        <p className="text-[11px] text-rose-400 mt-1 max-w-xs">{errorMessage}</p>
      )}
    </div>
  );
}

