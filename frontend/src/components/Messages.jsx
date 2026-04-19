import { FaBullhorn } from "react-icons/fa";
import PropTypes from "prop-types";
import { Alert, Collapse } from "@material-tailwind/react";

export default function Messages({ children }) {
  const getMessage = (message) => {
    switch (message) {
      case "Given token not valid for any token type":
        return "El token que has proporcionado ha expirado. Por favor, vuelve a iniciar sesión para continuar.";
      case "Network Error":
        return "Error de red, por favor, revise su conexión.";
      case "No active account found with the given credentials":
        return "No se ha encontrado ninguna cuenta activa con las credenciales ingresadas. Por favor, verifica tu información e inténtalo de nuevo.";
      case "You do not have permission to perform this action.":
        return "No tienes permiso para realizar esta acción.";
      case "Request failed with status code 500":
        return "La solicitud ha fallado. Por favor, inténtelo de nuevo más tarde o contacte con el soporte técnico.";
      case "Request failed with status code 400":
        return "La solicitud ha fallado. Por favor, verifica los datos ingresados y las extensiones de los archivos, y vuelve a intentarlo.";
      default:
        return message;
    }
  };

  return (
    <Collapse open={true} className="transition ease-out duration-300">
      <div className="bg-green-cujae">
        <div className="container mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="flex rounded-lg bg-blue-gray-400 p-2">
                <FaBullhorn className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <Alert className="ml-3 truncate font-medium text-white">
                <span className="hidden md:inline">{getMessage(children)}</span>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </Collapse>
  );
}

Messages.propTypes = {
  children: PropTypes.string.isRequired,
};
