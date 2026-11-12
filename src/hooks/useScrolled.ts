import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

export const useScrolled = (threshold: number) =>
  useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    () => false,
  );
