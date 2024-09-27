"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

export default function ChatbotMainContent() {
  return (
    <div className="col-span-12 md:col-span-9  bg-[#FFFFFF] p-4 md:p-12">
      <div className="flex flex-col justify-start items-center w-full h-full">
        <Image
          src="/assets/images/Logo PTP Square.png"
          alt="Logo PTP"
          width={150}
          height={150}
        />
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <p className="text-black md:text-xl 2xl:text-2xl font-semibold">Selamat Datang di Chatbot PTP 🤩</p>
          <p className="text-gray-500">Tanyakan apa saja tentang PTP</p>
        </div>
      </div>
    </div>
  );
}
