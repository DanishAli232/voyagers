import "./styles/carousel.css";
import play from "./img/play.png";
import plane from "./img/plane.png";
import stay from "./img/stay.png";
import Slider from "react-slick";
import profile from "./img/profile-picture.jpeg";
import taste from "./img/taste.png";
import img00 from "./img/img00.png";
import img006 from "./img/img006.jpeg";
import img002 from "./img/img002.jpeg";
import img003 from "./img/img003.jpeg";

import vibe from "./img/vibe.png";
import rect from "./img/Rect2.png";
import heroRight from "./img/hero-right.png";
import experience from "./img/experience.png";
import Navbar from "../navbar/Navbar";
import Carousel from "react-multi-carousel";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { checkIfUserIsAuthenticated } from "../../utils/utils";

type Props = {};

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

const Home = () => {
  const [data, setData] = useState<Itinerary[]>([]);
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getItineraries = async () => {
    try {
      let getdata = (await api(`/itinerary?limit=10`)) as { data: Itinerary[] };
      setData(getdata.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyLogin = async () => {
    let isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) setUser(true);
    else setUser(false);
  };

  useEffect(() => {
    verifyLogin();

    getItineraries();
  }, []);

  return (
    <>
      <section className="hero-image">
        <div className="container">
          <Navbar />
          {/* <!-- -----------------------  right image and left text -------------- --> */}
          <div className="row first-section">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="left-first">
                {/* <p className='para-first'>Best Destinations around the world</p> */}
                <h1 className="top-heading" style={{ fontSize: "70px", lineHeight: "62px" }}>
                  EXPERIENCE <span style={{ color: "#ef7a03" }}>SIMPLE</span> TRAVEL{" "}
                  <span style={{ color: "#ef7a03" }}>PLANNING</span> THROUGH{" "}
                  <span style={{ color: "#ef7a03" }}>SOCIAL INTERACTION</span>{" "}
                </h1>

                <div className="row">
                  <div
                    className="col-sm-7 col-md-6 col-lg-6"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="btn btn-orange navbar-btn"
                      onClick={() => {
                        navigate("/auth/sign-up");
                      }}
                    >
                      SIGN UP
                    </button>
                    <h4
                      onClick={() => {
                        navigate("/contact-us");
                      }}
                      style={{
                        marginLeft: "10px",
                        fontFamily: "Work Sans",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      CONTACT US
                    </h4>
                  </div>

                  <div className="col-sm-2 col-md-4"></div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6" style={{ position: "relative", top: "-236px" }}>
              <div className="img-rightone" style={{ zIndex: 1 }}>
                <img src={img00} alt="map" style={{ width: "119%" }} />
              </div>
              <div className="img-rightone">
                <img src={plane} alt="Plane" />
              </div>
              <div className="img-righttwo" style={{ display: "none" }}>
                <img src={heroRight} />
              </div>
              <div className="img-righthre">
                <img src={plane} alt="Plane" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="second-part text-center">
        <div className="container">
          <div className="row">
            <div className="text-area">
              <h3>CATEGORY</h3>
              <h2>We Offer Best Services</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={stay} alt="Stay" />
                  <div className="title">
                    <h4>Stay</h4>
                  </div>
                  <div className="text">
                    <span>Find your next awe-inspiring getaway from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={taste} />
                  <div className="title">
                    <h4>Taste</h4>
                  </div>
                  <div className="text">
                    <span>Find your next soul satisfying meal from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={vibe} alt="vibe" />
                  <div className="title">
                    <h4>Vibe</h4>
                  </div>
                  <div className="text">
                    <span>Find your next happy place from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="box-part text-center">
                <div className="boxhover">
                  <img src={experience} />
                  <div className="title">
                    <h4>Experience</h4>
                  </div>
                  <div className="text">
                    <span>Embark on an unforgettable journey from browsing voyage blogs by</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="topsaling">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="left-first">
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
                      <Carousel itemClass="w-full" responsive={responsive}>
                        {data.map((each) => (
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="client-part">
        <div className="container">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
              <div className="text-area">
                <h3>Testimonials</h3>
                <h2>What are Voyagers are saying about us.</h2>
              </div>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
              <div
                style={{
                  border: "1px solid #00000014",
                  padding: "29px 26px",
                  zIndex: 2,
                  background: "#ffffff",
                  boxShadow: "1px 3px 18px 1px #00000021",
                  borderRadius: "36px",
                }}
              >
                <Slider {...settings}>
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        src={img006}
                        alt=""
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "360px",
                          objectFit: "cover",
                          marginBottom: "17px",
                          zIndex: 3,
                          objectPosition: "center",
                        }}
                      />
                    </div>

                    <p className="text-bg">
                      “Planning any trip takes way too long, being able to connect and plan out the entire trip in one
                      stop is a major win!”
                    </p>
                    <h4
                      style={{
                        marginTop: "21px",
                        fontSize: "18px",
                        color: "#000000ad",
                        fontFamily: "Work Sans",
                        fontWeight: 600,
                      }}
                    >
                      Zamar
                    </h4>
                  </div>
                  <div style={{ border: "1px solid #00000054", padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        src={img002}
                        alt=""
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "360px",
                          objectFit: "cover",
                          marginBottom: "17px",
                          zIndex: 3,
                          objectPosition: "center",
                        }}
                      />
                    </div>

                    <p className="text-bg">
                      “Once I realized I liked traveling a certain way and doing things I like, I had to use My Voyages
                      to find my vibe.”
                    </p>
                    <h4
                      style={{
                        marginTop: "21px",
                        fontSize: "18px",
                        color: "#000000ad",
                        fontFamily: "Work Sans",
                        fontWeight: 600,
                      }}
                    >
                      Angie
                    </h4>
                  </div>
                  <div style={{ border: "1px solid #00000054", padding: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        src={img003}
                        alt=""
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "360px",
                          objectFit: "cover",
                          marginBottom: "17px",
                          zIndex: 3,
                          objectPosition: "center",
                        }}
                      />
                    </div>

                    <p className="text-bg">
                      “After several lackluster trips based off random reviews, experiencing a trip from tailored
                      reviews and insight was game changing from My Voyages!”
                    </p>
                    <h4
                      style={{
                        marginTop: "21px",
                        fontSize: "18px",
                        color: "#000000ad",
                        fontFamily: "Work Sans",
                        fontWeight: 600,
                      }}
                    >
                      Samson
                    </h4>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-part">
        <div className="container">
          <div className="row">
            <div className="text-area text-center">
              <h3>FAQ’s</h3>
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="panel-group" id="accordion">
                <div
                  className={`panel panel-default ${currentTab === 0 ? "" : "collapsed"}`}
                  data-target="#collapseOne"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  onClick={() => (currentTab === 0 ? setCurrentTab(null) : setCurrentTab(0))}
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      What is My Voyages? <i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapseOne"
                    className={`panel-collapse collapse ${currentTab === 0 ? "in" : ""}`}
                    aria-expanded="false"
                    style={{
                      height: currentTab === 0 ? "auto" : "0px",
                      transition: "2s all",
                    }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        My Voyages simplifies travel planning through social interaction. We get it! Between
                        time-consuming planning and wasted money on unreliable reviews, you could easily browse between
                        8-10 different websites and apps. Welcome to travel planning made simple, enjoyable, and
                        efficient for the modern traveler. You can trust our authentic reviews because they’re from
                        like-minded users like you worldwide.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-group" id="accordion">
                <div
                  className={`panel panel-default ${currentTab === 1 ? "" : "collapsed"}`}
                  data-target="#collapsetwo"
                  onClick={() => (currentTab === 1 ? setCurrentTab(null) : setCurrentTab(1))}
                  data-toggle="collapse"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      What do Voyagers do? <i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapsetwo"
                    className={`panel-collapse collapse ${currentTab === 1 ? "in" : ""}`}
                    aria-expanded="false"
                    style={{
                      height: currentTab === 1 ? "auto" : "0px",
                      transition: "2s all",
                    }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        Voyagers can now browse vetted itineraries around the world from some of your favorite travel
                        personalities. If you like what you see, then buy the itinerary, and save yourself hours of
                        research and app browsing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-group" id="accordion">
                <div
                  className={`panel panel-default ${currentTab === 2 ? "" : "collapsed"}`}
                  onClick={() => (currentTab === 2 ? setCurrentTab(null) : setCurrentTab(2))}
                  data-target="#collapsethr"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      What is My Voyages Concierge?
                      <i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapsethr"
                    className={`panel-collapse collapse ${currentTab === 2 ? "in" : ""}`}
                    aria-expanded="false"
                    style={{
                      height: currentTab === 2 ? "auto" : "0px",
                      transition: "2s all",
                    }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        For an additional fee, you will be matched with a MV travel expert whose expertise is in where
                        you are headed. You are provided your own personal concierge from planning to experience in a
                        fashion that can only be found at My Voyages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-group" id="accordion">
                <div
                  className={`panel panel-default ${currentTab === 3 ? "" : "collapsed"}`}
                  onClick={() => (currentTab === 3 ? setCurrentTab(null) : setCurrentTab(3))}
                  data-target="#collapsethr"
                  data-toggle="collapse"
                  data-parent="#accordion"
                  aria-expanded="false"
                >
                  <div className="panel-heading">
                    <h4 className="panel-title">
                      I want to become a trusted My Voyages Seller?
                      <i className="fa fa-angle-down"></i>
                    </h4>
                  </div>
                  <div
                    id="collapsethr"
                    className={`panel-collapse collapse ${currentTab === 3 ? "in" : ""}`}
                    aria-expanded="false"
                    style={{
                      height: currentTab === 3 ? "auto" : "0px",
                      transition: "2s all",
                    }}
                  >
                    <div className="panel-body">
                      <p className="text-bg">
                        Does everyone come to you for travel ideas, or restaurant ideas, or just for the vibes in
                        general? Do you want to finally make money for putting together those fantastic experiences
                        together for other people. If this sounds like you, send us an email at: info@myvoyages.com and
                        we will reach out to you with next steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="text-center">
                <button className="btn org-faq">
                  Show more <i className="fa fa-angle-down"></i>
                </button>
              </div> */}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
