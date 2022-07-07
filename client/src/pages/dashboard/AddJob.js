import FormRow from '../../components/FormRow';
import Alert from '../../components/Alert';
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext';
import FormRowSelect from '../../components/FormRowSelect';
import { useNavigate } from 'react-router-dom';
const AddJob = () => {

  const {showAlert,
     displayAlert,
      isEditing,
       position,
        company,
         jobLocation,
          jobType,
           jobTypeOptions,
            status,
             statusOptions,
             handleChange,
             clearValues,
             createJob,
              editJob
            } 
            = useAppContext();

            const navigate = useNavigate();

  const handleSubmit = (event) => {

    event.preventDefault();

    if(!position || !company || !jobLocation) {

      displayAlert()
      return
    }

    if(isEditing) {
     editJob()

     setTimeout(() => {

      navigate('/all-jobs')
     }, 3000)
    // 
      return
    }

    createJob()
    
  }

  const handleJobInput = (event) => {

    const name = event.target.name
    const value = event.target.value

    handleChange({ name, value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        {showAlert && <Alert />}

        {/* position */}
        <div className="form-center">
          <FormRow
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
           />

           {/* company */}
           <FormRow
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
           />

           {/* location */}
           <FormRow
          type='text'
          labelText='location'
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}
           />

           {/*job status */}
           <FormRowSelect 
           name='status'
            value={status} 
            handleChange={handleJobInput}
            list={statusOptions}
            />
           {/* job type */}
           <FormRowSelect 
           name='jobType'
           labelText='job type'
           value={jobType}
           handleChange={handleJobInput}
           list={jobTypeOptions}
           />

           <div className="btn-container">
            <button type='submit' onClick={handleSubmit} className="btn btn-block submit-btn">
              submit
            </button>

            <button 
            className="btn btn-block clear-btn"
            onClick={(event) => {
              event.preventDefault() 
              clearValues()
            }} 
            >
              clear
              </button>
           </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob