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
        <div className="relative max-h-full w-full max-w-3xl p-4">
          <div className="relative rounded-lg bg-white">
            <div className="flex items-center justify-center rounded-t p-4 md:p-5">
              <h3 className="text-xl font-semibold text-black">
                Tips untuk memulai
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
              <div className="col-span-1 flex flex-col justify-start gap-4 rounded-md bg-[#F8F8F8] p-2 shadow-md">
                <p className="font-bold text-gray-700">📌 Tanyakan apa saja</p>
                <p className="text-xs font-light text-gray-500">
                  Kami menjawab pertanyaan sebaik mungkin untuk membantumu
                  belajar dan meraih informasi dengan luas.
                </p>
              </div>
              <div className="col-span-1 flex flex-col justify-start gap-4 rounded-md bg-[#F8F8F8] p-2 shadow-md">
                <p className="font-bold text-gray-700">
                  🔐 Jangan sebarkan informasi sensitif
                </p>
                <p className="text-xs font-light text-gray-500">
                  Untuk menghindari hal yang tidak diinginkan sebaiknya jangan
                  sebarkan data pribadi.
                </p>
              </div>
              <div className="col-span-1 flex flex-col justify-start gap-4 rounded-md bg-[#F8F8F8] p-2 shadow-md">
                <p className="font-bold text-gray-700">
                  🔎 Lakukan pengecekan fakta berulang
                </p>
                <p className="text-xs font-light text-gray-500">
                  Informasi yang kami tampilkan memiliki kemungkinan tidak
                  akurat.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-b p-4 md:p-5">
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                Saya mengerti
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
          <div className="flex flex-col items-center gap-2 md:gap-4 mb-4">
            <p className="font-semibold text-black md:text-xl 2xl:text-2xl">
              Senang Bertemu Denganmu 🤩
            </p>
            <p className="text-gray-500">Tanyakan apa saja tentang PTP</p>
            <p className="text-2xl">Topik yang dapat ditanyakan!</p>
          </div>
          <p>Pilih salah satu topik!</p>
          <div className="flex items-center gap-4 py-4">
            <button
              className="flex h-40 w-80 flex-col items-center rounded bg-slate-100 p-4 px-8 shadow  hover:bg-slate-200 focus:ring focus:ring-sky-900"
              onClick={() => setModelType("peraturan")}
            >
              <p className="mb-2 text-center font-semibold text-gray-800">
                Peraturan JF-PTP 📜
              </p>
              <p>
                Kami memberikan informasi terkait dengan peraturan ASN dan JF
                PTP
              </p>
            </button>
            <button
              className="flex h-40 w-80 flex-col items-center rounded bg-slate-100 p-4 px-8 shadow hover:bg-slate-200 focus:ring focus:ring-sky-900"
              onClick={() => setModelType("pengetahuan")}
            >
              <p className="mb-2 text-center font-semibold text-gray-800">
                Pengetahuan Tentang JF-PTP 💡
              </p>
              <p>
                Kami menjawab pertanyaan untuk membantu Anda lebih memahami
                Pembinaan JF PTP
              </p>
            </button>
          </div>
          <button
            className="my-4 flex w-80 cursor-pointer flex-row items-center justify-center rounded-md bg-[#024c96] py-4 text-white md:my-10"
            onClick={() => setShowGreet(false)}
          >
            <p className="font-semibold">Mulai</p>
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
