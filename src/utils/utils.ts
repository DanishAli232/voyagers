import api from "./api";
import jwtDecode from "jwt-decode";

export const checkIfUserIsAuthenticated = async () => {
  // Retrieve the JWT token from local storage
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      // Decode the token on the client-side
      const decodedToken = jwtDecode(token) as any;

      // Check if the token is expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token expired, user is not authenticated
        return false;
      }

      // Token is valid and not expired, user is authenticated
      // You can make an authenticated request here to verify the token on the server-side
      const response = await api.get("/users/verify-token");

      if (response.status === 200) {
        // Token is verified on the server-side, user is authenticated
        return true;
      } else {
        // Token verification failed on the server-side, user is not authenticated
        return false;
      }
    } catch (error) {
      // Invalid token, user is not authenticated
      return false;
    }
  } else {
    // No token found, user is not authenticated
    return false;
  }
};
