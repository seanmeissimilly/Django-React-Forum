import { useEffect, useState } from "react";
import Suggestion from "./Suggestion.jsx";
import { useDispatch, useSelector } from "react-redux";
import { suggestionList, suggestionDelete } from "../redux/suggestionSlice.js";
import { userList } from "../redux/userSlice.js";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { AiFillPlusSquare } from "react-icons/ai";
import { useSpring, animated } from "react-spring";
import { formatDate } from "../utils/dateUtils.js";
import Modal from "./Modal";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";

const Suggestions = () => {
  const URL = import.meta.env.VITE_BACKEND;

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Número de elementos por página

  const { suggestions, suggestionInfo, error, loading } = useSelector(
    (state) => state.suggestion
  );

  const { users, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(suggestionList({ token: userInfo.token }));

      dispatch(userList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo, suggestionInfo, error]);

  const filteredSuggestions = Filter({
    items: suggestions,
    search,
  });

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(suggestionDelete({ id: deleteId, token: userInfo.token }));
    setShowModal(false);
  };

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  const scale = useSpring({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    delay: 500,
  });

  const renderSuggestions = () => {
    const sortedSuggestions = filteredSuggestions.sort((a, b) => b.id - a.id);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedSuggestions.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems.map((suggestion) => {
      const user = users.find((user) => user.user_name === suggestion.user);

      return (
        <Suggestion
          key={suggestion.id}
          id={suggestion.id}
          title={suggestion.title}
          body={suggestion.body}
          user={suggestion.user}
          email={user ? user.email : ""}
          userInfo={userInfo}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          resolved={suggestion.resolved}
          date={formatDate(suggestion.date)}
          onDelete={() => handleDelete(suggestion.id)}
        />
      );
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onConfirm={confirmDelete}>
          <p>¿Estás seguro de que deseas borrar esta queja y sugerencia?</p>
          <p>Esta acción no se puede deshacer.</p>
        </Modal>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          <div className="mb-3 mt-12 mr-3 flex justify-end">
            <animated.input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Buscar"
              className="block min-w-0 rounded border border-solid bg-transparent px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:z-[3] focus:border-primary dark:border-neutral-600 dark:text-neutral-800 dark:focus:border-primary"
              id="search"
              style={{
                ...fadeIn,
                ...scale,
                color: "black",
                backgroundColor: "white",
                borderColor: "#444",
              }}
            />
          </div>
          <div className="container mx-auto p-4 mb-16">
            <div className="mb-8 flex justify-start">
              <a
                href="/suggestions/createSuggestion"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
                title="Añadir Queja o Sugerencia"
              >
                <AiFillPlusSquare
                  className="text-green-cujae hover:text-gray-900"
                  size={30}
                />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderSuggestions()}
            </div>

            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredSuggestions.length}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Suggestions;
