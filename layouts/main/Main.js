import styled from "styled-components";
import Image from "next/image";

import kindelia_logo from "../../static/icons/kindelia_logo.svg";
import github_icon from "../../static/icons/github_icon.png";
import discord_icon from "../../static/icons/discord_icon.png";
import telegram_icon from "../../static/icons/telegram_icon.png";
import youtube_icon from "../../static/icons/youtube_icon.png";
import twitch_icon from "../../static/icons/twitch_icon.png";
import Menu from "../../components/Menu";

export default function Main() {
  return (
    <>
      <MenuWrapper>
        <Menu />
      </MenuWrapper>
      <Wrapper>
        <Image
          width="90px"
          height="90px"
          src={kindelia_logo}
          alt="Kindelia Logo"
        ></Image>
        <h2 className="title">Kindelia</h2>
        <ul className="social">
          {icons.map((icon, i) => (
            <SocialIcon
              alt={`${icon.name} link`}
              img={icon.img}
              link={icon.link}
              key={i}
            />
          ))}
        </ul>
      </Wrapper>
    </>
  );
}

const icons = [
  {
    name: "Github",
    link: "https://github.com/Kindelia",
    img: github_icon,
  },
  {
    name: "Telegram",
    link: "https://t.me/formality_lang",
    img: telegram_icon,
  },
  {
    name: "Discord",
    link: "https://discord.gg/VV7ppaVWYn",
    img: discord_icon,
  },
  // {
  //   name: "Twitch",
  //   link: "https://www.twitch.tv/kindeliaorg",
  //   img: twitch_icon,
  // },
  // {
  //   name: "Youtube",
  //   link: "https://www.youtube.com/channel/UCLmWZUdQps97-JL7qiE4XcA",
  //   img: youtube_icon,
  // },
];

function SocialIcon({ img, alt, link }) {
  return (
    <li>
      <a target="_blank" rel="noreferrer" href={link}>
        <div
          className="icon"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image width="32px" height="32px" src={img} alt={alt}></Image>
        </div>
      </a>
    </li>
  );
}

const MenuWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  margin: 10px;
`;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f6f3ef;
  min-height: max(100vh, 700px);
  font-family: "Courier New", Courier, monospace;

  .title {
    font-size: 2rem;
    margin: 0;
    margin-top: 12px;
    font-weight: normal;
  }

  .social {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    margin-top: 10px;
    padding: 0;
  }

  .social > * + * {
    margin-left: 20px;
  }

  .icon {
    width: 32px;
    height: 32px;
    color: white;
    text-decoration: none;
  }

  .title::after {
    content: "_";
    font-family: Impact, sans-serif;
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%,
    50%,
    100% {
      opacity: 1;
    }
    25%,
    75% {
      opacity: 0;
    }
  }
`;
