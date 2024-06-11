import { RefObject, useEffect } from "react";

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 */
export function useClickOutside(ref: RefObject<HTMLElement>, onClickOutside: () => void) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
