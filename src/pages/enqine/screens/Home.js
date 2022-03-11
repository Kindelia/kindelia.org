import { useState, useContext } from "react";
import { LanguageContext } from "../languages";
import { getStorage, storageSetUser } from "../utils/storage";
import throttle from "../utils/throttle";
import fetch from "../fetch";

export default function Home({
  whenAdvance,
  goToLevel,
  goToEnd,
  user,
  setUser,
  auth,
}) {
  const language = useContext(LanguageContext).dictionary;

  function reboot() {
    const reboot = getStorage();
    if (reboot[user]) {
      const data = reboot[user];
      if (data.endTime) {
        goToEnd();
      } else if (data.startTime) {
        goToLevel(data.actualQuestion.id);
      } else {
        whenAdvance();
      }
    } else {
      storageSetUser(user);
      whenAdvance();
    }
  }

  async function login() {
    try {
      if (auth) {
        const res = await fetch("/authenticate", {
          method: "POST",
          data: {
            user,
          },
        });
        if (res.status !== 200) throw res.statusText;
      }
      reboot();
    } catch (err) {
      setShowError(true);
    }
  }

  const [showError, setShowError] = useState(false);
  return (
    <>
      <h1>enQIne</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <label htmlFor="user">{language.home.user}</label>
          <input
            type="user"
            name="user"
            onChange={(e) => setUser(e.target.value)}
          ></input>
        </div>
        {showError && (
          <span className="error mt-5 bold">{language.home.error}</span>
        )}
      </div>
      <button
        className="mt-30"
        onClick={() => {
          throttle(login, 500);
        }}
      >
        {language.button.start}
      </button>
    </>
  );
}
