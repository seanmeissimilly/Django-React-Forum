import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  multimediaList,
  multimediaDelete,
  multimediaclassificationList,
} from "../redux/multimediaSlice.js";
import { userList } from "../redux/userSlice.js";
import Video from "./Video.jsx";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { AiFillPlusSquare } from "react-icons/ai";
import Select from "react-select";
import makeAnaimated from "react-select/animated";
import { useSpring, animated } from "react-spring";
import { formatDate } from "../utils/dateUtils.js";
import Modal from "./Modal";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";

const Videos = () => {
  const URL = import.meta.env.VITE_BACKEND;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Número de elementos por página
  const [classificationSelected, setClassificationSelected] = useState([]);
  const animatedComponents = makeAnaimated();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [render, setRender] = useState(false);

  const {
    multimedias,
    multimediaclassification,
    multimediaInfo,
    error,
    loading,
  } = useSelector((state) => state.multimedia);
  const { users, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(multimediaList({ token: userInfo.token }));
      dispatch(multimediaclassificationList({ token: userInfo.token }));
      dispatch(userList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo, multimediaInfo, error, render]);

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(multimediaDelete({ id: deleteId, token: userInfo.token }));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setDeleteId(null);
    setRender(!render);
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "200px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e0e0e0",
    }),
  };

  const filteredMultimedias = Filter({
    items: multimedias,
    classificationSelected,
    search,
    classificationKey: "multimediaclassification",
  });

  const renderMultimedias = () => {
    const sortedMultimedia = filteredMultimedias.sort((a, b) => a.id - b.id);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedMultimedia.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    return currentItems.map((video) => {
      const user = users.find((user) => user.user_name === video.user);
      const classification = multimediaclassification.find(
        (classification) => classification.id === video.multimediaclassification
      );

      return (
        <Video
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          classification={
            classification
              ? String(classification.description)
              : String(video.multimediaclassification)
          }
          user={video.user}
          email={user ? user.email : ""}
          userInfo={userInfo}
          userImage={user ? `${URL}${user.image}` : ""}
          userRole={userInfo ? userInfo.role : "reader"}
          data={video.data}
          date={formatDate(video.date)}
          onDelete={() => handleDelete(video.id)}
          is_local={video.is_local}
          external_url={video.external_url}
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
        <Modal onClose={cancelDelete} onConfirm={confirmDelete}>
          <p>¿Estás seguro de que deseas borrar este video?</p>
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
            <div className="ml-1">
              <Select
                isMulti
                placeholder="Clasificación"
                options={multimediaclassification.map((type) => ({
                  value: type.id,
                  label: type.description,
                }))}
                onChange={(e) => setClassificationSelected(e)}
                components={animatedComponents}
                styles={customStyles}
                className="w-full rounded border bg-transparent text-base font-normal text-neutral-700 dark:border-neutral-600 dark:text-neutral-800"
              />
            </div>
          </div>
          <div className="container mx-auto p-4 mb-16">
            {["admin", "editor"].includes(userInfo.role) && (
              <div className="mb-8 flex justify-start">
                <a
                  href="/videos/createVideo"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                  title="Añadir Video"
                >
                  <AiFillPlusSquare
                    className="text-green-cujae hover:text-gray-900"
                    size={30}
                  />
                </a>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderMultimedias()}
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredMultimedias.length}
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

export default Videos;
