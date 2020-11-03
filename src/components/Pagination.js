import React, {useState, useEffect} from 'react'

function Pagination({ pages = 24, setCurrentPages }) {

    const numberOfpages = []
    for (let i = 1; i <= pages; i++) {
        numberOfpages.push(i)
    }
    
    const [currentNumberOfPage, setCurrentNumberOfPage] = useState(1)
    const [arrOfCurrentPage, setArrOfCurrentPage] = useState([])

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrentPage]

        //1) if user is on page 1: 1 2 ... 24next
        if (currentNumberOfPage >= 1 && currentNumberOfPage <= 2) {
            tempNumberOfPages = [1, 2, '...', numberOfpages.length]
        }


        //2) if user is on page 3: previous 1 2 3 4 ... 24 next
        else if (currentNumberOfPage === 3) {
            const sliced = numberOfpages.slice(0, 4)
            tempNumberOfPages = [...sliced, '...', numberOfpages.length]
        }

        //3) from page number 4 till 22: previous 1... 9 10 11 ... 24 next
        else if (currentNumberOfPage > 3 && currentNumberOfPage < numberOfpages.length - 2){ //from 4 till 22
            const sliced1 = numberOfpages.slice(currentNumberOfPage - 2, currentNumberOfPage) // [3, 4]
            const sliced2 = numberOfpages.slice(currentNumberOfPage, currentNumberOfPage + 1) // [5]
            tempNumberOfPages = [1, '...', ...sliced1, sliced2, '...', numberOfpages.length] // [1,'...',3,4,5,'...',24]
        }

         //* if user is on the last page 24: previous 1 ...22 23 24
        else if (currentNumberOfPage === numberOfpages.length){ // last page
            const sliced = numberOfpages.slice(numberOfpages.length - 3) // [22,23,24]
            tempNumberOfPages = ([1, '...', ...sliced]) // [1,'...',22,23,24]
        }

         setArrOfCurrentPage(tempNumberOfPages)
         setCurrentPages(currentNumberOfPage)
    }, [currentNumberOfPage])
    return (
            <div className="pagination-container">
                <a 
                href="#"
                className={`${currentNumberOfPage === 1 ? 'display_none' : ''}`}
                onClick = {() => setCurrentNumberOfPage((previousState) => previousState === 1 ? previousState : previousState - 1)}>
                    previous</a>

                {arrOfCurrentPage.map(((page, ind) => {
                    return(
                    <a 
                    href="#" 
                    key={ind}
                    className={`${currentNumberOfPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentNumberOfPage(page)}
                    >
                        {page}
                        
                    </a>
                    )
                }))}

                <a 
                href="#"
                className={`${currentNumberOfPage === numberOfpages.length ? 'display_none' : ''}`}
                onClick = {() => setCurrentNumberOfPage((previousState) => previousState === numberOfpages.length ? previousState : previousState + 1)}>
                    next</a>
            </div>
    )
}

export default Pagination