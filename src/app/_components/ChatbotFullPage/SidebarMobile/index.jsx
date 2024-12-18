import Image from "next/image";
import { useContext } from "react";
import { PiListBold, PiNotePencil } from "react-icons/pi";
import { MessageHistoryContext } from "@/contexts/MessageHistory";

export default function SidebarMobile(props) {
  const messageHistoryCtx = useContext(MessageHistoryContext);

  if (!props.open) {
    return <></>;
  }

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform sm:translate-x-0"
      >
        <div className="flex h-full flex-col justify-start gap-8 overflow-y-auto bg-[url('/chatbot/assets/images/background.png')] px-3 py-4 text-white">
          <span
            className="cursor-pointer p-2"
            onClick={props.handleSideBarToggle}
          >
            <PiListBold />
          </span>
          <Image
            src="/chatbot/assets/images/Logo PTP FINAL.png"
            alt="Logo PTP"
            width={1000}
            height={500}
            className="h-auto rounded-lg bg-white"
          />
          <div
            className="flex cursor-pointer flex-row items-center justify-between rounded-md bg-white px-4 py-2 shadow"
            onClick={messageHistoryCtx.clear}
          >
            <p className="font-normal text-gray-600">Mulai Ulang Percakapan</p>
            <span className="font-semibold text-gray-600">
              <PiNotePencil />
            </span>
          </div>
          <div>
            <button
              className="mb-5 flex cursor-pointer flex-row items-center justify-between rounded-md bg-white px-4 py-2 text-zinc-800 shadow"
              onClick={props.handleModelToggle}
            >
              Ganti Topik
            </button>
            <p className="bg-white rounded-md shadow p-2 text-slate-950">
              Topik Saat ini:{" "}
              <span className="font-bold capitalize">{props.modelType}</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
