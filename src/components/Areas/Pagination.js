import React from "react";

const Pagination = ({moviesPerPage, totalMovies}) => {

    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(totalMovies / moviesPerPage); i++) {
                pageNumbers.push(i);
                console.log("confirm loop", i);
                return;
    }

    console.log("am i getting here", pageNumbers);
    
    return (
        <div>
            Hello World!
            <ul className="pagination">
                {
                
                pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        Hello World! {number}
                    </li>
                ))

                }
            </ul>
        </div>
    )

}

export default Pagination;


