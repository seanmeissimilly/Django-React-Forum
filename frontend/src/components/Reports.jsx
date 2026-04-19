import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import Report from "./Report.jsx";
import { userList } from "../redux/userSlice.js";
import makeAnaimated from "react-select/animated";
import {
  multimediaList,
  multimediaclassificationList,
} from "../redux/multimediaSlice.js";
import { appList, appClassificationList } from "../redux/appSlice.js";
import {
  documentList,
  documentclassificationList,
  documenttypesList,
} from "../redux/documentSlice";
import { suggestionList } from "../redux/suggestionSlice.js";
import { DateTime } from "luxon";
import { Input, Option, Select } from "@material-tailwind/react";
import { formatDate } from "../utils/dateUtils.js";

function Reports() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("noFilter");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });
  const animatedComponents = makeAnaimated();

  const {
    users,
    userInfo,
    error: errorUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);

  const {
    documents,
    documenttypes,
    documentclassification,
    error: errorDocument,
    loading: loadingDocument,
  } = useSelector((state) => state.document);

  const {
    multimedias: videos,
    multimediaclassification,

    error: errorVideo,
    loading: loadingVideo,
  } = useSelector((state) => state.multimedia);

  const {
    suggestions,
    error: errorSuggestion,
    loading: loadingSuggestion,
  } = useSelector((state) => state.suggestion);

  const {
    apps: tools,
    appclassification,
    error: errorTool,
    loading: loadingTool,
  } = useSelector((state) => state.app);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(userList({ token: userInfo.token }));
      dispatch(multimediaList({ token: userInfo.token }));
      dispatch(multimediaclassificationList({ token: userInfo.token }));
      dispatch(documentList({ token: userInfo.token }));
      dispatch(documenttypesList({ token: userInfo.token }));
      dispatch(documentclassificationList({ token: userInfo.token }));
      dispatch(appList({ token: userInfo.token }));
      dispatch(appClassificationList({ token: userInfo.token }));
      dispatch(suggestionList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo]);

  const filterData = (data, filter, dateField = "date") => {
    const now = DateTime.now();
    let startDate;
    let endDate = now;

    switch (filter) {
      case "lastMonth":
        startDate = now.minus({ months: 1 });
        break;
      case "lastYear":
        startDate = now.minus({ years: 1 });
        break;
      case "lastWeek":
        startDate = now.minus({ weeks: 1 });
        break;
      case "Today":
        startDate = now.startOf("day");
        break;
      case "customRange":
        startDate = DateTime.fromISO(customRange.start);
        endDate = DateTime.fromISO(customRange.end);
        break;
      case "noFilter":
        return data;
      default:
        startDate = DateTime.fromISO("1970-01-01");
    }

    return data.filter((item) => {
      const itemDate = DateTime.fromISO(item[dateField]);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const documentsWithAll = filterData(
    [...documents].map((document) => ({
      ...document,
      type: documenttypes.find((type) => type.id === document.documenttypes)
        ?.description,
      classification: documentclassification.find(
        (classification) =>
          classification.id === document.documentclassification
      )?.description,
    })),
    filter
  );

  const videosWithAll = filterData(
    [...videos].map((video) => ({
      ...video,
      classification: multimediaclassification.find(
        (classification) => classification.id === video.multimediaclassification
      )?.description,
    })),
    filter
  );

  const toolsWithAll = filterData(
    [...tools].map((tool) => ({
      ...tool,
      classification: appclassification.find(
        (classification) => classification.id === tool.applicationclassification
      )?.description,
    })),
    filter
  );

  const suggestionWithAll = filterData([...suggestions], filter);

  const reports = [
    {
      id: 1,
      name: "Listado de Usuarios",
      columns: [
        [
          "ID",
          "Usuario",
          "Correo",
          "Rol",
          "Inicio",
          "Última Entrada",
          "Último IP",
          "Admin API",
        ],
      ],
      data: filterData(
        [...users].sort((a, b) => a.id - b.id),
        filter,
        "start_date"
      ).map((user) => [
        user.id,
        user.user_name,
        user.email,
        user.role === "reader"
          ? "Lector"
          : user.role === "editor"
          ? "Editor"
          : "Admin",
        formatDate(user.start_date),
        formatDate(user.last_login),
        user.last_login_ip,
        user.is_admin && user.is_staff ? "Si" : "No",
      ]),
    },
    {
      id: 2,
      name: "Listado de Documentos",
      columns: [["ID", "Título", "Fecha", "Tipo", "Clasificación", "Usuario"]],
      data: documentsWithAll
        .sort((a, b) => a.id - b.id)
        .map((document) => [
          document.id,
          document.title,
          formatDate(document.date),
          document.type,
          document.classification,
          document.user,
        ]),
    },
    {
      id: 3,
      name: "Listado de Videos",
      columns: [["ID", "Título", "Fecha", "Clasificación", "Usuario"]],
      data: videosWithAll
        .sort((a, b) => a.id - b.id)
        .map((video) => [
          video.id,
          video.title,
          formatDate(video.date),
          video.classification,
          video.user,
        ]),
    },
    {
      id: 4,
      name: "Listado de Herramientas",
      columns: [["ID", "Título", "Fecha", "Clasificación", "Usuario"]],
      data: toolsWithAll
        .sort((a, b) => a.id - b.id)
        .map((tool) => [
          tool.id,
          tool.title,
          formatDate(tool.date),
          tool.classification,
          tool.user,
        ]),
    },
    {
      id: 5,
      name: "Listado de Quejas y Sugerencias",
      columns: [["ID", "Título", "Fecha", "Resuelto", "Usuario"]],
      data: suggestionWithAll
        .sort((a, b) => a.id - b.id)
        .map((suggestion) => [
          suggestion.id,
          suggestion.title,
          formatDate(suggestion.date),
          suggestion.resolved ? "Si" : "No",
          suggestion.user,
        ]),
    },
    {
      id: 6,
      name: "Listado de Tipos de Documentos",
      columns: [["ID", "Description"]],
      data: [...documenttypes]
        .sort((a, b) => a.id - b.id)
        .map((document) => [document.id, document.description]),
    },
    {
      id: 7,
      name: "Listado de Clasificaciones de Documentos",
      columns: [["ID", "Description"]],
      data: [...documentclassification]
        .sort((a, b) => a.id - b.id)
        .map((document) => [document.id, document.description]),
    },
    {
      id: 8,
      name: "Listado de Clasificaciones de Videos",
      columns: [["ID", "Description"]],
      data: [...multimediaclassification]
        .sort((a, b) => a.id - b.id)
        .map((video) => [video.id, video.description]),
    },
    {
      id: 9,
      name: "Listado de Clasificaciones de Herramientas",
      columns: [["ID", "Description"]],
      data: [...appclassification]
        .sort((a, b) => a.id - b.id)
        .map((tool) => [tool.id, tool.description]),
    },
  ];

  const renderReports = () => {
    return reports.map((report) => (
      <Report
        key={report.id}
        name={report.name}
        columns={report.columns}
        data={report.data}
        date={formatDate(DateTime.now())}
      />
    ));
  };

  const handleFilterChange = (e) => {
    setFilter(e);
  };

  const handleCustomRangeChange = (e) => {
    setCustomRange({
      ...customRange,
      [e]: e,
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "200px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e0e0e0",
    }),
  };

  return (
    <>
      {loadingUser ||
      loadingVideo ||
      loadingTool ||
      loadingDocument ||
      loadingSuggestion ? (
        <Loader />
      ) : errorUser ||
        errorVideo ||
        errorTool ||
        errorDocument ||
        errorSuggestion ? (
        <Messages>{errorUser}</Messages>
      ) : (
        <div>
          <div className="flex justify-end mb-3 mt-12 mr-3">
            <div className="w-72">
              <Select
                label="Filtro"
                value={filter}
                onChange={(e) => handleFilterChange(e)}
                styles={customStyles}
                className="w-full rounded border bg-transparent text-base font-normal text-neutral-700 dark:border-neutral-600 dark:text-neutral-800"
                components={animatedComponents}
              >
                <Option value="noFilter">Sin filtro</Option>
                <Option value="lastYear">Último año</Option>
                <Option value="lastMonth">Último mes</Option>
                <Option value="lastWeek">Última semana</Option>
                <Option value="Today">Hoy</Option>
                <Option value="customRange">Rango personalizado</Option>
              </Select>
              {filter === "customRange" && (
                <div className="flex flex-col space-y-2 ml-4 mt-2">
                  <div className="flex flex-col space-y-2">
                    <Input
                      type="date"
                      name="start"
                      label="Fecha Inicial"
                      value={customRange.start}
                      onChange={handleCustomRangeChange}
                      className="p-2 border rounded mb-2"
                    />
                    <Input
                      type="date"
                      name="end"
                      label="Fecha Final"
                      value={customRange.end}
                      onChange={handleCustomRangeChange}
                      className="p-2 border rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="container mx-auto p-4 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderReports()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
