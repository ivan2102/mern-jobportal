import React, {  useContext, useEffect, useReducer } from 'react';
import { 
    CLEAR_ALERT, 
    CLEAR_VALUES, 
    CLEAR_FILTERS,
    CREATE_JOB_ERROR, 
    CREATE_JOB_REQUEST, 
    CREATE_JOB_SUCCESS, 
    DELETE_JOB_REQUEST, 
    EDIT_JOB_ERROR, 
    EDIT_JOB_REQUEST, 
    EDIT_JOB_SUCCESS, 
    GET_ALL_JOBS_REQUEST, 
    GET_ALL_JOBS_SUCCESS, 
    HANDLE_CHANGE, 
    LOGIN_USER_ERROR, 
    LOGIN_USER_REQUEST, 
    LOGIN_USER_SUCCESS, 
    LOGOUT_USER, 
    REGISTER_USER_ERROR,
     REGISTER_USER_REQUEST,
      REGISTER_USER_SUCCESS,
      SET_EDIT_JOB,
      SHOW_ALERT, 
      SHOW_STATS_REQUEST, 
      SHOW_STATS_SUCCESS, 
      TOGGLE_SIDEBAR,
      UPDATE_USER_ERROR,
      UPDATE_USER_REQUEST,
      UPDATE_USER_SUCCESS,
      CHANGE_PAGE,
      GET_CURRENT_USER_SUCCESS,
      GET_CURRENT_USER_REQUEST
    } from './actions';
import reducer from './reducer';
import axios from 'axios';



const initialState = {

    isLoading: false,
    userLoading: true,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',
    jobLocation: '',
    showSidebar:  false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['internship', 'weekend', 'part-time', 'full-time', 'freelance'],
    jobType: 'freelance',
    statusOptions: [ 'interview', 'searching', 'pending'],
    status: 'searching',
    //job
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: [],
    //search
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

const [ state, dispatch ] = useReducer(reducer, initialState)


//axios baseUrl
const authFetch = axios.create({

    baseURL: '/api'
})


//axios interceptors response
authFetch.interceptors.response.use((response) => {

    return response
},

(error) => {

    //console.log(error.response);

    if(error.response.status === 401) {

       logoutUser()
    }
    return Promise.reject(error)
}
)


//display alert
const displayAlert = () => {

    dispatch({
        type: SHOW_ALERT
     })

     clearAlert()
}

//clear alert
const clearAlert = () => {

    setTimeout(() => {

    dispatch({type: CLEAR_ALERT})

}, 3000)

}

//toggle sidebar
const toggleSidebar = () => {

    dispatch({type: TOGGLE_SIDEBAR})
}

//handle change
const handleChange = ({name, value}) => {

    dispatch({
        type: HANDLE_CHANGE,
        payload: {name, value}
    })
}

//change page
const changePage = (page) => {

    dispatch({ 
        type: CHANGE_PAGE,
        payload: {page}
    })
}

//clear values
const clearValues = () => {

    dispatch({type: CLEAR_VALUES})
}

// clear filters
const clearFilters = () => {

    dispatch({ type: CLEAR_FILTERS })
}


//register user
const registerUser = async (currentUser) => {

    dispatch({type: REGISTER_USER_REQUEST})

    try {

     const res = await axios.post('/api/auth/register', currentUser)  
     
     const { user, location } = res.data

     dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {user, location}
    })
   
    } catch (error) {

        dispatch({
            type: REGISTER_USER_ERROR,
            payload: {msg: error.response.data.msg}
        })
        
    }

    clearAlert()
}

//login user
const loginUser = async (currentUser) => {

    dispatch({type: LOGIN_USER_REQUEST}) 

    try {

        const {data} = await axios.post('/api/auth/login', currentUser)

        const {user, location} = data

        dispatch({

            type: LOGIN_USER_SUCCESS,
            payload: {user, location}
        })
 
    } catch (error) {

        dispatch({
            type: LOGIN_USER_ERROR,
            payload: {msg: error.response.data.msg}

        })

        clearAlert()
        
    }
}


//get current user
const getCurrentUser = async () => {

    dispatch({type: GET_CURRENT_USER_REQUEST})

    try {

        const {data} = await authFetch.get('/auth/getCurrentUser')

        const {user, location} = data

        dispatch({

            type: GET_CURRENT_USER_SUCCESS,
            payload: {user, location}
        })
        
    } catch (error) {

        if(error.response.status === 401) return
        logoutUser()
        
    }
}

useEffect(() => {

    getCurrentUser()
}, [])

//update user
const updateUser = async (currentUser) => {

    dispatch({type: UPDATE_USER_REQUEST})

    try {

        const {data} = await authFetch.patch('/auth/updateUser', currentUser)

          const {user, location} = data  

          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: { user, location }
        })
   
    } catch (error) {

        if(error.response.status !== 401) {

        dispatch({
            type: UPDATE_USER_ERROR,
            payload: { msg: error.response.data.msg }

        })

    }
        
    }

    clearAlert()
}

//logout user
const logoutUser = async () => {

    await authFetch.get('/auth/logout')

    dispatch({type: LOGOUT_USER})
    
}


//create user
const createJob = async () => {

    dispatch({type: CREATE_JOB_REQUEST})

    try {

        const { position, company, jobLocation, jobType, status } = state

         await authFetch.post('/jobs', {

             position,
             company,
             jobLocation,
             jobType,
             status
             
         })

         dispatch({ type: CREATE_JOB_SUCCESS })

         dispatch({ type: CLEAR_VALUES })
        
    } catch (error) {

        if(error.response.status === 401) return

        dispatch({
            type: CREATE_JOB_ERROR,
            payload: {msg: error.response.data.msg}
        })
        
    }

    clearAlert()
}

//get all jobs
const getAllJobs = async () => {

    const {search, searchStatus, searchType, sort, page} = state

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

    if(search) {

        url = url + `&search=${search}`
    }

    dispatch({type: GET_ALL_JOBS_REQUEST})

   try {

    const { data } = await authFetch(url)

    const {jobs, totalJobs, numOfPages} = data

    
    

    dispatch({
        type: GET_ALL_JOBS_SUCCESS,
        payload: {jobs, totalJobs, numOfPages}
    })
    
   } catch (error) {

    logoutUser()
    
   }

   clearAlert()

}

const setEditJob = (id) => {

    dispatch({
        type: SET_EDIT_JOB,
        payload: {id}

    })
}

const editJob = async () => {
    
    dispatch({type: EDIT_JOB_REQUEST})

    try {

        const {position, company, jobLocation, jobType, status, editJobId} = state

        await authFetch.patch(`/jobs/${editJobId}`, {

            position,
            company,
            jobLocation,
            jobType,
            status
        })

        dispatch({ type: EDIT_JOB_SUCCESS })

        dispatch({ type: CLEAR_VALUES })
        
    } catch (error) {

        if(error.response.status === 401) return

     dispatch({
        
        type: EDIT_JOB_ERROR,
        payload: {msg: error.response.data.msg}
    })
        
    }

    clearAlert()
}

const deleteJob = async (jobId) => {

    dispatch({type: DELETE_JOB_REQUEST})

    try {

    await authFetch.delete(`/jobs/${jobId}`)

    getAllJobs()
        
    } catch (error) {
        
        logoutUser()
        
    }
}

//show stats
const showStats = async () => {

  dispatch({ type: SHOW_STATS_REQUEST })

  try {

   

    const {data} = await authFetch('/jobs/stats')

    dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {stats: data.defaultStats, monthlyApplications: data.monthlyApplications}
    })
    
  } catch (error) {

   logoutUser()
    
  }

  clearAlert()
}




    return(

        <AppContext.Provider value={{
            ...state,
            displayAlert,
            clearAlert,
            registerUser,
            loginUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            getCurrentUser,
            handleChange,
            clearValues,
            createJob,
            getAllJobs,
            setEditJob,
            editJob,
            deleteJob,
            showStats,
            clearFilters,
            changePage
            }}>
            {children}
        </AppContext.Provider>
    )
}

 const useAppContext = () => {

   return useContext(AppContext)
}

export  {AppProvider, initialState, useAppContext}