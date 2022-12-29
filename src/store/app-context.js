import React, { useEffect } from "react";
import { useState } from "react";

const AppContext = React.createContext({
  toggleFavourites: () => {},
  favourites: "",
});

export const AppContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  let idArray = [];

  const toggleFavouritesHandler = (movieId) => {
    if (localStorage.getItem("favourites") === null) {
      localStorage.setItem("favourites", movieId);
      setFavourites(movieId);
    } else if (
      localStorage
        .getItem("favourites")
        .split(",")
        .map((id) => Number(id))
        .includes(movieId)
    ) {
      idArray = localStorage
        .getItem("favourites")
        .split(",")
        .map((id) => Number(id))
        .filter((id) => id !== movieId)
        .filter((id) => id !== 0);
      setFavourites(idArray);
      localStorage.setItem("favourites", idArray);
    } else {
      idArray = localStorage
        .getItem("favourites")
        .split(",")
        .map((id) => Number(id))
        .filter((id) => id !== 0);
      idArray.push(movieId);
      setFavourites(idArray);
      localStorage.setItem("favourites", idArray);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("favourites") !== null) {
      setFavourites(
        localStorage
          .getItem("favourites")
          .split(",")
          .map((id) => Number(id))
      );
    } else if (localStorage.getItem("favourites") === null) {
      localStorage.setItem("favourites", 0);
    }
    console.log(localStorage.getItem("favourites"));
  }, []);

  const contextValue = {
    favourites: favourites,
    toggleFavourites: toggleFavouritesHandler,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
