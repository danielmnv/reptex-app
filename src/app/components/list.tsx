import {
  faChevronsLeft,
  faChevronsRight,
  faClose,
  faEllipsis,
  faEye,
  faFacePleading,
  faFilterList,
  faFilterSlash,
  faGridRound,
  faListUl,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
  DocumentData,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "firebase/firestore";
import { useAnimate } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { ResponsiveContext } from "../../context/responsive.context";
import { useLoader } from "../../hooks/use-loader";
import { Category } from "../../lib/category/dto";
import { paginateCategoryProducts } from "../../lib/product";
import {
  CategoryProductFilters,
  PaginatedCategoryProducts,
  Product,
} from "../../lib/product/dto";
import { BreadCrumbItem, BreadCrumbs } from "./breadcrumbs";
import { Filters } from "./filters";
import { Section } from "./section";

type TypeView = "grid" | "list";

export const ProductList = ({ category }: { category: Category }) => {
  const { useTabletOrMobileQuery } = useContext(ResponsiveContext);
  const setLoading = useLoader((state) => state.setLoading);

  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isTabletOrMobile = useTabletOrMobileQuery();
  const [paginate, setPaginate] = useState<PaginatedCategoryProducts>();
  const [page, setPage] = useState<number>(1);
  const [typeView, setTypeView] = useLocalStorageState<TypeView>("typeView", {
    defaultValue: "grid",
  });

  const breadCrumbsItems: BreadCrumbItem[] = [
    { label: category.name, url: "" },
  ];

  const onChangePage = async (direction: "next" | "previous") => {
    if (!paginate) return;

    const cursor =
      direction === "next"
        ? [paginate.last, undefined]
        : [undefined, paginate.first];

    await getPaginatedProducts(...cursor);
    setPage((prev) => prev + (direction === "next" ? 1 : -1));
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const onScroll = async () => {
    if (!paginate) return;

    if (paginate.lastPage === page || paginate.total === paginate.items.length)
      return;

    await getPaginatedProducts(paginate.last, undefined, true);
    setPage((prev) => prev + 1);
  };

  const getPaginatedProducts = async (
    startAfter?: QueryDocumentSnapshot<Product, DocumentData>,
    endBefore?: QueryDocumentSnapshot<Product, DocumentData>,
    shouldAppend: boolean = false
  ) => {
    setLoading(true);

    const filters: CategoryProductFilters[] = [];
    const params = new URLSearchParams(searchParams);

    params.forEach((value, key) => {
      if (key === "nombre") {
        filters.push(
          ...[
            {
              fieldPath: `name`,
              opStr: ">=" as WhereFilterOp,
              value,
            },
            {
              fieldPath: `name`,
              opStr: "<=" as WhereFilterOp,
              value: value + "\uf8ff",
            },
          ]
        );
      } else {
        const values = value.split(",");
        const hasMulitpleValues = values.length > 1;

        filters.push({
          fieldPath: `properties.${key}`,
          opStr: hasMulitpleValues ? "in" : "==",
          value: hasMulitpleValues ? values : values[0],
        });
      }
    });

    const response = await paginateCategoryProducts(
      category.keyword,
      filters,
      startAfter,
      endBefore
    );

    if (shouldAppend) {
      response.items = [...(paginate?.items || []), ...response.items];
    }

    setPaginate(response);
    setLoading(false);
  };

  const reset = () => {
    router.push(`${pathname}`, { scroll: false });
  };

  useEffect(() => {
    setPage(1);
    getPaginatedProducts();
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onScroll();
        }
      },
      { threshold: 1 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, [scrollRef, paginate, isTabletOrMobile]);

  return (
    <Section containerClassName="!max-w-[1500px]">
      <BreadCrumbs className="-mb-12" items={breadCrumbsItems} />
      <hr className="-mb-10" />

      <div
        ref={ref}
        className="flex flex-col md:flex-row gap-20 relative scroll-m-20"
        style={{ overflowAnchor: "none" }}
      >
        {!isTabletOrMobile ? (
          <Filters
            className="self-start sticky top-20 overflow-y-auto"
            filters={category.filters}
          />
        ) : (
          <dialog
            id="mobileFiltersModal"
            className="ds-modal ds-modal-bottom sm:ds-modal-middle"
          >
            <form method="dialog" className="ds-modal-box">
              <button className="ds-btn ds-btn-sm ds-btn-circle ds-btn-ghost absolute right-2 top-2">
                <FontAwesomeIcon icon={faClose} size="lg" />
              </button>

              <Filters filters={category.filters} />
            </form>
            <form method="dialog" className="ds-modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        )}

        <div className="w-full flex flex-col gap-y-8">
          {!!paginate && paginate.items.length > 0 && (
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10">
              <p className="text-sm flex gap-1">
                <span className="text-gray-400">Mostrando</span>
                <span className="font-medium text-neutral-focus">{`${
                  paginate.items.length
                } de ${paginate?.total || 0}`}</span>
                <span className="text-gray-400">resultados</span>
              </p>

              <div className="ds-join">
                <button
                  className="ds-btn ds-btn-sm ds-btn-ghost ds-join-item"
                  onClick={() => setTypeView("list")}
                >
                  <FontAwesomeIcon
                    icon={faListUl}
                    size="lg"
                    className={classNames({
                      "text-slate-400": typeView === "grid",
                      "text-slate-900": typeView === "list",
                    })}
                  />
                </button>
                <button
                  className="ds-btn ds-btn-sm ds-btn-ghost ds-join-item"
                  onClick={() => setTypeView("grid")}
                >
                  <FontAwesomeIcon
                    icon={faGridRound}
                    size="lg"
                    className={classNames({
                      "text-slate-400": typeView === "list",
                      "text-slate-900": typeView === "grid",
                    })}
                  />
                </button>
                {isTabletOrMobile && (
                  <button
                    className="ds-btn ds-btn-sm ds-btn-ghost ds-join-item"
                    onClick={() => {
                      // @ts-ignore
                      window.mobileFiltersModal.showModal();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFilterList}
                      size="lg"
                      className="text-slate-400"
                    />
                  </button>
                )}
              </div>
            </div>
          )}

          <div
            className={classNames(
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 relative",
              {
                "!grid-cols-1 divide-y [&>*:not(:first-child)]:pt-6":
                  typeView === "list",
              }
            )}
          >
            {paginate?.items.length === 0 ? (
              <div className="flex flex-col items-center sm:col-span-2 md:col-span-3 xl:col-span-4 gap-6">
                <FontAwesomeIcon
                  icon={faFacePleading}
                  size="4x"
                  className="text-primary"
                />

                <p className="text-2xl font-thin text-accent-focus">
                  !Sin resultados!
                </p>
                <p className="font-thin text-center text-accent">
                  No pudimos encontrar los productos que estas buscando.
                </p>

                <button
                  className="ds-btn ds-btn-wide ds-btn-sm ds-btn-secondary"
                  onClick={reset}
                >
                  Reiniciar
                  <FontAwesomeIcon icon={faFilterSlash} size="1x" />
                </button>
              </div>
            ) : (
              paginate?.items.map((prod, idx) => (
                <ProductCard
                  key={`${category.name}-product-${idx}`}
                  typeView={typeView}
                  {...prod}
                />
              ))
            )}
          </div>

          {isTabletOrMobile ? (
            <div ref={scrollRef} className="flex justify-center w-full">
              <FontAwesomeIcon
                icon={faEllipsis}
                size="2x"
                className="text-primary"
              />
            </div>
          ) : (
            <PaginationButtons
              currentPage={page}
              lastPage={paginate?.lastPage || 1}
              onChangePage={onChangePage}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

const ProductCard = ({
  typeView,
  ...product
}: Product & { typeView: TypeView }) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [scope, animate] = useAnimate();

  const onClick = () => {
    router.push(`/categoria/${product.category}/${product.keyword}`);
  };

  useEffect(() => {
    animate(
      isHovered
        ? [
            [
              scope.current,
              {
                boxShadow:
                  typeView === "grid"
                    ? "0 0 #000000, 0 0 #000000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                    : "none",
              },
              { type: "tween", duration: 0.2 },
            ],
            [
              ".prod-card-img-2",
              { opacity: 1 },
              { type: "tween", duration: 0.2, at: "-0.1" },
            ],
          ]
        : [
            [
              scope.current,
              { boxShadow: "none" },
              { type: "tween", duration: 0.2 },
            ],
            [
              ".prod-card-img-2",
              { opacity: 0 },
              { type: "tween", duration: 0.2, at: "-0.1" },
            ],
          ]
    );
  }, [isHovered]);

  return (
    // Card
    <div
      ref={scope}
      className={classNames("ds-card ds-card-compact bg-base-100 h-full", {
        "!rounded-none": typeView === "list",
        "ds-card-bordered !rounded-md cursor-pointer": typeView === "grid",
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => typeView === "grid" && onClick()}
    >
      {/* Card content wrapper */}
      <div
        className={classNames("w-full h-full relative flex", {
          "flex-col": typeView === "grid",
          "items-center": typeView === "list",
        })}
      >
        {/* Product images */}
        <div
          className={classNames("relative", {
            "h-auto w-5/12 md:w-1/4 lg:w-1/4 xl:w-1/6 cursor-pointer":
              typeView === "list",
            "w-full": typeView === "grid",
          })}
          onClick={() => typeView === "list" && onClick()}
        >
          <figure
            className={classNames("relative aspect-square rounded-t-md", {
              "rounded-b-md": typeView === "list",
            })}
          >
            {product.images?.slice(0, 2).map((image, idx) => (
              <img
                key={`product-${product.name}-img-${idx}`}
                className={classNames(
                  `prod-card-img-${idx + 1} absolute h-full w-auto`,
                  {
                    "z-10 opacity-0": idx === 1,
                  }
                )}
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            ))}
          </figure>
        </div>

        {/* Product content */}
        <div
          className={classNames("ds-card-body gap-4", {
            "justify-between": typeView === "grid",
            "w-5/12 md:w-3/4 lg:3/4 xl:w-5/6 justify-center":
              typeView === "list",
          })}
        >
          {/* Name */}
          <span
            className={classNames("text-base capitalize", {
              "text-center": typeView === "grid",
            })}
          >
            {product.name}
          </span>

          <div className="flex justify-between gap-6">
            {/* Description for list view and tablet or higher */}
            {typeView === "list" && !isMobile && (
              <div className="shrink">
                <p className="text-sm font-thin line-clamp-2 whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            <div
              className={classNames({
                "shrink-0 flex flex-col gap-6 justify-between":
                  typeView === "list",
                "w-full": typeView === "grid",
              })}
            >
              {/* Properties */}
              <div
                className={classNames("ds-card-actions", {
                  "justify-center": typeView === "grid",
                })}
              >
                {Object.entries(product.properties).map(([, value], idx) => (
                  <div
                    key={`product-${product.name}-prop-${idx}`}
                    className="ds-badge ds-badge-primary ds-badge-lg capitalize"
                  >
                    {value}
                  </div>
                ))}
              </div>

              {/* Button to open product (only list view) */}
              {typeView === "list" && (
                <button
                  className="ds-btn ds-btn-sm ds-btn-outline ds-btn-neutral w-fit self-end"
                  onClick={onClick}
                >
                  Inspeccionar
                  <FontAwesomeIcon icon={faEye} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product description only for mobile and list view */}
      {typeView === "list" && isMobile && (
        <div className="pt-4">
          <p className="text-sm font-thin line-clamp-2 whitespace-pre-wrap">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
};

const PaginationButtons = ({
  currentPage,
  lastPage,
  onChangePage,
}: {
  currentPage: number;
  lastPage: number;
  onChangePage: (direction: "next" | "previous") => void;
}) => {
  return lastPage > 1 ? (
    <div className="flex justify-center lg:justify-end">
      <div className="ds-join">
        <button
          className="ds-join-item ds-btn ds-btn-sm"
          disabled={currentPage <= 1}
          onClick={() => onChangePage("previous")}
        >
          <FontAwesomeIcon icon={faChevronsLeft} />
        </button>
        <button className="ds-join-item ds-btn ds-btn-sm">{currentPage}</button>
        <button
          className="ds-join-item ds-btn ds-btn-sm"
          disabled={currentPage >= lastPage}
          onClick={() => onChangePage("next")}
        >
          <FontAwesomeIcon icon={faChevronsRight} />
        </button>
      </div>
    </div>
  ) : null;
};
