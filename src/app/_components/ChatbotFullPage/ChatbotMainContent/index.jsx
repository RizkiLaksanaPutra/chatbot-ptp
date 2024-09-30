"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { PiPaperPlaneRightFill } from "react-icons/pi";

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

    const sourceDocuments = !response?.answer.includes("no_answer")
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

  // const parseMessage = (message) => {
  //   const lines = message.split('\n');
  //   return lines.map((line, index) => {
  //     if (line.startsWith('**') && line.endsWith('**')) {
  //       return <strong key={index}>{line.slice(2, -2)}</strong>;
  //     } else if (line.startsWith('*')) {
  //       return <li key={index}>{line.slice(1)}</li>;
  //     } else {
  //       return <p key={index}>{line}</p>
  //     }
  //   });
  // };

  const parseMessage = (message) => {
    const lines = message("\n");
    return lines.map((line, index) => {
      if (line.startsWith("*")) {
        return <li key={index}>{line.slice(1)}</li>;
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return <strong key={index}>{line.slice(2, -2)}</strong>;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
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
      </div>
      <div className="relative flex items-center justify-evenly border-t border-gray-300 p-5">
        <textarea
          ref={chatInputRef}
          placeholder="Enter a message..."
          spellCheck="false"
          value={userMessage}
          onChange={handleUserMessage}
          required
          className="w-[90%] resize-none outline-none"
        ></textarea>
        <span
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-blue-900 text-white hover:bg-blue-800"
          onClick={handleSendMessage}
        >
          <PiPaperPlaneRightFill />
        </span>
      </div>
    </div>
  );
}
