import { createContext, useContext, useState } from "react";
import { DEFAULT_CATEGORIES, DEFAULT_EVENTS } from "../data.mock";

const StoreContext = createContext({
  events: [],
  categories: [],
  setEvents: () => {},
  setCategories: () => {},
});

const StoreProvider = ({ children }) => {
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  return (
    <StoreContext.Provider
      value={{ categories, events, setEvents, setCategories }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};

export default StoreProvider;
