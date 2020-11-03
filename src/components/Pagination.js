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
        if (currentNumberOfPage >= 1 && currentNumberOfPage <= 2) {
            tempNumberOfPages = [1, 2, '...', numberOfpages.length]
        }
        else if (currentNumberOfPage === 3) {
            const sliced = numberOfpages.slice(0, 4)
            tempNumberOfPages = [...sliced, '...', numberOfpages.length]
        }

        else if (numberOfpages.length < 6){
            tempNumberOfPages = numberOfpages
        }
        else if (currentNumberOfPage > 3 && currentNumberOfPage < numberOfpages.length - 2){
            const sliced1 = numberOfpages.slice(currentNumberOfPage - 2, currentNumberOfPage)
            const sliced2 = numberOfpages.slice(currentNumberOfPage, currentNumberOfPage + 1)
            tempNumberOfPages = [1, '...', ...sliced1, sliced2, '...', numberOfpages.length]
        }

        else if (currentNumberOfPage > numberOfpages.length - 3){
            const sliced = numberOfpages.slice(numberOfpages.length - 4)
            tempNumberOfPages = ([1, '...', ...sliced])
        }
        else if (currentNumberOfPage === '...') {
            setArrOfCurrentPage(arrOfCurrentPage[arrOfCurrentPage.length-3] + 1)
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

                {arrOfCurrentPage.map(page => {
                    return(
                    <a 
                    onClick={() => setCurrentNumberOfPage(page)}
                    href="#" 
                    className={currentNumberOfPage === page && 'active'}>{page}</a>
                    )
                })}

                <a 
                href="#"
                className={`${currentNumberOfPage === numberOfpages.length ? 'display_none' : ''}`}
                onClick = {() => setCurrentNumberOfPage((previousState) => previousState === numberOfpages.length ? previousState : previousState + 1)}>
                    next</a>
            </div>
    )
}

export default Pagination