"use client";

import { useRef } from "react";
import styles from "./loading.module.css";

export default function Loading() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={styles.loading}>
      <div className="fixed w-full h-screen">
        <div className="ds-form-control w-4/5 max-w-xs absolute z-10 top-32 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0">
          <label className="ds-input-group">
            <input
              className="ds-input ds-input-sm md:ds-input-md ds-input-bordered bg-base-100"
              disabled
            />
            <div className="animate-pulse ds-btn ds-btn-sm md:ds-btn-md bg-slate-700 border-slate-700">
              <div className="rounded-full bg-white h-5 w-5"></div>
            </div>
          </label>
        </div>
        <div className={styles.storeListWrapper}>
          <div className={styles.storeList}>
            {Array(5)
              .fill(1)
              .map((_, i) => (
                <div
                  key={`skeleton-loading-store${i}`}
                  className="ds-card bg-base-100 shadow-lg min-w-[250px] max-w-[250px] md:min-w-[310px] md:max-w-[310px] p-4"
                >
                  <div className="animate-pulse flex flex-col gap-y-3 md:gap-y-5">
                    <div className="h-3 w-3/4 bg-slate-700 rounded"></div>
                    <div className="flex-1">
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="col-span-2 flex justify-end">
                          <div className="rounded-full bg-slate-700 h-5 w-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
