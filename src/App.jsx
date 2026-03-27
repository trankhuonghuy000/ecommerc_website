import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Homepage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Auth from "./pages/Auth.jsx";
import Navbar from "./components/Navbar.jsx";
import ProductDetail from "./pages/ProdductDetail.jsx";

import AuthProvider from "./Context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
