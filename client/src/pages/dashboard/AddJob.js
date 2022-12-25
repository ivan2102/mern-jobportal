import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useNavigate } from 'react-router-dom';


const AddJob = () => {

const {
  isLoading,
  showAlert,
  displayAlert,
  isEditing,
  position,
  company,
  jobLocation,
  jobType,
  jobTypeOptions,
  statusOptions,
  status,
  handleChange,
  clearValues,
  createJob,
   editJob
} = useAppContext();

const navigate = useNavigate()

const submitHandler = (event) => {
  event.preventDefault()

  if(!position || !company || !jobLocation) {

    displayAlert()
    return
  }

  if(isEditing) {

    editJob()
   
    return
  }

  createJob()

  setTimeout(() => {
    navigate('/all-jobs')
  }, 3000);

}






const handleJobInput = (event) => {

 handleChange({name: event.target.name, value: event.target.value})
}

  return (
    <Wrapper>
      <h3>{isEditing ? 'edit' : 'add job'}</h3>
      {<Alert /> && showAlert}

      <form className="form">
        <div className="form-center">
          <FormRow
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
          
           />

           <FormRow 
           type='text'
           name='company'
           value={company}
           handleChange={handleJobInput}
           />

           <FormRow 
           type='text'
           labelText='location'
           name='jobLocation'
           value={jobLocation}
           handleChange={handleJobInput}
           />

           {/* job status */}
           <FormRowSelect 
           name='status'
           value={status}
           handleChange={handleJobInput}
           list={statusOptions}
           />
           {/* job type */}
           <FormRowSelect 
           name='jobType'
           value={jobType}
           handleChange={handleJobInput}
           list={jobTypeOptions}
           />
           

           <div className="btn-container">
            <button 
            type='submit' 
            className="btn btn-block"
            onClick={submitHandler}
            disabled={isLoading}
            >
              add
              </button>

              <button 
              className="btn btn-block clear-btn"
               onClick={(event) => 
               {event.preventDefault() 
               clearValues()}}>
                clear
               </button>
           </div>
           </div>
      </form>
    </Wrapper>
  )
}
export default AddJob