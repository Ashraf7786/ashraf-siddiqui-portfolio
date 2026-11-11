"use client";

import { useEffect } from "react";

export default function SecurityGuard() {
  useEffect(() => {
    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts (F12, Inspect, View Source, Save, Print)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Picker)
      if (isCtrlOrCmd && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View Source)
      if (isCtrlOrCmd && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save Webpage)
      if (isCtrlOrCmd && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return false;
      }

      // Ctrl+P (Print / Save as PDF)
      if (isCtrlOrCmd && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Disable Drag & Drop on media (prevent dragging images/videos to desktop or new tab)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "VIDEO" ||
          target.tagName === "AUDIO" ||
          target.closest("img") ||
          target.closest("video"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Console deterrence warning
    try {
      if (process.env.NODE_ENV === "production") {
        console.clear();
        console.log(
          "%cSecurity Notice",
          "color: #ff3333; font-size: 20px; font-weight: bold;"
        );
        console.log(
          "%cAll visual media, photos, videos, and code assets on this website are protected. Inspection, copying, or scraping is prohibited.",
          "font-size: 13px; color: #888;"
        );
      }
    } catch {
      // Ignore console issues in restrictive environments
    }

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true } as EventListenerOptions);
      window.removeEventListener("keydown", handleKeyDown, { capture: true } as EventListenerOptions);
      document.removeEventListener("dragstart", handleDragStart, { capture: true } as EventListenerOptions);
    };
  }, []);

  return null;
}
