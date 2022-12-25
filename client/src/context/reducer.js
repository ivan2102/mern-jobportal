import { 
    CHANGE_PAGE,
    CLEAR_ALERT,
     CLEAR_FILTERS,
     CLEAR_VALUES,
     CREATE_JOB_ERROR,
     CREATE_JOB_REQUEST,
     CREATE_JOB_SUCCESS,
     DELETE_JOB_REQUEST,
     EDIT_JOB_ERROR,
     EDIT_JOB_REQUEST,
     EDIT_JOB_SUCCESS,
     GET_ALL_JOBS_REQUEST,
     GET_ALL_JOBS_SUCCESS,
     GET_CURRENT_USER_REQUEST,
     GET_CURRENT_USER_SUCCESS,
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
        UPDATE_USER_SUCCESS
    } from "./actions";
    import { initialState } from "./appContext";

const reducer = (state, action) => {

    if(action.type === SHOW_ALERT) {

        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please, provide all values'
        }
    }

    if(action.type === CLEAR_ALERT) {

        return{

            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        }
    }

    //handle change
    if(action.type === HANDLE_CHANGE) {

        return {
            ...state,
            page: 1,
           [action.payload.name]: action.payload.value
        }
    }

    //change page
    if(action.type === CHANGE_PAGE) {

        return {
            ...state,
            page: action.payload.page
        }
    }

    //clear values
    if(action.type === CLEAR_VALUES) {

        const initialState = {
            isEditing: false,
            editJobId: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'freelance',
            status: 'waiting'
        }

        return {...state, ...initialState}
    }

    //clear filters
    if(action.type === CLEAR_FILTERS) {

      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest'
      }
    }

    //register user
    if(action.type === REGISTER_USER_REQUEST) {

        return {
            ...state,
            isLoading: true
        }
    }

    if(action.type === REGISTER_USER_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully registered new user'
        }
    }

    if(action.type === REGISTER_USER_ERROR) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg

        }
    }

    //login user
    if(action.type === LOGIN_USER_REQUEST) {

        return {
            ...state,
            isLoading: true
        }
    }

    if(action.type === LOGIN_USER_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login success'
        }
    }

    if(action.type === LOGIN_USER_ERROR) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    //toggle sidebar
    if(action.type === TOGGLE_SIDEBAR) {

        return {

            ...state,
            showSidebar: !state.showSidebar
        }
    }

    //logout user
    if(action.type === LOGOUT_USER) {

        return {
            ...initialState,
            user: null,
            userLoading: false,
            userLocation: '',
            jobLocation: ''
        }
    }

    //create user
    if(action.type === CREATE_JOB_REQUEST) {

        return {
            ...state,
            isLoading: true
        }
    }

    if(action.type === CREATE_JOB_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Job created successfully'
        }
    }

    if(action.type === CREATE_JOB_ERROR) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }



    //get all users
    if(action.type === GET_ALL_JOBS_REQUEST) {

        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }

    if(action.type === GET_ALL_JOBS_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.totalJobs,
            numOfPages: action.payload.numOfPages 
        }
    }

    //get current user
    if(action.type === GET_CURRENT_USER_REQUEST) {

        return {
            ...state,
            userLoading: true,
            showAlert: false
        }
    }

    if(action.type === GET_CURRENT_USER_SUCCESS) {

        return{
            ...state,
            userLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location
        }

       
    }

    //update user
    if(action.type === UPDATE_USER_REQUEST) {

        return {
            ...state,
            isLoading: true
        }
    }

    if(action.type === UPDATE_USER_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            jobLocation: action.payload.location,
            userLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User successfully updated'
        }
    }

    if(action.type === UPDATE_USER_ERROR) {

        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg

        }
    }

    //update job
    if(action.type === SET_EDIT_JOB) {

        const job = state.jobs.find((job) => job._id === action.payload.id)

        const {_id, position, company, status, jobLocation, jobType} = job

        return {
            ...state,
            isEditing: true,
            editJobId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status
        }
    }

    //edit job
    if(action.type === EDIT_JOB_REQUEST) {

        return {
            ...state,
            isLoading: true
        }
    }

    if(action.type === EDIT_JOB_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job successfully updated'
        }
    }

    if(action.type === EDIT_JOB_ERROR) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    //delete job
    if(action.type === DELETE_JOB_REQUEST) {

        

        return {
            ...state,
            isLoading: true,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Job deleted successfully'
            
        }
    }

    //show stats
    if(action.type === SHOW_STATS_REQUEST) {

        return{
            ...state,
            isLoading: true
        }
    }

    if(action.type === SHOW_STATS_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            monthlyApplications: action.payload.monthlyApplications
        }
    }

    throw new Error(`no such action : ${action.type}`)
}



   




export default reducer