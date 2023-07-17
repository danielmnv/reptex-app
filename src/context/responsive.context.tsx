"use client";

import React, {
  useState,
  useLayoutEffect,
  createContext,
  PropsWithChildren,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../app/components/loader";

export interface ResponsiveContext {
  useMobileQuery: () => boolean;
  useTabletOrMobileQuery: () => boolean;
}

const initialResponsiveContext: ResponsiveContext = {
  useMobileQuery: () => true,
  useTabletOrMobileQuery: () => false,
};

export const ResponsiveContext = createContext<ResponsiveContext>(
  initialResponsiveContext
);

export const ResponsiveContextProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [responsiveContext, setResponsiveContext] = useState<ResponsiveContext>(
    initialResponsiveContext
  );

  const useMobileQuery = () => useMediaQuery({ maxWidth: 767 });
  const useTabletOrMobileQuery = () => useMediaQuery({ maxWidth: 1023 });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setResponsiveContext({ useMobileQuery, useTabletOrMobileQuery });
      setIsLoading(false);
    }
  }, []);

  return (
    <ResponsiveContext.Provider value={responsiveContext}>
      {isLoading ? <Loader /> : children}
    </ResponsiveContext.Provider>
  );
};
