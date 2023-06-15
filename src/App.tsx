import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <div className="h-screen">
      <Suspense fallback={<h1>Loading</h1>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
