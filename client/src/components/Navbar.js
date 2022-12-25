import Wrapper from '../assets/wrappers/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import { BiCaretDownCircle } from 'react-icons/bi';
import { GrTextAlignLeft } from 'react-icons/gr';
import { useAppContext } from '../context/appContext';
import { useState } from 'react';
import Logo from './Logo';

const Navbar = () => {

   const { user,toggleSidebar, logoutUser } = useAppContext()

   const [toggleLogout, setToggleLogout] = useState(false)

  return (
    <Wrapper>
        <div className="nav-center">
            <button type='button' className="toggle-btn" onClick={ toggleSidebar }>
                <GrTextAlignLeft />
            </button>

            <div>
                <Logo />

                <h3 className="logo-text">dashboard</h3>
            </div>

            <div className="btn-container">
                <button type='button' className="btn" onClick={() => setToggleLogout(!toggleLogout)}>
                    <FaUserCircle />
                    {user?.name}
                    <BiCaretDownCircle />
                </button>

                <div className={toggleLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                    <button type='button' className='dropdown-btn' onClick={logoutUser}>
                        logout
                    </button>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}
export default Navbar