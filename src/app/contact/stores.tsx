"use client";

import styles from "./styles.module.css";

import {
  faPhone,
  faMapPin,
  faClockFour,
  faDiamondTurnRight,
  faStore,
  faClose,
} from "@fortawesome/pro-duotone-svg-icons";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useTransition,
  useSpring,
  animated,
  config as springConfig,
} from "@react-spring/web";
import { Store } from "../../lib/stores/dto";
import classNames from "classnames";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

const Stores = ({ stores }: { stores: Store[] }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [filteredList, setFilteredList] = useState<Store[]>(stores);
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end start", "start start"],
  });

  const position = useTransform(scrollYProgress, (pos) =>
    pos === 1 ? "relative" : "fixed"
  );

  const transitions = useTransition(filteredList, {
    from: { opacity: 0, transform: "translate3d(0,100%,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0%,0)" },
    leave: { opacity: 0, transform: "translate3d(0,100%,0)" },
    config: {
      ...springConfig.gentle,
      clamp: true,
    },
  });

  const handleActiveMarker = (store?: Store) => {
    if (store?.id === selectedStore?.id) {
      return;
    }
    setSelectedStore(store);
  };

  useEffect(() => {
    const formattedKeyword = keyword.toLocaleLowerCase();
    const filteredStores = stores.filter(
      (s) =>
        s.name.toLocaleLowerCase().includes(formattedKeyword) ||
        s.address.toLocaleLowerCase().includes(formattedKeyword) ||
        s.phone.toLocaleLowerCase().includes(formattedKeyword)
    );

    if (
      !!selectedStore &&
      !filteredStores.some((s) => s.id === selectedStore.id)
    ) {
      setSelectedStore(undefined);
    }

    setFilteredList(filteredStores);
  }, [keyword]);

  return (
    <div ref={ref} className="relative h-[130vh]">
      <motion.div
        className="w-full"
        style={{ position, top: 0, overflow: "visible" }}
      >
        {isMapLoaded && (
          <>
            <div className="ds-form-control w-4/5 max-w-xs absolute z-10 top-32 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
              <label className="ds-input-group">
                <input
                  type="text"
                  placeholder="Busca una tienda"
                  className="ds-input ds-input-sm md:ds-input-md ds-input-bordered"
                  value={keyword}
                  onChange={({ target }) => setKeyword(target.value)}
                />
                <button
                  className="ds-btn ds-btn-sm md:ds-btn-md ds-btn-primary bg-opacity-95"
                  onClick={() => !!keyword && setKeyword("")}
                >
                  <FontAwesomeIcon
                    icon={!!keyword ? faClose : faStore}
                    className="text-white"
                  />
                </button>
              </label>
            </div>

            <div className={styles.storeListWrapper}>
              <div className={styles.storeList}>
                {transitions((style, store) => (
                  <animated.div
                    key={store.id}
                    style={style}
                    className={classNames(styles.storeBox, {
                      [styles.active]: store.id === selectedStore?.id,
                    })}
                    onClick={() => handleActiveMarker(store)}
                  >
                    <h2 className="text-sm md:text-base font-extrabold">
                      {store.name}
                    </h2>
                    <p className="text-sm font-normal flex-grow">
                      {store.address}
                    </p>
                    <div className="flex justify-between items-center ">
                      <a
                        href={`tel:${store.phone}`}
                        className={styles.arrowLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FontAwesomeIcon icon={faPhone} />
                        {store.phone}
                      </a>

                      <a
                        href={store.url}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-secondary-focus text-base md:text-2xl"
                      >
                        <FontAwesomeIcon icon={faDiamondTurnRight} />
                      </a>
                    </div>
                  </animated.div>
                ))}
              </div>
            </div>
          </>
        )}

        <Map
          stores={filteredList}
          selectedStore={selectedStore}
          handleActiveMarker={handleActiveMarker}
          onMapLoad={setIsMapLoaded}
        />
      </motion.div>
    </div>
  );
};

const Map = ({
  stores,
  selectedStore,
  handleActiveMarker,
  onMapLoad,
}: {
  stores: Store[];
  selectedStore?: Pick<Store, "id" | "coords">;
  handleActiveMarker: (store?: Store) => void;
  onMapLoad: (v: boolean) => void;
}) => {
  const options: google.maps.MapOptions = {
    disableDefaultUI: true,
    // streetViewControl: true,
    // zoomControl: true,
    styles: [
      /** ALL */
      { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
      { elementType: "geometry", stylers: [{ color: "#FFCCBC" }] },
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
        stylers: [{ color: "#FF8A65" }],
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
    googleMapsApiKey: process.env.NEXT_PUBLIC_G_MAP!,
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new google.maps.LatLngBounds();
      stores.forEach(({ coords }) => bounds.extend(coords));
      map.fitBounds(bounds);
    },
    [stores]
  );

  useEffect(() => {
    onMapLoad(isLoaded);
  }, [isLoaded]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          onLoad={onLoad}
          options={options}
          center={selectedStore?.coords}
          onClick={() => handleActiveMarker(undefined)}
          mapContainerStyle={{
            width: "100%",
            height: "100vh",
          }}
        >
          {stores.map((s) => (
            <Marker
              key={`google-map-store-${s.id}`}
              position={s.coords}
              onClick={() => handleActiveMarker(s)}
              icon={{
                url: "https://freesvg.org/img/ts-map-pin.png",
                scaledSize: new google.maps.Size(41, 42),
              }}
            >
              {selectedStore?.id === s.id && (
                <InfoWindow onCloseClick={() => handleActiveMarker(undefined)}>
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
                      <p className={styles.primaryText}>{s.name}</p>
                    </div>

                    <div className={styles.windowRow}>
                      <FontAwesomeIcon
                        icon={faMapPin}
                        className={styles.icon}
                      />
                      <span
                        className={classNames(styles.secondaryText, "max-w-xs")}
                      >
                        {s.address}
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
                        <a href={`tel:${s.phone}`}>{s.phone}</a>
                      </span>
                    </div>

                    <div className={styles.windowRow}>
                      <FontAwesomeIcon
                        icon={faClockFour}
                        className={styles.icon}
                      />
                      <div className={styles.hourSection}>
                        {s.hours.map(({ range, time }, index) => (
                          <div
                            key={`store-${s.id}-range-${index}`}
                            className={styles.rangeWrapper}
                          >
                            <span>{range}</span>
                            <div className={styles.schedule}>
                              {time.map((t, i) => (
                                <span
                                  key={`store-${s.id}-range-${index}-time-${i}`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.routeBtn}
                    >
                      Direcciones
                      <FontAwesomeIcon icon={faDiamondTurnRight} />
                    </a>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <div className="min-h-[calc(100vh_-_112px)] bg-transparent"></div>
      )}
    </>
  );
};

export default Stores;
