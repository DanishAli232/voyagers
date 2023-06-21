import { ChangeEvent, DragEvent, FormEvent, ReactElement, useEffect, useState } from "react";

import api from "../../utils/api";
import Modal from "react-modal";

import "./assets/styles/index.css";
import "./assets/styles/carousel.css";
import upload from "./assets/images/Upload.png";
import { useParams } from "react-router-dom";

type Params = { itineraryId: string };

type Props = {};

type EachDetail = {
  day: number;
  stayTitle: string;
  stayDescription: string;
  stayImages?: File[];
  services: string[];
  dayTitle: string;
  tasteImages?: File[];
  tasteDescription: string;
  vibeDescription: string;
  vibeImages?: File[];
  experienceDescription: string;
  highlights: string;
  experienceImages?: File[];
};

type Values = {
  country: string;
  title: string;
  price: string;
  introduction: string;
  image?: File;
  salesPitch: string;
  eachDetail: EachDetail[];
  details: string;
  category: string[];
};

const EditItinerary = (props: Props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isErrored, setIsErrored] = useState<any>({});
  const [currentTab, setCurrentTab] = useState(0);
  const [dayForDelete, setDayForDelete] = useState<number | null>(null);
  const [values, setValues] = useState<Values>({
    country: "",
    category: [],
    details: "",

    introduction: "",
    price: "",
    salesPitch: "",
    eachDetail: [
      {
        day: 1,
        stayTitle: "",
        stayDescription: "",

        services: [],
        dayTitle: "",
        experienceDescription: "",
        highlights: "Some highlights",
        tasteDescription: "",
        vibeDescription: "",
      },
    ],
    title: "",
  });
  const { itineraryId } = useParams() as Params;
  const [days, setDays] = useState<number>(1);

  const handleChange = (e: ChangeEvent<any>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeDays = (type: string) => {
    // setDays(Number(e.target.value));
    if (type === "+") {
      let detail = [
        ...values.eachDetail,
        {
          day: values.eachDetail.length + 1,
          stayTitle: "",
          stayDescription: "",
          role: "user",
          stayImages: [],
          services: [],
          dayTitle: "",
          experienceDescription: "",
          experienceImages: [],
          highlights: "Some highlights",
          tasteDescription: "",
          tasteImages: [],
          vibeDescription: "",
          vibeImages: [],
        },
      ];
      setValues({ ...values, eachDetail: detail });
      setDays(days + 1);
    } else if (type === "-") {
      setDays(days - 1);
      setValues({ ...values, eachDetail: values.eachDetail.slice(0, values.eachDetail.length - 1) });
    }

    // let eachDetail = [];
    // for (let i = 0; i < Number(e.target.value); i++) {
    //   eachDetail.push({
    //     day: i + 1,
    //     stayTitle: "",
    //     stayDescription: "",
    //     role: "user",
    //     stayImages: [],
    //     services: [],
    //     dayTitle: "",
    //     experienceDescription: "",
    //     experienceImages: [],
    //     highlights: "Some highlights",
    //     tasteDescription: "",
    //     tasteImages: [],
    //     vibeDescription: "",
    //     vibeImages: [],
    //   });
    // }
    // setValues({ ...values, eachDetail: eachDetail });
  };

  const getItinerary = async () => {
    const data = (await api(`/itinerary/view/${itineraryId}`)) as { data: Values };
    setValues({
      eachDetail: data.data.eachDetail,
      country: data.data.country,
      category: data.data.category,
      introduction: data.data.introduction,
      price: data.data.price,
      salesPitch: data.data.salesPitch,
      title: data.data.title,
      image: data.data.image,
      details: "",
    });
  };

  useEffect(() => {
    getItinerary();
  }, []);

  const changeServices = (title: string, day: number) => {
    if (values.eachDetail[day - 1].services.includes(title)) {
      let filtered = values.eachDetail[day - 1].services.filter((each) => each !== title);
      let newDetail = values.eachDetail.map((each) => (each.day === day ? { ...each, services: filtered } : each));

      setValues({ ...values, eachDetail: newDetail });
    } else {
      let details = values.eachDetail.map((item) => {
        if (item.day === day) {
          return { ...item, services: [...item.services, title] };
        } else return item;
      });

      setValues({ ...values, eachDetail: details });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, image: e.target?.files?.[0] });
  };

  const handlefilesChange = (
    e: ChangeEvent<any>,
    day: number,
    type: "stayImages" | "experienceImages" | "tasteImages" | "vibeImages"
  ) => {
    let eachDetail = values.eachDetail.map((each) => {
      if (each.day === day) return { ...each, [type]: [...(each[type] || []), ...e.target.files] };
      else return each;
    }) as EachDetail[];

    setValues({ ...values, eachDetail });
  };

  const handleChangeItem = (e: ChangeEvent<any>, day: number) => {
    let newData = values.eachDetail.map((each) => {
      if (each.day === day) {
        return { ...each, [e.target.name]: e.target.value };
      } else return each;
    }) as EachDetail[];

    setValues({ ...values, eachDetail: newData });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Add non-file values to the formData
      formData.append("country", values.country);
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("category", JSON.stringify(values.category));
      formData.append("introduction", values.introduction);
      formData.append("salesPitch", values.salesPitch);
      // formData.append("eachDetail", values.salesPitch);
      // formData.append("eachDetail", JSON.stringify(values.eachDetail));
      // Add other non-file fields to the formData

      // Add image file to the formData
      if (values.image) {
        formData.append("image", values.image);
      }

      // Iterate through eachDetail array and add files to formData
      values.eachDetail.forEach((each) => {
        if (each.stayImages) {
          each.stayImages.forEach((file, index) => {
            formData.append(`eachDetail[${each.day}].stayImages[${index}]`, file);
          });
        }

        if (each.vibeImages) {
          each.vibeImages.forEach((file, index) => {
            formData.append(`eachDetail[${each.day}].vibeImages[${index}]`, file);
          });
        }

        if (each.tasteImages) {
          each.tasteImages.forEach((file, index) => {
            formData.append(`eachDetail[${each.day}].tasteImages[${index}]`, file);
          });
        }

        if (each.experienceImages) {
          each.experienceImages.forEach((file, index) => {
            formData.append(`eachDetail[${each.day}].experienceImages[${index}]`, file);
          });
        }

        // Repeat the same process for other image fields in eachDetail
      });

      let eachData = [] as any;

      values.eachDetail.forEach((data) => {
        let stayImages = data.stayImages?.filter((image) => typeof image === "string");
        let tasteImages = data.tasteImages?.filter((image) => typeof image === "string");
        let experienceImages = data.experienceImages?.filter((image) => typeof image === "string");
        let vibeImages = data.vibeImages?.filter((image) => typeof image === "string");

        eachData.push({
          dayTitle: data.dayTitle,
          experienceDescription: data.experienceDescription,
          services: data.services,
          highlights: data.highlights,
          stayDescription: data.stayDescription,
          stayTitle: data.stayTitle,
          stayImages,
          tasteImages,
          experienceImages,
          vibeImages,
          tasteDescription: data.tasteDescription,
          vibeDescription: data.vibeDescription,
          day: data.day,
        });
      });

      formData.append("eachDetail", JSON.stringify(eachData));

      // Make the POST request using Axios
      const response = await api.patch(`/itinerary/${itineraryId}`, formData);
      console.log(response.data); // Handle the server response

      // Reset the form or perform any other necessary actions
    } catch (error: any) {
      if (error.response?.data) {
        setIsErrored(error.response?.data);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let droppedFile = e.dataTransfer.files[0];
    setValues({ ...values, image: droppedFile });
  };

  const handleDragImagesOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropImages = (
    e: DragEvent<HTMLDivElement>,
    day: number,
    type: "stayImages" | "experienceImages" | "tasteImages" | "vibeImages"
  ) => {
    e.preventDefault();
    let eachDetail = values.eachDetail.map((each) => {
      if (each.day === day) return { ...each, [type]: [...(each[type] || []), ...Array.from(e.dataTransfer.files)] };
      else return each;
    }) as EachDetail[];

    setValues({ ...values, eachDetail });

    // let droppedFile = e.dataTransfer.files[0];
    // setValues({ ...values, image: droppedFile });
  };

  const clearImage = (
    title: "stayImages" | "experienceImages" | "tasteImages" | "vibeImages",
    key: number,
    day: number
  ) => {
    let newValues = values.eachDetail.map((each) => {
      if (each.day === day) {
        return { ...each, [title]: each[title]?.filter((each, idx) => idx !== key) };
      } else return each;
    });

    setValues({ ...values, eachDetail: newValues });
    // values.eachDetail[day-1].
  };

  const deleteDay = () => {
    const newValues = values.eachDetail.filter((each) => each.day !== dayForDelete);
    setValues({ ...values, eachDetail: newValues });
    setDayForDelete(null);
    setDays(days - 1);

    api.patch("/itinerary/deleteDay", { itineraryId, newValues });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row first-section text-center">
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="left-first">
                <h1 className="top-heading">Select Country </h1>
                <select
                  className="form-select"
                  id="country"
                  value={values.country}
                  onChange={handleChange}
                  name="country"
                >
                  <option>select country</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Aland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, Democratic Republic of the Congo</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Cote D'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curacao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and Mcdonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea, Democratic People's Republic of</option>
                  <option value="KR">Korea, Republic of</option>
                  <option value="XK">Kosovo</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libyan Arab Jamahiriya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="AN">Netherlands Antilles</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Reunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthelemy</option>
                  <option value="SH">Saint Helena</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="CS">Serbia and Montenegro</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia and the South Sandwich Islands</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.s.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>

                <p
                  style={{
                    display: isErrored?.country ? "block" : "none",
                    color: isErrored?.country ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {isErrored.country}
                </p>
                <h2 className="top-heading">Please fill out the itinerary FORM below</h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2"></div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6" onDrop={handleDrop} onDragOver={handleDragOver}>
              <div className="upload-file">
                {values.image ? (
                  <img
                    src={typeof values.image === "string" ? values.image : URL.createObjectURL(values.image)}
                    style={{ width: "200px" }}
                    alt="Thumbnail"
                  />
                ) : (
                  <img src={upload} alt="Upload" />
                )}
                <p>Drag your thumbnail here</p>
                <div>
                  <input id="thumbnail" type="file" style={{ display: "none" }} onChange={handleFileChange} />
                  <label htmlFor="thumbnail" style={{ textDecoration: "underline" }}>
                    Upload from your device
                  </label>
                </div>
              </div>

              <p
                style={{
                  display: isErrored?.image ? "block" : "none",
                  color: isErrored?.image ? "red" : "black",
                  marginTop: "5px",
                }}
              >
                {isErrored.image}
              </p>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <label className="control-label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter Title"
                value={values.title}
                onChange={handleChange}
                name="title"
              />

              <p
                style={{
                  display: isErrored?.title ? "block" : "none",
                  color: isErrored?.title ? "red" : "black",
                  marginTop: "5px",
                }}
              >
                {isErrored.title}
              </p>
              <br />
              <label className="control-label" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                value={values.price}
                onChange={handleChange}
                className="form-control"
                id="price"
                placeholder="Enter Price"
                name="price"
              />

              <p
                style={{
                  display: isErrored?.price ? "block" : "none",
                  color: isErrored?.price ? "red" : "black",
                  marginTop: "5px",
                }}
              >
                {isErrored.price}
              </p>
              <br />

              <div>
                <div>
                  <label className="control-label" htmlFor="days">
                    Days
                  </label>
                </div>
                <div className="days-input">
                  <input
                    type="number"
                    value={days}
                    onKeyDown={(event) => {
                      if (!/[0-9|Backspace|Delete]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    formEncType="number"
                    disabled
                    id="days"
                    className="form-control"
                    itemType="number"
                    placeholder="Enter Days"
                    name="days"
                  />
                </div>

                <span
                  onClick={() => handleChangeDays("+")}
                  className="glyphicon glyphicon-plus"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  aria-hidden="true"
                ></span>

                <span
                  onClick={() => handleChangeDays("-")}
                  className="glyphicon glyphicon-minus"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  aria-hidden="true"
                ></span>
              </div>

              <br />

              <label className="control-label" htmlFor="introduction">
                Introduction
              </label>
              <textarea name="introduction" id="introduction" value={values.introduction} onChange={handleChange}>
                Write your intro...
              </textarea>

              <p
                style={{
                  display: isErrored?.introduction ? "block" : "none",
                  color: isErrored?.introduction ? "red" : "black",
                  marginTop: "5px",
                }}
              >
                {isErrored.introduction}
              </p>
              <br />
            </div>
          </div>

          <div className="row spc-2nd">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <label className="control-label" htmlFor="message">
                Include a descriptive sales pitch for the payment page of itinerary
              </label>
              <textarea
                placeholder="Write your detail...."
                name="salesPitch"
                onChange={handleChange}
                value={values.salesPitch}
              ></textarea>

              <p
                style={{
                  display: isErrored?.salesPitch ? "block" : "none",
                  color: isErrored?.salesPitch ? "red" : "black",
                  marginTop: "5px",
                }}
              >
                {isErrored.salesPitch}
              </p>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <label className="control-label" htmlFor="message">
                Choose a category for this itinerary:
              </label>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div
                    className="check-option"
                    onClick={() =>
                      setValues({ ...values, category: Array.from(new Set([...values.category, "stay"])) })
                    }
                  >
                    <input aria-selected="true" checked={values.category.includes("stay")} type="checkbox" />
                    <label className="container-radio">Stay</label>
                  </div>
                  <div
                    className="check-option"
                    onClick={() =>
                      setValues({ ...values, category: Array.from(new Set([...values.category, "taste"])) })
                    }
                  >
                    <input type="checkbox" checked={values.category.includes("taste")} />
                    <label className="container-radio">Taste</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div
                    className="check-option"
                    onClick={() =>
                      setValues({ ...values, category: Array.from(new Set([...values.category, "vibe"])) })
                    }
                  >
                    <input type="checkbox" checked={values.category.includes("vibe")} />
                    <label className="container-radio">Vibe</label>
                  </div>
                  <div
                    className="check-option"
                    onClick={() =>
                      setValues({ ...values, category: Array.from(new Set([...values.category, "experience"])) })
                    }
                  >
                    <input type="checkbox" checked={values.category.includes("experience")} />
                    <label className="container-radio">Experience</label>
                  </div>
                </div>
              </div>

              <p
                style={{
                  display: isErrored?.category ? "block" : "none",
                  color: isErrored?.category ? "red" : "black",
                  marginTop: "5px",
                }}
              >
                {isErrored.category}
              </p>
            </div>
          </div>
          <div className="row ">
            <h2 className="top-heading text-center">Please fill out the itinerary FORM below</h2>
          </div>

          <Modal
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
            isOpen={typeof dayForDelete === "number"}
          >
            <div>
              <h4>Are you sure you want to delete this day?</h4>
              <div className="button-group">
                <button
                  style={{ marginRight: "20px" }}
                  onClick={() => deleteDay()}
                  className="btn btn-danger navbar-btn"
                >
                  Delete
                </button>
                <button className="btn btn-success navbar-btn" onClick={() => setDayForDelete(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </Modal>

          {values.eachDetail.map((item, idx) => (
            <div
              className="row"
              style={{
                marginTop: "100px",
              }}
            >
              <div className="col-md-12">
                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                  <button
                    type="button"
                    onClick={() => setDayForDelete(item.day)}
                    className="glyphicon glyphicon-trash"
                    style={{
                      background: "#f1a501",
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      border: "none",
                      outline: "none",
                      color: "white",
                      marginBottom: "50px",
                    }}
                  ></button>
                </div>
                <h3 style={{ textAlign: "center" }}>Day {idx + 1}</h3>
                <input
                  type="text"
                  value={item.dayTitle}
                  onChange={(e) => handleChangeItem(e, item.day)}
                  className="form-control"
                  id="dayTitle"
                  style={{ width: "50%", margin: "auto", marginBottom: "10px" }}
                  placeholder={`Enter ${
                    idx + 1 === 1
                      ? `${idx + 1}st`
                      : idx + 1 === 2
                      ? `${idx + 1}nd`
                      : idx + 1 === 3
                      ? `${idx + 1}rd`
                      : `${idx + 1}th`
                  } day's Title`}
                  name="dayTitle"
                />
                <div className="tabbable-panel tabs-pgs">
                  <div className="tabbable-line">
                    <ul className="nav nav-tabs text-center">
                      <li className={`${currentTab === 0 ? "active" : ""}`}>
                        <button
                          type="button"
                          onClick={() => setCurrentTab(0)}
                          className={`${currentTab > 0 ? "complete" : ""}`}
                        >
                          Stay
                        </button>
                      </li>

                      <li className={`${currentTab === 1 ? "active" : ""}`}>
                        <button
                          type="button"
                          onClick={() => setCurrentTab(1)}
                          className={`${currentTab > 1 ? "complete" : ""}`}
                        >
                          Taste
                        </button>
                      </li>

                      <li className={`${currentTab === 2 ? "active" : ""}`}>
                        <button
                          type="button"
                          onClick={() => setCurrentTab(2)}
                          className={`${currentTab > 2 ? "complete" : ""}`}
                        >
                          Vibe
                        </button>
                      </li>

                      <li className={`${currentTab === 3 ? "active" : ""}`}>
                        <button type="button" onClick={() => setCurrentTab(3)}>
                          Experience
                        </button>
                      </li>
                    </ul>

                    <div className="tab-content">
                      <div className={`tab-pane${currentTab === 0 ? " active" : ""}`} id="tab_default_1">
                        <div className="row">
                          <h2 className="top-heading text-center">Tell about your stay</h2>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="service-options">
                              <ul className="service-options-ul">
                                <li>
                                  <label className="control-label" htmlFor="message">
                                    Select Services:
                                  </label>
                                </li>
                                <li onClick={() => changeServices("room service", item.day)}>
                                  <input type="checkbox" />
                                  <label className="container-radio">Room Service</label>
                                </li>
                                <li onClick={() => changeServices("wifi", item.day)}>
                                  <input type="checkbox" />
                                  <label className="container-radio">Wifi</label>
                                </li>
                                <li onClick={() => changeServices("mini bar", item.day)}>
                                  <input type="checkbox" />
                                  <label className="container-radio">Mini Bar</label>
                                </li>
                                <li onClick={() => changeServices("bath tub & shower", item.day)}>
                                  <input type="checkbox" />
                                  <label className="container-radio">Bath Tub & Shower</label>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <textarea
                              name="stayDescription"
                              className="text-details"
                              value={item.stayDescription}
                              onChange={(e) => handleChangeItem(e, item.day)}
                              placeholder="Write your detail...."
                            />
                          </div>
                          <div
                            className="col-md-6"
                            onDrop={(e) => handleDropImages(e, item.day, "stayImages")}
                            onDragOver={handleDragImagesOver}
                          >
                            <div className="upload-file">
                              <p>Drag your images here</p>
                              <div>
                                <input
                                  id={`day${item.day}image`}
                                  type="file"
                                  multiple
                                  style={{ display: "none" }}
                                  onChange={(e) => handlefilesChange(e, item.day, "stayImages")}
                                />
                                <label htmlFor={`day${item.day}image`} style={{ textDecoration: "underline" }}>
                                  Upload from your device
                                </label>
                              </div>
                            </div>

                            <div className="images-upload">
                              <ul>
                                {item.stayImages?.map((image, idx) => (
                                  <li>
                                    <i
                                      className="fa fa-window-close"
                                      onClick={() => clearImage("stayImages", idx, item.day)}
                                    ></i>
                                    <img
                                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                      alt="icon"
                                    />
                                  </li>
                                ))}
                                {/* <li>
                                <img src={img2} alt="icon" />
                              </li>
                              <li>
                                <img src={img3} alt="icon" />
                              </li>
                              <li>
                                <img src={img4} alt="icon" />
                              </li>
                              <li>
                                <img src={img5} alt="icon" />
                              </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`tab-pane${currentTab === 1 ? " active" : ""}`} id="tab_default_2">
                        <div className="row">
                          <h2 className="top-heading text-center">Tell about your culinary experience TASTE</h2>
                        </div>
                        <div className="row pd-tb">
                          <div className="col-md-6">
                            <textarea
                              name="tasteDescription"
                              value={item.tasteDescription}
                              onChange={(e) => handleChangeItem(e, item.day)}
                              className="text-details"
                              placeholder="Write your detail...."
                            ></textarea>
                          </div>
                          <div
                            className="col-md-6"
                            onDrop={(e) => handleDropImages(e, item.day, "tasteImages")}
                            onDragOver={handleDragImagesOver}
                          >
                            <div className="upload-file">
                              <p>Drag your images here</p>
                              <div>
                                <input
                                  id={`day${item.day}taste-image`}
                                  type="file"
                                  multiple
                                  style={{ display: "none" }}
                                  onChange={(e) => handlefilesChange(e, item.day, "tasteImages")}
                                />
                                <label htmlFor={`day${item.day}taste-image`} style={{ textDecoration: "underline" }}>
                                  Upload from your device
                                </label>
                              </div>
                            </div>

                            <div className="images-upload">
                              <ul>
                                {item.tasteImages?.map((image, idx) => (
                                  <li>
                                    <i
                                      className="fa fa-window-close"
                                      onClick={() => clearImage("tasteImages", idx, item.day)}
                                    ></i>
                                    <img
                                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                      alt="icon"
                                    />
                                  </li>
                                ))}
                                {/* <li>
                                <img src={img2} alt="icon" />
                              </li>
                              <li>
                                <img src={img3} alt="icon" />
                              </li>
                              <li>
                                <img src={img4} alt="icon" />
                              </li>
                              <li>
                                <img src={img5} alt="icon" />
                              </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`tab-pane${currentTab === 2 ? " active" : ""}`} id="tab_default_3">
                        <div className="row">
                          <h2 className="top-heading text-center">Tell about the vibe</h2>
                        </div>
                        <div className="row pd-tb">
                          <div className="col-md-6">
                            <textarea
                              name="vibeDescription"
                              value={item.vibeDescription}
                              onChange={(e) => handleChangeItem(e, item.day)}
                              className="text-details"
                              placeholder="Write your detail...."
                            ></textarea>
                          </div>
                          <div
                            className="col-md-6"
                            onDrop={(e) => handleDropImages(e, item.day, "vibeImages")}
                            onDragOver={handleDragImagesOver}
                          >
                            <div className="upload-file">
                              <p>Drag your images here</p>
                              <div>
                                <input
                                  id={`day${item.day}-vibe-image`}
                                  type="file"
                                  multiple
                                  style={{ display: "none" }}
                                  onChange={(e) => handlefilesChange(e, item.day, "vibeImages")}
                                />
                                <label htmlFor={`day${item.day}-vibe-image`} style={{ textDecoration: "underline" }}>
                                  Upload from your device
                                </label>
                              </div>
                            </div>

                            <div className="images-upload">
                              <ul>
                                {item.vibeImages?.map((image, idx) => (
                                  <li>
                                    <i
                                      className="fa fa-window-close"
                                      onClick={() => clearImage("vibeImages", idx, item.day)}
                                    ></i>
                                    <img
                                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                      alt="icon"
                                    />
                                  </li>
                                ))}
                                {/* <li>
                                <img src={img2} alt="icon" />
                              </li>
                              <li>
                                <img src={img3} alt="icon" />
                              </li>
                              <li>
                                <img src={img4} alt="icon" />
                              </li>
                              <li>
                                <img src={img5} alt="icon" />
                              </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className={`tab-pane${currentTab === 3 ? " active" : ""}`} id="tab_default_4">
                        <div className="row">
                          <h2 className="top-heading text-center">Provide an intriguing banner of your experience</h2>
                        </div>

                        <div className="row pd-tb">
                          <div className="col-md-6">
                            <textarea
                              name="experienceDescription"
                              value={item.experienceDescription}
                              onChange={(e) => handleChangeItem(e, item.day)}
                              className="text-details"
                              placeholder="Write your detail...."
                            ></textarea>
                          </div>
                          <div
                            className="col-md-6"
                            onDrop={(e) => handleDropImages(e, item.day, "experienceImages")}
                            onDragOver={handleDragImagesOver}
                          >
                            <div className="upload-file">
                              <p>Drag your images here</p>
                              <div>
                                <input
                                  id={`day${item.day}-experience-image`}
                                  type="file"
                                  multiple
                                  style={{ display: "none" }}
                                  onChange={(e) => handlefilesChange(e, item.day, "experienceImages")}
                                />
                                <label
                                  htmlFor={`day${item.day}-experience-image`}
                                  style={{ textDecoration: "underline" }}
                                >
                                  Upload from your device
                                </label>
                              </div>
                            </div>

                            <div className="images-upload">
                              <ul>
                                {item.experienceImages?.map((image, idx) => (
                                  <li>
                                    <i
                                      className="fa fa-window-close"
                                      onClick={() => clearImage("experienceImages", idx, item.day)}
                                    ></i>
                                    <img
                                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                      alt="icon"
                                    />
                                  </li>
                                ))}
                                {/* <li>
                                <img src={img2} alt="icon" />
                              </li>
                              <li>
                                <img src={img3} alt="icon" />
                              </li>
                              <li>
                                <img src={img4} alt="icon" />
                              </li>
                              <li>
                                <img src={img5} alt="icon" />
                              </li> */}
                              </ul>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isComplete && <p>Itinerary created successfuly</p>}
          <div className="row">
            <div className="col-md-12 text-center">
              <button type="submit" className="btn btn-orange navbar-btn">
                Submit Itinerary
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditItinerary;
