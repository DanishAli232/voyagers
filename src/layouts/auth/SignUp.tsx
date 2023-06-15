import "./assets/styles/index.css";
import { ChangeEvent, FormEvent, useState } from "react";
import logo from "./assets/images/logo.png";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

type State = {
  email: string;
  password: string;
  username: string;
};

const SignUp = () => {
  const [values, setValues] = useState<State>({ email: "", password: "", username: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let data = await api.post("/users/add-user", values);
      let token = data.data?.token;
      
      if (token) {
        localStorage.setItem("jwt", token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
                <img src={logo} />
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
                <i className="fa fa-eye-open"></i>
                <br />
                <p>Forgot Password?</p>
                <br />

                <button className="btn btn-orange navbar-btn btn-block">Create An Account</button>
              </form>

              <div className="row">
                <div className="col-md-12">
                  <div className="sigup-boxlast ">
                    <h6 className="text-center">
                      Already have an account?
                      <a href="#"> Login</a>
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
