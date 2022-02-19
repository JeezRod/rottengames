import React from "react";
import GridView from "../GridView";
import ReactPaginate from 'react-paginate';

function Games() {
  //Page number
  const [page, setPage] = React.useState(1);

  const handlePageClick = (event) => {
    console.log(event.selected)
    setPage(event.selected+1)
  };

  return (
      <div className="Games">
        <GridView page = {page}></GridView>

        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={5}
        pageCount={25}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
      
  );
}

export default Games;