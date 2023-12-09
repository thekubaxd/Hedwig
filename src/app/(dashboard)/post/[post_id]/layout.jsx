import Container from "@components/ui/dashboard/post/Container";
import Header from "@components/ui/dashboard/post/Header";
import Main from "@components/ui/dashboard/post/Main";

export default function PostLayout({ children }) {
  return (
    <Container>
      <Header>post</Header>
      <Main>{children}</Main>
    </Container>
  );
}
