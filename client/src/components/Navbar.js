import Wrapper from '../assets/wrappers/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { BiCaretDownCircle } from 'react-icons/bi';
import { GrTextAlignLeft } from 'react-icons/gr';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import { useState } from 'react';

const Navbar = () => {

const {user, logoutUser, toggleSidebar } = useAppContext()

const [logout, setLogout] = useState()

  return (
    <Wrapper>
   <div className="nav-center">
     <button type='button' onClick={toggleSidebar} className="toggle-btn">
     <GrTextAlignLeft />
     </button>

     <div>
       <Logo />

       <h3 className="logo-text">Dashboard</h3>
     </div>

    <div className="btn-container">
     <button type='button' onClick={() => setLogout(!logout)} className='btn'>
       <FaUserCircle />
       {user && user.name}
       <BiCaretDownCircle />
     </button>

   <div className={logout ? 'dropdown show-dropdown' : 'dropdown'}>
     <button type='button' onClick={logoutUser} className="dropdown-btn">
      logout
     </button>
   </div>

    </div>
   </div>
    </Wrapper>
  )
}

export default Navbar