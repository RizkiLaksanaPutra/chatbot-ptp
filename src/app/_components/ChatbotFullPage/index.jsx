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
  const [showModal, setShowModal] = useState(true);
  const [showGreet, setShowGreet] = useState(true);

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

  const ModalShow = () => {
    return (
      <div
        id="default-modal"
        aria-hidden="true"
        className={`${!showModal ? "hidden" : ""} fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
            </div>
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setShowModal(false)}
              >
                I accept
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GreetUser = () => {
    return (
      <div className="col-span-12 bg-[#FFFFFF] p-2 md:col-span-9 md:p-12">
        <div className="flex h-full flex-col items-center justify-center gap-4 md:gap-6">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <p className="font-semibold text-black md:text-xl 2xl:text-2xl">
              Senang bertemu denganmu 🤩
            </p>
            <p className="text-gray-500">Tanyakan apa saja tentang PTP</p>
          </div>
          <p>Contoh:</p>
          <div className="flex items-center gap-4 py-4 md:py-10">
            <div class="flex w-80 flex-col items-center bg-[#F8F8F8] p-4 px-8 shadow">
              <p class="text-center font-semibold text-gray-800">
                “Ceritakan tentang sejarah Jakarta”
              </p>
            </div>
            <div class="flex w-80 flex-col items-center bg-[#F8F8F8] p-4 px-8 shadow">
              <p class="text-center font-semibold text-gray-800">
                “Ceritakan tentang sejarah Jakarta”
              </p>
            </div>
          </div>
          <button class="bg-[#024c96] my-4 flex w-80 cursor-pointer flex-row items-center justify-center rounded-md py-4 md:my-10 text-white" onClick={() => setShowGreet(false)}>
            <p class="font-semibold">Mulai</p>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ModalShow />
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
        {showGreet ? (
          <GreetUser />
        ) : (
          <ChatbotMainContent modelType={modelType} />
        )}
      </div>
    </>
  );
}
