import { useEffect } from "react";
import "./App.css";
import useStorage from "./hoc/useStorage";

function App() {
  const { get, set } = useStorage();
  const { isLogged } = get();

  useEffect(() => {
    set({ isLogged: true });
  }, []);

  return (
    <div className="container sm:text-center bg-white dark:bg-black">
      hello APP 
    </div>
  );
}

export default App;
