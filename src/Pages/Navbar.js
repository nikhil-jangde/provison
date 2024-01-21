import React from 'react';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='w-full h-auto bg-violet-500 flex justify-between items-center px-4'>
      {/* Left side - Logo */}
      <div>
        {/* Logo image with a clickable behavior to navigate to the products page */}
        <img
          src="http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png"
          alt="Logo"
          className="h-20 cursor-pointer"
          onClick={() => { navigate('/products') }}
        />
      </div>

      {/* Right side - About Us and Logout buttons */}
      <div className="flex items-center space-x-4">
        {/* About Us button with a border and rounded corners */}
        <button className=' bg-transparent rounded-3xl font-semibold border p-2 border-black' onClick={() => { navigate('/about') }}>About Us</button>

        {/* Logout button with a dark background, white text, and an icon */}
        <button className='flex items-center justify-center p-2 rounded-3xl text-white font-semibold bg-black'
          onClick={() => { localStorage.removeItem('accessToken'); navigate('/') }}>
          Logout <IoIosLogOut className='text-2xl text-white ml-1' />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
