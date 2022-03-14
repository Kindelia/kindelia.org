import styled from "styled-components";
import Nav from "../components/Nav";

const Wrapper = styled.div`
  max-width: 900px;
  width: 95%;
  margin: auto;
`;

export default function Layout({ children, theme, whenChooseTheme }) {
  return (
    <Wrapper>
      <Nav theme={theme} whenChooseTheme={whenChooseTheme} />
      {children}
    </Wrapper>
  );
}
