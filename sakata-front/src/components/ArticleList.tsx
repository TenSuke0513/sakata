import React from "react";

// 記事ダミーデータ
const articles = [
    { id: 1, title: "初めてのReact", content: "Reactの基本を学ぶ" },
    { id: 2, title: "Next.jsとは？", content: "Next.jsの概要と利点" },
];

const ArticleList: React.FC = () => {
    return (
        <div>
            <h1>記事一覧</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;
