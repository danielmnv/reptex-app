import { RefObject, useEffect } from "react";

export function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void
) {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      event.target &&
      !ref.current.contains(event.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
}
