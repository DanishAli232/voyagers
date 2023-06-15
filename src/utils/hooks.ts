import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfUserIsAuthenticated } from "./utils";

const useAuthentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page or another appropriate route
      navigate("/login");
    }
  }, [navigate]);

  // Your authentication-related logic and JWT handling functions here

  return {
    // Expose any necessary variables or functions
  };
};

export default useAuthentication;
