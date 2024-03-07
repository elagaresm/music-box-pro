import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getCoverData } from '../helper'

export async function loader({ params }) {
  try {
    const artist = await window.api.getArtist(decodeURIComponent(params.artistName))
    console.log(artist)
    return { artist }
  } catch (error) {
    console.log('Could not load artist: ', error)
  }
}

const Artist = () => {
  const { artist } = useLoaderData()

  console.log(artist)

  return (
    <div>Artist page</div>
  )

  const { artist: { name }, cover, songs } = artist

  const coverData = getCoverData(cover)

  return (
    <div>
      <h1>{name}</h1>
      <img src={coverData} alt="artist thumbnail" />
      <ul>
        {songs.map(song => {
          <li>{song.song} - {song.path}</li>
        })}
      </ul>
    </div>
  )
}

export default Artist
