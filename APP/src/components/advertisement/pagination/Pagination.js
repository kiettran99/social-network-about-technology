import React, { lazy, Suspense } from 'react';

const ReactPaginate = lazy(() => import('react-paginate'));

const Pagination = ({ currentPage, pages, onPageChange }) => {

    const onChangeSelected = (selectedItem) => {
        onPageChange(selectedItem.selected + 1);
    };

    return (
        <nav aria-label="Page navigation example">
            <Suspense fallback={<div></div>}>
                <ReactPaginate
                    pageCount={pages}
                    pageRangeDisplayed={currentPage}
                    marginPagesDisplayed={1}

                    onPageChange={onChangeSelected}

                    breakLabel={
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">...</span>
                            </a>
                        </li>
                    }
                    breakClassName={'break-me'}
                    containerClassName={'pagination btn'}
                    activeClassName={'active'}

                    pageClassName={'page-item'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}

                    pageLinkClassName={'page-link'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}

                    disabledClassName={'disabled'}
                    previousLabel={<span aria-hidden="true">&laquo;</span>}
                    nextLabel={<span aria-hidden="true">&raquo;</span>}
                />
            </Suspense>
        </nav>
    );
};

export default Pagination;