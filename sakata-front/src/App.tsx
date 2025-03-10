import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import NewArticlePage from "./pages/new";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route path="/pages/new" element={<NewArticlePage />} />
            </Routes>
        </Router>
    );
}

export default App;
