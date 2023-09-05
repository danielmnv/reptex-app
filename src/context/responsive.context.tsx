"use client";

import React, {
  useState,
  useLayoutEffect,
  createContext,
  PropsWithChildren,
} from "react";
import { useMediaQuery } from "react-responsive";
import { Loader } from "../app/components/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-duotone-svg-icons";

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
  const [isFirstRenderLoading, setIsFirstRenderLoading] =
    useState<boolean>(true);
  const [responsiveContext, setResponsiveContext] = useState<ResponsiveContext>(
    initialResponsiveContext
  );

  const useMobileQuery = () => useMediaQuery({ maxWidth: 767 });
  const useTabletOrMobileQuery = () => useMediaQuery({ maxWidth: 1023 });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setResponsiveContext({ useMobileQuery, useTabletOrMobileQuery });
      setIsFirstRenderLoading(false);
    }
  }, []);

  return (
    <ResponsiveContext.Provider value={responsiveContext}>
      {isFirstRenderLoading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer
            position="bottom-center"
            hideProgressBar
            closeOnClick
            draggable
            closeButton={false}
            theme="colored"
            icon={({ type }) => (
              <FontAwesomeIcon
                icon={type === "success" ? faCheckCircle : faExclamationCircle}
              />
            )}
          />
          {children}
        </>
      )}
    </ResponsiveContext.Provider>
  );
};
