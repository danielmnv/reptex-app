import { Landing } from "./landing/landing";

export const metadata = {
  title: "Inicio - Reptex",
  description:
    "Distribuidores de las mejores marcas de máquinas de coser, bordadoras, refacciones y mercería.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return <Landing />;
}
