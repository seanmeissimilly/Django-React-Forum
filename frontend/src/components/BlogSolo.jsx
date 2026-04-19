import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import {
  createComment,
  updateComment,
  blogDetails,
  createCommentReset,
  deleteComment,
} from "../redux/blogSlice.js";
import { userList } from "../redux/userSlice.js";
import {
  BsFillTrashFill,
  BsFillCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Textarea, Button } from "@material-tailwind/react";
import Modal from "./Modal";
import { formatDate } from "../utils/dateUtils.js";

export default function BlogSolo() {
  const URL = import.meta.env.VITE_BACKEND;
  const { id } = useParams();

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [editCommentText, setEditCommentText] = useState("");

  const blog = useSelector((state) => state.blog);
  const { success_comment, loading, error, blogInfo } = blog;

  const user = useSelector((state) => state.user);
  const { users, userInfo } = user;

  useEffect(() => {
    if (success_comment) {
      setText("");
      dispatch(createCommentReset());
    }
    dispatch(userList({ token: userInfo.token }));
    dispatch(blogDetails({ id: id, token: userInfo.token }));
  }, [dispatch, userInfo, id, success_comment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComment({ id, text, token: userInfo.token }));
  };

  const deleteHandlerComment = (comment_id) => {
    setShowModal(true);
    setDeleteId(comment_id);
  };

  const confirmDelete = () => {
    dispatch(deleteComment({ comment_id: deleteId, token: userInfo.token }));
    setShowModal(false);
  };

  const handleEditClick = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  const handleUpdateClick = () => {
    dispatch(
      updateComment({
        comment_id: editCommentId,
        id,
        text: editCommentText,
        token: userInfo.token,
      })
    );
    setEditCommentId(null);
    setEditCommentText("");
  };

  const maxTextLength = 500;

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onConfirm={confirmDelete}>
          <p>¿Estás seguro de que deseas borrar este comentario?</p>
          <p>Esta acción no se puede deshacer.</p>
        </Modal>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 mb-14">
          <div>
            <div className="py-10 bg-gray-200">
              <div className="py-8">
                <div className="max-w-md mx-auto  bg-white shadow-lg rounded-md overflow-hidden md:max-w-lg">
                  <div className="md:flex">
                    <div className="w-full">
                      <div className="flex justify-between items-center m-8">
                        <div className="flex flex-row items-center">
                          {users &&
                            users.map((u) => (
                              <div key={u.id}>
                                {u.user_name === blogInfo.user && (
                                  <>
                                    <div className="flex flex-row items-center ml-2">
                                      <img
                                        src={`${URL}${u.image}`}
                                        className="rounded-full"
                                        width="40"
                                      />
                                      <span className="font-bold mr-1 ml-2">
                                        {blogInfo.user}
                                      </span>
                                      <small className="h-1 w-1 bg-gray-300 rounded-full mr-1 mt-1"></small>
                                      <a
                                        style={{ textDecoration: "none" }}
                                        href={`/userProfile/${u.id}`}
                                        className="text-blue-600 text-sm hover:text-blue-800"
                                      >
                                        Ver Perfil
                                      </a>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <img
                        src={`${URL}${blogInfo.image}`}
                        className="w-full rounded-md object-cover object-center"
                      />
                      <div className="p-4 flex justify-center items-center text-xl">
                        <p className="font-bold text-center">
                          {blogInfo.title}
                        </p>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <p>{blogInfo.body}</p>
                      </div>

                      <div className="p-4 flex justify-between items-center">
                        <div className="flex flex-row items-center ">
                          <p className="mb-2 pl-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                            {formatDate(blogInfo.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-6 mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">
              Comentarios
            </h2>

            <form
              onSubmit={submitHandler}
              className="bg-white shadow-md rounded-lg p-4 max-w-lg mx-auto"
            >
              <div className="mb-4">
                <Textarea
                  label="Texto del Comentario"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  id="text"
                  rows={2}
                  className="relative p-2 block w-full appearance-none rounded-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                  autoFocus
                  error={text.length > maxTextLength}
                />
                <p
                  className={`text-sm ${
                    text.length > maxTextLength
                      ? "text-red-500"
                      : "text-gray-500"
                  } mt-1`}
                >
                  {text.length}/{maxTextLength}
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2"
                >
                  Enviar
                </button>
              </div>
            </form>
            {blogInfo.comments &&
              [...blogInfo.comments]
                .sort((a, b) => a.id - b.id)
                .map((comment) => (
                  <div key={comment.id} className="flex justify-center">
                    {users &&
                      users.map((user) => (
                        <div key={user.id} className="py-4">
                          {user.user_name === comment.user && (
                            <div className="py-4">
                              <div className="border border-gray-300 p-4 rounded-lg max-w-lg w-full bg-white shadow-md">
                                <div className="flex items-center mb-4">
                                  <img
                                    className="object-cover w-12 h-12 rounded-full shadow"
                                    src={`${URL}${user.image}`}
                                    alt="Person"
                                  />
                                  <div className="ml-4">
                                    <p className="text-lg font-bold">
                                      {comment.user}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      {formatDate(comment.date)}
                                    </p>
                                  </div>
                                </div>
                                {editCommentId === comment.id ? (
                                  <div>
                                    <Textarea
                                      label="Editar Comentario"
                                      value={editCommentText}
                                      onChange={(e) =>
                                        setEditCommentText(e.target.value)
                                      }
                                      rows={6}
                                      className="mb-4 h-40 w-full"
                                      error={
                                        editCommentText.length > maxTextLength
                                      }
                                    />
                                    <p
                                      className={`text-sm ${
                                        editCommentText.length > maxTextLength
                                          ? "text-red-500"
                                          : "text-gray-500"
                                      } mt-1`}
                                    >
                                      {editCommentText.length}/{maxTextLength}
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                      <Button
                                        color="red"
                                        onClick={() => setEditCommentId(null)}
                                        className="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 normal-case"
                                      >
                                        <BsXCircleFill size={20} />
                                        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                                          Cancelar
                                        </span>
                                      </Button>
                                      <Button
                                        onClick={handleUpdateClick}
                                        className="group relative flex justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 normal-case hover:bg-teal-900"
                                      >
                                        <BsFillCheckCircleFill size={20} />
                                        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                                          Actualizar
                                        </span>
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-sm tracking-wide text-gray-800 mb-4">
                                    {comment.text}
                                  </p>
                                )}
                                {(userInfo.role === "admin" ||
                                  userInfo.email === user.email) && (
                                  <div className="flex justify-end space-x-2">
                                    {editCommentId !== comment.id && (
                                      <>
                                        <Button
                                          color="indigo"
                                          className="group relative flex justify-end rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
                                          onClick={() =>
                                            handleEditClick(comment)
                                          }
                                        >
                                          <AiFillEdit size={20} />
                                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                                            Editar
                                          </span>
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            deleteHandlerComment(comment.id)
                                          }
                                          className="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 normal-case"
                                        >
                                          <BsFillTrashFill size={20} />
                                          <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 normal-case">
                                            Borrar
                                          </span>
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
