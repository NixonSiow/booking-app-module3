import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Provider
import store from "./store/store";
import NavigationBar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
    return (
        <Provider store={store}>  {/* Wrap your app in the Provider */}
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
