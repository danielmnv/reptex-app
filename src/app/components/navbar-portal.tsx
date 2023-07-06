import {
  useRef,
  useEffect,
  useState,
  ReactNode,
  PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

export const NavbarPortal = ({ children }: PropsWithChildren) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#navbar-portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(<div>{children}</div>, ref.current)
    : null;
};
