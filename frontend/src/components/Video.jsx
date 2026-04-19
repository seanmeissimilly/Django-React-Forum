import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import YouTube from "react-youtube";

const Video = ({
  id,
  title,
  description,
  classification,
  user,
  userInfo,
  userImage,
  data,
  userRole,
  onDelete,
  date,
  email,
  is_local,
  external_url,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const videoRef = useRef(null);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleDelete = () => {
    if (videoRef.current) {
      videoRef.current.pause = true;
      videoRef.current.src = "";
      videoRef.current.preload = "none";
    }

    onDelete();
  };

  const getYouTubeVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  const videoId = is_local ? null : getYouTubeVideoId(external_url);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden mb-2 flex flex-col justify-between transition-transform transform hover:scale-105 mx-1">
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
            {is_local ? (
              <video
                ref={videoRef}
                className="h-full w-full rounded-lg"
                controls
                src={data}
                preload="none"
              >
                Tu navegador no soporta la etiqueta de video.
              </video>
            ) : (
              <YouTube
                videoId={videoId}
                opts={opts}
                className="h-full w-full rounded-lg"
              />
            )}
          </div>
          <div className="mt-1">
            <span className="text-gray-700">Clasificación: </span>
            <span className="text-gray-900 font-bold">{classification}</span>
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
              onClick={() => (window.location.href = `/videos/editVideo/${id}`)}
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
              onClick={handleDelete}
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

Video.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  userInfo: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  external_url: PropTypes.string.isRequired,
  is_local: PropTypes.bool.isRequired,
};

export default Video;
