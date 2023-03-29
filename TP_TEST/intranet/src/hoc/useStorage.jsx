import { useState } from "react";

export default function useStorage(data = {}) {
  const [value, setValue] = useState(data);

  function get() {
    const saved = localStorage.getItem("app-storage");
    if(saved)
        return JSON.parse( saved );
  }

  function set(data) {
    reset();
    setValue(data);
    localStorage.setItem("app-storage", JSON.stringify(data));
  }

  function reset() {
    localStorage.removeItem("app-storage");
  }

  return { get, set, reset };
}
