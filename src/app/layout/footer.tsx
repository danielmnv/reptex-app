"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";
import { FooterSection } from "../../lib/navigation/dto";
import { SocialMedia } from "../../lib/social-media/dto";
import { SocialMediaItem } from "../components/social-media-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/pro-duotone-svg-icons";
import { SVGItem } from "../components/svg-item";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { ResponsiveContext } from "../../context/responsive.context";
import { Chat } from "../components/chat";
import { Store } from "../../lib/stores/dto";
import classNames from "classnames";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";

export const Footer = ({
  navigation,
  socialMedia,
  stores,
}: {
  navigation: FooterSection[];
  socialMedia: SocialMedia[];
  stores: Store[];
}) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <Chat footerRef={ref} stores={stores} />
      <footer
        ref={ref}
        className="sticky min-h-[100vh] z-[150] flex items-center bg-neutral"
      >
        <div className="absolute top-0 w-full h-full">
          {!isMobile && <SVGItem icon="Waves" className="w-full h-auto" />}
        </div>

        <div className="container text-accent z-10">
          <div className="grid md:grid-cols-2 pt-10 pb-5">
            <div className="flex flex-col justify-start">
              <div>
                <Image
                  width={340}
                  height={100}
                  src="/img/logo-extended.png"
                  alt="REPTEX"
                />
              </div>

              <div className="ds-footer pt-10 pb-5 place-content-stretch">
                {navigation.map(({ title, links }, index) => (
                  <div key={`section-${title}-${index}`}>
                    <span className="ds-footer-title">{title}</span>
                    {links.map(({ label, url }, index) => (
                      <Link
                        key={`link-${label}-${index}`}
                        href={url}
                        className="transition-colors duration-100 ease-in-out hover:text-white"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="ds-footer border-t py-4 border-accent items-center !gap-y-4 place-content-center md:place-content-between">
            <p className="inline-block text-center md:text-start w-full">
              <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}{" "}
              REPTEX - All rights reserved.
            </p>
            <div className="w-full">
              <div className="grid grid-flow-col gap-4 place-content-center place-items-center w-full">
                {socialMedia.map((s) => (
                  <SocialMediaItem
                    className={styles.socialMediaLink}
                    key={`link-footer-social-media-${s.label}`}
                    item={s}
                    size="xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

const ContactForm = ({}) => {
  const form = useRef<HTMLFormElement>(null);
  const reCaptcha = useRef<ReCAPTCHA>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    reCaptcha.current?.reset();
  };

  const sanitizeContent = (content: string) => {
    return sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };

  const getSantizedContent = () => {
    return [
      sanitizeContent(name),
      sanitizeContent(email),
      sanitizeContent(message),
    ];
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled || !form.current || !reCaptcha.current) return;

    setIsLoading(true);

    const [sanitizedName, sanitizedEmail, sanitizedMessage] =
      getSantizedContent();

    if (!sanitizedMessage || !sanitizedEmail || !sanitizedName) {
      toast.error("Debes proporcionar todos los datos requeridos");
      setIsLoading(false);
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(sanitizedEmail)) {
      toast.error("El email proporcionado no es válido");
      setIsLoading(false);
      return;
    }

    try {
      const token = await reCaptcha.current.executeAsync();

      emailjs
        // TODO: convert to env variables
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          {
            from_name: sanitizedName,
            reply_to: sanitizedEmail,
            message: sanitizedMessage,
            "g-recaptcha-response": token,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
        )
        .then(
          () => {
            toast.success("Mensaje enviado correctamente");
            reset();
          },
          () => {
            toast.error("Ocurrió un error al enviar el mensaje");
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal. Intenta de nuevo más tarde");
    }
  };

  useEffect(() => {
    setIsDisabled(
      name.length === 0 ||
        email.length === 0 ||
        message.length === 0 ||
        isLoading
    );
  }, [name, email, message, isLoading]);

  return (
    <form ref={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Nombre"
            className="ds-input ds-input-ghost w-full focus:bg-opacity-20 text-white focus:text-white text-base"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            className="ds-input ds-input-ghost w-full focus:bg-opacity-20 text-white focus:text-white text-base"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <textarea
            className="ds-textarea ds-textarea-ghost w-full focus:bg-opacity-20 text-white focus:text-white resize-none text-base"
            placeholder="Mensaje"
            rows={7}
            value={message}
            onChange={({ target }) => setMessage(target.value)}
          ></textarea>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm font-light">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
              className="underline"
              href="https://policies.google.com/privacy"
              target="_blank"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              className="underline"
              href="https://policies.google.com/terms"
              target="_blank"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>

        <div className="sm:col-span-2">
          <button
            className={classNames(
              "ds-btn ds-btn-outline ds-btn-accent ds-btn-block md:w-auto",
              {
                "opacity-40 cursor-not-allowed": isDisabled,
              }
            )}
            type="submit"
          >
            {isLoading ? (
              <span className="ds-loading ds-loading-spinner"></span>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </div>

      <ReCAPTCHA
        ref={reCaptcha}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        size="invisible"
        theme="dark"
      />
    </form>
  );
};
