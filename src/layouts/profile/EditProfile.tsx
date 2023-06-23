import "./styles/style.css";
import dp from "../navbar/img/dp.png";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

type Props = {};

const EditProfile = (props: Props) => {
  const [values, setValues] = useState<{ image: File | string; username: string; email: string }>({
    username: "",
    email: "",
    image: "",
  });
  const [isErrored, setIsErrored] = useState<{ username?: string; image?: string; email?: string }>({});
  const [profile, setProfile] = useState<any>({});
  const [isMainLoading, setIsMainLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files?.[0] && setValues({ ...values, image: e.target.files[0] });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdateLoading(true);

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await api.patch("/users", formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const getProfile = async () => {
    setIsMainLoading(true);
    try {
      let user = (await api("/users/get-profile")) as {
        data: {
          user: {
            boughtItineraries: any[];
            _id: string;
            email: string;
            username: string;
            __v: number;
            role: string;
            image: string;
          };
        };
      };
      let { email, username, image } = user.data.user;
      setProfile(user.data);
      setValues({ email, username, image });
    } catch (error) {
      console.log(error);
    } finally {
      setIsMainLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="main-profile">
      <h3>Login</h3>

      {isMainLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          {values.image ? (
            <img
              src={typeof values.image === "string" ? values.image : URL.createObjectURL(values.image)}
              style={{ width: "200px" }}
              alt="Thumbnail"
            />
          ) : (
            <img src={dp} alt="DP" className="dp" />
          )}

          <div>
            <input id="image" onChange={handleChangeImage} type="file" style={{ display: "none" }} />
            <label htmlFor="image" className="btn btn-orange btn-upload" style={{ textDecoration: "none" }}>
              Upload Image
            </label>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label className="control-label" htmlFor="title">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={values.username}
              onChange={handleChange}
              name="username"
            />

            <p
              style={{
                display: isErrored?.username ? "block" : "none",
                color: isErrored?.username ? "red" : "black",
                marginTop: "5px",
              }}
            >
              {isErrored?.username}
            </p>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label className="control-label" htmlFor="title">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              name="email"
            />

            <p
              style={{
                display: isErrored?.email ? "block" : "none",
                color: isErrored?.email ? "red" : "black",
                marginTop: "5px",
              }}
            >
              {isErrored?.email}
            </p>
          </div>

          <button disabled={isUpdateLoading} type="submit" className="btn btn-orange navbar-btn">
            {isUpdateLoading ? <CircularProgress /> : "Save"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
