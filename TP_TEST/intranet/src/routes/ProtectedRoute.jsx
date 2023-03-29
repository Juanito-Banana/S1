import { Navigate } from "react-router-dom";
import useStorage from "../hoc/useStorage";

export default ({ children }) => {
  const { get } = useStorage();
  const { isLogged } = get();

  if (!isLogged) {
    return <Navigate to="/" />;
  }
  return children;
};
