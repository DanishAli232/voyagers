import { useEffect, useState } from "react";
import api from "../../utils/api";
import "./style.css";
import "./slider.css";
import "./carousel.css";

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

const MyItineraries = (props: Props) => {
  const [data, setData] = useState<Itinerary[]>([]);

  const getItineraries = async () => {
    let getdata = (await api("/itinerary")) as { data: Itinerary[] };
    setData(getdata.data);
  };

  useEffect(() => {
    getItineraries();
  }, []);

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
                <button className="btn btn-orange navbar-btn">Create Itinerary</button>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>
        </div>
      </section>
      <section className="topsaling">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="left-first">
                <p className="para-first">Top Selling</p>
                <h1 className="top-heading">
                  Top <span className="first-textbg">ITINERARIES</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-reviews broun-block">
          <div className="container-fuild">
            <div className="row">
              <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="card-slid">
                      {data.map((each) => (
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12" key={each._id}>
                          <div className="card">
                            <img className="card-img-top" src={each.image} alt="Card image" style={{ width: "100%" }} />
                            <div className="badge">
                              <p>{each.category[0]}</p>
                            </div>
                            <div className="card-body">
                              <h4 className="card-title">{each.title}</h4>
                              <div className="subtitle">
                                <span className="a">Created by:</span>
                                <span className="b">Tichelle Richards</span>
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
                </div>
                <a className="left carousel-control" href="#carousel-reviews" role="button" data-slide="prev">
                  <i id="right" className="fa fa-angle-left">
                    {" "}
                  </i>
                </a>
                <a className="right carousel-control" href="#carousel-reviews" role="button" data-slide="next">
                  <i id="right" className="fa fa-angle-right">
                    {" "}
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              ))}
              {data.map((each) => (
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
              ))}
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
                <button className="btn btn-orange navbar-btn">Create Itinerary</button>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default MyItineraries;
