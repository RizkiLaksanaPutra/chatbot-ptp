"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Markdown from "react-markdown";

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

export default function ChatbotMainContent(props) {
  const [userMessage, setUserMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const chatInputRef = useRef(null);
  const chatBoxRef = useRef(null);

  const handleUserMessage = (event) => {
    const chatInput = chatInputRef.current;
    const chatBox = chatBoxRef.current;
    if (!chatInput || !chatBox) return;

    setUserMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const chatInput = chatInputRef.current;
    const chatBox = chatBoxRef.current;
    if (!chatInput || !chatBox) return;

    const message = userMessage.trim();
    if (!message) return;

    setUserMessage("");

    setMessageHistory((prevMessageHistory) => [
      ...prevMessageHistory,
      { type: "outgoing", value: message },
    ]);
    chatBox.scrollTo(0, chatBox.scrollHeight);

    let thinkingIndex;
    setMessageHistory((prevMessageHistory) => {
      thinkingIndex = prevMessageHistory.length;
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

    const sourceDocuments = !response?.answer.includes("Maaf")
      ? (response?.sourceDocuments ?? [])
      : [];

    setMessageHistory((prevMessageHistory) => {
      const updatedHistory = [...prevMessageHistory];
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
    <div className="col-span-12 bg-[#FFFFFF] p-4 md:col-span-9 md:p-12">
      <div className="w-full">
        <ul ref={chatBoxRef} className={styles["chatbox"]}>
          <li className={`${styles["chat"]} ${styles["incoming"]}`}>
            <span>
              <Image
                src="/assets/images/mascot.png"
                alt=""
                width={50}
                height={50}
              />
            </span>
            <div className={styles["chat-bubble"]}>
              <p>
                Selamat datang di Chatbot PTP, silahkan tanya seputar PTP 👋
              </p>
            </div>
          </li>
          {messageHistory.map((message, index) => (
            <li
              key={index}
              className={`${styles["chat"]} ${styles[message.type]}`}
            >
              {message.type === "incoming" && (
                <span>
                  <Image
                    src="/assets/images/mascot.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                </span>
              )}
              <div className={styles["chat-bubble"]}>
                <Markdown>{message.value}</Markdown>
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
      </div>
      <div className="flex items-center justify-between border-t border-gray-300 drop-shadow-lg">
        <textarea
          ref={chatInputRef}
          placeholder="Enter a message..."
          spellCheck="false"
          value={userMessage}
          onChange={handleUserMessage}
          required
          className="w-full resize-none pl-2 pt-1 outline-none h-16"
        ></textarea>
        <span
          className="flex h-16 w-16 cursor-pointer items-center justify-center bg-blue-900 text-white hover:bg-blue-800"
          onClick={handleSendMessage}
        >
          <PiPaperPlaneRightFill />
        </span>
      </div>
    </div>
  );
}