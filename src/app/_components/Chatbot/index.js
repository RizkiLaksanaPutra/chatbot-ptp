"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  PiChatDotsFill,
  PiXBold,
  PiRobotFill,
  PiPaperPlaneRightFill,
} from "react-icons/pi";
import Image from "next/image";

import styles from "./style.module.css";

const generateResponse = async (prompt, modelType) => {
  const payload = {
    modelType,
    prompt,
  };

  const response = await fetch("/api/chatbot", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const res = await response.json();
  const errors = res?.errors;
  if (errors) {
    console.error(errors);
    return { answer: "Error generating response." };
  }

  const data = res?.data;

  return data;
};

export default function Chatbot(props) {
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const inputInitHeightRef = useRef(0);
  const chatInputRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    inputInitHeightRef.current = chatInputRef.current?.scrollHeight ?? 0;
  }, []);

  const handleToggleChat = () => {
    setShowChat((showChat) => !showChat);
  };

  const handleUserMessage = (event) => {
    const chatInput = chatInputRef.current;
    const inputInitHeight = inputInitHeightRef.current;
    if (!chatInput || !inputInitHeight) return;

    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;

    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const chatInput = chatInputRef.current;
    const inputInitHeight = inputInitHeightRef.current;
    const chatBox = chatBoxRef.current;
    if (!chatInput || !inputInitHeight || !chatBox) return;

    const message = userMessage.trim();
    if (!message) return;

    setUserMessage("");
    chatInput.style.height = `${inputInitHeight}px`;

    // Add the outgoing message to the history
    setMessageHistory((prevMessageHistory) => [
      ...prevMessageHistory,
      { type: "outgoing", value: message },
    ]);
    chatBox.scrollTo(0, chatBox.scrollHeight);

    // Add the "Thinking..." placeholder for the incoming message
    let thinkingIndex;
    setMessageHistory((prevMessageHistory) => {
      thinkingIndex = prevMessageHistory.length; // Capture the latest index position
      return [
        ...prevMessageHistory,
        { type: "incoming", value: "Thinking...", sourceDocuments: [] },
      ];
    });

    const response = await generateResponse(message, props.modelType);
    console.log(response);

    const answer = !response?.answer.includes("no_answer")
      ? response?.answer
      : "Maaf, saya tidak dapat menjawab pertanyaan tersebut dengan informasi yang tersedia. Terima kasih telah bertanya.";

    const sourceDocuments = !response?.answer.includes("no_answer")
      ? (response?.sourceDocuments ?? [])
      : [];

    // Update the "Thinking..." message at the captured index
    setMessageHistory((prevMessageHistory) => {
      // Create a copy of the current message history
      const updatedHistory = [...prevMessageHistory];
      // Update the "Thinking..." message at the captured index with the response
      updatedHistory[thinkingIndex] = {
        type: "incoming",
        value: answer,
        sourceDocuments,
      };
      return updatedHistory;
    });
    chatBox.scrollTo(0, chatBox.scrollHeight);
  };

  return (
    <div className={showChat ? styles["show-chatbot"] : ""}>
      <button
        type="button"
        className={styles["chatbot-toggle"]}
        onClick={handleToggleChat}
      >
        <span>
          <PiChatDotsFill />
        </span>
        <span>
          <PiXBold />
        </span>
      </button>

      <div className={styles["chatbot"]}>
        <header className={styles["chatbot-header"]}>
          <h2>Chatbot</h2>
          <h1
            className={`${styles["projects-pd-subdetail"]} ${styles["projects-pd-text"]}`}
          ></h1>
          <span className={styles["close-button"]}>
            <PiXBold />
          </span>
        </header>

        <ul ref={chatBoxRef} className={styles["chatbox"]}>
          <li className={`${styles["chat"]} ${styles["incoming"]}`}>
            <span>
              <Image src='/assets/images/mascot.png' alt="" width={100} height={100} />
            </span>
            <div className={styles["chat-bubble"]}>
              <p>Selamat datang di chatbot PTP, silahkan tanya seputar PTP 👋</p>
            </div>
          </li>
          {messageHistory.map((message, index) => (
            <li
              key={index}
              className={`${styles["chat"]} ${styles[message.type]}`}
            >
              {message.type === "incoming" && (
                <span>
                  <Image src='/assets/images/mascot.png' alt="" width={100} height={100} />
                </span>
              )}
              <div className={styles["chat-bubble"]}>
                <p>{message.value}</p>
                {message?.sourceDocuments &&
                  message?.sourceDocuments.length > 0 && (
                    <>
                      <br />
                      <strong>Sumber:</strong>
                      <ul className={styles["source-documents"]}>
                        {message.sourceDocuments.map((doc, docIndex) => (
                          <li key={docIndex}>
                            <Link
                              href={`/assets/documents/pdf/${props.modelType}/${doc}`}
                              target="_blank"
                            >
                              {doc}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles["chat-input"]}>
          <textarea
            ref={chatInputRef}
            placeholder="Enter a message..."
            spellCheck="false"
            value={userMessage}
            onChange={handleUserMessage}
            required
          ></textarea>
          <span id="send-button" className="" onClick={handleSendMessage}>
            <PiPaperPlaneRightFill />
          </span>
        </div>
      </div>
    </div>
  );
}
