import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, CardContent, Typography } from "@mui/material";

type Article = {
    id: number;
    title: string;
    content: string;
};

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/articles/${id}`)
            .then(res => setArticle(res.data))
            .catch(err => console.error("API Error:", err));
    }, [id]);

    if (!article) {
        return <Typography>記事が見つかりません</Typography>;
    }

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <Typography variant="h4">{article.title}</Typography>
                    <Typography variant="body1">{article.content}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ArticleDetail;
