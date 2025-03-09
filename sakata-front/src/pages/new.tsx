
import { Container } from "@mui/material";
import { NewArticleForm } from "../components/NewArticleForm";

export default function NewArticlePage() {
  return (
    <Container maxWidth="sm">
      <h1>記事を作成</h1>
      <NewArticleForm />
    </Container>
  );
}
