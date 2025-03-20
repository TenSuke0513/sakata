import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import NewArticlePage from "./pages/new";
import SignIn from "./pages/signin";
import Login from "./pages/login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route path="/pages/new" element={<NewArticlePage />} />
                <Route path="/pages/login" element={<Login />}/>
                <Route path="/pages/signin" element={<SignIn />}/>
            </Routes>
        </Router>
    );
}

export default App;
