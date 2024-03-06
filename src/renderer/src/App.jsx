import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import MediaPlayer from './components/MediaPlayer'

function App() {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [title, setTitle] = useState('')
  const audioRef = useRef(null)
  const [library, setLibrary] = useState(null)

  console.log(library)

  useEffect(() => {
    window.api.loadSongs().then((data) => {
      setLibrary(...data)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <>
      <div id='app'>
        <Header />
        <Sidebar />
        <Main />
        <MediaPlayer duration={duration} currentTime={currentTime} title={title} />
        <audio
          ref={audioRef}
          onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          onLoadedMetadata={() => {
            setDuration(audioRef.current.duration)
          }}
        />
      </div>
    </>
  )
}

export default App
