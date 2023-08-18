import classNames from "classnames";
import { debounce } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Fragment,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CheckboxFilter, Filter, RangeFilter } from "../../lib/filters/dto";

const FilterSection = ({
  name,
  children,
}: PropsWithChildren<{ name: string }>) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div className="ds-collapse ds-collapse-arrow">
      <input
        type="checkbox"
        checked={open}
        onChange={() => setOpen((prev) => !prev)}
      />
      <div className="ds-collapse-title !px-0 font-medium">{name}</div>
      <div className="ds-collapse-content !px-0">{children}</div>
    </div>
  );
};

export const Filters = ({
  filters,
  className,
}: {
  filters?: Filter[];
  className?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOnChange = useCallback(
    debounce(
      (key: string, value: string) => createQueryString(key, value),
      500
    ),
    [searchParams]
  );

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams]
  );

  const clear = () => {
    router.push(`${pathname}`, { scroll: false });
  };

  return (
    <>
      <div className={classNames("flex flex-col", className)}>
        <div className="flex justify-between">
          <p className="font-semibold text-base sm:font-medium sm:text-sm">
            Filtros
          </p>

          <button
            className="ds-btn ds-btn-xs capitalize font-thin hidden lg:inline"
            onClick={clear}
          >
            Limpiar
          </button>
        </div>

        <div className="ds-divider"></div>

        <FilterText
          name="Nombre"
          filter="nombre"
          onChange={handleOnChange}
          defaultParamValue={searchParams.get("nombre") || ""}
        />

        {!!filters && (
          <>
            {filters.map((filter) => (
              <Fragment key={`filter-${filter.name}`}>
                <div className="ds-divider"></div>

                {filter.type === "checkbox" ? (
                  <FilterCheckbox
                    filter={filter}
                    onChange={createQueryString}
                    defaultParamValue={
                      searchParams.get(filter.name.toLocaleLowerCase()) || ""
                    }
                  />
                ) : (
                  <FilterRange
                    filter={filter}
                    onChange={createQueryString}
                    defaultParamValue={
                      searchParams.get(
                        `max${filter.name.toLocaleLowerCase()}`
                      ) || ""
                    }
                  />
                )}
              </Fragment>
            ))}
          </>
        )}

        <button
          className="ds-btn ds-btn-sm capitalize font-thin inline lg:hidden"
          onClick={clear}
        >
          Limpiar
        </button>
      </div>
    </>
  );
};

const FilterText = ({
  name,
  filter,
  defaultParamValue = "",
  onChange,
}: {
  name: string;
  filter: string;
  defaultParamValue?: string;
  onChange: (key: string, value: string) => void;
}) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    onChange(filter, value);
  }, [value]);

  useEffect(() => {
    setValue(defaultParamValue);
  }, [defaultParamValue]);

  return (
    <FilterSection name={name}>
      <div className="px-1">
        <input
          type="text"
          placeholder="Buscar..."
          className="ds-input ds-input-bordered w-full ds-input-sm"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </div>
    </FilterSection>
  );
};

const FilterCheckbox = ({
  filter,
  defaultParamValue = "",
  onChange,
}: {
  filter: CheckboxFilter;
  defaultParamValue?: string;
  onChange: (key: string, value: string) => void;
}) => {
  const [selected, setSelected] = useState<
    Record<string, { selected: boolean }>
  >({});

  const handleOnSelect = () => {
    const selectedValues = Object.entries(selected)
      .filter(([, value]) => value.selected)
      .map(([key]) => key.toLocaleLowerCase());

    onChange(filter.name.toLocaleLowerCase(), selectedValues.toString());
  };

  useEffect(handleOnSelect, [selected]);

  useEffect(() => {
    const selectedValues = defaultParamValue
      .split(",")
      .map((value) => value.trim());

    const newSelected: Record<string, { selected: boolean }> = {};
    filter.values.forEach((value) => {
      newSelected[value] = {
        selected: selectedValues.includes(value.toLocaleLowerCase()),
      };
    });
    setSelected(newSelected);
  }, [defaultParamValue]);

  return (
    <FilterSection name={filter.name}>
      {filter.values.map((value, index) => (
        <div
          key={`filter-${filter.name}-value-${index}`}
          className="ds-form-control"
        >
          <label className="ds-label cursor-pointer !justify-start !items-center gap-x-2">
            <input
              type="checkbox"
              className="ds-checkbox ds-checkbox-xs ds-checkbox-primary"
              checked={selected[value]?.selected || false}
              onChange={() =>
                setSelected((prev) => ({
                  ...prev,
                  [value]: { selected: !prev[value]?.selected },
                }))
              }
            />
            <span className="ds-label-text capitalize">{value}</span>
          </label>
        </div>
      ))}
    </FilterSection>
  );
};

const FilterRange = ({
  filter,
  defaultParamValue = "",
  onChange,
}: {
  filter: RangeFilter;
  defaultParamValue?: string;
  onChange: (key: string, value: string) => void;
}) => {
  const [value, setValue] = useState<number>(filter.max);
  const width = `${((value / filter.max) * 100).toFixed(0)}%`;

  const handleOnChange = () => {
    onChange(`max${filter.name.toLocaleLowerCase()}`, value.toString());
  };

  useEffect(handleOnChange, [value]);

  useEffect(() => {
    setValue(Number(defaultParamValue) || filter.max);
  }, [defaultParamValue]);

  return (
    <FilterSection name={filter.name}>
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-accent">
            {filter.format?.replace("{value}", `${filter.min}`) || filter.min}
          </span>

          <span className="text-sm text-accent">
            {filter.format?.replace("{value}", `${filter.max}`) || filter.max}
          </span>
        </div>

        <input
          type="range"
          min={filter.min}
          max={filter.max}
          value={value}
          onChange={({ target }) => setValue(Number(target.value))}
          className="ds-range ds-range-xs ds-range-primary"
        />

        <div className="text-right min-w-fit" style={{ width }}>
          <span className="text-sm font-medium text-slate-800">
            {filter.format?.replace("{value}", `${value}`) || value}
          </span>
        </div>
      </div>
    </FilterSection>
  );
};
