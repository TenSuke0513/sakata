import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function NewArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigete = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
      credentials: "include",
    });

    if (res.ok) {
      console.log("記事が投稿されました！");
      navigete("/articleList")
    } else {
      console.error("投稿に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="タイトル"
        variant="outlined"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="本文"
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        投稿
      </Button>
    </form>
  );
}
