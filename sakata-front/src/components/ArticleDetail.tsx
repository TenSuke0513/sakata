import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

type Article = {
    id: number;
    title: string;
    content: string;
};

// 🔹 Props の型を定義
interface ArticleDetailProps {
    article: Article;
}

// 🔹 `Props` を受け取るように修正
const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{article.title}</Typography>
                <Typography variant="body1">{article.content}</Typography>
            </CardContent>
        </Card>
    );
};

export default ArticleDetail;
