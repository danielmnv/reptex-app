import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookF,
  faInstagram,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialMedia, SocialMediaType } from "../lib/social-media/dto";

export const SocialMediaItem = ({
  item,
  size,
  className,
}: {
  item: SocialMedia;
  size: SizeProp;
  className?: string;
}) => {
  const getSocialMediaIcon = (type: SocialMediaType): IconDefinition => {
    switch (type) {
      case "Facebook":
        return faFacebookF;
      case "Instagram":
        return faInstagram;
    }
  };

  return (
    <a className={className} href={item.link} target="_blank" rel="noreferrer">
      <FontAwesomeIcon icon={getSocialMediaIcon(item.label)} size={size} />
    </a>
  );
};
