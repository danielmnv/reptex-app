import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer({}) {
  return (
    <footer className="ds-footer p-10 bg-[#EEEEEE]">
      <div>
        <img className="h-52 w-auto" src="/img/logo-extended.png" />
        <p>Providing reliable sewing machines since 2003</p>
      </div>
      <div>
        <span className="ds-footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/ReptexMX/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} size="xl" />
          </a>
          <a
            href="https://www.instagram.com/reptex.mx"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
