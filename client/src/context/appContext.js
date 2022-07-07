import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { SHOW_ALERT,
     CLEAR_ALERT,
      REGISTER_REQUEST,
       REGISTER_ERROR, 
       REGISTER_SUCCESS,
        LOGIN_REQUEST,
         LOGIN_ERROR,
          LOGIN_SUCCESS, 
          TOGGLE_SIDEBAR,
          LOGOUT_USER,
          UPDATE_USER_REQUEST,
          UPDATE_USER_SUCCESS,
          UPDATE_USER_ERROR,
          HANDLE_CHANGE,
          CLEAR_VALUES,
          CREATE_JOB_REQUEST,
          CREATE_JOB_ERROR,
          CREATE_JOB_SUCCESS,
          GET_ALL_JOBS_REQUEST,
          GET_ALL_JOBS_SUCCESS,
          SET_EDIT_JOB,
          DELETE_JOB,
          EDIT_JOB_REQUEST,
          EDIT_JOB_ERROR,
          EDIT_JOB_SUCCESS,
          SHOW_STATS_REQUEST,
          SHOW_STATS_SUCCESS,
          CLEAR_FILTERS,
          CHANGE_PAGE
        }
           from './actions';

//get local storage
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('location')

const initialState = {

    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['part-time', 'full-time', 'internship', 'weekend'],
    jobType: 'full-time',
    statusOptions: ['interview', 'pending', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: [],
    //
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a']

}

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    //axios
   const authFetch = axios.create({

    baseURL: '/api',
  })

  //request
  authFetch.interceptors.request.use((config) => {

    config.headers.common['Authorization'] = `Bearer ${state.token}`

    return config
  }, (error) => {

    return Promise.reject(error)

  })

  //response
  authFetch.interceptors.response.use((response) => {

    return response

  }, (error) => {

    //console.log(error.response);

    if(error.response.status === 401) {
         logoutUser();
    }

     return Promise.reject(error)
  })

    const displayAlert = () => {

        dispatch({ type: SHOW_ALERT })

        clearAlert()
    }

   const clearAlert = () => {

    setTimeout(() => {

        dispatch({type: CLEAR_ALERT})
        
    }, 3000);
   }


   //local storage
   const addUserToLocalStorage = ({user, token, location}) => {

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
   }

   const removeUserFromLocalStorage = () => {

    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
   }

   //register user
   const registerUser = async (currentUser) => {
       
    dispatch({type: REGISTER_REQUEST})

    try {

        const response = await axios.post('/api/auth/register', currentUser)
       

        const {user, token, location} = response.data

         dispatch({
             type: REGISTER_SUCCESS, 
             payload: {
                 user,
                 token,
                 location
             }
            })

            addUserToLocalStorage({user, token, location})
        
    } catch (error) {

        dispatch({
            type: REGISTER_ERROR,
            payload: {msg: error.response.data.msg}
        })
        
    }

    clearAlert()
   }

   //login user
   const loginUser = async (currentUser) => {

    dispatch({type: LOGIN_REQUEST})

    try {

        const res = await axios.post('/api/auth/login', currentUser)

        const {user, token, location} = res.data

        dispatch({

            type: LOGIN_SUCCESS,
            payload: {user, token, location}
                
            })

            addUserToLocalStorage({user, token, location})
        
    } catch (error) {

        dispatch({
            type: LOGIN_ERROR,
            payload: {msg: error.response.data.msg}
        })
        
    }

    clearAlert()
   }

   //logout user
   const logoutUser = () => {

    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
   }

   //toggle sidebar
   const toggleSidebar = () => {

    dispatch({type: TOGGLE_SIDEBAR})
   }

   // update user
   const updateUser = async (currentUser) => {

    dispatch({type: UPDATE_USER_REQUEST})

    try {

        const {data} = await authFetch.patch('/auth/updateUser', currentUser)

        const { user, token, location } = data

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: {user,token,location}
        })

        addUserToLocalStorage({ user, token, location })
        
    } catch (error) {

        if(error.response.status !== 401) {

            dispatch({
                type: UPDATE_USER_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }

     }

    clearAlert()
   }

   //handle change
   const handleChange = ({name, value}) => {

    dispatch({

        type: HANDLE_CHANGE,
        payload: {name, value}
    })
   }

   //clear values
   const clearValues = () => {

    dispatch({type: CLEAR_VALUES})
   }

   //create job
   const createJob = async () => {

    dispatch({type: CREATE_JOB_REQUEST})

    try {

        const { position, company, jobLocation, jobType, status } = state;

         await authFetch.post('/jobs', {

            position,
            company,
            jobLocation,
            jobType,
            status
            
        })

        dispatch({

            type: CREATE_JOB_SUCCESS

        })

        //clear values
        dispatch({type: CLEAR_VALUES})
        
    } catch (error) {

        if(error.response.status === 401) return

        dispatch({

            type: CREATE_JOB_ERROR,
            payload: {msg: error.response.data.msg}
        })
        
    }

    clearAlert()
   }


   //clear filters
   const clearFilters = () => {

    dispatch({type: CLEAR_FILTERS})
   }



   //get all jobs
   const getAllJobs = async () => {

    const { search, searchStatus, searchType, sort, page } = state

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`

    if(search) {

        url = url + `&search=${search}`
    }

    dispatch({type: GET_ALL_JOBS_REQUEST})

    try {

       const {data} = await authFetch(url)

       const { jobs, totalJobs, numOfPages } = data

       dispatch({

        type: GET_ALL_JOBS_SUCCESS,
        payload: {jobs, totalJobs, numOfPages}
       })
        
    } catch (error) {
        
        
        logoutUser()
    }

    clearAlert()
   }

   //EditJob
   const editJob = async () => {

     dispatch({type: EDIT_JOB_REQUEST})

     try {

        const {position, company, jobLocation, jobType, status} = state;

        await authFetch.patch(`/jobs/${state.editJobId}`, {

            position,
            company,
            jobLocation,
            jobType,
            status
        })

         dispatch({

            type: EDIT_JOB_SUCCESS,
            payload: {position, company, jobLocation, jobType, status}
         })

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

   //set edit job
   const setEditJob = (id) => {

    dispatch({
        type: SET_EDIT_JOB,
        payload: {id}

    })
   }

   const deleteJob = async (jobId) => {

    dispatch({type: DELETE_JOB})

    try {

        await authFetch.delete(`/jobs/${jobId}`)

        getAllJobs()
        
    } catch (error) {

        console.log(error.response);

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

//change page
const changePage = (page) => {

    dispatch({ 
        type: CHANGE_PAGE,
        payload: { page }
     })
}



    return(

        <AppContext.Provider value={{...state,
         displayAlert,
          clearAlert,
          registerUser,
          loginUser,
          logoutUser,
          toggleSidebar,
          updateUser,
          handleChange,
          clearValues,
          createJob,
          getAllJobs,
          editJob,
          setEditJob,
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

export {AppProvider, initialState, useAppContext}