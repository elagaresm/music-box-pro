import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { handleLoadSongs, getArtist } from '../main/utils'
import path from 'path'
import { readFile } from 'fs/promises'

// Custom APIs for renderer
const api = {
  loadSongs: () => handleLoadSongs(),
  getArtist: (artist) => getArtist(artist),
  getFilePath: (filePath) => `file://${path.join(__dirname, filePath)}`,
  readFile: (filePath) => readFile(filePath)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
