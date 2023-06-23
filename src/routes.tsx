import { LazyExoticComponent, ReactElement, lazy, useEffect, useState } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Navbar from "./layouts/navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./layouts/footer/Footer";
import StripeConnect from "./layouts/stripe/StripeConnect";
import AuthGuardRoute from "./components/AuthGuardRoute";
import { getUserRole } from "./utils/utils";
import EditItinerary from "./layouts/editItinerary/EditItinerary";
import EditProfile from "./layouts/profile/EditProfile";

const Home = lazy(() => import("./layouts/home/Home"));
const CreateItinerary = lazy(() => import("./layouts/createItinerary/CreateItinerary"));
const SignUp = lazy(() => import("./layouts/auth/SignUp"));
const SignIn = lazy(() => import("./layouts/auth/SignIn"));
const MyItineraries = lazy(() => import("./layouts/itinieraries/MyItineraries")) as any;
const Itineraries = lazy(() => import("./layouts/itinieraries/Itineraries")) as any;
const SingleItinerary = lazy(() => import("./layouts/singleItinerary/SingleItinerary"));

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
    element: <AuthGuardRoute Element={SignIn} />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/stripe/connect",
    element: (
      <>
        <Navbar />
        <ProtectedRoute Element={StripeConnect} />
      </>
    ),
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
      {
        path: "/itinerary/list",
        element: <ProtectedRoute Element={Itineraries} />,
      },
      { path: "/itinerary/create", element: <ProtectedRoute Element={CreateItinerary} /> },
      { path: "/itinerary/me", element: <ProtectedRoute Element={MyItineraries} /> },
      { path: "/itinerary/view/:itineraryId", element: <ProtectedRoute Element={SingleItinerary} /> },
      { path: "/itinerary/edit/:itineraryId", element: <ProtectedRoute Element={EditItinerary} /> },
      { path: "/profile/edit", element: <ProtectedRoute Element={EditProfile} /> },
    ],
  },
]);

function TrueIfSeller({ Component, Otherwise }: { Component: any; Otherwise: any }) {
  // Check user role here and return the corresponding component
  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    const userRole = getUserRole(); // Replace this with your logic to get the user's role

    if (userRole === "seller") {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
  });

  return isTrue ? <Component /> : <Otherwise />;
}

export default router;
