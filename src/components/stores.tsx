import styles from "../styles/stores.module.css";

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
import { Store } from "../types/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";

export default function Stores() {
  const stores: Store[] = [
    {
      id: 2,
      name: "REPTEX Matriz",
      address:
        "Av de la Convención de 1914 Poniente 112, Residencial del Valle I, 20080 Aguascalientes, Ags.",
      phone: "449 146 9078",
      hours: [
        { range: "Lun - Vie", time: ["8:30 - 18:00"] },
        { range: "Sabado", time: ["9:00 - 14:00"] },
      ],
      url: "https://www.google.com/maps/dir/?api=1&destination=REPTEX%20M%C3%A1quinas%20de%20Coser&destination_place_id=ChIJ4dQIVJvuKYQRWJ6xL-BzYog",
      coords: { lat: 21.87547992379967, lng: -102.31237591207008 },
    },
    {
      id: 1,
      name: "REPTEX Centro",
      address:
        "José María Morelos y Pavón 409, Centro, 20000 Aguascalientes, Ags.",
      phone: "449 975 6491",
      hours: [
        { range: "Lun - Vie", time: ["10:00 - 15:00", "15:30 - 18:00"] },
        { range: "Sabado", time: ["10:00 - 14:00"] },
      ],
      url: "https://www.google.com/maps/dir/?api=1&destination=REPTEX%20M%C3%A1quinas%20de%20Coser&destination_place_id=ChIJsXsle2PuKYQRgwXrYjw9hXU",
      coords: { lat: 21.884585196546155, lng: -102.29538159685822 },
    },
    {
      id: 3,
      name: "REPTEX Siglo XXI",
      address:
        "Av Siglo XXI Oriente #5223, Local 3, 20196 Aguascalientes, Ags.",
      phone: "449 536 3650",
      hours: [
        { range: "Lun - Vie", time: ["9:00 - 14:00", "15:00 - 18:00"] },
        { range: "Sabado", time: ["9:00 - 14:00"] },
      ],
      url: "https://www.google.com/maps/dir/?api=1&destination=REPTEX%20M%C3%A1quinas%20de%20Coser&destination_place_id=ChIJj8bRZwzxKYQRIGBc1eL7pDg",
      coords: { lat: 21.885929549689468, lng: -102.25085171005303 },
    },
    {
      id: 4,
      name: "REPTEX Encarnacion",
      address:
        "Lagos de Moreno-Encarnación de Díaz, 47270 Encarnación de Díaz, Jal.",
      phone: "475 953 3165",
      hours: [
        { range: "Lun - Vie", time: ["9:00 - 18:00"] },
        { range: "Sabado", time: ["9:00 - 14:00"] },
      ],
      url: "https://www.google.com/maps/dir/?api=1&destination=REPTEX%20M%C3%A1quinas%20de%20Coser&destination_place_id=ChIJ5QOHLr2EKYQRw0UuVFIRdEE",
      coords: { lat: 21.51276222660816, lng: -102.23605538324759 },
    },
    {
      id: 5,
      name: "REPTEX Villa",
      address: "C. Morelos 102, Centro, 47250 Villa Hidalgo, Jal.",
      phone: "495 968 2419",
      hours: [{ range: "Lun - Vie", time: ["10:00 - 17:00"] }],
      url: "https://www.google.com/maps/dir/?api=1&destination=REPTEX%20M%C3%A1quinas%20de%20Coser&destination_place_id=ChIJ7aEPNJC5KYQRTI7PjCuHzfc",
      coords: { lat: 21.676609425867426, lng: -102.58922294081896 },
    },
  ];

  const [activeMarker, setActiveMarker] = useState<number>(null);

  const handleActiveMarker = (marker: number | null) => {
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
  activeMarker: number | null;
  handleActiveMarker: (marker: number | null) => void;
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
    googleMapsApiKey: "AIzaSyBdSE5Eg1DkqnR4CPUPF4vtNoEXkjyYgSM",
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
