import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";
import CircularProgress from "./components/CircularProgress/CircularProgress";

const Loader = () => {
  return (
    <div className="main-loader">
      <CircularProgress />
    </div>
  );
};

function App() {
  return (
    <div className="h-screen">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
