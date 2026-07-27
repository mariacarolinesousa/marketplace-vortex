import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import CreateAd from "../pages/CreateAd/CreateAd";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateAd />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
      