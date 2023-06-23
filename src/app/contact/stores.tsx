"use client";

import styles from "./styles.module.css";
import pin from "../../../public/img/pin.svg";

import {
  faPhone,
  faMapPin,
  faClockFour,
  faDiamondTurnRight,
  faStore,
  faClose,
  faMagnifyingGlass,
} from "@fortawesome/pro-duotone-svg-icons";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useTransition,
  animated,
  config as springConfig,
} from "@react-spring/web";
import { Store } from "../../lib/stores/dto";
import classNames from "classnames";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { ResponsiveContext } from "../../context/responsive.context";
import { NavbarPortal } from "../../portal/navbar-portal";
import { getSocialMediaIcon } from "../social-media-item";

const Stores = ({ stores }: { stores: Store[] }) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

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
            {isMobile ? (
              <NavbarPortal>
                <StoreSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                  isOnNavbar={true}
                />
              </NavbarPortal>
            ) : (
              <StoreSearch keyword={keyword} setKeyword={setKeyword} />
            )}

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
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm md:text-base font-extrabold">
                        {store.name}
                      </h2>

                      <a
                        href={store.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ds-btn ds-btn-sm ds-btn-ghost text-secondary-focus"
                      >
                        <FontAwesomeIcon icon={faDiamondTurnRight} size="lg" />
                      </a>
                    </div>
                    <p className="text-sm font-light flex-grow">
                      {store.address}
                    </p>
                    <div className="ds-join">
                      <a
                        href={`tel:${store.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="ds-join-item ds-btn ds-btn-sm ds-btn-primary"
                      >
                        <FontAwesomeIcon icon={faPhone} />
                      </a>

                      {!!store.whatsapp && (
                        <a
                          href={`https://wa.me/${store.whatsapp}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ds-join-item ds-btn ds-btn-sm ds-btn-primary"
                        >
                          <FontAwesomeIcon
                            icon={getSocialMediaIcon("WhatsApp")}
                            size="lg"
                          />
                        </a>
                      )}
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

const StoreSearch = ({
  keyword,
  setKeyword,
  isOnNavbar = false,
}: {
  keyword: string;
  setKeyword: (k: string) => void;
  isOnNavbar?: boolean;
}) => {
  return (
    <div
      className={classNames("ds-form-control ", {
        "absolute z-10 left-1/2 -translate-x-1/2 top-32 md:left-6 md:translate-x-0 w-4/5 max-w-xs":
          !isOnNavbar,
      })}
    >
      <label className="ds-join">
        {isOnNavbar && (
          <button className="ds-join-item ds-btn ds-btn-sm ds-btn-ghost hover:bg-opacity-0">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        )}

        <input
          type="text"
          placeholder="Busca una tienda"
          className={classNames(
            "ds-join-item ds-input ds-input-sm md:ds-input-md",
            {
              "ds-input-bordered": !isOnNavbar,
              "ds-input-ghost max-w-[9rem] focus:outline-none focus:bg-opacity-0":
                isOnNavbar,
            }
          )}
          value={keyword}
          onChange={({ target }) => setKeyword(target.value)}
        />

        {!isOnNavbar && (
          <button
            className="ds-join-item ds-btn ds-btn-sm md:ds-btn-md ds-btn-primary bg-opacity-95"
            onClick={() => !!keyword && setKeyword("")}
          >
            <FontAwesomeIcon
              icon={!!keyword ? faClose : faStore}
              className="text-white"
            />
          </button>
        )}
      </label>
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
                url: pin.src,
                scaledSize: new google.maps.Size(30, 30),
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
