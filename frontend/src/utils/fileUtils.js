import { toast } from "react-hot-toast";

export const handleFileChange = (e, setFile, allowedTypes) => {
  const file = e.target.files[0];
  if (file && allowedTypes.includes(file.type)) {
    setFile(file);
    return true;
  } else {
    toast.error("Tipo de archivo no permitido");
    return false;
  }
};
