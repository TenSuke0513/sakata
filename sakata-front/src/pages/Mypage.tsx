import { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

type User = {
  id: number;
  email: string;
  name?: string; // 名前を追加してるなら
};

type Article = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // ユーザー情報取得
    fetch("http://localhost:8080/mypage", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data));

    // 自分の投稿一覧取得
    fetch("http://localhost:8080/mypage/articles", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        マイページ
      </Typography>

      {user && (
        <div>
          <Typography variant="h6">ユーザー情報</Typography>
          <Typography>メール: {user.email}</Typography>
          {user.name && <Typography>名前: {user.name}</Typography>}
          <Divider sx={{ my: 2 }} />
        </div>
      )}

      <Typography variant="h6" gutterBottom>
        あなたの投稿一覧
      </Typography>
      <List>
        {articles.map((article) => (
          <ListItem key={article.id}>
            <ListItemText primary={article.title} secondary={article.created_at} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default MyPage;
