import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from './Loading';
import Job from "./Job";
import Wrapper from '../assets/wrappers/JobsContainer';
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {

const {getAllJobs,
     jobs,
      isLoading,
       page, 
       totalJobs,
       search,
       searchStatus,
       searchType,
       sort,
       numOfPages
    } = useAppContext()

useEffect(() => {

    getAllJobs()
}, [search, searchStatus, searchType, sort, page])

if(isLoading) {

    return <Loading center/>
}

if(jobs.length === 0) {

  return (
    <Wrapper>
    <h2>Unfortunatelly there's no job to display...</h2>
    </Wrapper>
  )

}

return(

    <Wrapper>
        <h5>
            {totalJobs} job{jobs.length > 1 && 's'} found

            </h5>

            <div className="jobs">
                {jobs.map((job) => {

                    return <Job key={job._id} {...job} />
                })}
            </div>

           { numOfPages > 1 && <PageBtnContainer/> }
            
        
    </Wrapper>
)

}
export default JobsContainer