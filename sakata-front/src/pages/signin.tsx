import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error("登録に失敗しました");
      }

      alert("登録成功！");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        ユーザー登録
      </Typography>
      <TextField
        fullWidth
        label="名前"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        onClick={handleSignIn}
        sx={{ mt: 2 }}
      >
        登録
      </Button>
    </Container>
  );
};

export default SignIn;
