import { MouseEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import "./style.css";
import "./slider.css";
import "./carousel.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import { getUserRole } from "../../utils/utils";
import ReactModal from "react-modal";

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

const MyItineraries = (props: Props) => {
  const [data, setData] = useState<Itinerary[]>([]);
  const [badgeHover, setBadgeHover] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState<string>("");

  const navigate = useNavigate();

  const getItineraries = async () => {
    setIsLoading(true);

    try {
      let getdata = (await api("/itinerary/list/me")) as { data: Itinerary[] };

      setData(getdata.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    let data = await api("/billing/user-details");
    if (!data?.data?.isCompleted) {
      return navigate("/stripe/connect");
    }
  };

  useEffect(() => {
    // Check user role here and return the corresponding component
    const userRole = getUserRole(); // Replace this with your logic to get the user's role

    if (userRole !== "seller") {
      navigate("/itinerary/list");
    }

    getUserDetails();
    getItineraries();
  }, []);

  const handleChangeDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenDelete(id);
  };

  const deleteItinerary = async () => {
    try {
      setIsDeleteLoading(true);
      let newItineraries = await api.delete(`/itinerary/${isOpenDelete}`);
      setIsOpenDelete("");
      setData(newItineraries.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <>
      <section className="listing-bg">
        <div className="container">
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section text-center">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="left-first">
                <p className="para-first">Discover Travel Itineraries</p>
                <h1 className="top-heading">Create NEW itinerarY</h1>
                <Link to="/itinerary/create">
                  <button className="btn btn-orange navbar-btn">Create Itinerary</button>
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>
        </div>
      </section>
      {data.length > 0 ? (
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
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <ReactModal
                  style={{
                    content: {
                      width: "50vw",
                      height: "200px",
                      inset: "unset",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.75)",
                    },
                    overlay: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    },
                  }}
                  isOpen={typeof isOpenDelete === "string" && isOpenDelete !== ""}
                >
                  <div>
                    <h4>Are you sure you want to delete this Itinerary?</h4>
                    <div className="button-group">
                      <button
                        disabled={isDeleteLoading}
                        style={{ marginRight: "20px" }}
                        onClick={() => deleteItinerary()}
                        className="btn btn-danger navbar-btn"
                      >
                        {isDeleteLoading ? <CircularProgress /> : "Delete"}
                      </button>
                      <button className="btn btn-success navbar-btn" onClick={() => setIsOpenDelete("")}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </ReactModal>

                <div className="row">
                  <div className="card-grid">
                    {data.map((each) => (
                      <Link
                        to={`/itinerary/view/${each._id}`}
                        key={each._id}
                        onMouseEnter={() => setBadgeHover(each._id)}
                        onMouseLeave={() => setBadgeHover(null)}
                        className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                      >
                        <div className="card">
                          <img className="card-img-top" src={each.image} alt="Card image" style={{ width: "100%" }} />
                          {badgeHover === each._id ? (
                            <button
                              type="button"
                              onClick={(e) => handleChangeDelete(e, each._id)}
                              className="glyphicon glyphicon-trash"
                              style={{
                                position: "absolute",
                                left: "20px",
                                top: "20px",
                                background: "red",
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                border: "none",
                                outline: "none",
                                color: "white",
                                marginBottom: "50px",
                              }}
                            ></button>
                          ) : (
                            ""
                          )}
                          <div className="badge" style={{ top: "20px" }}>
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
                      </Link>
                    ))}
                    {/* {data.map((each) => (
                  <div key={each._id} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <div className="card">
                      <img className="card-img-top" src={each.image} alt="Card image" style={{ width: "100%" }} />
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
                ))} */}
                    {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="card">
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
              </>
            )}
            {/* <div className="row">
            <div className="card-grid">
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div className="card">
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
                  <img className="card-img-top" src="img/Rect2.png" alt="Card image" style={{ width: "100%" }} />
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
              <div className="col-md-12 ">
                <div className="more-listing text-center">
                  {/* <button className="btn btn-orange navbar-btn">Create Itinerary</button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <h3 style={{ textAlign: "center" }}>No Itineraries created yet</h3>
        </div>
      )}
    </>
  );
};

export default MyItineraries;
