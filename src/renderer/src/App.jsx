import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import MediaPlayer from './components/MediaPlayer'
import { Outlet, useLocation } from 'react-router-dom'


export async function loader() {
  try {
    const data = await window.api.loadSongs()
    return { library: data }
  } catch (err) {
    console.error(err)
  }
}


function App() {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [title, setTitle] = useState('')
  const audioRef = useRef(null)
  const [library, setLibrary] = useState([])
  const location = useLocation()

  console.log(location)

  return (
    <>
      <div id='app'>
        <Header location={location} />
        <Sidebar />
        <div id='main' style={{ gridArea: 'main' }} className='rounded'>
          <Outlet />
        </div>
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
