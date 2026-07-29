import MyAds from "./pages/MyAds/MyAds";
import Profile from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateAd from "./pages/CreateAd/CreateAd";

export default function App() {
  return (
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
        path="/register" 
        element={<Register />} 
      />

      <Route path="/create" element={<CreateAd />} />

      <Route 
        path="/my-ads" 
        element={<MyAds />} 
      />

      <Route 
        path="/profile" 
        element={<Profile />} 
      />

    </Routes>

    
  );
}