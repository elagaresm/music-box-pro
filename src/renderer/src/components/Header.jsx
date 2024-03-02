import React from 'react'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RxMagnifyingGlass } from "react-icons/rx";

const Header = () => {
  return (
    <div
      style={{ gridArea: "header" }}
      className="p-2"
    >
      <nav className='flex'>
        <SlArrowLeft className='text-outline mr-2' />
        <SlArrowRight className='text-outline mr-2' />
        <form className='flex items-center border-solid'>
          <input type="text" className='w-1/4' />
          <RxMagnifyingGlass className='' />
        </form>
      </nav>
    </div>
  )
}

export default Header
