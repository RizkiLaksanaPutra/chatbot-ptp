"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import ChatbotMainContent from "@/components/ChatbotFullPage/ChatbotMainContent";
import ChatbotSidebar from "@/components/ChatbotFullPage/ChatbotSidebar";

export default function ChatbotFullPage() {
  const [modelType, setModelType] = useState("peraturan");
  const handleModelTypeChange = () => {
    if (modelType === "peraturan") {
      setModelType("pengetahuan");
    } else if (modelType === "pengetahuan") {
      setModelType("peraturan");
    }
  };
  return (
    <>
      <div className="grid h-[100vh] w-full grid-cols-12 bg-white">
        <ChatbotSidebar
          handleModelToggle={handleModelTypeChange}
          modelType={modelType}
        />
        <ChatbotMainContent modelType={modelType}/>
      </div>
    </>
  );
}
