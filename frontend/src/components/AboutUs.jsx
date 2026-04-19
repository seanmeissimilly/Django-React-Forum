import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { userList } from "../redux/userSlice";
import Messages from "./Messages";
import Loader from "./Loader";
import { Avatar, Drawer, Button, Typography } from "@material-tailwind/react";
import {
  FaInfoCircle,
  FaLaptopCode,
  FaBook,
  FaEnvelope,
  FaUserTag,
  FaUser,
} from "react-icons/fa";
import { getRole } from "../utils/roleUtils.js";

const About = ({ username, email, userImage, userRole }) => (
  <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
    <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center">
      <FaInfoCircle className="mr-2 inline-block" />
      <span className="inline-block">Contacto</span>
    </h2>
    <div className="mt-3 flex items-center">
      <span className="text-gray-600 flex items-center relative group">
        <FaUser className="mr-2" />
        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-3 px-2 normal-case">
          Usuario
        </span>
      </span>
      <Avatar src={userImage} className="rounded-full mx-2" alt={username} />
      <span className="font-bold text-gray-800">{username}</span>
    </div>
    <div className="mt-3 flex items-center">
      <span className="text-gray-600 flex items-center relative group">
        <FaUserTag className="mr-2" />
        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
          Rol
        </span>
      </span>
      <span className="text-black">{userRole}</span>
    </div>
    <div className="mt-3 flex items-center flex-wrap">
      <a
        href={`mailto:${email}`}
        className="text-blue-500 hover:underline flex items-center break-words relative group"
      >
        <FaEnvelope className="mr-2 text-gray-600" />
        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
          Correo
        </span>
        {email}
      </a>
    </div>
  </div>
);

About.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

const AboutUs = () => {
  const URL = import.meta.env.VITE_BACKEND;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, loading, users, userInfo } = user;
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    dispatch(userList({ token: userInfo.token }));
  }, [dispatch, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16 mt-12">
            {users
              ?.filter((user) => {
                const isAdmin = user.role === "admin";
                const isAdminAPI = user.is_superuser && user.is_staff;
                return isAdmin || isAdminAPI;
              })
              .map((user) => (
                <About
                  key={user.id}
                  username={user.user_name}
                  email={user.email}
                  userImage={user ? `${URL}${user.image}` : ""}
                  userRole={getRole(user)}
                />
              ))}
            <Drawer open={open} onClose={closeDrawer} className="p-4">
              <div className="mb-6 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  Desarrollado por:
                </Typography>
              </div>
              <Typography color="gray" className="mb-2 pr-4 font-normal">
                David Sean Meissimilly Frometa.
              </Typography>
              <div className="flex items-center mb-8 pr-4">
                <FaEnvelope className="h-5 w-5 mr-2 text-gray-600" />
                <a
                  href="mailto:seanmeissimilly@gmail.com"
                  className="text-gray-600"
                >
                  seanmeissimilly@gmail.com
                </a>
              </div>
              <div className="flex gap-2">
                {/*  Este botón solo sería visible para el Admin de la Api*/}
                {userInfo.is_admin && userInfo.is_staff && (
                  <Button
                    size="sm"
                    variant="outlined"
                    onClick={() => window.open(`${URL}${/docs/}`, "_blank")}
                    className="text-black normal-case flex items-center"
                  >
                    <FaBook className="h-5 w-5 mr-2" />
                    Documentación de la API
                  </Button>
                )}
              </div>
            </Drawer>
          </div>
          <div className="fixed bottom-16 right-4">
            <Button
              variant="outlined"
              size="sm"
              onClick={openDrawer}
              className="bg-blue-gray-200 hover:bg-blue-700 text-black normal-case flex items-center"
            >
              <FaLaptopCode className="h-5 w-5 mr-2" />
              Desarrollador
            </Button>
          </div>
        </div>
      )}
      <p className="fixed bottom-28 text-gray-600 text-center mx-auto bg-white p-4 w-full">
        Queda totalmente prohibida la reproducción parcial o total de los
        documentos que aquí se encuentran.
      </p>
    </>
  );
};

export default AboutUs;
