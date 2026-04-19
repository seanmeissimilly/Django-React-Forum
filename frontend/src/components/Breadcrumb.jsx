import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

export default function Breadcrumb() {
  const location = useLocation();

  let id;

  const crumbs = location.pathname.split("/").filter((crumb) => {
    if (!isNaN(Number(crumb))) {
      id = crumb;
    }
    return crumb !== "" && isNaN(Number(crumb));
  });

  const textCrumb = {
    forum: "Foro",
    documents: "Documentos",
    videos: "Videos",
    tools: "Herramientas",
    suggestions: "Quejas y Sugerencias",
    miPerfil: "Mi Perfil",
    reports: "Reportes",
    login: "Entrada",
    register: "Registro",
    about: "Acerca de",
    editProfile: "Editar Perfil",
    userProfile: "Perfil de Usuario",
    soloBlog: "Ver Publicación",
    createSuggestion: "Añadir Queja o Sugerencia",
    editSuggestion: "Editar Queja o Sugerencia",
    addBlog: "Añadir Publicación",
    editBlog: "Editar Publicación",
    createDocument: "Añadir Documento",
    editDocument: "Editar Documento",
    createVideo: "Añadir Video",
    editVideo: "Editar Video",
    createTool: "Añadir Herramienta",
    editTool: "Editar Herramienta",
    help: "Ayuda",
    chart: "Gráfico",
  };

  let currentLink = "";

  return (
    <>
      <Breadcrumbs>
        <a href="/" className="opacity-60">
          <AiFillHome />
        </a>
        {crumbs.map((crumb) => {
          currentLink += `/${crumb}`;
          const displayText = textCrumb[crumb] || crumb;
          const link =
            (id && crumb.includes("edit")) ||
            crumb.includes("userProfile") ||
            crumb.includes("soloBlog")
              ? `${currentLink}/${id}`
              : currentLink;

          return (
            <a key={currentLink} href={link}>
              {displayText}
            </a>
          );
        })}
      </Breadcrumbs>
    </>
  );
}
