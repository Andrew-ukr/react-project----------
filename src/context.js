import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [coctailsData, setCoctailsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${url}${searchInput}`);
      const data = await res.json();

      if (data.drinks) {
        const shortDB = data.drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCoctailsData(shortDB);
      } else {
        setCoctailsData([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [searchInput]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchInput]);

  return (
    <AppContext.Provider
      value={{ loading, coctailsData, searchInput, setSearchInput }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
