"use client";

import "./chat.css";

import {
  faComments,
  faEllipsis,
  faPaperPlaneTop,
  faRotate,
} from "@fortawesome/pro-duotone-svg-icons";
import { faClose, faMinus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  useScroll,
  useTransform,
} from "framer-motion";
import { Store } from "../../lib/stores/dto";
import classNames from "classnames";
import { ResponsiveContext } from "../../context/responsive.context";

type ConversationProps = PropsWithChildren<{
  isOpen: boolean;
  isInputVisible: boolean;
  setIsOpen: (o: boolean) => void;
  reset: () => void;
}>;

type ChatMessageProps = PropsWithChildren<{
  trigger: boolean;
  direction?: "Left" | "Right";
  onShow?: () => void;
}>;

type UserInputProps = {
  trigger: boolean;
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
};

type FabButtonProps = {
  isOpen: boolean;
  target: RefObject<HTMLElement>;
  setIsOpen: (o: boolean) => void;
};

export const Chat = ({
  stores,
  footerRef,
}: {
  stores: Store[];
  footerRef: RefObject<HTMLElement>;
}) => {
  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [pickStore, setPickStore] = useState<boolean>(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState<boolean>(false);
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [type, setType] = useState<"WhatsApp" | "Messenger">();
  const [store, setStore] = useState<Store>();
  const [message, setMessage] = useState<string>("");

  // Vars
  const links = {
    Messenger: "https://m.me/ReptexMX?text={message}",
    WhatsApp: "https://wa.me/{number}/?text={message}",
  }; // TODO: store in firebase

  // Reset conversation
  const reset = () => {
    setType(undefined);
    setStore(undefined);
    setIsInputVisible(false);
    setMessage("");
  };

  // Start chat on social media
  const onSubmit = () => {
    if (!type || message.length === 0 || (type === "WhatsApp" && !store))
      return;

    let link = links[type].replace("{message}", encodeURI(message));

    if (type === "WhatsApp") {
      link = link.replace("{number}", `${store!.whatsapp!}`);
    }

    window.open(link, "_blank");
    reset();
    setIsOpen(false);
  };

  // Hooks
  useEffect(() => {
    isOpen && !started && setStarted(true);
  }, [isOpen]);

  useEffect(() => {
    if (type === "WhatsApp" && !pickStore) {
      setTimeout(() => setPickStore(true), 500);
      return;
    }

    setPickStore(false);
  }, [type]);

  useEffect(() => {
    const show = (type === "WhatsApp" && !!store) || type === "Messenger";
    show
      ? setTimeout(() => setIsQuestionVisible(show), 500)
      : setIsQuestionVisible(show);
  }, [store, type]);

  return (
    <>
      <Conversation
        isOpen={isOpen}
        isInputVisible={isInputVisible}
        setIsOpen={setIsOpen}
        reset={reset}
      >
        <ChatMessage trigger={started}>
          ¿Por donde quieres comunicarte?
          <br />
          {!type && (
            <div className="chat-ia-selector">
              <div
                className="selector-options"
                onClick={() => setType("WhatsApp")}
              >
                <span>WhatsApp</span>
              </div>

              <div
                className="selector-options"
                onClick={() => setType("Messenger")}
              >
                <span>Facebook</span>
              </div>
            </div>
          )}
        </ChatMessage>

        <ChatMessage trigger={!!type} direction="Right">
          {type === "Messenger" ? "Facebook" : type}
        </ChatMessage>

        <ChatMessage trigger={pickStore}>
          Selecciona la sucursal
          <br />
          {!store && (
            <div className="chat-ia-selector">
              {stores
                .filter((store) => store.whatsapp !== undefined)
                .map((store, index) => (
                  <div
                    key={`store-${index}-option-chat`}
                    className="selector-options"
                    onClick={() => setStore(store)}
                  >
                    <span>{store.name}</span>
                  </div>
                ))}
            </div>
          )}
        </ChatMessage>

        <ChatMessage trigger={!!store} direction="Right">
          {store?.name}
        </ChatMessage>

        <ChatMessage
          trigger={isQuestionVisible}
          onShow={() => setIsInputVisible(true)}
        >
          ¿En que podemos ayudarte?
        </ChatMessage>

        <UserInput
          trigger={isInputVisible}
          value={message}
          setValue={setMessage}
          onSubmit={onSubmit}
        />
      </Conversation>

      <FabButton isOpen={isOpen} target={footerRef} setIsOpen={setIsOpen} />
    </>
  );
};

const Conversation = ({
  isOpen,
  isInputVisible,
  children,
  setIsOpen,
  reset,
}: ConversationProps) => {
  const { useMobileQuery } = useContext(ResponsiveContext);
  const isMobile = useMobileQuery();

  const show: TargetAndTransition = {
    ...(!isMobile && { opacity: 1 }),
    y: 0,
    display: "flex",
    transition: {
      type: "just",
    },
  };

  const hide = {
    ...(!isMobile && { opacity: 0 }),
    y: isMobile ? "110%" : 12,
    transitionEnd: {
      display: "none",
    },
  };

  return (
    <motion.div className="chat-wrapper hidden" animate={isOpen ? show : hide}>
      <div className="chat-header">
        <div className="header-elements">
          <span className="title">Chat</span>

          <div className="ds-join">
            {isInputVisible && (
              <button className="button" onClick={() => reset()}>
                <FontAwesomeIcon icon={faRotate} />
              </button>
            )}
            <button className="button" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        </div>
      </div>

      <div className="chat-body">{children}</div>
    </motion.div>
  );
};

const ChatMessage = ({
  children,
  trigger,
  direction = "Left",
  onShow,
}: ChatMessageProps) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const show = {
    x: 0,
    opacity: 1,
    display: "inline",
  };

  const hide = {
    x: 30 * (direction === "Left" ? -1 : 1),
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  useEffect(() => {
    if (trigger && direction === "Left") {
      setIsWriting(true);
      setTimeout(() => {
        setIsWriting(false);
        onShow && onShow();
      }, 600);
    }
  }, [trigger, direction]);

  return (
    <AnimatePresence>
      {trigger && (
        <div
          className={classNames("ds-chat", {
            "ds-chat-start": direction === "Left",
            "ds-chat-end": direction === "Right",
          })}
        >
          <motion.div
            className={classNames("ds-chat-bubble text-sm", {
              "bg-base-200 text-base-content": direction === "Left",
              "bg-primary text-base-100": direction === "Right",
            })}
            initial={hide}
            animate={show}
            exit={hide}
          >
            {!isWriting ? (
              children
            ) : (
              <FontAwesomeIcon
                icon={faEllipsis}
                size="xl"
                className="text-primary"
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const UserInput = ({ trigger, value, setValue, onSubmit }: UserInputProps) => {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="user-input-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="user-input-content">
            <div className="input-textarea">
              <textarea
                value={value}
                onChange={({ target }) => setValue(target.value)}
                rows={1}
                style={{ resize: "none", outline: "none" }}
                placeholder="Escribe tu mensaje aquí"
              ></textarea>
            </div>

            <button
              className="input-submit"
              onClick={onSubmit}
              disabled={value.length == 0}
            >
              <FontAwesomeIcon
                icon={faPaperPlaneTop}
                size="xl"
                className={classNames({
                  "text-secondary-focus": value.length,
                })}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FabButton = ({ isOpen, target, setIsOpen }: FabButtonProps) => {
  const { scrollYProgress } = useScroll({
    target,
    layoutEffect: false,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.02], [0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);

  return (
    <div className="fab-button-wrapper">
      <motion.button
        className="fab-button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        style={{ y, opacity }}
        transition={{ duration: 0.4 }}
      >
        <FontAwesomeIcon icon={isOpen ? faClose : faComments} size="lg" />
      </motion.button>
    </div>
  );
};
