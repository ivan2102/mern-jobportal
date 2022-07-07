import { useState } from "react";
import FormRow from '../../components/FormRow';
import Alert from '../../components/Alert';
import { useAppContext } from "../../context/appContext";
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {

const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext()

const [name, setName] = useState(user?.name)
const [email, setEmail] = useState(user?.email)
const [lastName, setLastName] = useState(user?.lastName)
const [location, setLocation] = useState(user?.location)

const handleSubmit = (event) => {
  event.preventDefault();

  if(!name || !email || !lastName || !location) {
    //test and remove temporary
    displayAlert()
    return
  }

  updateUser({ name, email, lastName, location })
}

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile page</h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow 
          type='text'
          name='name'
           value={name}
          handleChange={(event) => setName(event.target.value)} 
            />

         <FormRow 
          type='text'
          labelText='last name'
           value={lastName}
            name='lastName' 
            handleChange={(event) => setLastName(event.target.value)} 
            />
      
        <FormRow 
         type='email'
           value={email}
            name='email' 
            handleChange={(event) => setEmail(event.target.value)} 
            />
        
         
       
         <FormRow 
          type='text'
           value={location}
            name='location' 
            handleChange={(event) => setLocation(event.target.value)} 
            />

            <button type="submit" className="btn btn-block" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'add'}
            </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile