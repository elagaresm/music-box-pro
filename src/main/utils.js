import fs from 'node:fs/promises'
import path from 'node:path'

const LIBRARY_PATH = 'C:\\Users\\Enmanuel\\Downloads\\Songs'

export function handleJoin(...args) {
  return path.join(...args)
}

export async function handleLoadSongs() {
  try {
    const artists = await readLibraryPath()
    const result = []

    for (const artist of artists) {
      const artistDirectoryPath = path.join(LIBRARY_PATH, artist)

      if (await isDirectory(artistDirectoryPath)) {
        const files = await fs.readdir(artistDirectoryPath)

        const coverPath = getCoverPath(files, artistDirectoryPath)

        const songs = getSongs(files, artistDirectoryPath)

        result.push({
          artist: { name: artist, path: artistDirectoryPath },
          cover: await fs.readFile(coverPath),
          songs: songs
        })
      }
    }
    return result // Assuming you might want to use the result outside this function
  } catch (err) {
    console.error('Unable to scan directory:', err)
  }
}

// TODO: Add getArtistByName function and getArtist function so I can loop inside of loadSongs by artist name

export async function getArtist(artist) {
  try {
    const library = await readLibraryPath()
    const artistDirectory = library.find(async (dir) => (await isDirectory(dir)) && dir === artist)
    const artistDirectoryPath = path.join(LIBRARY_PATH, artist)

    const artistFiles = await fs.readdir(artistDirectory)
    const coverPath = getCoverPath(artistFiles, artistDirectoryPath)
    const songs = getSongs(artistFiles, artistDirectoryPath)

    return {
      artist: { name: artist, path: artistDirectoryPath },
      cover: await fs.readFile(coverPath),
      songs
    }
  } catch (error) {
    console.log('Error loading artist: ', error)
  }
}

async function readLibraryPath() {
  if (!(await isDirectory(LIBRARY_PATH))) {
    console.log('Library path does not exist or is not a directory.')
    return
  }

  return await fs.readdir(LIBRARY_PATH)
}

function getSongs(files, artistDirectoryPath) {
  const songs = files
    .filter((file) => file.endsWith('.mp3'))
    .map((song) => {
      const songPath = path.join(artistDirectoryPath, song)
      return { song, path: songPath }
    })

  return songs
}

function getCoverPath(files, artistDirectoryPath) {
  const coverSupportedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const cover = files.find((file) => coverSupportedExtensions.includes(path.extname(file)))
  const coverPath = cover ? path.join(artistDirectoryPath, cover) : null
  return coverPath
}

async function isDirectory(checkPath) {
  try {
    const stat = await fs.stat(checkPath)
    return stat.isDirectory()
  } catch (error) {
    console.error('Error checking directory:', error)
    return false
  }
}
