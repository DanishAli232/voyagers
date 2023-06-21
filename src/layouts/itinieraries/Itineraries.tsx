import { useEffect, useState } from "react";
import api from "../../utils/api";
import "./style.css";
import "./slider.css";
import "./carousel.css";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { getUserRole } from "../../utils/utils";
import regions from "../../utils/regions";

type Props = {};

type Itinerary = {
  category: string[];
  country: string;
  details: string;
  image: string;
  introduction: string;
  price: string;
  salesPitch: string;
  services: string[];
  title: string;
  userId: {
    username: string;
    _id: string;
  };
  __v: number;
  _id: string;
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 8000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Itineraries = (props: Props) => {
  const [data, setData] = useState<Itinerary[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setselectedTab] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getItineraries = async () => {
    try {
      setIsLoading(true);

      let getdata = (await api(
        `/itinerary${searchParams.get("region") ? "?region=" + searchParams.get("region") : ""}`
      )) as { data: Itinerary[] };
      setData(getdata.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userRole = getUserRole(); // Replace this with your logic to get the user's role

    if (userRole === "seller") {
      navigate("/itinerary/me");
    }

    console.log(
      Object.values(regions)
        .flat()
        .find((region) => region.code === searchParams.get("region"))
    );

    getItineraries();
  }, [searchParams]);

  return (
    <>
      <section className="itineraries style-input">
        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section text-center">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="left-first">
                <p className="para-first">Discover Travel Itineraries</p>
                <h1 className="top-heading">
                  {
                    Object.values(regions)
                      .flat()
                      .find((region) => region.code === searchParams.get("region"))?.country
                  }
                </h1>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tabbable-panel listingtabs">
                <div className="tabbable-line">
                  <ul className="nav nav-tabs text-center">
                    <li className={`${selectedTab === "" ? "active" : ""}`}>
                      <a href="#tab_default_1" onClick={() => setselectedTab("")} data-toggle="tab">
                        {" "}
                        All Itineraries
                      </a>
                    </li>
                    <li className={`${selectedTab === "stay" ? "active" : ""}`}>
                      <a href="#tab_default_2" data-toggle="tab" onClick={() => setselectedTab("stay")}>
                        {" "}
                        Stay
                      </a>
                    </li>
                    <li className={`${selectedTab === "taste" ? "active" : ""}`}>
                      <a href="#tab_default_3" data-toggle="tab" onClick={() => setselectedTab("taste")}>
                        {" "}
                        Taste
                      </a>
                    </li>
                    <li className={`${selectedTab === "vibe" ? "active" : ""}`}>
                      <a href="#tab_default_4" data-toggle="tab" onClick={() => setselectedTab("vibe")}>
                        {" "}
                        Vibe
                      </a>
                    </li>
                    <li className={`${selectedTab === "experience" ? "active" : ""}`}>
                      <a href="#tab_default_5" data-toggle="tab" onClick={() => setselectedTab("experience")}>
                        {" "}
                        Experience
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content listingtabs">
                    <div className="tab-pane active" id="tab_default_1">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="left-first">
                            <p className="para-first">Most Loved</p>
                            <h1 className="top-heading">
                              <span className="first-textbg">RECOMMENDED ITINERARIES</span>
                            </h1>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-reviews broun-block">
                        <div className="container-fuild">
                          {isLoading ? (
                            <CircularProgress />
                          ) : (
                            <div className="row">
                              <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                  <div className="item active">
                                    <div className="card-slid">
                                      <Carousel itemClass="w-full" responsive={responsive}>
                                        {data
                                          .filter((each) => (selectedTab ? each.category.includes(selectedTab) : true))
                                          .map((each) => (
                                            <div key={each._id} className="list-item">
                                              <Link
                                                style={{ textDecoration: "none" }}
                                                to={`/itinerary/view/${each._id}`}
                                                className="card"
                                              >
                                                <img
                                                  className="card-img-top"
                                                  src={each.image}
                                                  alt="Card image"
                                                  style={{ width: "100%" }}
                                                />
                                                <div className="badge">
                                                  <p>{each.category[0]}</p>
                                                </div>
                                                <div className="card-body">
                                                  <h4 className="card-title">{each.title}</h4>
                                                  <div className="subtitle">
                                                    <span className="a">Created by:</span>
                                                    <span className="b">{each.userId.username}</span>
                                                  </div>
                                                </div>
                                              </Link>
                                            </div>
                                          ))}
                                      </Carousel>
                                      {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                      <div className="card">
                                        <img
                                          className="card-img-top"
                                          src="img/Rect2.png"
                                          alt="Card image"
                                          style={{ width: "100%" }}
                                        />
                                        <div className="badge">
                                          <p>Stay</p>
                                        </div>
                                        <div className="card-body">
                                          <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                          <div className="subtitle">
                                            <span className="a">Created by:</span>
                                            <span className="b">Tichelle Richards</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                      <div className="card">
                                        <img
                                          className="card-img-top"
                                          src="img/Rect2.png"
                                          alt="Card image"
                                          style={{ width: "100%" }}
                                        />
                                        <div className="badge">
                                          <p>Stay</p>
                                        </div>
                                        <div className="card-body">
                                          <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                          <div className="subtitle">
                                            <span className="a">Created by:</span>
                                            <span className="b">Tichelle Richards</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                      <div className="card">
                                        <img
                                          className="card-img-top"
                                          src="img/Rect2.png"
                                          alt="Card image"
                                          style={{ width: "100%" }}
                                        />
                                        <div className="badge">
                                          <p>Stay</p>
                                        </div>
                                        <div className="card-body">
                                          <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                          <div className="subtitle">
                                            <span className="a">Created by:</span>
                                            <span className="b">Tichelle Richards</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <br />

                      <section className="listing">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-7">
                              <div className="left-first">
                                <p className="para-first">My Listing</p>
                                <h1 className="top-heading">
                                  <span className="first-textbg">ITINERARIES Listing</span>
                                </h1>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="card-grid">
                              {data.map((each) => (
                                <div key={each._id} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                  <div className="card">
                                    <img
                                      className="card-img-top"
                                      src={each.image}
                                      alt="Card image"
                                      style={{ width: "100%" }}
                                    />
                                    <div className="badge">
                                      <p>{each.category[0]}</p>
                                    </div>
                                    <div className="card-body">
                                      <h4 className="card-title">{each.title}</h4>
                                      <div className="subtitle">
                                        <span className="a">Created by:</span>
                                        <span className="b">{each.userId.username}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className="card-grid">
                              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                <div className="card">
                                  <img
                                    className="card-img-top"
                                    src="img/Rect2.png"
                                    alt="Card image"
                                    style={{ width: "100%" }}
                                  />
                                  <div className="badge">
                                    <p>Stay</p>
                                  </div>
                                  <div className="card-body">
                                    <h4 className="card-title">A Delicious Vacation in Tulum, Mexico</h4>
                                    <div className="subtitle">
                                      <span className="a">Created by:</span>
                                      <span className="b">Tichelle Richards</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="row">
                            <div className="col-md-12">
                              <div className="more-listing text-center">
                                <button className="btn btn-orange navbar-btn">Discover more</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="tab-pane" id="tab_default_2"></div>
                    <div className="tab-pane" id="tab_default_3"></div>
                    <div className="tab-pane" id="tab_default_4"></div>
                    <div className="tab-pane" id="tab_default_5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Itineraries;
