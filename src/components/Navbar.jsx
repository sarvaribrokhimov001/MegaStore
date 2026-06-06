import React from 'react'
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w-full h-25 bg-black text-white flex items-center justify-evenly'>
        <h1 className='font-bold pr-90 text-4xl'> MegaStore </h1>

        <ul className='flex justify-center items-center gap-10'>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' to="/"> Home </Link> </li>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' target="_blank" rel="noreferrer" to="https://swiperjs.com/"> Swiper </Link> </li>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' target="_blank" rel="noreferrer" to="https://react-slick.neostack.com/"> Slick </Link> </li>
          <li> <Link className='font-bold hover:text-red-600 text-[20px]' target="_blank" rel="noreferrer" to="https://www.react-fast-marquee.com/"> FastMarquee </Link> </li>
        </ul>

        <form>
          <input className='bg-neutral-600 rounded-2xl w-[300px] h-[40px] pl-5 text-[18px] focus:bg-black focus:text-red-600 pr-2 font-bold' placeholder='Search....' type="search" />
        </form>

        <GiShoppingCart className='text-4xl' />

    </div>
  )
}
export default Navbar