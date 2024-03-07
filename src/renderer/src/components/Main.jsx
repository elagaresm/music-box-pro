import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { getCoverData } from '../helper'


const Main = () => {
  const { library } = useLoaderData()

  if (library && library.length > 0) {
    return (
      <div
        className="rounded overflow-y-auto p-4 grid auto-rows-[195px] grid-cols-3 gap-[20px]"
      >
        {library.map((artist) => {
          return <Link to={`/artist/${artist.artist.name}`} key={artist.artist.name}><ArtistThumbnail artist={artist} /></Link>
        })}
      </div>
    )
  }

  return (
    <div id="main" style={{ gridArea: "main" }}
      className="rounded"
    >
      <h1>Loading...</h1>
    </div>
  )
}

export default Main

function ArtistThumbnail({ artist }) {

  const { artist: { name }, cover, songs } = artist

  const coverData = getCoverData(cover)

  const largeText = name.length > 12

  return (
    <div className='p-2 bg-[#151515] rounded-lg flex basis-32 flex-col items-center hover:scale-110 duration-500 ease-in-out cursor-pointer'>
      <img src={coverData} alt="artist thumbnail" className=' w-full rounded aspect-square' />
      <div className='w-full overflow-hidden flex flex-col items-center'>
        <p className={`${largeText && 'moving-text'} text-white text-center text-base whitespace-nowrap w-full`}>{name}</p>
        <p className='text-outline text-xs'>{songs.length} songs</p>
      </div>
    </div>
  )
}
