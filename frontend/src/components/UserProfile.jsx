import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userSolo } from "../redux/userSlice.js";
import { blogList } from "../redux/blogSlice";
import Messages from "./Messages";
import Loader from "./Loader";
import { formatDate } from "../utils/dateUtils.js";
import { Button } from "@material-tailwind/react";
import { FaUser, FaEnvelope, FaUserTag, FaInfoCircle } from "react-icons/fa";
import { getRole } from "../utils/roleUtils.js";

export default function UserProfile() {
  const URL = import.meta.env.VITE_BACKEND;
  const { id } = useParams();

  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog);
  const { error: errorBlog, loading: blogLoading, blogs } = blog;

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo, userOnly } = user;

  useEffect(() => {
    dispatch(userSolo({ id, token: userInfo.token }));
    dispatch(blogList({ token: userInfo.token }));
  }, [dispatch, id, userInfo]);

  return (
    <>
      {blogLoading && <Loader />}
      {errorBlog && <Messages>{errorBlog}</Messages>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <img
                className="h-40 w-40 rounded-full mx-auto"
                src={`${URL}${userOnly.image}`}
                alt=""
              />

              <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
                {userOnly.user_name}
                {userInfo.role === "admin" && (
                  <Button
                    size="sm"
                    className="ml-4 bg-green-cujae hover:bg-teal-900 focus:ring-teal-800 normal-case"
                    onClick={() =>
                      (window.location.href = `/userProfile/editProfile/${id}`)
                    }
                  >
                    Editar Perfil
                  </Button>
                )}
              </h3>

              <p className="mt-1 text-sm text-gray-500 text-left">
                Información de Usuario
              </p>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaUser className="mr-2" /> Nombre de Usuario
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userOnly.user_name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaEnvelope className="mr-2" /> Correo Electrónico
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <a
                      href={`mailto:${userOnly.email}`}
                      className="text-blue-500 underline"
                    >
                      {userOnly.email}
                    </a>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaUserTag className="mr-2" /> Rol de Usuario
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {getRole(userOnly)}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FaInfoCircle className="mr-2" /> Acerca de ti
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {userOnly.bio}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <h3 className="mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            -- Publicaciones --
          </h3>

          {blogs.map((blog) => (
            <>
              {userOnly.user_name === blog.user && (
                <div className="py-20 bg-gray-200">
                  <div className=" px-10">
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden md:max-w-lg">
                      <div className="md:flex">
                        <div className="w-full">
                          <div
                            key={blog.id}
                            className="flex justify-between items-center m-8"
                          >
                            <div className="flex items-center">
                              <img
                                src={`${URL}${userOnly.image}`}
                                className="rounded-full w-12 h-12"
                                alt=""
                              />
                              <div className="ml-3">
                                <span className="font-bold">{blog.user}</span>
                              </div>
                            </div>
                          </div>

                          <img
                            src={`${URL}${blog.image}`}
                            className="w-full object-cover rounded-md object-center"
                          />

                          <div className="p-4 flex justify-start items-center text-xl">
                            <p className="font-bold text-start">{blog.title}</p>
                          </div>

                          <div className="p-4 flex justify-between items-center">
                            <p>{blog.body}</p>
                          </div>

                          <div className="p-4 flex justify-between items-center">
                            <div className="flex flex-row">
                              <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                {formatDate(blog.date)}
                              </p>
                            </div>
                            <div className="flex flex-row items-center">
                              <Button
                                variant="filled"
                                className="group relative flex justify-center rounded-md py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2 normal-case bg-green-cujae hover:bg-teal-900 focus:ring-teal-800"
                                onClick={() =>
                                  (window.location.href = `/forum/soloBlog/${blog.id}`)
                                }
                              >
                                Ver más
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
}
