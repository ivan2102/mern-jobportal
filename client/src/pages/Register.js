import { useState, useEffect } from "react";
import { Logo, FormRowComponent, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isUser: "",
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();

  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  //toggle User
  const toggleUser = () => {
    setValues({ ...values, isUser: !values.isUser });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isUser } = values;

    if (!email || !password || (!isUser && !name)) {
      return displayAlert();
    }

    const currentUser = { name, email, password };

    if (isUser) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isUser ? "Login" : "Register"}</h3>

        {showAlert && <Alert />}

        {/* name */}
        {!values.isUser && (
          <FormRowComponent
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email */}
        <FormRowComponent
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/*password */}
        <FormRowComponent
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isUser ? "Not a user yet" : "Already a user?"}
          <button type="button" onClick={toggleUser} className="member-btn">
            {values.isUser ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
