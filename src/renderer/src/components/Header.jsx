import { useRef, useState } from 'react'
import { IoIosArrowBack as ArrowBack, IoIosArrowForward as ArrowForward } from 'react-icons/io'
import { RxMagnifyingGlass as MagnifyingGlassIcon } from 'react-icons/rx'
import { SiLightning as LightningIcon } from 'react-icons/si'
import { TbWorld as WorldIcon } from 'react-icons/tb'
import { FiSettings as SettingsIcons } from 'react-icons/fi'
import { RxCross2 as XIcon } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const Header = ({ location }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  function clearInput() {
    setInputValue('')
  }

  const formHandlers = {
    onFocus: () => setTimeout(() => setIsFocused(true), 500),
    onBlur: () => setTimeout(() => setIsFocused(false), 500)
  }

  return (
    <div style={{ gridArea: 'header' }} className="py-1 px-3 flex items-center justify-between rounded">

      <nav className="flex items-center">

        <button>
          <ArrowBack className="text-outline mr-1 hover:text-white text-xl" />
        </button>
        <button>
          <ArrowForward className="text-outline mr-1 hover:text-white text-xl" />
        </button>

        <form
          {...formHandlers}
          className="flex items-center relative w-[100px] overflow-hidden border-2 border-solid rounded-md border-[#6E6E76] focus-within:w-[200px] focus-within:border-white transition-all duration-500">
          <input
            type="text"
            className="w-full px-3 py-1 bg-[#151515] text-outline text-xs focus:outline-none focus:text-white"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          {inputValue.length > 0 ? (
            <XIcon onClick={clearInput} className={"cursor-pointer absolute h-4/5 text-white aspect-square top-[10%] right-0 translate-x-[-10%]"} />
          ) : (
            <MagnifyingGlassIcon className={"absolute h-4/5 aspect-square top-[10%] right-0 translate-x-[-10%] text-outline"} />
          )}
        </form>
      </nav>

      {/* NOTE: Debugging purposes */}
      <div className='text-black opacity-45 bg-outline px-2 py-0 rounded-md'>{decodeURIComponent(location.pathname)}</div>

      <div className="flex items-center gap-4 h-5">
        <div className="flex justify-center items-center gap-2 hover:scale-110 transition-transform ease-in-out duration-500">
          <span className="text-white text-sm">08</span>
          <LightningIcon className="text-accent text-xl" />
        </div>

        <div className="flex items-center gap-1 hover:scale-110 transition-all duration-300">
          <span className="text-white text-xs">EN</span>
          <WorldIcon className="text-white text-xl" />
        </div>

        <div>
          <Link to="/">
            <SettingsIcons className="text-white text-xl hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Header
