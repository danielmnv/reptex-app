import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar>
        <main className="main-wrapper">{children}</main>
      </Navbar>
      <Footer />
    </>
  );
}
