import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Card, CardContent, Typography, Grid } from "@mui/material";

type Article = {
    id: number;
    title: string;
    content: string;
};

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);

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
            <Grid container spacing={3}>
                {articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.id}>
                        <Card>
                            <CardContent>
                                <Link to={`/articles/${article.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <Typography variant="h5">{article.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {article.content}
                                    </Typography>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ArticleList;
