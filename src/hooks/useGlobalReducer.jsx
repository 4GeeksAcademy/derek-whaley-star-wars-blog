import { createContext, useReducer, useContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore(), () => {
    const local = localStorage.getItem("favorites");
    const base = initialStore();
    return local ? { ...base, favorites: JSON.parse(local) } : base;
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(store.favorites));
  }, [store.favorites]);

  return <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>;
}

export default function useGlobalReducer() {
  return useContext(StoreContext);
}