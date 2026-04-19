import PropTypes from "prop-types";
import { Button, IconButton } from "@material-tailwind/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePrevPage,
  handleNextPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageButtons = 16;

  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxPageButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxPageButtons);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxPageButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-4 max-w-md mx-auto">
      <Button
        variant="text"
        className="flex items-center gap-2 normal-case"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <AiOutlineLeft className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2 mx-4">
        {getPageNumbers().map((page) => (
          <IconButton
            key={page}
            variant={currentPage === page ? "filled" : "text"}
            color="gray"
            onClick={() => setCurrentPage(page)}
            className={`${
              currentPage === page
                ? "bg-green-cujae text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 normal-case"
        onClick={handleNextPage}
        disabled={currentPage * itemsPerPage >= totalItems}
      >
        Siguiente <AiOutlineRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
