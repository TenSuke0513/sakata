import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import ArticleDetail from "./ArticleDetail"; // 🔹 詳細コンポーネントをインポート
import { Link } from "react-router-dom";


type Article = {
    id: number;
    title: string;
    content: string;
};

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // 🔹 選択された記事

    useEffect(() => {
        axios.get("http://localhost:8080/articles")
            .then(res => setArticles(res.data))
            .catch(err => console.error("API Error:", err));
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h3" gutterBottom>
                sakata
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/pages/new"
                style={{ marginBottom: "20px" }}
            >
                新規作成
            </Button>

            {/* 🔹 記事詳細を表示する場合 */}
            {selectedArticle ? (
                <>
                    <Button variant="contained" onClick={() => setSelectedArticle(null)} style={{ marginBottom: "20px" }}>
                        一覧に戻る
                    </Button>
                    <ArticleDetail article={selectedArticle} /> {/* 🔹 詳細コンポーネントを表示 */}
                </>
            ) : (
                <Grid container spacing={3}>
                    {articles.map((article) => (
                        <Grid item xs={12} sm={6} md={4} key={article.id}>
                            <Card onClick={() => setSelectedArticle(article)} style={{ cursor: "pointer" }}>
                                <CardContent>
                                    <Typography variant="h5">{article.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {article.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ArticleList;
