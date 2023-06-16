import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MouseEvent, useEffect, useState } from "react";

import { checkIfUserIsAuthenticated } from "../../utils/utils";

import "./styles/styles.css";
import "./styles/dropdown.css";
import logo from "./img/logo.png";
import dp from "./img/dp.png";
import api from "../../utils/api";

type Props = {};

const cities = {
  "North America": [
    "American Southwest",
    "Aspen",
    "Atlanta",
    "Austin",
    "Banff",
    "Big Sky",
    "Boston",
    "CA Central Cost",
    "Charleston",
    "Chicago",
    "Colorado",
    "Dallas",
    "Florida Keys",
    "Hamptons",
    "Hawaii",
    "Jackson Hole",
    "Joshua Tree",
    "Lake Tahoe",
    "Las Vegas",
    "Los Angeles",
    "Miami",
    "Napa",
    "Vermont",
    "Nashville",
    "New England",
    "New Orleans",
    "New York City",
    "Outer Banks",
    "Palms Springs",
    "Park City",
    "Paso Robles",
    "Portland",
    "San Diego",
    "San Francisco",
    "Santa Barbara",
    "Savannah",
    "Scottsdale",
    "Seattle",
    "Sedona",
    "Sun Valley",
    "Tampa",
    "Telluride",
    "Upstate New York",
    "Vail",
    "Washington D.C.",
  ],
  Europe: [
    "Amalfi Coast",
    "Amsterdam",
    "Athens",
    "Barcelona",
    "Capri",
    "Copenhagen",
    "Croatia",
    "Florence",
    "French Riviera",
    "Germany",
    "Iceland",
    "Ireland",
    "Ischia",
    "London",
    "Mallorca",
    "Milan",
    "Mykonos",
    "Paris",
    "Portugal",
    "Prague",
    "Rome",
    "San Sebastian",
    "Santorini",
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

  const handleShowDropdown = (e: MouseEvent<HTMLAnchorElement>) => {
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
              <a href="#" className="navbar-brand">
                <img src={logo} />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/">Home</Link>
                </li>

                <li className={`dropdown dropdown-large${isDropdownOpen ? " open" : ""}`}>
                  <a href="#" onClick={handleShowDropdown} className="dropdown-toggle" data-toggle="dropdown">
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
                                        search: createSearchParams({ region: item }).toString(),
                                      }}
                                    >
                                      {item}
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
