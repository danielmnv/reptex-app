import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faFacebookMessenger,
  faInstagram,
  faTiktok,
  faWhatsapp,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faHandshakeAlt } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialMedia, SocialMediaType } from "../../lib/social-media/dto";

export const getSocialMediaIcon = (type: SocialMediaType): IconDefinition => {
  switch (type) {
    case "Facebook":
      return faFacebook;
    case "Instagram":
      return faInstagram;
    case "TikTok":
      return faTiktok;
    case "Mercado Libre":
      return faHandshakeAlt;
    case "WhatsApp":
      return faWhatsapp;
    case "Messenger":
      return faFacebookMessenger;
  }
};

export const SocialMediaItem = ({
  item,
  size,
  className,
}: {
  item: SocialMedia;
  size: SizeProp;
  className?: string;
}) => {
  return (
    <a className={className} href={item.link} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={getSocialMediaIcon(item.label)} size={size} />
    </a>
  );
};
