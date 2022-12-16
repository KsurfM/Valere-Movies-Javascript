import { Fragment, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "./store/app-context";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BsBookmarkStarFill } from "react-icons/bs";

function Navigation() {
  const [searchInput, setSearchInput] = useState();
  const [searchResults, setSearchResults] = useState();
  const appCtx = useContext(AppContext);
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  let favouritesArray;
  const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

  const searchHandler = async (event) => {
    setSearchInput(encodeURIComponent(event.target.value.trim()));

    if (searchInput) {
      {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US&query=${searchInput}&page=1&include_adult=false`
        );
        const data = await response.json();
        setSearchResults(data);
      }
    }
  };

  const fetchFavouritesDetailsHandler = async () => {
    favouritesArray = [];
    for (const favourite of appCtx.favourites) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${favourite}?api_key=d76141fc516005c4b21c33a7c4f13e2f&language=en-US`
      );
      const data = await response.json();
      favouritesArray.push(data);
    }
    setFavouriteMovies(favouritesArray);
  };

  useEffect(() => {
    fetchFavouritesDetailsHandler();
  }, [appCtx.favourites]);

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container position="relative">
          <Navbar.Brand href="/">
            <h2>Valere Movies</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <div style={{ width: "150px" }}></div>
              <form className="d-flex m-auto" role="search">
                <input
                  onChange={searchHandler}
                  className="form-control "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div style={{ width: "400px" }}></div>
                {searchResults && searchInput !== "" && (
                  <div
                    className="position-absolute top-100  border rounded bg-light"
                    style={{
                      width: "400px",
                      maxHeight: "225px",
                      overflow: "scroll",
                    }}
                  >
                    {searchResults.results?.map((result) => (
                      <div key={result.id}>
                        <img
                          className="thumbnail-image"
                          style={{ width: "50px" }}
                          src={`${BASE_IMG_URL}${result.poster_path}`}
                          alt="movie thumbnail"
                        />
                        &nbsp;&nbsp;
                        {result.title}
                      </div>
                    ))}
                  </div>
                )}

                {/* <button className="btn btn-primary" type="submit">
                  Search
                </button> */}
              </form>

              <NavDropdown
                title={
                  <strong>
                    <BsBookmarkStarFill size={20} /> Favourites
                  </strong>
                }
                id="basic-nav-dropdown"
              >
                {favouriteMovies &&
                  favouriteMovies.map((favouriteMovie) => (
                    <NavDropdown.Item
                      key={favouriteMovie.id}
                      href={`${favouriteMovie.id}`}
                    >
                      <img
                        className="thumbnail-image"
                        style={{ width: "50px" }}
                        src={`${BASE_IMG_URL}${favouriteMovie.poster_path}`}
                        alt="movie thumbnail"
                      />
                      &nbsp;&nbsp;
                      <strong>{favouriteMovie.title}</strong>
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

export default Navigation;