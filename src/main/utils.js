import fs from 'node:fs/promises'
import path from 'node:path'

export async function handleLoadSongs() {
  const libraryPath = 'C:\\Users\\Enmanuel\\Downloads\\Songs'

  if (!(await isDirectory(libraryPath))) {
    return
  }

  try {
    const artists = await fs.readdir(libraryPath)
    const result = {}

    for (const artistDirectory of artists) {
      const artist = artistDirectory
      const artistDirectoryPath = path.join(libraryPath, artistDirectory)

      if (await isDirectory(artistDirectoryPath)) {
        const files = await fs.readdir(artistDirectoryPath)

        const coverSupportedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
        const cover = files.find((file) => coverSupportedExtensions.includes(path.extname(file)))
        const coverPath = cover ? path.join(artistDirectoryPath, cover) : null

        const songs = files
          .filter((file) => file.endsWith('.mp3'))
          .map((song) => {
            const songPath = path.join(artistDirectoryPath, song)
            return { song: song, path: songPath }
          })

        result[artist] = {
          name: artist,
          path: artistDirectoryPath,
          cover: coverPath,
          songs: songs
        }
      }
    }
    return result // Assuming you might want to use the result outside this function
  } catch (err) {
    console.error('Unable to scan directory:', err)
  }
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
