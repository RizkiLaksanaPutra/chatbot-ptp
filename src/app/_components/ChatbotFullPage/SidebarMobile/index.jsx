import Image from "next/image";
import { PiListBold } from "react-icons/pi";

export default function SidebarMobile(props) {
  if (!props.open) {
    return <></>;
  }
  
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform sm:translate-x-0"
      >
        <div className="flex h-full flex-col justify-start gap-8 overflow-y-auto bg-[#1E4288] px-3 py-4 text-white">
          <span
            className="cursor-pointer p-2"
            onClick={props.handleSideBarToggle}
          >
            <PiListBold />
          </span>
          <Image
            src="/assets/images/Logo PTP Rectangle.png"
            alt="Logo PTP"
            width={1000}
            height={500}
            className="h-auto rounded-lg"
          />
          <div>
            <button
              className="mb-5 flex cursor-pointer flex-row items-center justify-between rounded-md bg-white px-4 py-2 text-zinc-800 shadow"
              onClick={props.handleModelToggle}
            >
              Ganti Topik
            </button>
            <p>
              Topik Saat ini:{" "}
              <span className="font-bold capitalize">{props.modelType}</span>
            </p>
          </div>
          <div>
            <p>
              <b>Topik Peraturan</b> berisikan tentang informasi berbagai
              peraturan melaui Surat Edaran
            </p>
            <br />
            <p>
              <b>Topik Pengetahuan</b> berisikan tentang ilmu pembelajaran
              melalui E-Book dan jurnal
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
