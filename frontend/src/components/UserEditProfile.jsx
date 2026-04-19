import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { userUpdate, userSolo, userUpdateSolo } from "../redux/userSlice.js";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import PasswordChecklist from "react-password-checklist";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Avatar,
} from "@material-tailwind/react";
import { handleFileChange } from "../utils/fileUtils.js";

export default function UserEditProfile() {
  const URL_API = import.meta.env.VITE_BACKEND;

  const { id } = useParams();

  const api = axios.create({
    baseURL: `${URL_API}`,
  });
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [openpassword, setOpenPassword] = useState(false);
  const [openconfirmpassword, setOpenConfirmPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const path = id ? `/userProfile/${id}` : "/miPerfil";

  const handleshowpassword = () => {
    setOpenPassword(!openpassword);
  };
  const handleshowconfirmpassword = () => {
    setOpenConfirmPassword(!openconfirmpassword);
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { error, loading, userInfo, success, userOnly } = user;

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  useEffect(() => {
    const updateUserFields = (userData) => {
      setUserName(userData.user_name);
      setEmail(userData.email);
      setBio(userData.bio);
      setImageUrl(`${URL_API}${userData.image}`);
      setRole(userData.role);
    };

    if (id) {
      if (Number(id) !== userOnly.id) {
        dispatch(userSolo({ id, token: userInfo.token }));
      } else if (!isEmpty(userOnly)) {
        updateUserFields(userOnly);
      }
    } else {
      updateUserFields(userInfo);
    }
  }, [dispatch, userInfo, success, error, id, userOnly, URL_API]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (isValid) {
      const payload = {
        user_name,
        email,
        bio,
        password,
        token: userInfo.token,
        role,
        id: id ? userOnly.id : undefined,
      };

      const action = id ? userUpdateSolo : userUpdate;
      dispatch(action(payload));

      navigate(path);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    // Tipos de archivos permitidos
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/webp",
      "image/bmp",
      "image/avif",
      "image/svg+xml",
    ];

    // Validar el tipo de archivo
    if (!handleFileChange(e, setImageUrl, allowedTypes)) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", id ? userOnly.id : userInfo.id);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await api.post("/users/image/", formData, config);

      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error("Error subiendo imagen de perfil:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {loading || uploading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          {error && <Messages>{error}</Messages>}

          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-10">
            <Card className="w-full max-w-md">
              <CardHeader
                variant="gradient"
                color="white"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h4" color="black">
                  Editar Perfil
                </Typography>
              </CardHeader>

              <form onSubmit={submitHandler} action="#" method="POST">
                <CardBody className="flex flex-col gap-4">
                  <Input
                    label="Nombre de Usuario"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                    id="user_name"
                    name="user_name"
                    type="text"
                    autoComplete="username"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                    placeholder="Nombre de Usuario"
                    size="lg"
                  />

                  <Input
                    label="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                    placeholder="Correo Electrónico"
                    size="lg"
                  />

                  {userInfo.role === "admin" && (
                    <div className="mt-4">
                      <Select
                        value={role}
                        onChange={(e) => setRole(e)}
                        label="Rol"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                      >
                        <Option value="admin">Admin</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="reader">Lector</Option>
                      </Select>
                    </div>
                  )}

                  <Textarea
                    label={id ? "Acerca de" : "Acerca de ti"}
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    id="bio"
                    name="bio"
                    rows={3}
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                  />

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {id ? "Actualizar contraseña" : "Actualiza tu contraseña"}
                  </label>
                  <div className="relative">
                    <Input
                      label="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type={openpassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                      placeholder="Contraseña"
                      size="lg"
                    />
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl">
                      {!openpassword ? (
                        <AiFillEye onClick={handleshowpassword} />
                      ) : (
                        <AiFillEyeInvisible onClick={handleshowpassword} />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      label="Confirmar Contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="confirmpassword"
                      name="confirmpassword"
                      type={openconfirmpassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                      placeholder="Confirmar Contraseña"
                      size="lg"
                    />
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-2xl">
                      {!openconfirmpassword ? (
                        <AiFillEye onClick={handleshowconfirmpassword} />
                      ) : (
                        <AiFillEyeInvisible
                          onClick={handleshowconfirmpassword}
                        />
                      )}
                    </div>
                  </div>

                  <div className="my-8">
                    <PasswordChecklist
                      className=""
                      rules={[
                        "minLength",
                        "specialChar",
                        "number",
                        "capital",
                        "match",
                        "lowercase",
                        "notEmpty",
                      ]}
                      minLength={8}
                      value={password}
                      valueAgain={confirmPassword}
                      messages={{
                        minLength: "La contraseña tiene más de 8 caracteres.",
                        specialChar:
                          "La contraseña tiene caracteres especiales.",
                        number: "La contraseña tiene un número.",
                        capital: "La contraseña tiene una letra mayúscula.",
                        match: "Las contraseñas coinciden.",
                        lowercase: "La contraseña tiene una letra minúscula.",
                        notEmpty: "La contraseña no está en blanco.",
                      }}
                      onChange={(e) => setIsValid(e)}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    {imageUrl && (
                      <div className="mt-4">
                        <Avatar src={imageUrl} alt="avatar" size="xxl" />
                      </div>
                    )}
                    <div className="w-2/3 mx-4">
                      <Input
                        variant="static"
                        label="Escoger imagen de perfil"
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,.avif,.svg"
                        onChange={uploadFileHandler}
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                      />
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
                  >
                    Guardar Cambios
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
