"use client";

import React, { useContext, useState, useRef } from "react";
import { MessageHistoryContext } from "@/contexts/MessageHistory";

export const MessageHistoryProvider = (props) => {
  const [message, setMessage] = useState([]);
  const messageIndexRef = useRef(0);

  const replace = (newMessage) => {
    setMessage((prevMessage) => {
      const updatedHistory = [...prevMessage];
      updatedHistory[messageIndexRef.current] = newMessage;
      return updatedHistory;
    });
  };

  const insert = (newMessage) => {
    setMessage((prevMessage) => {
      messageIndexRef.current = prevMessage.length;
      return [...prevMessage, newMessage];
    });
  };

  const clear = () => {
    setMessage(() => {
      messageIndexRef.current = 0;
      return [];
    });
  };

  return (
    <MessageHistoryContext.Provider value={{ replace, insert, clear, message }}>
      {props.children}
    </MessageHistoryContext.Provider>
  );
};
