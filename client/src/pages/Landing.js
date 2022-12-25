import main from '../assets/images/main.svg';
 import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { useAppContext } from '../context/appContext';


const Landing = () => {

const { user } = useAppContext()

  return (
    <>
  
  {user && <Navigate to='/' />}

    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
    <div className="info">
     <h1>Find <span>your perfect</span> job</h1>
     <p>Our job portal offers over 1000 jobs every day.Find the perfect job for you and change your carier</p>

     <Link to='/register' className='btn btn-hero'>Login/Register</Link>
    </div>

    <img src={main} alt='job search' className='img main-img' />
      </div>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.main`

nav {
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
  align-items: center;
}

.page {

  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
  margin-top: -3rem;
}

.logo {
  width: 10%;
  backgroundColor: var(--grey-400);
}

h1 {

  font-weight: 700;
  color: white;
  span {
    color: rgb(29,17,96);
  }
}

p {

  color: var(--grey-600)
}

.main-img {

  display: none;
}

@media (min-width: 992px) {

  .page {

    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }

  .main-img {

    display: block;
  }
}
`

export default Landing