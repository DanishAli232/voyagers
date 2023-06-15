import { lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./layouts/navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleItinerary from "./layouts/singleItinerary/SingleItinerary";
import Footer from "./layouts/footer/Footer";

const Home = lazy(() => import("./layouts/home/Home"));
const CreateItinerary = lazy(() => import("./layouts/createItinerary/CreateItinerary"));
const SignUp = lazy(() => import("./layouts/auth/SignUp"));
const SignIn = lazy(() => import("./layouts/auth/SignIn"));
const MyItineraries = lazy(() => import("./layouts/itinieraries/MyItineraries"));
const Itineraries = lazy(() => import("./layouts/itinieraries/Itineraries"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/auth/login",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: "/itinerary/list", element: <ProtectedRoute Element={Itineraries} /> },
      { path: "/itinerary/create", element: <ProtectedRoute Element={CreateItinerary} /> },
      { path: "/itinerary/me", element: <ProtectedRoute Element={MyItineraries} /> },
      { path: "/itinerary/view/:itineraryId", element: <ProtectedRoute Element={SingleItinerary} /> },
    ],
  },
]);

export default router;
