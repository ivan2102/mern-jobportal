import moment from 'moment';
import {FaLocationArrow} from 'react-icons/fa';
import {GiBriefcase} from 'react-icons/gi';
import {VscCalendar} from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
const Job = ({_id, position,company, jobLocation, jobType, status, createdAt}) => {

  const { setEditJob, deleteJob } = useAppContext()

let date = moment(createdAt)

date = date.format('MMM Do, YYYY')

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<VscCalendar />} text={date} />
          <JobInfo icon={<GiBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          <div className="actions">
            <Link to='/add-job' onClick={() => setEditJob(_id)} className='btn edit-btn'>
              edit
            </Link>
            
            <button type="submit" onClick={() => deleteJob(_id)} className='btn delete-btn'>
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Job