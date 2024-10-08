"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PiListBold } from "react-icons/pi";
import styles from "./style.module.css";
import ChatbotMainContent from "@/components/ChatbotFullPage/ChatbotMainContent";
import ChatbotSidebar from "@/components/ChatbotFullPage/ChatbotSidebar";
import SidebarMobile from "@/components/ChatbotFullPage/SidebarMobile";

export default function ChatbotFullPage() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [modelType, setModelType] = useState("peraturan");

  const handleModelTypeChange = () => {
    if (modelType === "peraturan") {
      setModelType("pengetahuan");
    } else if (modelType === "pengetahuan") {
      setModelType("peraturan");
    }
  };

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <>
      <nav className="flex flex-row justify-between border-b border-slate-600 px-4 py-2 md:hidden">
        <span className="cursor-pointer p-2" onClick={handleSideBar}>
          <PiListBold />
        </span>
        <SidebarMobile
          open={showSideBar}
          modelType={modelType}
          handleModelToggle={handleModelTypeChange}
          handleSideBarToggle={handleSideBar}
        />
      </nav>
      <div className="grid h-[100vh] w-full grid-cols-12 bg-white">
        <ChatbotSidebar
          handleModelToggle={handleModelTypeChange}
          modelType={modelType}
        />
        <ChatbotMainContent modelType={modelType} />
      </div>
    </>
  );
}
