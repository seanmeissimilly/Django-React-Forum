import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import {
  documentDetails,
  documentUpdate,
  documentCreate,
  documentclassificationList,
  documenttypesList,
} from "../redux/documentSlice";
import { toast } from "react-hot-toast";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { handleFileChange } from "../utils/fileUtils.js";

export default function DocumentForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [type, setTypeId] = useState(1);
  const [classification, setClassificationId] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const {
    documentInfo,
    error,
    loading,
    documenttypes,
    documentclassification,
  } = useSelector((state) => state.document);

  const { userInfo } = useSelector((state) => state.user);

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";
  const path = "/documents";

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      author,
      description,
      documenttypes: type,
      documentclassification: classification,
      token: userInfo.token,
    };

    if (data && data instanceof File) {
      payload.data = data;
    }

    if (id) {
      payload.id = id;
      dispatch(documentUpdate(payload));
    } else {
      dispatch(documentCreate(payload));
    }

    navigate(path),
      toast.success(id ? "Documento Editado" : "Documento Añadido", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
  };

  useEffect(() => {
    dispatch(documenttypesList({ token: userInfo.token }));
    dispatch(documentclassificationList({ token: userInfo.token }));

    if (id && Number(id) !== documentInfo.id) {
      dispatch(documentDetails({ id, token: userInfo.token }));
    } else {
      if (!isEmpty(documentInfo)) {
        setTitle(documentInfo.title);
        setAuthor(documentInfo.author);
        setDescription(documentInfo.description);
        setTypeId(documentInfo.documenttypes);
        setClassificationId(documentInfo.documentclassification);
        setData(documentInfo.data);
      }
    }
  }, [dispatch, id, userInfo, documentInfo]);

  const maxTitleLength = 150;
  const maxDescriptionLength = 500;

  return (
    <>
      {loading && <Loader />}
      {error && <Messages>{error}</Messages>}
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="shadow sm:overflow-hidden sm:rounded-md mb-20 mt-20"
        >
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            {id ? "Editar Documento" : "Crear Documento"}
          </h2>
          <div className="space-y-6 px-4 py-5 sm:p-6">
            <div>
              <Input
                label="Título"
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={
                  "w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500 "
                }
                placeholder="Escribe un título"
                autoFocus
                required
                error={title.length > maxTitleLength}
              />
              <p
                className={`text-sm ${
                  title.length > maxTitleLength
                    ? "text-red-500"
                    : "text-gray-500"
                } mt-2`}
              >
                {title.length}/{maxTitleLength}
              </p>
            </div>

            <Textarea
              label="Autor(es)"
              type="text"
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
              autoFocus
            />

            <div>
              <Textarea
                label="Resumen"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
                className={
                  "w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500 "
                }
                error={description.length > maxDescriptionLength}
              />
              <p
                className={`text-sm ${
                  description.length > maxDescriptionLength
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {description.length}/{maxDescriptionLength}
              </p>
            </div>
            <div>
              <Input
                label="Archivo"
                type="file"
                name="file"
                onChange={(e) =>
                  handleFileChange(e, setData, [
                    "application/pdf",
                    "application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "text/plain",
                    "application/x-tex",
                    "application/vnd.oasis.opendocument.text",
                    "application/vnd.oasis.opendocument.spreadsheet",
                    "application/vnd.oasis.opendocument.presentation",
                    "application/x-ms",
                    "application/vnd.ms-",
                    "application/vnd.openxmlformats-officedocument",
                    "application/vnd.wordperfect",
                    "application/onenote",
                    "application/msexcel",
                    "application/mspowerpoint",
                    "application/msaccess",
                    "application/wordperfect",
                    "application/epub+zip",
                  ])
                }
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
                //Para que sea requerido cuando se está creando un documento.
                required={!id}
                accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.tex,.odt,.ods,.odp,.ms,.wpd,.one,.ppt,.accdb,.epub,"
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo
              </label>
              <select
                name="type"
                onChange={(e) => setTypeId(e.target.value)}
                value={type}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
              >
                {documenttypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="classification"
                className="block text-sm font-medium text-gray-700"
              >
                Clasificación
              </label>
              <select
                name="classification"
                onChange={(e) => setClassificationId(e.target.value)}
                value={classification}
                className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none focus:border-indigo-500"
              >
                {documentclassification.map((classification) => (
                  <option key={classification.id} value={classification.id}>
                    {classification.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
