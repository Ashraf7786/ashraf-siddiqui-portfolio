"use client";

import { useEffect } from "react";

export default function SecurityGuard() {
  useEffect(() => {
    // 1. Block right-click ONLY on images and videos (prevents "Save image as...", "Save video as...")
    // Right click on text, backgrounds, and other elements remains fully enabled for inspecting.
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "VIDEO" ||
          target.tagName === "PICTURE" ||
          target.tagName === "CANVAS" ||
          target.closest("img") ||
          target.closest("video") ||
          target.closest("picture"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 2. Block drag & drop on images and videos (prevents dragging to desktop or new tab)
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "IMG" ||
          target.tagName === "VIDEO" ||
          target.tagName === "AUDIO" ||
          target.tagName === "PICTURE" ||
          target.closest("img") ||
          target.closest("video"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true } as EventListenerOptions);
      document.removeEventListener("dragstart", handleDragStart, { capture: true } as EventListenerOptions);
    };
  }, []);

  return null;
}
