import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { getUser } from "../../utils/utils";

type Params = { itineraryId: string };

type EachDetail = {
  day: number;
  stayTitle: string;
  stayDescription: string;
  stayImages: string[];
  services: string[];
  dayTitle: string;
  tasteImages: string[];
  tasteDescription: string;
  vibeDescription: string;
  vibeImages: string[];
  experienceDescription: string;
  highlights: string;
  experienceImages: string[];
};

type Itinerary = Partial<{
  country: string;
  title: string;
  price: string;
  introduction: string;
  image: string;
  salesPitch: string;
  eachDetail: EachDetail[];
  details: string;
  category: string[];
  _id?: string;
  userId?: any;
}>;

const SingleItinerary = (props: any) => {
  const { itineraryId } = useParams() as Params;
  const [data, setData] = useState<Itinerary>({});
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isMy, setIsMy] = useState(false);
  const [purchasedItineraries, setPurchasedItineraries] = useState<string[]>([]);
  const navigate = useNavigate();

  const getItinerary = async () => {
    try {
      let getdata = (await api(`/itinerary/view/${itineraryId}`)) as { data: Itinerary };

      const user = getUser();

      if (user.id === getdata.data.userId?._id) {
        setIsMy(true);
      }

      if (getdata.data) {
        setData(getdata.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      let data = await api.post("/billing/checkout", { itineraryId });

      if (data.data) {
        window.open(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTab = (e: MouseEvent<any>, tab: number) => {
    e.preventDefault();
    setCurrentTab(tab);
  };

  const handleEdit = () => {
    navigate(`/itinerary/edit/${itineraryId}`);
  };

  const getProfile = async () => {
    let user = await api("/users/get-profile");
    setPurchasedItineraries(user.data.user.boughtItineraries);
  };

  useEffect(() => {
    getProfile();
    getItinerary();
  }, []);

  return (
    <>
      <section className="itineraries style-input">
        <div className="container">
          <div className="d-itineraries">
            <div className="row">
              <div className="col-md-6">
                <div className="left-d-itineraries">
                  <ul>
                    {data.category?.map((item) => (
                      <li>{item}</li>
                    ))}
                    {/* <li>Experience</li> */}
                  </ul>
                  <h1>{data.title}</h1>
                  <p>{data.introduction}</p>
                  <div className="row">
                    {isMy ? (
                      <div className="col-md-2 col-sm-2 col-xs-3">
                        <button onClick={handleEdit} className="btn btn-orange navbar-btn">
                          Edit
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-md-3 col-sm-3 col-xs-4">
                      <button onClick={handleCheckout} className="btn btn-orange navbar-btn">
                        Checkout
                      </button>
                    </div>
                    <div className="col-md-4 col-sm-3 col-xs-4">
                      <h3 className="price-sec text-left">
                        Price: <span> ${data.price}</span>
                      </h3>
                    </div>
                    <div className="col-md-4 col-sm-3 col-xs-4"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <img style={{ maxWidth: "550px", borderRadius: "24px" }} src={data.image} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {purchasedItineraries.includes(itineraryId) || isMy ? (
        data.eachDetail?.map((each) => (
          <section className="dt-deatils">
            <div className="container">
              <h4 style={{ marginBottom: "20px" }}>Day {each.day}</h4>
              <div className="row">
                <div className="col-md-12">
                  <div className="details-tabs">
                    <div className="tabbable-panel tabs-pgs">
                      <div className="tabbable-line">
                        <ul className="nav nav-tabs text-center">
                          <li className={currentTab === 0 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 0)} data-toggle="tab">
                              {" "}
                              Stay
                            </a>
                          </li>
                          <li className={currentTab === 1 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 1)} data-toggle="tab">
                              {" "}
                              Taste
                            </a>
                          </li>
                          <li className={currentTab === 2 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 2)} data-toggle="tab">
                              {" "}
                              Vibe
                            </a>
                          </li>
                          <li className={currentTab === 3 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 3)} data-toggle="tab">
                              {" "}
                              Experience
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content">
                          <div className={`tab-pane${currentTab === 0 ? " active" : ""}`} id="tab_default_1">
                            <div className="row">
                              <div className="col-md-3">
                                <h4>Services</h4>
                                <div className="service-options">
                                  <ul className="service-options-ul">
                                    {each.services.map((item) => (
                                      <li>
                                        <span>-</span> {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="col-md-9">
                                <h4>Description:</h4>
                                <p>{each.stayDescription}</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="carousel-reviews broun-block">
                                  <div className="container-fuild">
                                    <div className="row">
                                      <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                          <div className="item active">
                                            <div className="card-slid">
                                              {each.stayImages?.map((image) => (
                                                <div key={image} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                  <div className="card">
                                                    <img
                                                      className="card-img-top"
                                                      src={image}
                                                      alt="Card image"
                                                      style={{ width: "100%" }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        {/* <a
                                            className="left carousel-control"
                                            href="#carousel-reviews"
                                            role="button"
                                            data-slide="prev"
                                          >
                                            <i id="right" className="fa fa-angle-left">
                                              {" "}
                                            </i>
                                          </a>
                                          <a
                                            className="right carousel-control"
                                            href="#carousel-reviews"
                                            role="button"
                                            data-slide="next"
                                          >
                                            <i id="right" className="fa fa-angle-right">
                                              {" "}
                                            </i>
                                          </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={`tab-pane${currentTab === 1 ? " active" : ""}`} id="tab_default_2">
                            <div className="row">
                              <div className="col-md-9">
                                <h4>Description:</h4>
                                <p>{each.tasteDescription}</p>
                              </div>
                              <div className="col-md-3"></div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="carousel-reviews broun-block">
                                  <div className="container-fuild">
                                    <div className="row">
                                      <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                          <div className="item active">
                                            <div className="card-slid">
                                              {each.tasteImages?.map((image) => (
                                                <div key={image} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                  <div className="card">
                                                    <img
                                                      className="card-img-top"
                                                      src={image}
                                                      alt="Card image"
                                                      style={{ width: "100%" }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        <a
                                          className="left carousel-control"
                                          href="#carousel-reviews"
                                          role="button"
                                          data-slide="prev"
                                        >
                                          <i id="right" className="fa fa-angle-left">
                                            {" "}
                                          </i>
                                        </a>
                                        <a
                                          className="right carousel-control"
                                          href="#carousel-reviews"
                                          role="button"
                                          data-slide="next"
                                        >
                                          <i id="right" className="fa fa-angle-right">
                                            {" "}
                                          </i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={`tab-pane${currentTab === 2 ? " active" : ""}`} id="tab_default_3">
                            <div className="row">
                              <div className="col-md-9">
                                <h4>Description:</h4>
                                <p>{each.vibeDescription}</p>
                              </div>
                              <div className="col-md-3"></div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="carousel-reviews broun-block">
                                  <div className="container-fuild">
                                    <div className="row">
                                      <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                          <div className="item active">
                                            <div className="card-slid">
                                              {each.vibeImages?.map((image) => (
                                                <div key={image} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                  <div className="card">
                                                    <img
                                                      className="card-img-top"
                                                      src={image}
                                                      alt="Card image"
                                                      style={{ width: "100%" }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        <a
                                          className="left carousel-control"
                                          href="#carousel-reviews"
                                          role="button"
                                          data-slide="prev"
                                        >
                                          <i id="right" className="fa fa-angle-left">
                                            {" "}
                                          </i>
                                        </a>
                                        <a
                                          className="right carousel-control"
                                          href="#carousel-reviews"
                                          role="button"
                                          data-slide="next"
                                        >
                                          <i id="right" className="fa fa-angle-right">
                                            {" "}
                                          </i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={`tab-pane${currentTab === 3 ? " active" : ""}`} id="tab_default_4">
                            <div className="row">
                              <div className="col-md-3">
                                <h4>Highlights of:</h4>
                                <div className="service-options">
                                  <p>{each.highlights}</p>
                                </div>
                              </div>
                              <div className="col-md-9">
                                <h4>Description:</h4>
                                <p>{each.experienceDescription}</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="carousel-reviews broun-block">
                                  <div className="container-fuild">
                                    <div className="row">
                                      <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                          <div className="item active">
                                            <div className="card-slid">
                                              {each.experienceImages?.map((image) => (
                                                <div key={image} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                  <div className="card">
                                                    <img
                                                      className="card-img-top"
                                                      src={image}
                                                      alt="Card image"
                                                      style={{ width: "100%" }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        <a
                                          className="left carousel-control"
                                          href="#carousel-reviews"
                                          role="button"
                                          data-slide="prev"
                                        >
                                          <i id="right" className="fa fa-angle-left">
                                            {" "}
                                          </i>
                                        </a>
                                        <a
                                          className="right carousel-control"
                                          href="#carousel-reviews"
                                          role="button"
                                          data-slide="next"
                                        >
                                          <i id="right" className="fa fa-angle-right">
                                            {" "}
                                          </i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <div style={{ position: "relative" }}>
          <div id="showBlur">Buy now to show details</div>
          <section className="dt-deatils">
            <div className="container">
              <h4 style={{ marginBottom: "20px" }}>Day 1</h4>
              <div className="row">
                <div className="col-md-12">
                  <div className="details-tabs">
                    <div className="tabbable-panel tabs-pgs">
                      <div className="tabbable-line">
                        <ul className="nav nav-tabs text-center">
                          <li className={currentTab === 0 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 0)} data-toggle="tab">
                              {" "}
                              Stay
                            </a>
                          </li>
                          <li className={currentTab === 1 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 1)} data-toggle="tab">
                              {" "}
                              Taste
                            </a>
                          </li>
                          <li className={currentTab === 2 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 2)} data-toggle="tab">
                              {" "}
                              Vibe
                            </a>
                          </li>
                          <li className={currentTab === 3 ? "active" : ""}>
                            <a onClick={(e) => handleChangeTab(e, 3)} data-toggle="tab">
                              {" "}
                              Experience
                            </a>
                          </li>
                        </ul>

                        <div className="tab-content">
                          <div className={`tab-pane active`} id="tab_default_1">
                            <div className="row">
                              <div className="col-md-3">
                                <h4>Services</h4>
                                <div className="service-options">
                                  <ul className="service-options-ul">
                                    {/* {each.services.map((item) => ( */}
                                    <li>
                                      <span>-</span> Wifi
                                    </li>
                                    {/* ))} */}
                                  </ul>
                                </div>
                              </div>

                              <div className="col-md-9">
                                <h4>Description:</h4>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                  mollit anim id est laborum.
                                </p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <div className="carousel-reviews broun-block">
                                  <div className="container-fuild">
                                    <div className="row">
                                      <div id="carousel-reviews" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                          <div className="item active">
                                            <div className="card-slid">
                                              {data.eachDetail?.[0]?.stayImages?.map((image) => (
                                                <div key={image} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                  <div className="card">
                                                    <img
                                                      className="card-img-top"
                                                      src={image}
                                                      alt="Card image"
                                                      style={{ width: "100%" }}
                                                    />
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                        {/* <a
                                        className="left carousel-control"
                                        href="#carousel-reviews"
                                        role="button"
                                        data-slide="prev"
                                      >
                                        <i id="right" className="fa fa-angle-left">
                                          {" "}
                                        </i>
                                      </a>
                                      <a
                                        className="right carousel-control"
                                        href="#carousel-reviews"
                                        role="button"
                                        data-slide="next"
                                      >
                                        <i id="right" className="fa fa-angle-right">
                                          {" "}
                                        </i>
                                      </a> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SingleItinerary;
