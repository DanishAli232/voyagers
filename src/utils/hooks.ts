import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfUserIsAuthenticated } from "./utils";

const useAuthentication = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    // Check if the user is authenticated
    const isAuthenticated = await checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page or another appropriate route
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  // Your authentication-related logic and JWT handling functions here

  return {
    // Expose any necessary variables or functions
  };
};

export const useAuthGuard = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    // Check if the user is authenticated
    const isAuthenticated = await checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      // If not authenticated, redirect to the login page or another appropriate route
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  // Your authentication-related logic and JWT handling functions here

  return {
    // Expose any necessary variables or functions
  };
};

export default useAuthentication;
