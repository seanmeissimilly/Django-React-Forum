import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import Messages from "./Messages";
import user_icon from "../media/user.png";
import { toast } from "react-hot-toast";
import { userRegister } from "../redux/userSlice.js";
import { getCaptcha } from "../redux/captchaSlice.js";
import PasswordChecklist from "react-password-checklist";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Register() {
  const URL = import.meta.env.VITE_BACKEND;
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [openpassword, setOpenPassword] = useState(false);
  const [openconfirmpassword, setOpenConfirmPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { userInfo, loading, error } = user;

  const captcha = useSelector((state) => state.captcha);
  const {
    captcha_url,
    loading: loading_captcha,
    error: error_captcha,
  } = captcha;

  const navigate = useNavigate();
  const path = "/forum";

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  const handleshowpassword = () => {
    setOpenPassword(!openpassword);
  };
  const handleshowconfirmpassword = () => {
    setOpenConfirmPassword(!openconfirmpassword);
  };

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      //todo Redirigo la página y mando una notificación a la pantalla.
      navigate(path),
        toast.success("Registro Satisfactorio", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
          },
        });
    }
    dispatch(getCaptcha());
  }, [userInfo, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //todo: Reviso que se cumplan las condiciones para la contraseña
    if (isValid) {
      dispatch(
        userRegister({
          user_name,
          email,
          password,
          captcha_value: captchaValue,
        })
      );
    }
  };

  //validar el correo electrónico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      {(error && <Messages>{error}</Messages>) ||
        (error_captcha && <Messages>{error_captcha}</Messages>)}
      {loading || loading_captcha ? (
        <Loader />
      ) : (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mb-10">
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="white"
              className="mb-4 grid h-28 place-items-center"
            >
              <img className="mx-auto h-12 w-auto" src={user_icon} alt="" />
              <Typography variant="h4" color="black">
                Registre su cuenta
              </Typography>
            </CardHeader>

            <form onSubmit={submitHandler} action="#" method="POST">
              <CardBody className="flex flex-col gap-4">
                <Input
                  label="Nombre de Usuario"
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                  placeholder="Nombre de usuario"
                  size="lg"
                />

                <Input
                  label="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                  placeholder="Correo Electrónico"
                  size="lg"
                />
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
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                    placeholder="Contraseña"
                    size="lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-2xl">
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
                    name="password"
                    type={openconfirmpassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-teal-800 sm:text-sm"
                    placeholder="Confirmar Contraseña"
                    size="lg"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-2xl">
                    {!openconfirmpassword ? (
                      <AiFillEye onClick={handleshowconfirmpassword} />
                    ) : (
                      <AiFillEyeInvisible onClick={handleshowconfirmpassword} />
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
                      specialChar: "La contraseña tiene caracteres especiales.",
                      number: "La contraseña tiene un número.",
                      capital: "La contraseña tiene una letra mayúscula.",
                      match: "Las contraseñas coinciden.",
                      lowercase: "La contraseña tiene una letra minúscula.",
                      notEmpty: "La contraseña no está en blanco.",
                    }}
                    onChange={(e) => setIsValid(e)}
                  />
                </div>
                <div className="">
                  {captcha_url && (
                    <div>
                      <img
                        src={`${URL}${captcha_url}`}
                        alt="CAPTCHA"
                        className="block mx-auto mb-3"
                      />
                      <Input
                        type="text"
                        label="Ingrese el CAPTCHA"
                        value={captchaValue}
                        onChange={(e) => setCaptchaValue(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {isValid &&
                    isValidEmail(email) &&
                    password !== "" &&
                    user_name !== "" ? (
                      <FaUnlock
                        className="h-6 w-6 text-indigo-200 group-hover:text-gray-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaLock
                        className="h-6 w-6 text-indigo-200 group-hover:text-gray-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  Registrarse
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  ¿Ya tienes una cuenta?
                  <Typography
                    as="a"
                    href="/login"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                  >
                    Entrar
                  </Typography>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
