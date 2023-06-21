import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";

import { checkIfUserIsAuthenticated } from "../../utils/utils";

import "./styles/styles.css";
import "./styles/dropdown.css";
import logo from "./img/logo.png";
import dp from "./img/dp.png";
import api from "../../utils/api";
import "./styles/carousel.css";
import "react-multi-carousel/lib/styles.css";

type Props = {};

const cities = {
  Asia: [
    {
      country: "Pakistan",
      code: "PK",
    },
    {
      country: "China",
      code: "CN",
    },
    {
      country: "India",
      code: "IN",
    },
    {
      country: "Japan",
      code: "JP",
    },
  ],
  Europe: [
    {
      country: "Germany",
      code: "DE",
    },
    {
      country: "France",
      code: "FR",
    },
    {
      country: "Italy",
      code: "IT",
    },
    {
      country: "United Kingdom",
      code: "GB",
    },
  ],
  "North America": [
    {
      country: "United States",
      code: "US",
    },
    {
      country: "Canada",
      code: "CA",
    },
    {
      country: "Mexico",
      code: "MX",
    },
    {
      country: "Cuba",
      code: "CU",
    },
  ],
  "South America": [
    {
      country: "Brazil",
      code: "BR",
    },
    {
      country: "Argentina",
      code: "AR",
    },
    {
      country: "Colombia",
      code: "CO",
    },
    {
      country: "Peru",
      code: "PE",
    },
  ],
};

function createGroups(array: any, groupSize: number) {
  var result = [];
  var subArray = [];

  for (var i = 0; i < array.length; i++) {
    subArray.push(array[i]);

    if (subArray.length === groupSize || i === array.length - 1) {
      result.push(subArray);
      subArray = [];
    }
  }

  return result;
}

const Navbar = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ role: string; _id: string; username: string }>({
    role: "",
    _id: "",
    username: "",
  });

  const verifyLogin = async () => {
    let isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  };

  const handleShowDropdown = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/auth/login");
  };

  const getUser = async () => {
    try {
      const user = await api("/users/get-profile");
      console.log(user);
      setUser(user.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    verifyLogin();
  }, [location]);

  return (
    <div className="container">
      <div className="row" id="nav-section">
        {/* <!-- header --> */}
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <img src={logo} />
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/">Home</Link>
                </li>

                <li
                  onMouseLeave={handleShowDropdown}
                  onMouseEnter={handleShowDropdown}
                  className={`dropdown dropdown-large${isDropdownOpen ? " open" : ""}`}
                >
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    Destinations <b className="caret"></b>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-large row">
                    {Object.entries(cities).map(([key, val]) => (
                      <li className="col-sm-6">
                        <ul>
                          <li className="dropdown-header">{key}</li>
                          <div className="row inn-dropdown">
                            {createGroups(val, 23).map((each) => (
                              <div className="col-sm-6">
                                {each.map((item) => (
                                  <li>
                                    <Link
                                      to={{
                                        pathname: "/itinerary/list",
                                        search: createSearchParams({ region: item.code }).toString(),
                                      }}
                                    >
                                      {item.country}
                                    </Link>
                                  </li>
                                ))}
                              </div>
                            ))}
                          </div>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
              </ul>
              {isLoggedIn ? (
                <div>
                  <ul
                    className={`nav navbar-nav navbar-right dropdown dropdown-toggle ${profileOpen ? " open" : ""}`}
                    data-toggle="dropdown"
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <li>
                      <img width="44px" height="44px" src={dp} alt="Display Picture" />
                    </li>
                    <li>
                      <p className="welcome-message">WELOME!</p>
                      <p className="name">{user.username}</p>
                    </li>
                    <li style={{ marginLeft: "13.5px" }}>
                      <i className="fa fa-angle-down"></i>
                    </li>

                    <ul className="dropdown-menu profile-dropdown">
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </ul>
                </div>
              ) : (
                <>
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/auth/login" className="btn btn-border navbar-btn">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/itinerary/create" className="btn btn-orange navbar-btn">
                        Create Itinerary
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </nav>
        {/* <!-- header end--> */}
      </div>
    </div>
  );
};

export default Navbar;
