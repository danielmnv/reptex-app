"use client";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import { ResponsiveContext } from "../../../context/responsive.context";
import { Product, ProductImage } from "../../../lib/product/dto";
import { Section } from "../../components/section";
import InnerImageZoom from "react-inner-image-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSocialMediaIcon } from "../../components/social-media-item";
import { SocialMediaType } from "../../../lib/social-media/dto";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { faCloudDownload, faFilePdf } from "@fortawesome/pro-duotone-svg-icons";
import { BreadCrumbItem, BreadCrumbs } from "../../components/breadcrumbs";

export const ProductView = ({ product }: { product: Product }) => {
  const breadCrumbsItems: BreadCrumbItem[] = [
    { label: product.category, url: `/categoria/${product.category}` },
    { label: product.name, url: "" },
  ];
  return (
    <Section>
      <BreadCrumbs className="-mb-12" items={breadCrumbsItems} />
      <div className="flex gap-6 flex-col lg:flex-row">
        <ProductImages images={product.images} />
        <ProductDetails {...product} />
      </div>

      <ProductAdditionalInfo product={product} />
    </Section>
  );
};

const ProductImages = ({ images }: { images: ProductImage[] }) => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);

  const isTabletOrMobile = useTabletOrMobileQuery();
  const containerImageReef = useRef<HTMLDivElement>(null);
  const [containerImageSizes, setContainerImageSizes] = useState<
    [number, number]
  >([0, 0]);
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    images[0] || undefined
  );

  const handleChangeImage = (image: ProductImage) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (!containerImageReef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const width = containerImageReef.current?.clientWidth ?? 0;
      setContainerImageSizes([width, width]);
    });

    resizeObserver.observe(containerImageReef.current);

    return () => {
      resizeObserver.disconnect();
    }; // clean up
  }, [containerImageReef.current]);

  return (
    <div className="shrink-0 flex flex-col-reverse sm:flex-row lg:justify-center gap-4">
      {/* Selector */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-2 sm:h-96 lg:h-80 xl:h-[30rem] overflow-auto">
          {images.map((image, index) => (
            <div
              key={`prod-image-${index}`}
              className={classNames(
                "shrink-0 cursor-pointer rounded-md overflow-hidden border hover:shadow-lg  hover:[&>*]:scale-110 transition-all ease-in-out duration-200",
                {
                  "border-secondary": selectedImage?.src === image.src,
                }
              )}
              onMouseOver={() => handleChangeImage(image)}
              onClick={() => handleChangeImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-16 h-16 object-cover transition-all ease-in-out duration-200"
              />
            </div>
          ))}
        </div>
      )}

      {/* Selected */}
      {selectedImage && (
        <div
          ref={containerImageReef}
          className="w-full h-auto sm:w-96 sm:h-96 lg:w-80 lg:h-80 xl:w-[30rem] xl:h-[30rem]"
        >
          <InnerImageZoom
            className="rounded-md"
            height={containerImageSizes[0]}
            width={containerImageSizes[1]}
            src={selectedImage.src}
            // zoomSrc={selectedImage.src}
            zoomSrc={"https://wallpaperaccess.com/full/197547.jpg"}
            zoomType={isTabletOrMobile ? "click" : "hover"}
            moveType={isTabletOrMobile ? "drag" : "pan"}
            fullscreenOnMobile
            hideCloseButton
            hideHint
          />
        </div>
      )}
    </div>
  );
};

const ProductDetails = ({ name, description, category }: Product) => {
  const shareTitle = `Checa este producto de Reptex: ${name}.`;
  const hashTags = ["reptex", category];

  return (
    <div className="grow flex flex-col gap-6">
      <h1 className="text-xl md:text-2xl xl:text-3xl font-light capitalize">
        {name}
      </h1>

      <p className="text-sm xl:text-base font-light text-justify whitespace-pre-wrap">
        {description}
      </p>

      <div className="ds-badge ds-badge-lg ds-badge-primary capitalize">
        {category}
      </div>

      <div className="flex gap-2">
        <FacebookShareButton
          url={window.location.href}
          quote={shareTitle}
          hashtag={hashTags[0]}
        >
          <ShareButton icon="Facebook" />
        </FacebookShareButton>

        <TwitterShareButton
          url={window.location.href}
          title={shareTitle}
          hashtags={hashTags}
        >
          <ShareButton icon="Twitter" />
        </TwitterShareButton>

        <WhatsappShareButton
          url={window.location.href}
          title={shareTitle}
          separator={"\n"}
        >
          <ShareButton icon="WhatsApp" />
        </WhatsappShareButton>

        <TelegramShareButton url={window.location.href} title={shareTitle}>
          <ShareButton icon="Telegram" />
        </TelegramShareButton>
      </div>
    </div>
  );
};

const ShareButton = ({ icon }: { icon: SocialMediaType }) => {
  return (
    <div className="ds-btn ds-btn-circle ds-btn-sm border-gray-300 ds-btn-outline text-gray-400 hover:border-primary hover:text-primary hover:bg-transparent">
      <FontAwesomeIcon icon={getSocialMediaIcon(icon)} />
    </div>
  );
};

const ProductAdditionalInfo = ({ product }: { product: Product }) => {
  const propertyName = Object.keys(product.properties);
  const propertyValue = Object.values(product.properties);
  const hasProps = propertyName.length > 0;
  const hasFile = !!product.file;

  const [tab, setTab] = useState<"info" | "file">(hasProps ? "info" : "file");

  const handleDownloadFile = () => {
    console.log("download file");
  };

  return hasProps || hasFile ? (
    <div className="flex flex-col items-center">
      <div className="ds-tabs">
        {hasProps && (
          <a
            className={classNames(
              "ds-tab transition-all ease-in-out duration-150 hover:text-primary",
              {
                "ds-tab-bordered ds-tab-active text-primary !border-primary":
                  tab === "info",
              }
            )}
            onClick={() => setTab("info")}
          >
            Información
          </a>
        )}

        {hasFile && (
          <a
            className={classNames(
              "ds-tab transition-all ease-in-out duration-150 hover:text-primary",
              {
                "ds-tab-bordered ds-tab-active text-primary !border-primary":
                  tab === "file",
              }
            )}
            onClick={() => setTab("file")}
          >
            Ficha Técnica
          </a>
        )}
      </div>

      <div className="border rounded-md w-full">
        {tab === "info" && hasProps && (
          <div className="overflow-x-auto py-2">
            <table className="ds-table">
              {/* head */}
              <tbody className="capitalize">
                {propertyName.map((name, index) => (
                  <tr key={`prod-property-cell-${index}`}>
                    <th className="md:w-1/3">{name}</th>
                    <td>{propertyValue[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "file" && hasFile && (
          <div className="p-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faFilePdf}
                size="xl"
                className="text-accent"
              />
              <p className="font-light">Ficha técnica {product.name}</p>
            </div>

            <button
              className="ds-btn ds-btn-sm ds-btn-outline ds-btn-primary w-full md:w-fit"
              onClick={handleDownloadFile}
            >
              Descargar
              <FontAwesomeIcon icon={faCloudDownload} />
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
