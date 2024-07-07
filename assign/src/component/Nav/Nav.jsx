import React from 'react'
import './nav.css'
import { useNavigate } from 'react-router-dom'
import { FaTasks } from "react-icons/fa";

const Nav = () => {
  const nav = useNavigate()
  return (
    <div className='nav-main'>
      <ul>
        <li onClick={() => nav('/')}><FaTasks color='' /> Task 1</li>
        <li onClick={() => nav('/task2')}><FaTasks color='' /> Task 2</li>

      </ul>
    </div>
  )
}

export default Nav