import { Link } from "react-router-dom";
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const NotFound = () => {
  return (
    <Wrapper className="full-page">
        <div>
            <img src={img} alt='not-found' />
            <h3>page not foung</h3>
            <p>Ooops, something went wrong, please try again</p>
            <Link to='/'>home page</Link>
        </div>
    </Wrapper>
  )
}
export default NotFound