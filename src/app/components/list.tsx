import {
  faChevronsLeft,
  faChevronsRight,
  faClose,
  faEllipsis,
  faFacePleading,
  faFilterList,
  faFilterSlash,
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
import { ResponsiveContext } from "../../context/responsive.context";
import { useLoader } from "../../hooks/use-loader";
import { Category } from "../../lib/category/dto";
import { paginateCategoryProducts } from "../../lib/product";
import {
  CategoryProductFilters,
  PaginatedCategoryProducts,
  Product,
} from "../../lib/product/dto";
import { Filters } from "./filters";
import { Section } from "./section";

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

    await new Promise((resolve) => setTimeout(resolve, 1000));
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
      <div
        ref={ref}
        className="flex flex-col md:flex-row gap-20 relative scroll-m-20"
        style={{ overflowAnchor: "none" }}
      >
        {!isTabletOrMobile && (
          <Filters
            className="self-start sticky top-20 overflow-y-auto"
            filters={category.filters}
          />
        )}

        <div className="w-full flex flex-col gap-y-8">
          {!!paginate && paginate.items.length > 0 && (
            <div className="w-full flex justify-between items-center gap-x-10">
              <p className="font-medium text-sm flex gap-1">
                <span className="text-gray-400">Mostrando</span>
                <span className="text-neutral-focus">{`${
                  paginate.items.length
                } de ${paginate?.total || 0}`}</span>
                <span className="text-gray-400">resultados</span>
              </p>
              {isTabletOrMobile ? (
                <>
                  <button
                    className="ds-btn ds-btn-circle ds-btn-sm"
                    onClick={() => {
                      // @ts-ignore
                      window.mobileFiltersModal.showModal();
                    }}
                  >
                    <FontAwesomeIcon icon={faFilterList} size="lg" />
                  </button>
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
                </>
              ) : (
                <PaginationButtons
                  currentPage={page}
                  lastPage={paginate?.lastPage || 1}
                  onChangePage={onChangePage}
                />
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-center relative">
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

const ProductCard = (product: Product) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      isHovered
        ? [
            [
              scope.current,
              {
                boxShadow:
                  "0 0 #000000, 0 0 #000000, 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
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
    <div
      ref={scope}
      className="ds-card ds-card-compact ds-card-bordered bg-base-100 rounded-md cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative aspect-square">
        {product.images?.slice(0, 2).map((image, idx) => (
          <img
            key={`product-${product.name}-img-${idx}`}
            className={classNames(`prod-card-img-${idx + 1} absolute`, {
              "z-10 opacity-0": idx === 1,
            })}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </figure>

      <div className="ds-card-body">
        <p className="text-base text-center capitalize">{product.name}</p>
        <div className="ds-card-actions justify-center mt-4">
          {Object.entries(product.properties).map(([, value], idx) => (
            <div
              key={`product-${product.name}-prop-${idx}`}
              className="ds-badge ds-badge-outline capitalize"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
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
