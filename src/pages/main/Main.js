import kindelia_logo from "../../static/kindelia_logo.svg";
import github_icon from "../../static/github_icon.png";
import discord_icon from "../../static/discord_icon.png";
import telegram_icon from "../../static/telegram_icon.png";
import youtube_icon from "../../static/youtube_icon.png";
import twitch_icon from "../../static/twitch_icon.png";

import "./Main.css";

const icons = [
  {
    name: "Github",
    link: "https://github.com/Kindelia",
    img: github_icon,
  },
  {
    name: "Telegram",
    link: "https://t.me/kindelia",
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
          className="main-icon"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "80%",
            }}
            src={img}
            alt={alt}
          ></img>
        </div>
      </a>
    </li>
  );
}

export default function Main() {
  return (
    <main className="main-container">
      <img
        width="128px"
        height="128px"
        src={kindelia_logo}
        alt="Kindelia Logo"
      ></img>
      <h2 className="main-title">Kindelia</h2>
      <ul className="main-social">
        {icons.map((icon, i) => (
          <SocialIcon
            alt={`${icon.name} link`}
            img={icon.img}
            link={icon.link}
            key={i}
          />
        ))}
      </ul>
    </main>
  );
}
