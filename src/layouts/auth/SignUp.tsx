import "./assets/styles/index.css";
import { ChangeEvent, FormEvent, useState } from "react";
import logo from "./assets/images/logo.png";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

type State = {
  email: string;
  password: string;
  username: string;
  role: string;
};

const SignUp = () => {
  const [values, setValues] = useState<State>({ email: "", password: "", username: "", role: "user" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let data = await api.post("/users/add-user", values);
      let token = data.data?.token;

      if (token) {
        localStorage.setItem("jwt", token);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      setErrors(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="sigup-box">
              <div className="text-center">
                <Link to="/">
                  <img src={logo} />
                </Link>
                <h1>Create your My Voyages Account</h1>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="control-label" htmlFor="Username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  name="username"
                />

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.username ? "block" : "none",
                    color: errors?.username ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors.username}
                </p>
                <br />
                <label className="control-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  name="email"
                />

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.email ? "block" : "none",
                    color: errors?.email ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors.email}
                </p>
                <br />
                <label className="control-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  name="password"
                />

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.password ? "block" : "none",
                    color: errors?.password ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors.password}
                </p>
                <i className="fa fa-eye-open"></i>
                <div className="seller-opt">
                  <label htmlFor="role">Are you a seller?</label>
                  <input
                    value={values.role}
                    onChange={(e) => setValues({ ...values, role: values.role === "seller" ? "user" : "seller" })}
                    id="role"
                    type="checkbox"
                    aria-label="..."
                  />
                </div>

                <p
                  style={{
                    textAlign: "center",
                    display: errors?.message ? "block" : "none",
                    color: errors?.message ? "red" : "black",
                    marginTop: "5px",
                  }}
                >
                  {errors.message}
                </p>

                <br />
                <p>Forgot Password?</p>
                <br />

                <button className="btn btn-orange navbar-btn btn-block">
                  {isLoading ? <CircularProgress /> : "Create An Account"}
                </button>
              </form>

              <div className="row">
                <div className="col-md-12">
                  <div className="sigup-boxlast ">
                    <h6 className="text-center">
                      Already have an account?
                      <Link to="/auth/login"> Login</Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2"></div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
