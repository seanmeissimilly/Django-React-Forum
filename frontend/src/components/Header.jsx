import { Fragment } from "react";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import {
  Popover,
  PopoverGroup,
  Transition,
  MenuButton,
  MenuItem,
  PopoverPanel,
  MenuItems,
  Menu,
  PopoverButton,
} from "@headlessui/react";
import { AiFillProduct } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import logo_app from "../media/logo app.png";
import { MdForum } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import {
  FaChartBar,
  FaFileAlt,
  FaUserCircle,
  FaCog,
  FaPowerOff,
} from "react-icons/fa";

import { MdVideoLibrary } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { userLogout } from "../redux/userSlice";
import { Avatar, Button } from "@material-tailwind/react";
import Breadcrumb from "./Breadcrumb";
import { toast } from "react-hot-toast";

export default function Header() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const URL = import.meta.env.VITE_BACKEND;
  const user = useSelector((state) => state.user);

  const { userInfo } = user;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout(userInfo));
    toast.error("Sección Cerrada", {
      position: "bottom-right",
      style: {
        background: "#101010",
        color: "#fff",
      },
    });
  };

  const isEmpty = (obj) => JSON.stringify(obj) === "{}";

  const NavigationButton = ({ href, title, icon: Icon }) => (
    <Button
      onClick={() => (window.location.href = href)}
      className="text-sm font-medium text-green-cujae hover:text-gray-900"
      title={title}
      variant="text"
    >
      <Icon size={26} />
    </Button>
  );

  NavigationButton.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  };

  const NavigationButtons = () => {
    return (
      <>
        <NavigationButton href="/forum" title="Foro" icon={MdForum} />
        <NavigationButton
          href="/documents"
          title="Documentos"
          icon={IoDocumentSharp}
        />
        <NavigationButton href="/videos" title="Videos" icon={MdVideoLibrary} />
        <NavigationButton
          href="/tools"
          title="Herramientas"
          icon={AiFillProduct}
        />
        <NavigationButton
          href="/suggestions"
          title="Quejas y Sugerencias"
          icon={RiMessage2Fill}
        />
      </>
    );
  };

  const UserMenu = ({ userInfo, logoutHandler }) => (
    <Menu as="div" className="relative ml-3">
      <div className="flex items-center">
        <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Abrir Menú de Usuario</span>
          <Avatar
            className="border-2 border-white hover:z-10 focus:z-10"
            src={`${URL}${userInfo.image}`}
            alt=""
          />
        </MenuButton>
        <div className="mx-2 flex flex-col">
          {/* Para mostrar los usuarios con el Rol de Admin de la Api */}
          {userInfo.is_superuser && userInfo.is_staff && (
            <span className="text-black text-xs sm:text-sm">Admin API</span>
          )}
          {/** Para mostrar el Rol del usuario */}
          <span className="text-black text-xs sm:text-sm">
            {userInfo.role === "admin"
              ? "Admin"
              : userInfo.role === "editor"
              ? "Editor"
              : "Lector"}
          </span>
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem>
            {({ isActive }) => (
              <Button
                variant="text"
                color="gray"
                className={classNames(
                  isActive ? "bg-gray-100" : "",
                  "w-full text-left px-4 py-2 text-sm text-gray-700 normal-case flex items-center"
                )}
                onClick={() => (window.location.href = "/miPerfil")}
              >
                <FaUserCircle className="h-5 w-5 mr-2" />
                Mi Perfil
              </Button>
            )}
          </MenuItem>
          {(userInfo.role === "editor" || userInfo.role === "admin") && (
            <>
              <MenuItem>
                {({ isActive }) => (
                  <Button
                    variant="text"
                    color="gray"
                    className={classNames(
                      isActive ? "bg-gray-100" : "",
                      "w-full text-left px-4 py-2 text-sm text-gray-700 normal-case flex items-center"
                    )}
                    onClick={() => (window.location.href = "/reports")}
                  >
                    <FaFileAlt className="h-5 w-5 mr-2" />
                    Reportes
                  </Button>
                )}
              </MenuItem>
              <MenuItem>
                {({ isActive }) => (
                  <Button
                    variant="text"
                    color="gray"
                    className={classNames(
                      isActive ? "bg-gray-100" : "",
                      "w-full text-left px-4 py-2 text-sm text-gray-700 normal-case flex items-center"
                    )}
                    onClick={() => (window.location.href = "/chart")}
                  >
                    <FaChartBar className="h-5 w-5 mr-2" />
                    Gráfico
                  </Button>
                )}
              </MenuItem>
            </>
          )}
          {userInfo.role === "admin" &&
            userInfo.is_superuser &&
            userInfo.is_staff && (
              <MenuItem>
                {({ isActive }) => (
                  <Button
                    variant="text"
                    color="gray"
                    className={classNames(
                      isActive ? "bg-gray-100" : "",
                      "w-full text-left px-4 py-2 text-sm text-gray-700 normal-case flex items-center"
                    )}
                    onClick={() => window.open(`${URL}${/admin/}`, "_blank")}
                  >
                    <FaCog className="h-5 w-5 mr-2" />
                    Administración
                  </Button>
                )}
              </MenuItem>
            )}
          <MenuItem>
            {({ isActive }) => (
              <Button
                variant="text"
                color="gray"
                className={classNames(
                  isActive ? "bg-gray-100" : "",
                  "w-full text-left px-4 py-2 text-sm text-gray-700 normal-case flex items-center"
                )}
                onClick={logoutHandler}
              >
                <FaPowerOff className="h-5 w-5 mr-2" />
                Salir
              </Button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );

  UserMenu.propTypes = {
    userInfo: PropTypes.object.isRequired,
    logoutHandler: PropTypes.func.isRequired,
  };

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" title="Página Inicial">
              <img className="h-12 w-auto sm:h-12" src={logo_app} alt="Logo" />
            </a>
          </div>
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Breadcrumb />
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <PopoverButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800">
              <span className="sr-only">Abrir Menú</span>
              <FaBars className="h-6 w-6 text-gray-500" aria-hidden="true" />
            </PopoverButton>
          </div>

          {!isEmpty(userInfo) ? (
            <PopoverGroup as="nav" className="hidden space-x-4 md:flex">
              <NavigationButtons />
              <UserMenu userInfo={userInfo} logoutHandler={logoutHandler} />
            </PopoverGroup>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Button
                variant="text"
                color="blue"
                className="w-32 whitespace-nowrap text-base font-medium text-gray-600 hover:text-gray-900 bg-gray-200 normal-case px-4 py-2"
                onClick={() => (window.location.href = "/login")}
              >
                Entrar
              </Button>
              <Button
                variant="filled"
                color="indigo"
                className="w-32 ml-4 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-cujae px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-900 normal-case"
                onClick={() => (window.location.href = "/register")}
              >
                Registrarse
              </Button>
            </div>
          )}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <PopoverPanel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="space-y-6 py-6 px-5">
              {!isEmpty(userInfo) ? (
                <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                  <NavigationButtons />
                  <UserMenu userInfo={userInfo} logoutHandler={logoutHandler} />
                </div>
              ) : (
                <div>
                  <Button
                    variant="filled"
                    color="indigo"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-cujae px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-900"
                    onClick={() => (window.location.href = "/register")}
                  >
                    Registrarse
                  </Button>

                  <Button
                    variant="filled"
                    color="indigo"
                    className="mt-1 flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 bg-gray-200 normal-case"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Entrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
