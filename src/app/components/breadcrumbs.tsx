import classNames from "classnames";
import Link from "next/link";

interface BreadCrumbsProps {
  items: BreadCrumbItem[];
  className?: string;
}

export type BreadCrumbItem = {
  label: string;
  url: string;
};

export const BreadCrumbs = ({ items, className }: BreadCrumbsProps) => {
  return (
    <div className={classNames("text-sm ds-breadcrumbs", className)}>
      <ul>
        <li className="capitalize font-thin text-gray-400">
          <Link href="/">Inicio</Link>
        </li>
        {items.map(({ label, url }, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`breadcrum-${index}-${label}`}
              className={classNames("capitalize font-thin", {
                "text-gray-400": !isLast,
                "text-neutral font-semibold": isLast,
              })}
            >
              {!isLast ? <Link href={url}>{label}</Link> : label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
