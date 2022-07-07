import { useState, useEffect } from "react";
import Logo from '../components/Logo';
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';
import { useAppContext } from "../context/appContext";
import { useNavigate } from 'react-router-dom';


const initialState = {
    name: '',
    email: '',
    password: '',
    isUser: true,
    
}
const Register = () => {

   
    const navigate = useNavigate()

const [values, setValues] = useState(initialState)

const {user,isLoading, showAlert, displayAlert, registerUser, loginUser} = useAppContext()

useEffect(() => {

 if(user) {

    setTimeout(() => {

        navigate('/')
        
    }, 3000);

 } 
}, [user, navigate])

//toggle between login and register
const toggleUser = () => {

    setValues({...values, isUser: !values.isUser})
}

const handleChange = (event) => {
    
   setValues({...values, [event.target.name]: event.target.value})
}

const onSubmit = (event) => {
    event.preventDefault()
    const {name, email, password, isUser} = values;
    if((!isUser && !name) || !email || !password) {

        displayAlert()
        return
    }

    const currentUser = {name, email, password}

   if(isUser) {

    loginUser(currentUser)

    }else {

    registerUser(currentUser)
   }

   
}



  return (
    <Wrapper className="full-page">
        
        <form className="form" onSubmit={onSubmit}>
       
            <Logo />
            <h3>{values.isUser ? 'Login' : 'Register'}</h3>

             {showAlert && <Alert />}

             {!values.isUser && (

                <FormRow
                type='text'
                value={values.name}
                name='name'
                handleChange={handleChange} 
                className='form-input'
                />
             )}
            
               <FormRow
                type='email'
                 value={values.email} 
                 name='email' 
                handleChange={handleChange} 
                 className='form-input'
                 />
         
               <FormRow
                type='password'
                 value={values.password}
                  name='password'
                  handleChange={handleChange}
                    className='form-input'
                    />
           

            <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>

            <p>

               {values.isUser ? 'Not a user yet?' : 'Already user?'}

                <button type="button" onClick={toggleUser} className="member-btn">
                    {values.isUser ? 'Register' : 'Login'}
                </button>
            </p>
        </form>
    </Wrapper>
  )
}

export default Register