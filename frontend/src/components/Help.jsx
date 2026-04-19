import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

export default function Help() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAboutClick = () => {
    navigate("/about");
  };

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "¿Qué es AlInfo?",
      answer:
        "AlInfo es un repositorio digital diseñado para la difusión de información científica y los aportes del Grupo de Ingeniería Alimentaria (GIA) de la Facultad de Ingeniería Química de la CUJAE.",
    },
    {
      question: "¿Cuáles son los roles de usuario en el sistema?",
      answer: `
        El sistema cuenta con cuatro roles de usuario:
        - Admin Api: Tiene acceso al módulo de administración de la API, permitiéndole gestionar y controlar contenido.
        - Administrador: Tiene acceso a todas las funcionalidades.
        - Editor: Puede realizar todas las funcionalidades, pero solo puede editar y eliminar los elementos que él mismo haya subido.
        - Lector: Solo puede consultar y subir comentarios, quejas y sugerencias.        
      `,
    },
    {
      question: "¿Cuáles son las funcionalidades del sistema?",
      answer:
        "- Autenticación de usuario\n- Cierre de sesión\n- Registro de usuarios\n- Actualización de perfil de usuario\n- Usuario personalizado con biografía, correo, nombre de usuario y foto de perfil\n- Permisos de usuario para evitar que otros usuarios borren o editen publicaciones ajenas\n- Crear, leer, actualizar y eliminar publicaciones\n- Ver perfil de otros usuarios\n- Leer todas las publicaciones de un usuario en su perfil\n- Crear y borrar comentarios (solo para administradores o el dueño del comentario)\n- Leer comentarios de otros usuarios\n- Buscador con filtros para videos, documentos y herramientas\n- Subir, consultar, borrar y editar documentos con clasificación y tipo\n- Subir, consultar, borrar y editar videos con clasificación\n- Subir, consultar, borrar y editar herramientas con clasificación\n- Generar reportes\n- Enviar quejas y sugerencias\n- Visualizar Gráfico\n",
    },
    {
      question: "¿Qué secciones tiene AlInfo?",
      answer:
        "- Página Inicial\n- Foro\n- Documentos\n- Videos\n- Herramientas\n- Quejas y Sugerencias\n- Reportes\n- Gráfico\n- Mi Perfil\n- Perfil de Usuario\n- Ayuda\n- Acerca de\n",
    },

    {
      question: "¿Qué reportes genera el sistema?",
      answer:
        "- Listado de Usuarios\n- Listado de Documentos\n- Listado de Videos\n- Listado de Herramientas\n- Listado de Quejas y Sugerencias\n- Listado de Tipos de Documentos\n- Listado de Clasificaciones de Documentos\n- Listado de Clasificaciones de Videos\n- Listado de Clasificaciones de Herramientas\n",
    },
    {
      question: "¿Qué tecnologías utiliza AlInfo?",
      answer: `
        AlInfo utiliza las siguientes tecnologías:
    
        # Frontend
        - React.js
        - Redux Toolkit
        - Tailwind CSS
    
        # Backend
        - Django Rest Framework (API REST)
        - PostgreSQL (Base de datos)
      `,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mb-16 mt-12">
      <div className="flex items-center mb-4">
        <FaQuestionCircle className="w-6 h-6 text-green-cujae mr-2" />
        <h1 className="text-2xl font-bold">Ayuda</h1>
      </div>
      <p className="text-gray-700 mb-2">
        Bienvenido a la página de ayuda. Aquí encontrarás respuestas a las
        preguntas más frecuentes.
      </p>
      <ul className="list-none">
        {questions.map((item, index) => (
          <li key={index} className="mb-2">
            <Button
              onClick={() => toggleDropdown(index)}
              className="w-full text-left focus:outline-none bg-transparent hover:bg-gray-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-black">
                  {item.question}
                </span>
                <FaChevronDown
                  className={`w-5 h-5 ml-2 text-green-cujae transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </Button>
            {activeIndex === index && (
              <div className="mt-2 p-2 bg-gray-50 rounded transition-all duration-300 whitespace-pre-wrap">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="text-gray-700 mt-4">
        Si tienes más preguntas, no dudes en contactarnos.
      </p>
      <Button
        onClick={handleAboutClick}
        className="mt-2 group relative flex justify-end rounded-md border border-transparent bg-green-cujae py-2 px-4 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2 normal-case"
      >
        Ir a Acerca de
      </Button>
    </div>
  );
}
