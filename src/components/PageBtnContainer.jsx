import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageButtonContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const prevPage = () => {
    changePage(page - 1);
  };
  const nextPage = () => {
    changePage(page + 1);
  };

  const pagesNumbers = Array.from(
    { length: numOfPages },
    (_, index) => index + 1
  );

  return (
    <Wrapper>
      <button className="prev-btn" disabled={page === 1} onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pagesNumbers.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => {
                changePage(+pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button
        className="next-btn"
        onClick={nextPage}
        disabled={numOfPages === page}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;
