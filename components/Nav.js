import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import kindelia_icon from "../static/images/kindelia_icon.svg";
import MenuItem from "./MenuItem";
import Menu from "./Menu";

const Wrapper = styled.nav`
  width: 100%;
  height: 50px;

  margin-top: 60px;
  margin-bottom: 100px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.2rem;
  font-family: "Courier New", Courier, monospace;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  cursor: pointer;
  & > * {
    margin-right: 10px;
  }

  max-height: 100%;

  img {
    filter: ${({ theme }) => `invert(${theme.name === "dark" ? 1 : 0})`};
  }
`;

const menu_items = [
  { text: "Projects", link: "/", mobile: true },
  { text: "Posts", link: "/blog", mobile: true },
  { text: "About us", link: "/#about-us", mobile: false },
  { text: "Contact", link: "/#contact", mobile: false },
];

export default function Nav({ theme, whenChooseTheme }) {
  return (
    <Wrapper>
      <Link as={`/`} href={`/`} passHref>
        <Logo>
          <div>
            <Image
              width={50}
              height={50}
              src={kindelia_icon}
              alt="kindelia logo"
            />
          </div>
          {/* <div className="mobile-hidden">
            <span>Kindelia</span>
          </div> */}
        </Logo>
      </Link>
      <div className="options">
        <Menu></Menu>
        {/* <ThemePicker theme={theme} whenChooseTheme={whenChooseTheme} /> */}
      </div>
    </Wrapper>
  );
}
