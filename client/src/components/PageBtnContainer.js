import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';


const PageBtnContainer = () => {

const { numOfPages, page, changePage } = useAppContext()

const pages = Array.from({length: numOfPages}, (_, index) => {

    return index + 1
})

const prevPage = () => {

    let newPage = page - 1
    if(newPage < 1) {

      newPage = numOfPages
    }
}

const nextPage = () => {

    let newPage = page + 1
    if(newPage > numOfPages) {

      newPage = 1
    }
}



  return (
    <Wrapper>
        <button className="prev-btn" onClick={prevPage}>
            <HiChevronDoubleLeft />
            prev
        </button>

        <button className="btn-container">
         {pages.map((pageNumber) => {
          return(

            <button key={pageNumber} onClick={() => changePage(pageNumber) } type='button' className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}>{pageNumber}</button>
          )
         })}
        </button>

        <button className="next-btn" onClick={nextPage}>

            next
            <HiChevronDoubleRight />
        </button>
    </Wrapper>
  )
}
export default PageBtnContainer