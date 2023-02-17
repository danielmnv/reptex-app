"use client";

import styles from "./styles.module.css";

import React, { useCallback, useState } from "react";
import {
  faPhone,
  faMapPin,
  faClockFour,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Store } from "../../lib/stores/dto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";

export default function Stores({ stores }: { stores: Store[] }) {
  const [activeMarker, setActiveMarker] = useState<string>(null);

  const handleActiveMarker = (marker: string | null) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div className="w-full h-full flex">
      <div className={styles.storeList}>
        {stores.map((store) => (
          <div
            key={store.id}
            className={styles.storeBox}
            onClick={() => handleActiveMarker(store.id)}
          >
            <span>{store.name}</span>
            <span>{store.address}</span>
            <span>{store.phone}</span>
          </div>
        ))}
      </div>
      <Map
        stores={stores}
        activeMarker={activeMarker}
        handleActiveMarker={handleActiveMarker}
      />
    </div>
  );
}

function Map({
  stores,
  activeMarker,
  handleActiveMarker,
}: {
  stores: Store[];
  activeMarker: string | null;
  handleActiveMarker: (marker: string | null) => void;
}) {
  const options: google.maps.MapOptions = {
    disableDefaultUI: true,
    streetViewControl: true,
    zoomControl: true,
    styles: [
      /** ALL */
      { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
      { elementType: "geometry", stylers: [{ color: "#f5f8f8" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#000000" }] },
      /** ADMINISTRATIVE */
      // Country
      {
        featureType: "administrative.country",
        elementType: "geometry",
        stylers: [{ weight: "2" }, { color: "#D84315" }],
      },
      {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [{ color: "#1d1d1d" }],
      },
      // Province
      {
        featureType: "administrative.province",
        elementType: "geometry",
        stylers: [{ color: "#F4511E" }, { weight: "3" }], // Estados
      },
      {
        featureType: "administrative.province",
        elementType: "labels.text.fill",
        stylers: [{ color: "#2d2d2d" }],
      },
      // Locality
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#000000" }],
      },
      // Neighborhood
      {
        featureType: "administrative.neighborhood",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f4f6f9" }],
      },
      /** LANDSCAPE */
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [{ color: "#FFAB91" }],
      },
      /** ROAD */
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#FF7043" }],
      },
      /** POI */
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
      /** ROAD */

      /** TRANSIT */
      {
        featureType: "transit",
        elementType: "all",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_G_MAP,
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      stores.forEach(({ coords }) => bounds.extend(coords));
      map.fitBounds(bounds);
    },
    [stores]
  );

  return isLoaded ? (
    <GoogleMap
      onLoad={onLoad}
      options={options}
      onClick={() => handleActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      {stores.map(({ id, name, address, phone, hours, url, coords }) => (
        <Marker
          key={id}
          position={coords}
          onClick={() => handleActiveMarker(id)}
          icon={{
            url: "https://freesvg.org/img/ts-map-pin.png",
            scaledSize: new google.maps.Size(41, 42),
          }}
        >
          {activeMarker === id && (
            <InfoWindow onCloseClick={() => handleActiveMarker(null)}>
              <div className={styles.storeWindow}>
                <div className={styles.windowRow}>
                  <div className="h-8 w-8 relative">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src="/img/logo.png"
                      alt="REPTEX"
                    />
                  </div>
                  <h1 className={styles.primaryText}>{name}</h1>
                </div>

                <div className={styles.windowRow}>
                  <FontAwesomeIcon icon={faMapPin} className={styles.icon} />
                  <span
                    className={classNames(styles.secondaryText, "max-w-xs")}
                  >
                    {address}
                  </span>
                </div>

                <div className={styles.windowRow}>
                  <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                  <span
                    className={classNames(
                      styles.secondaryText,
                      styles.callAction
                    )}
                  >
                    <a href={`tel:${phone}`}>{phone}</a>
                  </span>
                </div>

                <div className={styles.windowRow}>
                  <FontAwesomeIcon icon={faClockFour} className={styles.icon} />
                  <div className={styles.hourSection}>
                    {hours.map(({ range, time }, index) => (
                      <div key={index} className={styles.rangeWrapper}>
                        <span>{range}</span>
                        <div className={styles.schedule}>
                          {time.map((t, i) => (
                            <span key={i}>{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.routeBtn}
                >
                  Direcciones
                  <FontAwesomeIcon icon={faUpRightFromSquare} />
                </a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
