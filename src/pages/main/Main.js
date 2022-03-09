import kindelia_logo from "../../static/kindelia_logo.svg";
import github_icon from "../../static/github_icon.png";
import discord_icon from "../../static/discord_icon.png";
import telegram_icon from "../../static/telegram_icon.png";

import "./Main.css";

function SocialIcon({ img, alt, link }) {
  return (
    <li>
      <a target="_blank" rel="noreferrer" href={link}>
        <img className="main-icon" src={img} alt={alt}></img>
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
        <SocialIcon
          link="https://github.com/Kindelia"
          img={github_icon}
          alt="Github link"
        />
        <SocialIcon
          link="https://t.me/formality_lang"
          img={telegram_icon}
          alt="Telegram link"
        />
        <SocialIcon
          link="https://discord.gg/VV7ppaVWYn"
          img={discord_icon}
          alt="Discord link"
        />
      </ul>
    </main>
  );
}
