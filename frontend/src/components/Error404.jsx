import { TbError404 } from "react-icons/tb";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">¡Oops! Página no encontrada</h1>
      <TbError404 className="text-6xl text-red-500" data-testid="error-icon" />
      <p className="text-gray-600">La página que buscas no existe.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Volver a la página de inicio
      </a>
    </div>
  );
};

export default Error404;
