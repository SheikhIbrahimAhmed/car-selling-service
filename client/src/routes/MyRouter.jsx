import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayoutRoutes from "./PublicLayoutRoutes";
import Login from "../pages/login";
import PostPage from "../pages/postpage";
import PrivateLayoutRoutes from "./PrivateLayoutRoutes";

const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayoutRoutes />}>
                    <Route path="/" element={<Login />} />
                </Route>
                <Route element={<PrivateLayoutRoutes />}>
                    <Route path="/create-post" element={<PostPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default MyRouter;