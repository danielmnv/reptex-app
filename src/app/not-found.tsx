"use client";

import "./not-found.css";

import { faFaceExplode } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ResponsiveContext } from "../context/responsive.context";
import Link from "next/link";

const NotFound = () => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

  return (
    <div className="not-found-wrapper">
      <FontAwesomeIcon
        icon={faFaceExplode}
        size={isMobile ? "6x" : "10x"}
        className="not-found-icon"
      />

      <div className="not-found-content">
        <span className="not-found-exclamation">Oops!</span>

        <div>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Página no encontrada</h2>
        </div>

        <p className="not-found-description">
          Lo sentimos, la página que solicitaste no ha sido encontrada.
          <br />
          Por favor, regresa al inicio del sitio.
        </p>

        <div>
          <Link href="/" className="not-found-button">
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
