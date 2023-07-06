import Image from "next/image";
import { useEffect } from "react";

export const Loader = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });

    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <div className="fixed h-screen w-screen bg-neutral-focus bg-opacity-60 overflow-hidden z-[200]">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div>
            <Image
              width={50}
              height={50}
              src="/img/logo.png"
              alt="Reptex Loading"
            />
          </div>
          <div>
            <span className="ds-loading ds-loading-infinity ds-loading-lg text-white"></span>
          </div>
        </div>
      </div>

      <div className="relative min-h-screen min-w-full">
        <span className="invisible">wrapper</span>
      </div>
    </>
  );
};
