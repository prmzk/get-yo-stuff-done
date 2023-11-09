import { useToast } from "@/components/ui/use-toast";
import { useEffect, useRef, useState } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const useKeyPress = (keyPress: string, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: KeyboardEvent) => {
      if (event.key === keyPress) {
        callback();
      }
    };

    document.addEventListener("keydown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [callback, keyPress]);
};

export function useCopyToClipboard(): (text: string) => Promise<boolean> {
  const { toast } = useToast();
  const copy: (text: string) => Promise<boolean> = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
      });
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      return false;
    }
  };

  return copy;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
