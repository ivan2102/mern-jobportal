import { useState } from "react";
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from "../../context/appContext";
import { FormRow, Alert } from '../../components';
const Profile = () => {

 const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext()

 const [name, setName] = useState(user?.name)
 const [email, setEmail] = useState(user?.email)
 const [lastName, setLastName] = useState(user?.lastName)
 const [location, setLocation] = useState(user?.location)

 const submitHandler = (event) => {
event.preventDefault()

if(!name || !email || !lastName || !location) {

  displayAlert()
  return
}

updateUser({name, email, lastName, location})
 }

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler}>
        <h3>profile</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow 
          type='text'
          name='name'
          value={name}
          handleChange={(event) => setName(event.target.value)}
         
          />

          <FormRow 
          type='email'
          name='email'
          value={email}
           handleChange={(event) => setEmail(event.target.value)}
           
          />
         <FormRow 
          type='text'
          labelText='last name'
          name='lastName'
          value={lastName}
           handleChange={(event) => setLastName(event.target.value)}
           
          />

         <FormRow 
          type='text'
          name='location'
          value={location}
           handleChange={(event) => setLocation(event.target.value)}
           
          />

        

        <button type='submit' className="btn btn-block" disabled={isLoading}>
          {isLoading ? 'Please wait' : 'update'}
        </button>

        </div>
      </form>
    </Wrapper>
  )
}
export default Profile