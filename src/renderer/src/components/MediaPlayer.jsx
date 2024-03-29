import React from 'react'
import ThumbnailFallback from '../assets/thumbnail-fallback.webp'
import { RiVipCrownLine as CrownOutlineIcon, RiVipCrownFill as CrownFillIcon } from "react-icons/ri";

const MediaPlayer = (props) => {
  return (
    <div
      style={{ backgroundColor: 'black' }}
      className='absolute h-28 bg-black bottom-0 z-10 w-full rounded-none opacity-80 flex items-center justify-between px-6 gap-8'
    >

      {/* Thumbnail */}
      <div className='flex items-center'>
        <div className='relative shrink-0'>
          <img
            src={ThumbnailFallback}
            alt='thumbnail'
            className='h-16 aspect-square rounded'
          />
          <VipIcon className='absolute top-1 left-1' isVip={true} />
        </div>

        <div className='text-white text-base ml-2 overflow-hidden grow-0'>
          <p style={{ textOverflow: 'ellipsis' }} className='moving-text flex items-center gap-2 whitespace-nowrap'>Sombody I used to know</p>
          <span className='text-xs text-outline'>Artist</span>

        </div>
      </div>

      {/* Controls */}
      <div className='basis-3/5 flex flex-col items-start justify-center gap-2 shrink-0'>
        <div className='text-white text-xs'>
          <span>0:00</span>
          <span>/</span>
          <span>3:00</span>
        </div>
        <div className='w-4/5 h-[3px] bg-[#1a1a1a] relative'>
          <div className='h-[3px] absolute bg-white w-[20%]'>
            <div className='h-[8px] aspect-square rounded-full bg-white absolute translate-y-[-2px] right-0 cursor-pointer'></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MediaPlayer

function VipIcon({ isVip, className }) {
  return isVip ? <CrownFillIcon className={`text-yellow-300 ${className}`} /> : <CrownOutlineIcon className={className} />
}
