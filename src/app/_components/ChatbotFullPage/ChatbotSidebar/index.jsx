"use client";

import { useEffect, useState, useRef, useContext } from "react";
import { MessageHistoryContext } from "@/contexts/MessageHistory";
import Link from "next/link";
import Image from "next/image";
import { PiNotePencil } from "react-icons/pi";
import styles from "./style.module.css";

export default function ChatbotSidebar(props) {
  const messageHistoryCtx = useContext(MessageHistoryContext);

  return (
    <>
    <div className="hidden bg-[url('/assets/images/background.png')] bg-no-repeat bg-cover p-2 text-black md:col-span-3 md:block md:p-12">
      <div className="flex flex-col justify-start gap-8">
        <Image
          src="/assets/images/Logo PTP Rectangle.png"
          alt="Logo PTP"
          width={1000}
          height={500}
          className="h-auto rounded-lg"
        />
        <div className="flex flex-row justify-between items-center bg-white rounded-md shadow py-2 px-4 cursor-pointer" onClick={messageHistoryCtx.clear}>
          <p className="text-gray-600 font-normal">Mulai Percakapan Ulang</p>
          <span className="text-gray-600 font-semibold"><PiNotePencil /></span>
        </div>
        <div>
          <button className="flex flex-row justify-between items-center bg-white text-zinc-800 rounded-md shadow py-2 px-4 mb-5 cursor-pointer" onClick={props.handleModelToggle}>Ganti Topik</button>
          <p>Topik Saat ini: <span className="capitalize font-bold">{props.modelType}</span></p>
        </div>
        <div>
          <p><b>Topik Peraturan</b> berisikan tentang informasi berbagai peraturan melaui Surat Edaran</p>
          <br />
          <p><b>Topik Pengetahuan</b> berisikan tentang ilmu pembelajaran melalui E-Book dan jurnal</p>
        </div>
      </div>
    </div>
    </>
  );
}
