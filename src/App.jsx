import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Homepage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Auth from "./pages/Auth.jsx";
import Navbar from "./components/Navbar.jsx";

import AuthProvider from "./Context/AuthContext.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
