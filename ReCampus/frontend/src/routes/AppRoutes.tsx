import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import CreateAd from "../pages/CreateAd/CreateAd";
import PrivateRoute from "../components/PrivateRoute";
import AdDetails from "../pages/AdDetails/AdDetails";
import MyAds from "../pages/MyAds/MyAds";
import EditAd from "../pages/EditAd/EditAd";
import Profile from "../pages/Profile/Profile"; 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
        path="/profile"
         element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
      }
        />

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

        <Route
        path="/ads/:id"
        element={<AdDetails />}
        />

        <Route
        path="/my-ads"
        element={
        <PrivateRoute>
        <MyAds />
        </PrivateRoute>
      }
    />
      <Route
        path="/ads/edit/:id"
        element={
        <PrivateRoute>
        <EditAd />
        </PrivateRoute>
        }
      />
      </Routes>
    </BrowserRouter>
  );
}
      