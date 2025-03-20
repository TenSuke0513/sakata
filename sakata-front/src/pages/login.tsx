import { useState } from "react";
import { TextField, Button, Container, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigete = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("ログインに失敗しました");
      }

      alert("ログイン成功！");

      navigete("/")

    } catch (error) {
      alert(error instanceof Error ? error.message : "エラーが発生しました");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        ログイン
      </Typography>
      <TextField
        fullWidth
        label="メールアドレス"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="パスワード"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        ログイン
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        アカウントを持っていませんか？{" "}
        <Link href="/pages/signin">新規登録はこちら</Link>
      </Typography>
    </Container>
  );
};

export default Login;
