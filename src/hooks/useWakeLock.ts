import { useEffect } from "react";

/**
 * Keeps the screen awake while the scoreboard is visible.
 *
 * Uses the Screen Wake Lock API. The browser releases the lock
 * automatically when the page is hidden (tab switch, app in background),
 * so we request it again whenever the page becomes visible.
 *
 * Does nothing on browsers without Wake Lock support
 * or outside a secure context (https / localhost).
 */
export const useWakeLock = () => {
  useEffect(() => {
    if (!("wakeLock" in navigator)) return;

    let wakeLock: WakeLockSentinel | null = null;
    let isCleanedUp = false;

    const requestWakeLock = async () => {
      if (document.visibilityState !== "visible") return;

      try {
        const lock = await navigator.wakeLock.request("screen");

        // The component may have unmounted while we were waiting
        if (isCleanedUp) {
          lock.release();
          return;
        }

        wakeLock = lock;
      } catch {
        // Request can be denied (e.g. battery saver) — the app still works
      }
    };

    requestWakeLock();
    document.addEventListener("visibilitychange", requestWakeLock);

    return () => {
      isCleanedUp = true;
      document.removeEventListener("visibilitychange", requestWakeLock);
      wakeLock?.release();
    };
  }, []);
};
