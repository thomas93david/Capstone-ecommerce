import React from "react"

const Pagination = ({ moviesPerPage, totalMovies }) => {
    const pageNumbers = [];
    console.log("am igetting here", pageNumbers)
    for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
        console.log("pagenumbers..", pageNumbers)
        return pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link">
                            {number}
                        </a>
                    </li>

                ))}
            </ul>
        </nav>
    )
}

export default Pagination


