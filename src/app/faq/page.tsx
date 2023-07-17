import { useRouter } from "next/router";
import { loadFaqs } from "../../lib/faq";
import { FAQContainer } from "./faq";

export const metadata = {
  title: "Preguntas Frecuentes",
  description: "Preguntas Frecuentes",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  const faqs = await loadFaqs();
  return (
    <>
      <FAQContainer faqs={faqs} />
    </>
  );
}
