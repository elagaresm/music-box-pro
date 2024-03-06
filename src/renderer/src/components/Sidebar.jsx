import React from "react"
import { PiPlaylistBold as PlayListIcon } from "react-icons/pi";

const Sidebar = () => {
  return (
    <div
      style={{ gridArea: "sidebar" }}
      className="flex flex-col items-between p-2 rounded"
    >
      <div className="border-b border-outline p-2 text-center">
        <h1 className="text-white upper relative font-bold text-[32px]">MusicBox
          <span className="uppercase absolute right-2 text-xs text-accent">Pro</span>
        </h1>
      </div>
      <div className="basis-full">
        <div className="flex justify-center items-center gap-1">
          <PlayListIcon className="text-outline text-xs" />
          <h3 className="text-outline text-xs text-center my-2">Lista de reproducción</h3>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
