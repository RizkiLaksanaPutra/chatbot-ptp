"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiNotePencil } from "react-icons/pi";
import styles from "./style.module.css";

export default function ChatbotSidebar(props) {
  return (
    <div className="hidden bg-[#1E4288] p-2 text-white md:col-span-3 md:block md:p-12">
      <div className="flex flex-col justify-start gap-8">
        <Image
          src="/assets/images/Logo PTP Rectangle.png"
          alt="Logo PTP"
          width={1000}
          height={500}
          className="h-auto rounded-lg"
        />
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow py-2 px-4 cursor-pointer">
            <p className="text-gray-600 font-normal">Buat baru</p>
            <span className="text-gray-600 font-semibold"><PiNotePencil /></span>
        </div>
        <div>
          <button onClick={props.handleModelToggle}>Ganti Model</button>
          <p>Model Saat ini: {props.modelType}</p>
        </div>
      </div>
    </div>
  );
}
