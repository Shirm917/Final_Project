import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Protected = (props) => {
  const { isLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return !isLoggedIn ? null : props.children;
};

export default Protected;
