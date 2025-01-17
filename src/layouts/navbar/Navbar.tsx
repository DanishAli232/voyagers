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
let cities = {
  Asia: [
    {
      code: "AF",
      country: "Afghanistan",
    },
    {
      code: "AM",
      country: "Armenia",
    },
    {
      code: "AZ",
      country: "Azerbaijan",
    },
    {
      code: "BH",
      country: "Bahrain",
    },
    {
      code: "BD",
      country: "Bangladesh",
    },
    {
      code: "BT",
      country: "Bhutan",
    },
    {
      code: "KH",
      country: "Cambodia",
    },
    {
      code: "CN",
      country: "China",
    },
    {
      code: "CY",
      country: "Cyprus",
    },
    {
      code: "GE",
      country: "Georgia",
    },
    {
      code: "HK",
      country: "Hong Kong",
    },
    {
      code: "IN",
      country: "India",
    },
    {
      code: "ID",
      country: "Indonesia",
    },
    {
      code: "IQ",
      country: "Iraq",
    },
    {
      code: "IL",
      country: "Israel",
    },
    {
      code: "JP",
      country: "Japan",
    },
    {
      code: "JO",
      country: "Jordan",
    },
    {
      code: "KZ",
      country: "Kazakhstan",
    },
    {
      code: "KW",
      country: "Kuwait",
    },
    {
      code: "KG",
      country: "Kyrgyzstan",
    },
    {
      code: "LB",
      country: "Lebanon",
    },
    {
      code: "MO",
      country: "Macao",
    },
    {
      code: "MY",
      country: "Malaysia",
    },
    {
      code: "MV",
      country: "Maldives",
    },
    {
      code: "MN",
      country: "Mongolia",
    },
    {
      code: "MM",
      country: "Myanmar",
    },
    {
      code: "NP",
      country: "Nepal",
    },
    {
      code: "OM",
      country: "Oman",
    },
    {
      code: "PK",
      country: "Pakistan",
    },
    {
      code: "PH",
      country: "Philippines",
    },
    {
      code: "QA",
      country: "Qatar",
    },
    {
      code: "SA",
      country: "Saudi Arabia",
    },
    {
      code: "SG",
      country: "Singapore",
    },
    {
      code: "LK",
      country: "Sri Lanka",
    },
    {
      code: "TJ",
      country: "Tajikistan",
    },
    {
      code: "TH",
      country: "Thailand",
    },
    {
      code: "TR",
      country: "Turkey",
    },
    {
      code: "TM",
      country: "Turkmenistan",
    },
    {
      code: "AE",
      country: "United Arab Emirates",
    },
    {
      code: "UZ",
      country: "Uzbekistan",
    },
    {
      code: "YE",
      country: "Yemen",
    },
  ],
  Europe: [
    {
      code: "AL",
      country: "Albania",
    },
    {
      code: "AD",
      country: "Andorra",
    },
    {
      code: "AT",
      country: "Austria",
    },
    {
      code: "BY",
      country: "Belarus",
    },
    {
      code: "BE",
      country: "Belgium",
    },
    {
      code: "BA",
      country: "Bosnia and Herzegovina",
    },
    {
      code: "BG",
      country: "Bulgaria",
    },
    {
      code: "HR",
      country: "Croatia",
    },
    {
      code: "CZ",
      country: "Czech Republic",
    },
    {
      code: "DK",
      country: "Denmark",
    },
    {
      code: "EE",
      country: "Estonia",
    },
    {
      code: "FO",
      country: "Faroe Islands",
    },
    {
      code: "FI",
      country: "Finland",
    },
    {
      code: "FR",
      country: "France",
    },
    {
      code: "DE",
      country: "Germany",
    },
    {
      code: "GI",
      country: "Gibraltar",
    },
    {
      code: "GR",
      country: "Greece",
    },
    {
      code: "VA",
      country: "Holy See (Vatican City State)",
    },
    {
      code: "HU",
      country: "Hungary",
    },
    {
      code: "IS",
      country: "Iceland",
    },
    {
      code: "IE",
      country: "Ireland",
    },
    {
      code: "IT",
      country: "Italy",
    },
    {
      code: "LV",
      country: "Latvia",
    },
    {
      code: "LI",
      country: "Liechtenstein",
    },
    {
      code: "LT",
      country: "Lithuania",
    },
    {
      code: "LU",
      country: "Luxembourg",
    },
    {
      code: "MT",
      country: "Malta",
    },
    {
      code: "MC",
      country: "Monaco",
    },
    {
      code: "ME",
      country: "Montenegro",
    },
    {
      code: "NL",
      country: "Netherlands",
    },
    {
      code: "NO",
      country: "Norway",
    },
    {
      code: "PL",
      country: "Poland",
    },
    {
      code: "PT",
      country: "Portugal",
    },
    {
      code: "RO",
      country: "Romania",
    },
    {
      code: "RU",
      country: "Russian Federation",
    },
    {
      code: "SM",
      country: "San Marino",
    },
    {
      code: "RS",
      country: "Serbia",
    },
    {
      code: "SK",
      country: "Slovakia",
    },
    {
      code: "SI",
      country: "Slovenia",
    },
    {
      code: "ES",
      country: "Spain",
    },
    {
      code: "SJ",
      country: "Svalbard and Jan Mayen",
    },
    {
      code: "SE",
      country: "Sweden",
    },
    {
      code: "CH",
      country: "Switzerland",
    },
    {
      code: "UA",
      country: "Ukraine",
    },
    {
      code: "GB",
      country: "United Kingdom",
    },
  ],
  Africa: [
    {
      code: "DZ",
      country: "Algeria",
    },
    {
      code: "AO",
      country: "Angola",
    },
    {
      code: "BJ",
      country: "Benin",
    },
    {
      code: "BW",
      country: "Botswana",
    },
    {
      code: "IO",
      country: "British Indian Ocean Territory",
    },
    {
      code: "BF",
      country: "Burkina Faso",
    },
    {
      code: "BI",
      country: "Burundi",
    },
    {
      code: "CM",
      country: "Cameroon",
    },
    {
      code: "CV",
      country: "Cape Verde",
    },
    {
      code: "CF",
      country: "Central African Republic",
    },
    {
      code: "TD",
      country: "Chad",
    },
    {
      code: "KM",
      country: "Comoros",
    },
    {
      code: "CG",
      country: "Congo",
    },
    {
      code: "DJ",
      country: "Djibouti",
    },
    {
      code: "EG",
      country: "Egypt",
    },
    {
      code: "GQ",
      country: "Equatorial Guinea",
    },
    {
      code: "ER",
      country: "Eritrea",
    },
    {
      code: "ET",
      country: "Ethiopia",
    },
    {
      code: "GA",
      country: "Gabon",
    },
    {
      code: "GM",
      country: "Gambia",
    },
    {
      code: "GH",
      country: "Ghana",
    },
    {
      code: "GN",
      country: "Guinea",
    },
    {
      code: "GW",
      country: "Guinea-Bissau",
    },
    {
      code: "KE",
      country: "Kenya",
    },
    {
      code: "LS",
      country: "Lesotho",
    },
    {
      code: "LR",
      country: "Liberia",
    },
    {
      code: "LY",
      country: "Libyan Arab Jamahiriya",
    },
    {
      code: "MG",
      country: "Madagascar",
    },
    {
      code: "MW",
      country: "Malawi",
    },
    {
      code: "ML",
      country: "Mali",
    },
    {
      code: "MR",
      country: "Mauritania",
    },
    {
      code: "MU",
      country: "Mauritius",
    },
    {
      code: "YT",
      country: "Mayotte",
    },
    {
      code: "MA",
      country: "Morocco",
    },
    {
      code: "MZ",
      country: "Mozambique",
    },
    {
      code: "NA",
      country: "Namibia",
    },
    {
      code: "NE",
      country: "Niger",
    },
    {
      code: "NG",
      country: "Nigeria",
    },
    {
      code: "RE",
      country: "Reunion",
    },
    {
      code: "RW",
      country: "Rwanda",
    },
    {
      code: "SH",
      country: "Saint Helena",
    },
    {
      code: "ST",
      country: "Sao Tome and Principe",
    },
    {
      code: "SN",
      country: "Senegal",
    },
    {
      code: "SC",
      country: "Seychelles",
    },
    {
      code: "SL",
      country: "Sierra Leone",
    },
    {
      code: "SO",
      country: "Somalia",
    },
    {
      code: "ZA",
      country: "South Africa",
    },
    {
      code: "SS",
      country: "South Sudan",
    },
    {
      code: "SD",
      country: "Sudan",
    },
    {
      code: "SZ",
      country: "Swaziland",
    },
    {
      code: "TG",
      country: "Togo",
    },
    {
      code: "TN",
      country: "Tunisia",
    },
    {
      code: "UG",
      country: "Uganda",
    },
    {
      code: "EH",
      country: "Western Sahara",
    },
    {
      code: "ZM",
      country: "Zambia",
    },
    {
      code: "ZW",
      country: "Zimbabwe",
    },
  ],
  Oceania: [
    {
      code: "AS",
      country: "American Samoa",
    },
    {
      code: "AU",
      country: "Australia",
    },
    {
      code: "CX",
      country: "Christmas Island",
    },
    {
      code: "CC",
      country: "Cocos (Keeling) Islands",
    },
    {
      code: "CK",
      country: "Cook Islands",
    },
    {
      code: "PF",
      country: "French Polynesia",
    },
    {
      code: "GU",
      country: "Guam",
    },
    {
      code: "KI",
      country: "Kiribati",
    },
    {
      code: "MH",
      country: "Marshall Islands",
    },
    {
      code: "FM",
      country: "Micronesia, Federated States of",
    },
    {
      code: "NR",
      country: "Nauru",
    },
    {
      code: "NC",
      country: "New Caledonia",
    },
    {
      code: "NZ",
      country: "New Zealand",
    },
    {
      code: "NU",
      country: "Niue",
    },
    {
      code: "NF",
      country: "Norfolk Island",
    },
    {
      code: "MP",
      country: "Northern Mariana Islands",
    },
    {
      code: "PW",
      country: "Palau",
    },
    {
      code: "PG",
      country: "Papua New Guinea",
    },
    {
      code: "PN",
      country: "Pitcairn",
    },
    {
      code: "WS",
      country: "Samoa",
    },
    {
      code: "SB",
      country: "Solomon Islands",
    },
    {
      code: "TK",
      country: "Tokelau",
    },
    {
      code: "TO",
      country: "Tonga",
    },
    {
      code: "TV",
      country: "Tuvalu",
    },
    {
      code: "UM",
      country: "United States Minor Outlying Islands",
    },
    {
      code: "VU",
      country: "Vanuatu",
    },
    {
      code: "WF",
      country: "Wallis and Futuna",
    },
  ],
  "North America": [
    {
      code: "AI",
      country: "Anguilla",
    },
    {
      code: "AG",
      country: "Antigua and Barbuda",
    },
    {
      code: "AW",
      country: "Aruba",
    },
    {
      code: "BS",
      country: "Bahamas",
    },
    {
      code: "BB",
      country: "Barbados",
    },
    {
      code: "BZ",
      country: "Belize",
    },
    {
      code: "BM",
      country: "Bermuda",
    },
    {
      code: "CA",
      country: "Canada",
    },
    {
      code: "KY",
      country: "Cayman Islands",
    },
    {
      code: "CR",
      country: "Costa Rica",
    },
    {
      code: "CU",
      country: "Cuba",
    },
    {
      code: "DM",
      country: "Dominica",
    },
    {
      code: "DO",
      country: "Dominican Republic",
    },
    {
      code: "SV",
      country: "El Salvador",
    },
    {
      code: "GL",
      country: "Greenland",
    },
    {
      code: "GD",
      country: "Grenada",
    },
    {
      code: "GP",
      country: "Guadeloupe",
    },
    {
      code: "GT",
      country: "Guatemala",
    },
    {
      code: "HT",
      country: "Haiti",
    },
    {
      code: "HN",
      country: "Honduras",
    },
    {
      code: "JM",
      country: "Jamaica",
    },
    {
      code: "MQ",
      country: "Martinique",
    },
    {
      code: "MX",
      country: "Mexico",
    },
    {
      code: "MS",
      country: "Montserrat",
    },
    {
      code: "AN",
      country: "Netherlands Antilles",
    },
    {
      code: "NI",
      country: "Nicaragua",
    },
    {
      code: "PA",
      country: "Panama",
    },
    {
      code: "PR",
      country: "Puerto Rico",
    },
    {
      code: "KN",
      country: "Saint Kitts and Nevis",
    },
    {
      code: "LC",
      country: "Saint Lucia",
    },
    {
      code: "PM",
      country: "Saint Pierre and Miquelon",
    },
    {
      code: "VC",
      country: "Saint Vincent and the Grenadines",
    },
    {
      code: "TT",
      country: "Trinidad and Tobago",
    },
    {
      code: "TC",
      country: "Turks and Caicos Islands",
    },
    {
      code: "US",
      country: "United States",
    },
    {
      code: "VG",
      country: "Virgin Islands, British",
    },
  ],
  Antarctica: [
    {
      code: "AQ",
      country: "Antarctica",
    },
    {
      code: "BV",
      country: "Bouvet Island",
    },
    {
      code: "GS",
      country: "South Georgia and the South Sandwich Islands",
    },
  ],
  "South America": [
    {
      code: "AR",
      country: "Argentina",
    },
    {
      code: "BO",
      country: "Bolivia",
    },
    {
      code: "BR",
      country: "Brazil",
    },
    {
      code: "CL",
      country: "Chile",
    },
    {
      code: "CO",
      country: "Colombia",
    },
    {
      code: "EC",
      country: "Ecuador",
    },
    {
      code: "GF",
      country: "French Guiana",
    },
    {
      code: "GY",
      country: "Guyana",
    },
    {
      code: "PY",
      country: "Paraguay",
    },
    {
      code: "PE",
      country: "Peru",
    },
    {
      code: "SR",
      country: "Suriname",
    },
    {
      code: "UY",
      country: "Uruguay",
    },
    {
      code: "VE",
      country: "Venezuela",
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
  const [user, setUser] = useState<{
    role: string;
    _id: string;
    username: string;
    image: string;
    stripeConnected: boolean | null;
  }>({
    role: "",
    _id: "",
    username: "",
    stripeConnected: null,
    image: "",
  });

  const verifyLogin = async () => {
    let isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  };

  const handleShowDropdown = (e: MouseEvent<HTMLLIElement>, type: boolean) => {
    e.preventDefault();
    setIsDropdownOpen(type);
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

  const handleProfileOpen = () => {
    navigate("/profile/edit");
  };

  const handleStripeOnboarding = async () => {
    const stripe_data = await api("/billing/get-account-links");
    window.location.href = stripe_data.data;
  };

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
              <ul
                className="nav navbar-nav"
                style={
                  user.role === "seller"
                    ? { display: "flex", alignItems: "center", marginTop: 0, marginLeft: "20%" }
                    : {}
                }
              >
                <li className="active">
                  <Link to="/">Home</Link>
                </li>

                {user.role === "user" ? (
                  <li
                    onMouseLeave={(e) => handleShowDropdown(e, false)}
                    onMouseEnter={(e) => handleShowDropdown(e, true)}
                    className={`dropdown dropdown-large${isDropdownOpen ? " open" : ""}`}
                  >
                    <a style={{ margin: 0, padding: "15px" }} className="dropdown-toggle btn" data-toggle="dropdown">
                      Destinations <b className="caret"></b>
                    </a>

                    <ul
                      className="dropdown-menu dropdown-menu-large row"
                      style={{ maxHeight: "70vh", overflowY: "auto", top: "70px" }}
                    >
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
                ) : (
                  <li>
                    <Link to="/itinerary/me">Voyager Itineraries</Link>
                  </li>
                )}

                <li>
                  <Link to="/about-us">About us</Link>
                </li>
                
                <li>
                  <Link to="/contact-us">Contact us</Link>
                </li>

                {user.role === "seller" ? (
                  <li>
                    <Link to="/itinerary/create">
                      <button className="btn btn-orange navbar-btn">Create Itinerary</button>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>

              {isLoggedIn ? (
                <div>
                  <ul
                    className={`nav navbar-nav navbar-right dropdown dropdown-toggle ${profileOpen ? " open" : ""}`}
                    data-toggle="dropdown"
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={
                      user.role === "seller"
                        ? {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            marginTop: "-68px",
                          }
                        : {}
                    }
                  >
                    <li>
                      <img width="44px" height="44px" src={user.image || dp} alt="Display Picture" />
                    </li>
                    <li>
                      <p className="welcome-message">WELOME!</p>
                      <p className="name">{user.username}</p>
                    </li>
                    <li style={{ marginLeft: "13.5px" }}>
                      <i className="fa fa-angle-down"></i>
                    </li>

                    <ul className="dropdown-menu profile-dropdown">
                      <li onClick={handleProfileOpen}>Edit Profile</li>
                      {user.role === "seller" && user.stripeConnected === false ? (
                        <li onClick={handleStripeOnboarding}>Complete Onboarding</li>
                      ) : (
                        ""
                      )}
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
