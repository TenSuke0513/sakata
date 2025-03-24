import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import NewArticlePage from "./pages/new";
import SignIn from "./pages/signin";
import Login from "./pages/login";
import MyPage from "./pages/Mypage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/articleList" element={<ArticleList />} />
                <Route path="/pages/new" element={<NewArticlePage />} />
                <Route path="/" element={<Login />}/>
                <Route path="/pages/signin" element={<SignIn />}/>
                <Route path="/mypage" element={<MyPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
