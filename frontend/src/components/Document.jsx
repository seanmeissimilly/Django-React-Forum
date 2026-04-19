import { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

const Document = ({
  id,
  title,
  author,
  description,
  type,
  classification,
  user,
  userInfo,
  userImage,
  data,
  userRole,
  onDelete,
  date,
  email,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-2 flex flex-col justify-between transition-transform transform hover:scale-105">
      <div className="p-4 flex-grow">
        <h2 className="mt-1 text-md font-semibold text-gray-900">{title}</h2>
        <div
          className={`mt-2 text-gray-600 whitespace-pre-line ${
            showFullDescription ? "" : "max-h-20 overflow-hidden"
          }`}
        >
          {description}
        </div>
        {description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-600 hover:text-blue-900 mt-1"
          >
            {showFullDescription ? "Ver menos" : "Ver más"}
          </button>
        )}
        <div className="mt-3">
          <div className="mt-1">
            <span className="text-gray-700">Autor(es): </span>
            <span className="text-gray-900 font-bold">{author}</span>
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Clasificación: </span>
            <span className="text-gray-900 font-bold">{classification}</span>
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Tipo: </span>
            <span className="text-gray-900 font-bold">{type}</span>
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Fecha de subida: </span>
            <span className="text-gray-900 font-bold">{date}</span>
          </div>
          <div className="mt-3 flex items-center">
            <span className="text-gray-700">Subido por: </span>
            <img
              src={userImage}
              className="rounded-full mx-2"
              width="30"
              alt="User"
            />
            <span className="font-bold">{user}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <Button
          variant="text"
          className="relative group text-green-cujae hover:text-teal-900"
          onClick={() => window.open(data, "_blank")}
        >
          <FaDownload size={15} />
          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
            Descargar
          </span>
        </Button>
        {(userRole === "admin" ||
          (userRole === "editor" && email === userInfo.email)) && (
          <div className="flex space-x-2">
            <Button
              color="blue"
              variant="text"
              className="relative group"
              onClick={() =>
                (window.location.href = `/documents/editDocument/${id}`)
              }
            >
              <FaEdit size={15} />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                Editar
              </span>
            </Button>
            <Button
              color="red"
              variant="text"
              className="relative group"
              onClick={onDelete}
            >
              <FaTrash size={15} />
              <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                Borrar
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

Document.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  data: PropTypes.string,
  userRole: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
};

export default Document;
