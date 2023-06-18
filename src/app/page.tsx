import { Landing } from "./landing";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return <Landing />;
}
